import {
  DEFAULT_COUNTRY_CODE,
  getCountryByCode,
  type CountryCode,
  type CurrencyCode,
} from '@/lib/countryConfig';
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
  localLow: number;
  localMid: number;
  localHigh: number;
  localCurrency: CurrencyCode;
  countryCode: CountryCode;
  countryName: string;
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
  usdToLocal: number;
  warning?: string;
}

export interface MarketBenchmarkRow {
  skill_slug: string;
  skill_name: string;
  category: string;
  city: string;
  country_code?: CountryCode | null;
  currency_code?: CurrencyCode | null;
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

export function mapBenchmarkRow(row: MarketBenchmarkRow, usdToLocal: number): MarketRate {
  const country = getCountryByCode(row.country_code || DEFAULT_COUNTRY_CODE);
  const confidenceScore = Number(row.confidence_score ?? 0);
  const sourceCount = Number(row.source_count ?? 0);
  const isStale = isBenchmarkStale(row.last_updated);

  return {
    pkrLow: Math.round(row.pkr_low),
    pkrMid: Math.round(row.pkr_mid),
    pkrHigh: Math.round(row.pkr_high),
    localLow: Math.round(row.pkr_low),
    localMid: Math.round(row.pkr_mid),
    localHigh: Math.round(row.pkr_high),
    localCurrency: row.currency_code || country.currency,
    countryCode: country.code,
    countryName: country.name,
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
    usdToPkr: country.currency === 'PKR' ? usdToLocal : DEFAULT_USD_TO_PKR,
    usdToLocal,
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
  usdToPkr = DEFAULT_USD_TO_PKR,
  countryCode: CountryCode = DEFAULT_COUNTRY_CODE
): MarketRate {
  const country = getCountryByCode(countryCode);
  const base = entry[experience];
  const cityMult = cityMultipliers[city.toLowerCase()] ?? 1.0;
  const localUsdLow =
    clientType === 'foreign'
      ? base.usd.low
      : country.code === 'PK'
        ? Math.round((base.pkr.low * cityMult) / usdToPkr)
        : Math.round(base.usd.low * country.localClientUsdMultiplier);
  const localUsdHigh =
    clientType === 'foreign'
      ? base.usd.high
      : country.code === 'PK'
        ? Math.round((base.pkr.high * cityMult) / usdToPkr)
        : Math.round(base.usd.high * country.localClientUsdMultiplier);

  const pkrLow =
    country.code === 'PK'
      ? clientType === 'foreign'
        ? Math.round(base.usd.low * usdToPkr)
        : Math.round(base.pkr.low * cityMult)
      : Math.round(localUsdLow * usdToPkr);
  const pkrHigh =
    country.code === 'PK'
      ? clientType === 'foreign'
        ? Math.round(base.usd.high * usdToPkr)
        : Math.round(base.pkr.high * cityMult)
      : Math.round(localUsdHigh * usdToPkr);
  const pkrMid = Math.round((pkrLow + pkrHigh) / 2);

  const usdLow =
    clientType === 'foreign' ? base.usd.low : Math.round(pkrLow / usdToPkr);
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
    localLow: pkrLow,
    localMid: pkrMid,
    localHigh: pkrHigh,
    localCurrency: country.currency,
    countryCode: country.code,
    countryName: country.name,
    usdLow,
    usdMid,
    usdHigh,
    sourceType: 'seed_fallback',
    sourceLabel: country.code === 'PK' ? 'Seed fallback benchmark' : 'Limited regional benchmark estimate',
    sourceCount: 1,
    confidenceScore: clientType === 'foreign' ? 45 : Math.round(40 * foreignMultiplier / 2.2),
    confidenceLabel: 'Low',
    lastUpdated: fallbackUpdated,
    isStale: true,
    usdToPkr: country.currency === 'PKR' ? usdToPkr : DEFAULT_USD_TO_PKR,
    usdToLocal: usdToPkr,
    warning:
      country.code === 'PK'
        ? 'Using seed fallback data because no fresh verified benchmark is available yet. Add/update Supabase benchmarks for production accuracy.'
        : `Limited ${country.name} benchmark samples are available. This estimate uses global USD skill ranges converted to ${country.currency}; tax guidance is not included yet.`,
  };
}

export function createSeedFallbackBySlug(
  skillSlug: string,
  experience: Experience,
  city: string,
  clientType: ClientType,
  usdToPkr = DEFAULT_USD_TO_PKR,
  countryCode: CountryCode = DEFAULT_COUNTRY_CODE
): MarketRate | null {
  const entry = getRateBySlug(skillSlug);
  if (!entry) return null;
  return createSeedFallbackRate(entry, experience, city, clientType, usdToPkr, countryCode);
}
