import { NextResponse } from 'next/server';
import { getUsdExchangeRate } from '@/lib/exchangeRate';
import { fallbackUsdExchangeRates, type CurrencyCode } from '@/lib/countryConfig';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuote = (searchParams.get('quote') || 'PKR').toUpperCase();
  const quoteCurrency: CurrencyCode =
    rawQuote in fallbackUsdExchangeRates ? (rawQuote as CurrencyCode) : 'PKR';

  const exchange = await getUsdExchangeRate(quoteCurrency);

  return NextResponse.json({
    rate: exchange.rate,
    base_currency: exchange.baseCurrency,
    quote_currency: exchange.quoteCurrency,
    source: exchange.source,
    last_updated: exchange.lastUpdated,
    provider_updated_at: exchange.providerUpdatedAt ?? null,
    stale: exchange.stale ?? false,
  });
}
