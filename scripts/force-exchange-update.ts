import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const quoteCurrencies = ['PKR', 'INR', 'BDT'];

async function fetchFawazAhmedApi() {
  const response = await fetch(
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(`Fawaz Ahmed currency API returned HTTP ${response.status}`);
  }

  const raw = await response.json();
  return {
    rates: {
      PKR: Number(raw?.usd?.pkr),
      INR: Number(raw?.usd?.inr),
      BDT: Number(raw?.usd?.bdt),
    },
    source: 'fawazahmed0/currency-api',
    providerUpdatedAt: raw?.date ? new Date(`${raw.date}T00:00:00.000Z`).toISOString() : null,
    raw,
  };
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase configuration');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  console.log('Fetching live exchange rates...');
  const result = await fetchFawazAhmedApi();
  console.log('Rates fetched:', result.rates);

  const rows = quoteCurrencies.map((currency) => ({
    base_currency: 'USD',
    quote_currency: currency,
    rate: result.rates[currency as keyof typeof result.rates],
    source: result.source,
    provider_updated_at: result.providerUpdatedAt,
    raw: result.raw,
  }));

  console.log('Saving to database...');
  const { error } = await supabase.from('exchange_rates').insert(rows);

  if (error) {
    console.error('Failed to save to database:', error);
    process.exit(1);
  }

  console.log('Successfully updated exchange rates in database!');
}

main().catch(console.error);
