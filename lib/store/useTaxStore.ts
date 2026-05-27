import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateTax, type TaxResult } from '@/lib/taxCalculator';

interface TaxStore {
  monthlyIncome: number;
  isPSEB: boolean;
  result: TaxResult | null;
  savedEstimates: SavedTaxEstimate[];

  setIncome: (income: number) => void;
  togglePSEB: () => void;
  setPSEB: (value: boolean) => void;
  recalculate: () => void;
  saveEstimate: () => SavedTaxEstimate | null;
}

export interface SavedTaxEstimate {
  id: string;
  monthlyIncome: number;
  isPSEB: boolean;
  result: TaxResult;
  savedAt: string;
}

function computeTax(monthlyIncome: number, isPSEB: boolean): TaxResult {
  return calculateTax(monthlyIncome, isPSEB);
}

export const useTaxStore = create<TaxStore>()(
  persist(
    (set, get) => ({
      monthlyIncome: 250000,
      isPSEB: true,
      result: computeTax(250000, true),
      savedEstimates: [],

      setIncome: (income) => {
        const { isPSEB } = get();
        set({ monthlyIncome: income, result: computeTax(income, isPSEB) });
      },

      togglePSEB: () => {
        const { monthlyIncome, isPSEB } = get();
        const newPSEB = !isPSEB;
        set({ isPSEB: newPSEB, result: computeTax(monthlyIncome, newPSEB) });
      },

      setPSEB: (value) => {
        const { monthlyIncome } = get();
        set({ isPSEB: value, result: computeTax(monthlyIncome, value) });
      },

      recalculate: () => {
        const { monthlyIncome, isPSEB } = get();
        set({ result: computeTax(monthlyIncome, isPSEB) });
      },

      saveEstimate: () => {
        const { monthlyIncome, isPSEB, result } = get();
        if (!result) return null;

        const estimate: SavedTaxEstimate = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          monthlyIncome,
          isPSEB,
          result,
          savedAt: new Date().toISOString(),
        };

        set((state) => ({ savedEstimates: [estimate, ...state.savedEstimates] }));
        return estimate;
      },
    }),
    {
      name: 'ratekaro-tax-store',
      partialize: (state) => ({
        monthlyIncome: state.monthlyIncome,
        isPSEB: state.isPSEB,
        savedEstimates: state.savedEstimates,
      }),
    }
  )
);
