import type { Experience } from '@/lib/marketRates';
import { getCountryByCode, type CountryCode, type CurrencyCode } from '@/lib/countryConfig';

export type SeoBenchmark = {
  skill_slug: string;
  skill_name: string;
  category: string;
  city: string;
  country_code?: CountryCode;
  currency_code?: CurrencyCode;
  experience: Experience;
  client_type: 'local' | 'foreign';
  pkr_low: number;
  pkr_mid: number;
  pkr_high: number;
  usd_low: number;
  usd_mid: number;
  usd_high: number;
  source_count: number;
  confidence_score: number;
  last_updated: string;
  source_notes?: string;
};

export async function getSkillBenchmarks(slug: string, countryCode: CountryCode = 'PK'): Promise<SeoBenchmark[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) return [];

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  };

  const country = getCountryByCode(countryCode);

  // Try fetching with source_notes and Global Lite country columns first.
  try {
    const endpointWithNotes = new URL('/rest/v1/rate_benchmarks', supabaseUrl);
    endpointWithNotes.searchParams.set(
      'select',
      'skill_slug,skill_name,category,city,country_code,currency_code,experience,client_type,pkr_low,pkr_mid,pkr_high,usd_low,usd_mid,usd_high,source_count,confidence_score,last_updated,source_notes'
    );
    endpointWithNotes.searchParams.set('skill_slug', `eq.${slug}`);
    endpointWithNotes.searchParams.set('country_code', `eq.${country.code}`);
    endpointWithNotes.searchParams.set('city', 'eq.remote');
    endpointWithNotes.searchParams.set('order', 'experience.asc,client_type.asc');

    const response = await fetch(endpointWithNotes.toString(), {
      headers,
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      return (await response.json()) as SeoBenchmark[];
    }
  } catch (err) {
    console.error('Error fetching with source_notes, falling back:', err);
  }

  // Fallback to fetching without optional columns. This preserves older PK-only databases.
  try {
    const endpointWithoutNotes = new URL('/rest/v1/rate_benchmarks', supabaseUrl);
    endpointWithoutNotes.searchParams.set(
      'select',
      'skill_slug,skill_name,category,city,experience,client_type,pkr_low,pkr_mid,pkr_high,usd_low,usd_mid,usd_high,source_count,confidence_score,last_updated'
    );
    endpointWithoutNotes.searchParams.set('skill_slug', `eq.${slug}`);
    if (country.code !== 'PK') return [];
    endpointWithoutNotes.searchParams.set('city', 'eq.remote');
    endpointWithoutNotes.searchParams.set('order', 'experience.asc,client_type.asc');

    const response = await fetch(endpointWithoutNotes.toString(), {
      headers,
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      return ((await response.json()) as SeoBenchmark[]).map((row) => ({
        ...row,
        country_code: 'PK',
        currency_code: 'PKR',
      }));
    }
    return [];
  } catch {
    return [];
  }
}

export function formatCurrency(value: number, currency: CurrencyCode | 'USD') {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  const country = getCountryByCode(currency === 'INR' ? 'IN' : currency === 'BDT' ? 'BD' : 'PK');

  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function confidenceLabel(score: number) {
  if (score >= 80) return 'High';
  if (score >= 55) return 'Medium';
  return 'Low';
}
