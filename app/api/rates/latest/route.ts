import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fallbackUsdExchangeRates, type CurrencyCode } from '@/lib/countryConfig';

export const dynamic = 'force-dynamic';

function isStale(fetchedAt: string) {
  return Date.now() - new Date(fetchedAt).getTime() > 36 * 60 * 60 * 1000;
}

function getQuoteCurrency(request: Request): CurrencyCode | null {
  const { searchParams } = new URL(request.url);
  const quote = (searchParams.get('quote') || 'PKR').toUpperCase();
  return quote in fallbackUsdExchangeRates ? (quote as CurrencyCode) : null;
}

export async function GET(request: Request) {
  const quoteCurrency = getQuoteCurrency(request);

  if (!quoteCurrency) {
    return NextResponse.json({ ok: false, error: 'Unsupported exchange rate quote currency' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing env var: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return NextResponse.json(
      { ok: false, error: 'Exchange rate is not configured' },
      { status: 500 }
    );
  }

  // Next.js caches fetch requests by default. We must explicitly disable caching for Supabase client.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
    },
  });

  const { data, error } = await supabase
    .from('exchange_rates')
    .select('rate, source, provider_updated_at, fetched_at')
    .eq('base_currency', 'USD')
    .eq('quote_currency', quoteCurrency)
    .order('fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(`Supabase read error (latest USD/${quoteCurrency} rate):`, error.message);
    return NextResponse.json(
      { ok: false, error: 'Exchange rate is currently unavailable' },
      { status: 500 }
    );
  }

  if (!data) {
    console.error(`No saved USD/${quoteCurrency} rate found in public.exchange_rates`);
    return NextResponse.json(
      { ok: false, error: 'No saved exchange rate exists' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    rate: Number(data.rate),
    baseCurrency: 'USD',
    quoteCurrency,
    source: data.source,
    lastUpdated: data.fetched_at,
    providerUpdatedAt: data.provider_updated_at,
    stale: isStale(data.fetched_at),
  });
}
