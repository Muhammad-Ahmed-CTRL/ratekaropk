import { createClient } from '@supabase/supabase-js';

export const FALLBACK_USD_TO_PKR = 278.5;

export interface ExchangeRateResult {
  rate: number;
  source: 'saved' | 'fallback';
  lastUpdated: string;
  providerUpdatedAt?: string | null;
  stale?: boolean;
}

export async function getUsdToPkrRate(): Promise<ExchangeRateResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      rate: FALLBACK_USD_TO_PKR,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
      stale: true,
    };
  }

  try {
    // Server-side market calculations read the public saved rate with the anon key.
    // Third-party FX providers are only called by the protected cron route.
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from('exchange_rates')
      .select('rate, source, fetched_at, provider_updated_at')
      .eq('base_currency', 'USD')
      .eq('quote_currency', 'PKR')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    const rate = Number(data?.rate);
    if (data && Number.isFinite(rate) && rate > 0) {
      const lastUpdated = String(data.fetched_at);
      const fetchedAt = new Date(lastUpdated).getTime();
      const stale = Date.now() - fetchedAt > 36 * 60 * 60 * 1000;

      return {
        rate,
        source: 'saved',
        lastUpdated,
        providerUpdatedAt: data.provider_updated_at,
        stale,
      };
    }
  } catch (error) {
    console.error('Unable to read saved USD/PKR rate:', error);
  }

  return {
    rate: FALLBACK_USD_TO_PKR,
    source: 'fallback',
    lastUpdated: new Date().toISOString(),
    stale: true,
  };
}
