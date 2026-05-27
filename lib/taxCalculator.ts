export interface TaxResult {
  taxAmount: number;
  netIncome: number;
  annualProjection: number;
  taxRate: string;
  effectiveRate: number;
}

/**
 * Pakistani freelancer tax slabs (annual income):
 * 0 - 600,000:           0%
 * 600,001 - 1,200,000:   5%
 * 1,200,001 - 2,400,000: 10%
 * 2,400,001 - 3,600,000: 15%
 * 3,600,001 - 6,000,000: 20%
 * 6,000,001+:            25%
 *
 * PSEB registered: flat 0.25% on gross income (IT export relief)
 */

interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}

const TAX_SLABS: TaxSlab[] = [
  { min: 0,         max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,    max: 1200000,   rate: 0.05, fixed: 0 },
  { min: 1200001,   max: 2400000,   rate: 0.10, fixed: 30000 },
  { min: 2400001,   max: 3600000,   rate: 0.15, fixed: 150000 },
  { min: 3600001,   max: 6000000,   rate: 0.20, fixed: 330000 },
  { min: 6000001,   max: null,      rate: 0.25, fixed: 810000 },
];

const PSEB_RATE = 0.0025; // 0.25% flat

function calculateAnnualTax(annualIncome: number, isPSEB: boolean): { taxAmount: number; taxRate: string; effectiveRate: number } {
  if (isPSEB) {
    const taxAmount = Math.round(annualIncome * PSEB_RATE);
    return {
      taxAmount,
      taxRate: '0.25%',
      effectiveRate: PSEB_RATE * 100,
    };
  }

  // Progressive slab calculation
  const slab = TAX_SLABS.find(
    (s) => annualIncome >= s.min && (s.max === null || annualIncome <= s.max)
  );

  if (!slab) {
    return { taxAmount: 0, taxRate: '0%', effectiveRate: 0 };
  }

  let taxAmount = 0;
  let taxRateLabel = '0%';

  if (slab.rate === 0) {
    taxAmount = 0;
    taxRateLabel = '0%';
  } else {
    const excessOver = annualIncome - slab.min + 1;
    taxAmount = Math.round(slab.fixed + excessOver * slab.rate);
    taxRateLabel = `${(slab.rate * 100).toFixed(0)}%`;
  }

  const effectiveRate = annualIncome > 0 ? (taxAmount / annualIncome) * 100 : 0;

  return { taxAmount, taxRate: taxRateLabel, effectiveRate };
}

export function calculateTax(
  monthlyIncome: number,
  isPSEB: boolean
): TaxResult {
  const annualIncome = monthlyIncome * 12;
  const { taxAmount: annualTax, taxRate, effectiveRate } = calculateAnnualTax(annualIncome, isPSEB);

  const monthlyTax = Math.round(annualTax / 12);
  const netMonthlyIncome = monthlyIncome - monthlyTax;
  const annualProjection = netMonthlyIncome * 12;

  return {
    taxAmount: monthlyTax,
    netIncome: netMonthlyIncome,
    annualProjection,
    taxRate,
    effectiveRate,
  };
}

export function formatPKR(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return amount.toLocaleString('en-PK');
  }
  return amount.toString();
}

export function getIncomeBracket(monthlyIncome: number): string {
  const annual = monthlyIncome * 12;
  if (annual <= 600000) return 'Tax Exempt';
  if (annual <= 1200000) return 'Low Bracket (5%)';
  if (annual <= 2400000) return 'Mid Bracket (10%)';
  if (annual <= 3600000) return 'Upper Mid (15%)';
  if (annual <= 6000000) return 'High Bracket (20%)';
  return 'Top Bracket (25%)';
}
