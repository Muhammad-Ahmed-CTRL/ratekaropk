import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUsdToPkrRate } from '@/lib/exchangeRate';
import { MARKET_DATA_STALE_DAYS } from '@/lib/marketRates';

function isAuthorized(request: Request) {
  const secret = process.env.MARKET_REFRESH_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: 'Supabase service role is not configured' }, { status: 503 });
  }

  const exchange = await getUsdToPkrRate();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const staleBefore = new Date(Date.now() - MARKET_DATA_STALE_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { count: staleBenchmarks, error: staleError } = await supabase
    .from('rate_benchmarks')
    .select('*', { count: 'exact', head: true })
    .lt('last_updated', staleBefore);

  if (staleError) {
    return NextResponse.json({ error: staleError.message }, { status: 500 });
  }

  const { error: sourceError } = await supabase.from('rate_sources').insert({
    name: `Weekly market refresh - USD/PKR ${exchange.rate.toFixed(2)}`,
    source_type: 'admin_import',
    source_url: 'https://api.exchangerate-api.com/v4/latest/USD',
    reliability_weight: exchange.source === 'live' ? 1 : 0.25,
    collected_at: exchange.lastUpdated,
  });

  if (sourceError) {
    return NextResponse.json({ error: sourceError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    exchange,
    staleBenchmarks: staleBenchmarks ?? 0,
    message:
      'Refresh hook completed. Import verified benchmark rows into rate_benchmarks before or after this job; this endpoint never fabricates marketplace rates.',
  });
}
