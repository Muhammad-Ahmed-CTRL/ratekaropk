import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getUsdToPkrRate } from '@/lib/exchangeRate';
import {
  createSeedFallbackBySlug,
  mapBenchmarkRow,
  type ClientType,
  type Experience,
  type MarketRate,
  type MarketBenchmarkRow,
} from '@/lib/marketRates';
import { cityMultipliers } from '@/lib/rateData';

const validExperiences: Experience[] = ['junior', 'mid', 'senior'];
const validClientTypes: ClientType[] = ['local', 'foreign'];

type RateKaroDatabase = {
  public: {
    Tables: {
      rate_benchmarks: {
        Row: MarketBenchmarkRow;
        Insert: MarketBenchmarkRow;
        Update: Partial<MarketBenchmarkRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function getBenchmark(
  supabase: SupabaseClient<RateKaroDatabase>,
  skillSlug: string,
  city: string,
  experience: Experience,
  clientType: ClientType
) {
  return supabase
    .from('rate_benchmarks')
    .select('*')
    .eq('skill_slug', skillSlug)
    .eq('city', city)
    .eq('experience', experience)
    .eq('client_type', clientType)
    .order('last_updated', { ascending: false })
    .limit(1)
    .maybeSingle<MarketBenchmarkRow>();
}

function applyCityContext(rate: MarketRate, city: string, clientType: ClientType): MarketRate {
  if (city === 'remote') return rate;

  if (clientType === 'foreign') {
    return {
      ...rate,
      sourceLabel: 'Verified remote market benchmark',
      warning:
        rate.warning ??
        'Using the verified remote benchmark because foreign-client pricing is not city-specific.',
    };
  }

  const multiplier = cityMultipliers[city] ?? 1;
  const pkrLow = Math.round(rate.pkrLow * multiplier);
  const pkrMid = Math.round(rate.pkrMid * multiplier);
  const pkrHigh = Math.round(rate.pkrHigh * multiplier);

  return {
    ...rate,
    pkrLow,
    pkrMid,
    pkrHigh,
    usdLow: Math.round(pkrLow / rate.usdToPkr),
    usdMid: Math.round(pkrMid / rate.usdToPkr),
    usdHigh: Math.round(pkrHigh / rate.usdToPkr),
    sourceLabel: 'Verified remote benchmark adjusted for city',
    warning:
      rate.warning ??
      `Using the verified remote benchmark adjusted for ${city} because city-specific samples are still being collected.`,
  };
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
      const supabase = createClient<RateKaroDatabase>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await getBenchmark(
        supabase,
        skillSlug,
        city,
        experience,
        clientType
      );

      if (error) throw error;

      if (data) {
        return NextResponse.json({
          rate: mapBenchmarkRow(data, exchange.rate),
          exchange,
        });
      }

      if (city !== 'remote') {
        const { data: remoteData, error: remoteError } = await getBenchmark(
          supabase,
          skillSlug,
          'remote',
          experience,
          clientType
        );

        if (remoteError) throw remoteError;

        if (remoteData) {
          return NextResponse.json({
            rate: applyCityContext(mapBenchmarkRow(remoteData, exchange.rate), city, clientType),
            exchange,
          });
        }
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
