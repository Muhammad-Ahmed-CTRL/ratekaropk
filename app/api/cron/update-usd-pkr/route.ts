import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ProviderResult = {
  rate: number;
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

async function fetchOpenErApi(): Promise<ProviderResult> {
  const response = await fetch('https://open.er-api.com/v6/latest/USD', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`open.er-api.com returned HTTP ${response.status}`);
  }

  const raw = await response.json();
  const rate = Number(raw?.rates?.PKR);

  if (!isValidRate(rate)) {
    throw new Error('open.er-api.com did not return a valid USD/PKR rate');
  }

  const unixSeconds = Number(raw?.time_last_update_unix);
  const providerUpdatedAt = Number.isFinite(unixSeconds)
    ? new Date(unixSeconds * 1000).toISOString()
    : null;

  return {
    rate,
    source: 'open.er-api.com',
    providerUpdatedAt,
    raw,
  };
}

async function fetchExchangeRatesApi(accessKey: string): Promise<ProviderResult> {
  const url = new URL('https://api.exchangeratesapi.io/v1/latest');
  url.searchParams.set('access_key', accessKey);
  url.searchParams.set('base', 'USD');
  url.searchParams.set('symbols', 'PKR');

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`exchangeratesapi.io returned HTTP ${response.status}`);
  }

  const raw = await response.json();

  if (raw?.base !== 'USD') {
    throw new Error('exchangeratesapi.io did not honor base=USD');
  }

  const rate = Number(raw?.rates?.PKR);
  if (!isValidRate(rate)) {
    throw new Error('exchangeratesapi.io did not return a valid USD/PKR rate');
  }

  const providerUpdatedAt = raw?.date ? new Date(`${raw.date}T00:00:00.000Z`).toISOString() : null;

  return {
    rate,
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
  const rate = Number(raw?.usd?.pkr);

  if (!isValidRate(rate)) {
    throw new Error('Fawaz Ahmed currency API did not return a valid USD/PKR rate');
  }

  const providerUpdatedAt = raw?.date ? new Date(`${raw.date}T00:00:00.000Z`).toISOString() : null;

  return {
    rate,
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
      console.error(`USD/PKR provider failed (${provider.source}):`, message);
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
    const { data, error } = await supabase
      .from('exchange_rates')
      .insert({
        base_currency: 'USD',
        quote_currency: 'PKR',
        rate: result.rate,
        source: result.source,
        provider_updated_at: result.providerUpdatedAt,
        raw: result.raw,
      })
      .select('id, rate, source, provider_updated_at, fetched_at')
      .single();

    if (error) {
      console.error('Failed to insert USD/PKR rate:', error.message);
      return NextResponse.json(
        { ok: false, error: 'Failed to save exchange rate', errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      rate: data.rate,
      source: data.source,
      providerUpdatedAt: data.provider_updated_at,
      fetchedAt: data.fetched_at,
      errors,
    });
  }

  // If every provider fails, do not overwrite old data. Keep serving the last saved rate.
  const { data: latestSavedRate, error } = await supabase
    .from('exchange_rates')
    .select('rate, source, provider_updated_at, fetched_at')
    .eq('base_currency', 'USD')
    .eq('quote_currency', 'PKR')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Failed to read latest saved USD/PKR rate:', error.message);
  }

  return NextResponse.json(
    {
      ok: false,
      latestSavedRate,
      errors,
    },
    { status: latestSavedRate ? 200 : 503 }
  );
}
