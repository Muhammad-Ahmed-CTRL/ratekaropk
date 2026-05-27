import {
  categoryOrder,
  cityMultipliers,
  DEFAULT_USD_TO_PKR,
  foreignMultiplier,
  getRateBySlug,
  getSkillsByCategory,
  type RateEntry,
} from '@/lib/rateData';

export { categoryOrder, getSkillsByCategory };

export type Experience = 'junior' | 'mid' | 'senior';
export type ClientType = 'local' | 'foreign';
export type ConfidenceLabel = 'High' | 'Medium' | 'Low';
export type BenchmarkSourceType = 'supabase' | 'seed_fallback';

export interface MarketRate {
  pkrLow: number;
  pkrMid: number;
  pkrHigh: number;
  usdLow: number;
  usdMid: number;
  usdHigh: number;
  sourceType: BenchmarkSourceType;
  sourceLabel: string;
  sourceCount: number;
  confidenceScore: number;
  confidenceLabel: ConfidenceLabel;
  lastUpdated: string;
  isStale: boolean;
  usdToPkr: number;
  warning?: string;
}

export interface MarketBenchmarkRow {
  skill_slug: string;
  skill_name: string;
  category: string;
  city: string;
  experience: Experience;
  client_type: ClientType;
  pkr_low: number;
  pkr_mid: number;
  pkr_high: number;
  usd_low: number;
  usd_mid: number;
  usd_high: number;
  source_count: number;
  confidence_score: number;
  last_updated: string;
}

export const MARKET_DATA_STALE_DAYS = 7;

export function getConfidenceLabel(score: number): ConfidenceLabel {
  if (score >= 80) return 'High';
  if (score >= 55) return 'Medium';
  return 'Low';
}

export function isBenchmarkStale(lastUpdated: string, now = new Date()): boolean {
  const updatedAt = new Date(lastUpdated);
  if (Number.isNaN(updatedAt.getTime())) return true;
  const ageMs = now.getTime() - updatedAt.getTime();
  return ageMs > MARKET_DATA_STALE_DAYS * 24 * 60 * 60 * 1000;
}

export function mapBenchmarkRow(row: MarketBenchmarkRow, usdToPkr: number): MarketRate {
  const confidenceScore = Number(row.confidence_score ?? 0);
  const sourceCount = Number(row.source_count ?? 0);
  const isStale = isBenchmarkStale(row.last_updated);

  return {
    pkrLow: Math.round(row.pkr_low),
    pkrMid: Math.round(row.pkr_mid),
    pkrHigh: Math.round(row.pkr_high),
    usdLow: Math.round(Number(row.usd_low)),
    usdMid: Math.round(Number(row.usd_mid)),
    usdHigh: Math.round(Number(row.usd_high)),
    sourceType: 'supabase',
    sourceLabel: 'Verified market benchmark',
    sourceCount,
    confidenceScore,
    confidenceLabel: getConfidenceLabel(confidenceScore),
    lastUpdated: row.last_updated,
    isStale,
    usdToPkr,
    warning: isStale
      ? 'This benchmark is older than 7 days. Use it as the last verified market signal.'
      : sourceCount < 3
        ? 'Limited market samples for this niche. Treat the range as directional.'
        : undefined,
  };
}

export function createSeedFallbackRate(
  entry: RateEntry,
  experience: Experience,
  city: string,
  clientType: ClientType,
  usdToPkr = DEFAULT_USD_TO_PKR
): MarketRate {
  const base = entry[experience];
  const cityMult = cityMultipliers[city.toLowerCase()] ?? 1.0;

  const pkrLow =
    clientType === 'foreign'
      ? Math.round(base.usd.low * usdToPkr)
      : Math.round(base.pkr.low * cityMult);
  const pkrHigh =
    clientType === 'foreign'
      ? Math.round(base.usd.high * usdToPkr)
      : Math.round(base.pkr.high * cityMult);
  const pkrMid = Math.round((pkrLow + pkrHigh) / 2);

  const usdLow =
    clientType === 'foreign'
      ? base.usd.low
      : Math.round(pkrLow / usdToPkr);
  const usdHigh =
    clientType === 'foreign'
      ? base.usd.high
      : Math.round(pkrHigh / usdToPkr);
  const usdMid = Math.round((usdLow + usdHigh) / 2);

  const fallbackUpdated = new Date(Date.UTC(2026, 4, 1)).toISOString();

  return {
    pkrLow,
    pkrMid,
    pkrHigh,
    usdLow,
    usdMid,
    usdHigh,
    sourceType: 'seed_fallback',
    sourceLabel: 'Seed fallback benchmark',
    sourceCount: 1,
    confidenceScore: clientType === 'foreign' ? 45 : Math.round(40 * foreignMultiplier / 2.2),
    confidenceLabel: 'Low',
    lastUpdated: fallbackUpdated,
    isStale: true,
    usdToPkr,
    warning:
      'Using seed fallback data because no fresh verified benchmark is available yet. Add/update Supabase benchmarks for production accuracy.',
  };
}

export function createSeedFallbackBySlug(
  skillSlug: string,
  experience: Experience,
  city: string,
  clientType: ClientType,
  usdToPkr = DEFAULT_USD_TO_PKR
): MarketRate | null {
  const entry = getRateBySlug(skillSlug);
  if (!entry) return null;
  return createSeedFallbackRate(entry, experience, city, clientType, usdToPkr);
}
