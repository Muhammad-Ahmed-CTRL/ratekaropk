import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FALLBACK_USD_TO_PKR } from '@/lib/exchangeRate';
import type { MarketRate } from '@/lib/marketRates';
import type { CountryCode } from '@/lib/countryConfig';

export type Experience = 'junior' | 'mid' | 'senior';
export type ClientType = 'local' | 'foreign';

export type CalculatedRate = MarketRate;

export interface SavedRate {
  id: string;
  skill: string;
  skillSlug: string;
  experience: Experience;
  city: string;
  country: CountryCode;
  clientType: ClientType;
  rate: CalculatedRate;
  savedAt: string;
}

interface RateStore {
  // Selection state
  selectedSkillSlug: string;
  selectedSkillName: string;
  selectedCategory: string;
  experience: Experience;
  city: string;
  country: CountryCode;
  clientType: ClientType;
  usdToPkr: number;

  // Computed result
  calculatedRate: CalculatedRate | null;
  isCalculating: boolean;

  // Saved rates
  savedRates: SavedRate[];

  // Actions
  setSkill: (slug: string, name: string, category: string) => void;
  setExperience: (exp: Experience) => void;
  setCity: (city: string) => void;
  setCountry: (country: CountryCode) => void;
  setClientType: (type: ClientType) => void;
  setUsdToPkr: (rate: number) => void;
  calculateRate: () => Promise<void>;
  saveRate: () => SavedRate | null;
  deleteSavedRate: (id: string) => void;
  clearCalculation: () => void;
}

export const useRateStore = create<RateStore>()(
  persist(
    (set, get) => ({
      selectedSkillSlug: 'web-dev',
      selectedSkillName: 'Web Dev',
      selectedCategory: 'Development',
      experience: 'mid',
      city: 'remote',
      country: 'PK',
      clientType: 'foreign',
      usdToPkr: FALLBACK_USD_TO_PKR,
      calculatedRate: null,
      isCalculating: false,
      savedRates: [],

      setSkill: (slug, name, category) => {
        set({ selectedSkillSlug: slug, selectedSkillName: name, selectedCategory: category });
      },

      setExperience: (exp) => {
        set({ experience: exp });
      },

      setCity: (city) => {
        set({ city });
      },

      setCountry: (country) => {
        set({ country, city: country === 'PK' ? get().city : 'remote' });
      },

      setClientType: (type) => {
        set({ clientType: type });
      },

      setUsdToPkr: (rate) => {
        set({ usdToPkr: rate });
      },

      calculateRate: async () => {
        const state = get();
        set({ isCalculating: true });

        try {
          const params = new URLSearchParams({
            skillSlug: state.selectedSkillSlug,
            experience: state.experience,
            city: state.city,
            country: state.country,
            clientType: state.clientType,
          });
          const response = await fetch(`/api/market-rate?${params.toString()}`);

          if (!response.ok) {
            throw new Error('Unable to load market benchmark');
          }

          const data = await response.json();
          set({
            calculatedRate: data.rate,
            usdToPkr: data.exchange?.rate ?? state.usdToPkr,
            isCalculating: false,
          });
        } catch (error) {
          console.error('Rate calculation failed:', error);
          set({ isCalculating: false });
        }
      },

      saveRate: () => {
        const state = get();
        if (!state.calculatedRate) return null;
        const newSaved: SavedRate = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          skill: state.selectedSkillName,
          skillSlug: state.selectedSkillSlug,
          experience: state.experience,
          city: state.city,
          country: state.country,
          clientType: state.clientType,
          rate: state.calculatedRate,
          savedAt: new Date().toISOString(),
        };
        set((s) => ({ savedRates: [newSaved, ...s.savedRates] }));
        return newSaved;
      },

      deleteSavedRate: (id) => {
        set((s) => ({ savedRates: s.savedRates.filter((r) => r.id !== id) }));
      },

      clearCalculation: () => {
        set({ calculatedRate: null });
      },
    }),
    {
      name: 'ratekaro-rate-store',
      partialize: (state) => ({
        selectedSkillSlug: state.selectedSkillSlug,
        selectedSkillName: state.selectedSkillName,
        selectedCategory: state.selectedCategory,
        experience: state.experience,
        city: state.city,
        country: state.country,
        clientType: state.clientType,
        calculatedRate: state.calculatedRate,
        savedRates: state.savedRates,
      }),
    }
  )
);
