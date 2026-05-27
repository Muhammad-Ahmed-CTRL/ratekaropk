import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUsdToPkrRate } from '@/lib/exchangeRate';
import {
  createSeedFallbackBySlug,
  mapBenchmarkRow,
  type ClientType,
  type Experience,
  type MarketBenchmarkRow,
} from '@/lib/marketRates';

const validExperiences: Experience[] = ['junior', 'mid', 'senior'];
const validClientTypes: ClientType[] = ['local', 'foreign'];

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skillSlug = searchParams.get('skillSlug') || 'web-dev';
  const city = (searchParams.get('city') || 'remote').toLowerCase();
  const experience = (searchParams.get('experience') || 'mid') as Experience;
  const clientType = (searchParams.get('clientType') || 'foreign') as ClientType;
  const exchange = await getUsdToPkrRate();

  if (!validExperiences.includes(experience) || !validClientTypes.includes(clientType)) {
    return NextResponse.json({ error: 'Invalid market rate query' }, { status: 400 });
  }

  if (hasSupabaseConfig()) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('rate_benchmarks')
        .select('*')
        .eq('skill_slug', skillSlug)
        .eq('city', city)
        .eq('experience', experience)
        .eq('client_type', clientType)
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle<MarketBenchmarkRow>();

      if (error) throw error;

      if (data) {
        return NextResponse.json({
          rate: mapBenchmarkRow(data, exchange.rate),
          exchange,
        });
      }
    } catch (error) {
      console.error('Market benchmark lookup failed:', error);
    }
  }

  const fallback = createSeedFallbackBySlug(skillSlug, experience, city, clientType, exchange.rate);

  if (!fallback) {
    return NextResponse.json({ error: 'Unknown skill' }, { status: 404 });
  }

  return NextResponse.json({
    rate: fallback,
    exchange,
  });
}
