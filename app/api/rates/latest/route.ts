import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function isStale(fetchedAt: string) {
  return Date.now() - new Date(fetchedAt).getTime() > 36 * 60 * 60 * 1000;
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { ok: false, error: 'Exchange rate is not configured' },
      { status: 500 }
    );
  }

  // Public clients read only the latest saved rate with the anon key.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from('exchange_rates')
    .select('rate, source, provider_updated_at, fetched_at')
    .eq('base_currency', 'USD')
    .eq('quote_currency', 'PKR')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Failed to read latest USD/PKR rate:', error.message);
    return NextResponse.json(
      { ok: false, error: 'Exchange rate is currently unavailable' },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { ok: false, error: 'No saved exchange rate exists' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    rate: Number(data.rate),
    source: data.source,
    lastUpdated: data.fetched_at,
    providerUpdatedAt: data.provider_updated_at,
    stale: isStale(data.fetched_at),
  });
}
