export type CountryCode = 'PK' | 'IN' | 'BD';
export type CurrencyCode = 'PKR' | 'INR' | 'BDT';

export interface CountryConfig {
  code: CountryCode;
  slug: 'pakistan' | 'india' | 'bangladesh';
  name: string;
  adjective: string;
  currency: CurrencyCode;
  currencySymbol: string;
  locale: string;
  supportsCityContext: boolean;
  supportsTax: boolean;
  localClientUsdMultiplier: number;
  defaultCity: string;
}

export const globalLiteCountries: CountryConfig[] = [
  {
    code: 'PK',
    slug: 'pakistan',
    name: 'Pakistan',
    adjective: 'Pakistani',
    currency: 'PKR',
    currencySymbol: 'Rs',
    locale: 'en-PK',
    supportsCityContext: true,
    supportsTax: true,
    localClientUsdMultiplier: 1,
    defaultCity: 'remote',
  },
  {
    code: 'IN',
    slug: 'india',
    name: 'India',
    adjective: 'Indian',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    supportsCityContext: false,
    supportsTax: false,
    localClientUsdMultiplier: 0.75,
    defaultCity: 'remote',
  },
  {
    code: 'BD',
    slug: 'bangladesh',
    name: 'Bangladesh',
    adjective: 'Bangladeshi',
    currency: 'BDT',
    currencySymbol: '৳',
    locale: 'en-BD',
    supportsCityContext: false,
    supportsTax: false,
    localClientUsdMultiplier: 0.55,
    defaultCity: 'remote',
  },
];

export const DEFAULT_COUNTRY_CODE: CountryCode = 'PK';

export const fallbackUsdExchangeRates: Record<CurrencyCode, number> = {
  PKR: 278.5,
  INR: 83.5,
  BDT: 117.2,
};

export function getCountryByCode(code?: string | null): CountryConfig {
  return (
    globalLiteCountries.find((country) => country.code === String(code || '').toUpperCase()) ??
    globalLiteCountries[0]
  );
}

export function getCountryBySlug(slug?: string | null): CountryConfig | undefined {
  return globalLiteCountries.find((country) => country.slug === slug);
}

export function getCountryByCurrency(currency?: string | null): CountryConfig {
  return (
    globalLiteCountries.find((country) => country.currency === String(currency || '').toUpperCase()) ??
    globalLiteCountries[0]
  );
}

export function isGlobalLiteCountry(code?: string | null): code is CountryCode {
  return globalLiteCountries.some((country) => country.code === String(code || '').toUpperCase());
}

export function formatLocalCurrency(amount: number, country: CountryConfig) {
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
