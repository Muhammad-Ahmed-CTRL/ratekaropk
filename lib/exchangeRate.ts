export const FALLBACK_USD_TO_PKR = 278.5;

export interface ExchangeRateResult {
  rate: number;
  source: 'live' | 'fallback';
  lastUpdated: string;
}

export async function getUsdToPkrRate(): Promise<ExchangeRateResult> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      throw new Error(`Exchange API returned ${response.status}`);
    }

    const data = await response.json();
    const rate = Number(data?.rates?.PKR);

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error('Exchange API did not include a valid PKR rate');
    }

    return {
      rate,
      source: 'live',
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Using fallback USD/PKR rate:', error);
    return {
      rate: FALLBACK_USD_TO_PKR,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
}
