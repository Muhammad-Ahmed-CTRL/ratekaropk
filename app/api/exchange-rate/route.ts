import { NextResponse } from 'next/server';
import { getUsdToPkrRate } from '@/lib/exchangeRate';

export const dynamic = 'force-dynamic';

export async function GET() {
  const exchange = await getUsdToPkrRate();

  return NextResponse.json({
    rate: exchange.rate,
    source: exchange.source,
    last_updated: exchange.lastUpdated,
    provider_updated_at: exchange.providerUpdatedAt,
    stale: exchange.stale ?? false,
  });
}
