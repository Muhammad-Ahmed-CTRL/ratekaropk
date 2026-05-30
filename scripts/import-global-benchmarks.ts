import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf('--file');
  const isWrite = args.includes('--write');

  if (fileIndex === -1 || fileIndex + 1 >= args.length) {
    console.error('Error: --file argument is required.');
    console.error('Usage: npm run import:benchmarks -- --file <path-to-csv> [--write]');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), args[fileIndex + 1]);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at path: ${filePath}`);
    process.exit(1);
  }

  // Security Check 1: Must not use NEXT_PUBLIC prefix for service role key
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SECURITY ERROR: NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY is present in environment.');
    console.error('The service role key gives admin access and must NEVER be exposed to the client bundle.');
    console.error('Please remove it and use SUPABASE_SERVICE_ROLE_KEY only.');
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required.');
    process.exit(1);
  }

  console.log(`Starting Global Lite Benchmark Import (${isWrite ? 'WRITE MODE' : 'DRY RUN'})`);
  console.log(`File: ${filePath}\n`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let records: any[];
  try {
    records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (err: any) {
    console.error(`Error parsing CSV: ${err.message}`);
    process.exit(1);
  }

  const errors: string[] = [];
  const validRows: any[] = [];
  const stats = {
    total: records.length,
    byCountry: {} as Record<string, number>,
    bySkill: {} as Record<string, number>,
    minConfidence: 100,
    maxConfidence: 0,
  };

  // Validation Engine
  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const rowNum = i + 2; // +1 for 0-index, +1 for header
    let rowValid = true;

    const pushError = (msg: string) => {
      errors.push(`Row ${rowNum}: ${msg}`);
      rowValid = false;
    };

    // 1. country_code must be PK, IN, or BD
    if (!['PK', 'IN', 'BD'].includes(row.country_code)) {
      pushError(`Invalid country_code '${row.country_code}'. Expected PK, IN, or BD.`);
    }

    // 2. currency_code must match country
    const expectedCurrency = row.country_code === 'PK' ? 'PKR' : row.country_code === 'IN' ? 'INR' : 'BDT';
    if (row.currency_code !== expectedCurrency) {
      pushError(`Invalid currency_code '${row.currency_code}' for country '${row.country_code}'. Expected ${expectedCurrency}.`);
    }

    // 3. experience must be junior, mid, senior
    if (!['junior', 'mid', 'senior'].includes(row.experience)) {
      pushError(`Invalid experience '${row.experience}'.`);
    }

    // 4. client_type must be local or foreign
    if (!['local', 'foreign'].includes(row.client_type)) {
      pushError(`Invalid client_type '${row.client_type}'.`);
    }

    // 5. city should be remote for IN and BD
    if (['IN', 'BD'].includes(row.country_code) && row.city !== 'remote') {
      pushError(`Invalid city '${row.city}' for country '${row.country_code}'. Expected 'remote'.`);
    }

    // Parse numerics
    const localLow = parseFloat(row.local_low);
    const localMid = parseFloat(row.local_mid);
    const localHigh = parseFloat(row.local_high);
    const usdLow = parseFloat(row.usd_low);
    const usdMid = parseFloat(row.usd_mid);
    const usdHigh = parseFloat(row.usd_high);
    const sourceCount = parseInt(row.source_count, 10);
    const confidenceScore = parseInt(row.confidence_score, 10);

    // 6. local_low <= local_mid <= local_high and usd_low <= usd_mid <= usd_high
    if (!(localLow <= localMid && localMid <= localHigh)) {
      pushError(`Local rates out of order: ${localLow} <= ${localMid} <= ${localHigh} is false.`);
    }
    if (!(usdLow <= usdMid && usdMid <= usdHigh)) {
      pushError(`USD rates out of order: ${usdLow} <= ${usdMid} <= ${usdHigh} is false.`);
    }

    // 7. all rates must be positive
    if (localLow <= 0 || usdLow <= 0) {
      pushError(`Rates must be positive (local_low: ${localLow}, usd_low: ${usdLow}).`);
    }

    // 8. source_count >= 1
    if (isNaN(sourceCount) || sourceCount < 1) {
      pushError(`Invalid source_count '${row.source_count}'. Must be >= 1.`);
    }

    // 9. confidence_score between 0 and 100
    if (isNaN(confidenceScore) || confidenceScore < 0 || confidenceScore > 100) {
      pushError(`Invalid confidence_score '${row.confidence_score}'. Must be between 0 and 100.`);
    }

    // 10. source_notes not empty
    if (!row.source_notes || row.source_notes.trim() === '') {
      pushError(`source_notes cannot be empty.`);
    }

    // 11. last_updated valid date
    if (isNaN(Date.parse(row.last_updated))) {
      pushError(`Invalid last_updated date '${row.last_updated}'.`);
    }

    if (rowValid) {
      stats.byCountry[row.country_code] = (stats.byCountry[row.country_code] || 0) + 1;
      stats.bySkill[row.skill_slug] = (stats.bySkill[row.skill_slug] || 0) + 1;
      stats.minConfidence = Math.min(stats.minConfidence, confidenceScore);
      stats.maxConfidence = Math.max(stats.maxConfidence, confidenceScore);

      // Map to DB schema
      validRows.push({
        country_code: row.country_code,
        currency_code: row.currency_code,
        skill_slug: row.skill_slug,
        skill_name: row.skill_name,
        category: row.category,
        city: row.city,
        experience: row.experience,
        client_type: row.client_type,
        pkr_low: localLow,
        pkr_mid: localMid,
        pkr_high: localHigh,
        usd_low: usdLow,
        usd_mid: usdMid,
        usd_high: usdHigh,
        source_count: sourceCount,
        confidence_score: confidenceScore,
        source_notes: row.source_notes.trim(),
        last_updated: new Date(row.last_updated).toISOString(),
      });
    }
  }

  if (errors.length > 0) {
    console.error('\nVALIDATION FAILED');
    console.error(`Found ${errors.length} error(s) across ${records.length} rows.\n`);
    errors.slice(0, 50).forEach(err => console.error(err));
    if (errors.length > 50) {
      console.error(`... and ${errors.length - 50} more errors.`);
    }
    console.error('\nImport aborted. No data was written to the database.');
    process.exit(1);
  }

  console.log('VALIDATION PASSED\n');
  console.log('--- Statistics ---');
  console.log(`Total Rows: ${stats.total}`);
  console.log(`Confidence Score Range: ${stats.minConfidence} - ${stats.maxConfidence}`);
  console.log('\nRows by Country:');
  Object.entries(stats.byCountry).forEach(([c, count]) => console.log(`  ${c}: ${count}`));
  console.log(`\nUnique Skills: ${Object.keys(stats.bySkill).length}`);
  console.log('------------------\n');

  if (!isWrite) {
    console.log('DRY RUN ONLY. Use --write to perform the actual import to Supabase.');
    process.exit(0);
  }

  console.warn('WARNING: This will upsert benchmark rows in Supabase.');
  console.warn('Existing rows with the same country_code, skill_slug, city, experience, and client_type will be updated.');
  console.log('\nInitializing Supabase Client and pushing data...');

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Perform bulk upsert safely
  const { error } = await supabase
    .from('rate_benchmarks')
    .upsert(validRows, {
      onConflict: 'country_code,skill_slug,city,experience,client_type',
    });

  if (error) {
    console.error('SUPABASE UPSERT FAILED');
    console.error(error);
    process.exit(1);
  }

  console.log('IMPORT COMPLETE. Data has been successfully written to Supabase.');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
