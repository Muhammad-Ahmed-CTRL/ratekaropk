import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fallbackUsdExchangeRates, type CurrencyCode } from '@/lib/countryConfig';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ProviderResult = {
  rates: Record<CurrencyCode, number>;
  source: string;
  providerUpdatedAt: string | null;
  raw: unknown;
};

type ProviderError = {
  source: string;
  message: string;
};

function isValidRate(rate: number) {
  return Number.isFinite(rate) && rate > 0;
}

const quoteCurrencies = Object.keys(fallbackUsdExchangeRates) as CurrencyCode[];

function readProviderRates(rawRates: Record<string, unknown> | undefined, source: string) {
  const rates = Object.fromEntries(
    quoteCurrencies.map((currency) => [currency, Number(rawRates?.[currency])])
  ) as Record<CurrencyCode, number>;

  const invalid = quoteCurrencies.filter((currency) => !isValidRate(rates[currency]));
  if (invalid.length > 0) {
    throw new Error(`${source} did not return valid USD rates for ${invalid.join(', ')}`);
  }

  return rates;
}

async function fetchOpenErApi(): Promise<ProviderResult> {
  const response = await fetch('https://open.er-api.com/v6/latest/USD', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`open.er-api.com returned HTTP ${response.status}`);
  }

  const raw = await response.json();
  const rates = readProviderRates(raw?.rates, 'open.er-api.com');

  const unixSeconds = Number(raw?.time_last_update_unix);
  const providerUpdatedAt = Number.isFinite(unixSeconds)
    ? new Date(unixSeconds * 1000).toISOString()
    : null;

  return {
    rates,
    source: 'open.er-api.com',
    providerUpdatedAt,
    raw,
  };
}

async function fetchExchangeRatesApi(accessKey: string): Promise<ProviderResult> {
  const url = new URL('https://api.exchangeratesapi.io/v1/latest');
  url.searchParams.set('access_key', accessKey);
  url.searchParams.set('base', 'USD');
  url.searchParams.set('symbols', quoteCurrencies.join(','));

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`exchangeratesapi.io returned HTTP ${response.status}`);
  }

  const raw = await response.json();

  if (raw?.base !== 'USD') {
    throw new Error('exchangeratesapi.io did not honor base=USD');
  }

  const rates = readProviderRates(raw?.rates, 'exchangeratesapi.io');

  const providerUpdatedAt = raw?.date ? new Date(`${raw.date}T00:00:00.000Z`).toISOString() : null;

  return {
    rates,
    source: 'exchangeratesapi.io',
    providerUpdatedAt,
    raw,
  };
}

async function fetchFawazAhmedApi(): Promise<ProviderResult> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(`Fawaz Ahmed currency API returned HTTP ${response.status}`);
  }

  const raw = await response.json();
  const rates = {
    PKR: Number(raw?.usd?.pkr),
    INR: Number(raw?.usd?.inr),
    BDT: Number(raw?.usd?.bdt),
  };

  const invalid = quoteCurrencies.filter((currency) => !isValidRate(rates[currency]));
  if (invalid.length > 0) {
    throw new Error(`Fawaz Ahmed currency API did not return valid USD rates for ${invalid.join(', ')}`);
  }

  const providerUpdatedAt = raw?.date ? new Date(`${raw.date}T00:00:00.000Z`).toISOString() : null;

  return {
    rates,
    source: 'fawazahmed0/currency-api',
    providerUpdatedAt,
    raw,
  };
}

async function fetchLatestRate(): Promise<{ result: ProviderResult | null; errors: ProviderError[] }> {
  const providers: Array<{ source: string; run: () => Promise<ProviderResult> }> = [
    { source: 'open.er-api.com', run: fetchOpenErApi },
  ];

  if (process.env.EXCHANGERATESAPI_KEY) {
    providers.push({
      source: 'exchangeratesapi.io',
      run: () => fetchExchangeRatesApi(process.env.EXCHANGERATESAPI_KEY!),
    });
  }

  providers.push({
    source: 'fawazahmed0/currency-api',
    run: fetchFawazAhmedApi,
  });

  const errors: ProviderError[] = [];

  for (const provider of providers) {
    try {
      return { result: await provider.run(), errors };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown provider error';
      errors.push({ source: provider.source, message });
      console.error(`Provider fetch error (${provider.source}):`, message);
    }
  }

  return { result: null, errors };
}

export async function GET(request: Request) {
  const expectedToken = process.env.CRON_SECRET;
  const authorization = request.headers.get('authorization');

  // Vercel Cron calls this endpoint with a bearer token. Keep it private.
  if (!expectedToken || authorization !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env var: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json(
      { ok: false, error: 'Missing server Supabase configuration' },
      { status: 500 }
    );
  }

  // Service role key is server-only and can bypass RLS. Never expose it to the browser.
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { result, errors } = await fetchLatestRate();

  if (result) {
    const rows = quoteCurrencies.map((currency) => ({
      base_currency: 'USD',
      quote_currency: currency,
      rate: result.rates[currency],
      source: result.source,
      provider_updated_at: result.providerUpdatedAt,
      raw: result.raw,
    }));

    const { data, error } = await supabase
      .from('exchange_rates')
      .insert(rows)
      .select('id, quote_currency, rate, source, provider_updated_at, fetched_at');

    if (error) {
      console.error('Supabase insert error (USD exchange rates):', error.message);
      return NextResponse.json(
        { ok: false, error: 'Failed to save exchange rate', errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      rates: data,
      errors,
    });
  }

  // If every provider fails, do not overwrite old data. Keep serving the last saved rate.
  const { data: latestSavedRate, error } = await supabase
    .from('exchange_rates')
    .select('quote_currency, rate, source, provider_updated_at, fetched_at')
    .eq('base_currency', 'USD')
    .in('quote_currency', quoteCurrencies)
    .order('fetched_at', { ascending: false })
    .limit(quoteCurrencies.length);

  if (error) {
    console.error('Supabase read error (latest saved USD exchange rates):', error.message);
  }

  return NextResponse.json(
    {
      ok: false,
      latestSavedRate,
      errors,
    },
    { status: latestSavedRate?.length ? 200 : 503 }
  );
}
