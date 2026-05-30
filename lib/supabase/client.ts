import { createBrowserClient } from '@supabase/ssr';

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return Boolean(
    url &&
      key &&
      url.startsWith('https://') &&
      !url.includes('placeholder') &&
      !url.includes('your_supabase_project_url') &&
      !key.includes('placeholder') &&
      !key.includes('your_supabase_anon_key')
  );
};

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

export type Database = {
  public: {
    Tables: {
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          slug: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      rate_submissions: {
        Row: {
          id: string;
          skill_id: string;
          city: string;
          experience: 'junior' | 'mid' | 'senior';
          pkr_rate: number;
          usd_rate: number;
          verified: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rate_submissions']['Row'], 'id' | 'verified' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['rate_submissions']['Insert']>;
      };
      saved_rates: {
        Row: {
          id: string;
          user_id: string;
          skill: string;
          experience: string;
          city: string;
          country_code: string;
          currency_code: string;
          client_type: string;
          pkr_low: number;
          pkr_mid: number;
          pkr_high: number;
          usd_low: number;
          usd_mid: number;
          usd_high: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['saved_rates']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['saved_rates']['Insert']>;
      };
      tax_estimates: {
        Row: {
          id: string;
          user_id: string;
          monthly_income: number;
          is_pseb: boolean;
          tax_amount: number;
          net_income: number;
          annual_projection: number;
          effective_rate: number;
          tax_rate: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tax_estimates']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tax_estimates']['Insert']>;
      };
      proposals: {
        Row: {
          id: string;
          user_id: string;
          project_description: string;
          rate_used: number;
          generated_text: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['proposals']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['proposals']['Insert']>;
      };
      rate_benchmarks: {
        Row: {
          id: string;
          skill_slug: string;
          skill_name: string;
          category: string;
          city: string;
          country_code: string;
          currency_code: string;
          experience: 'junior' | 'mid' | 'senior';
          client_type: 'local' | 'foreign';
          pkr_low: number;
          pkr_mid: number;
          pkr_high: number;
          usd_low: number;
          usd_mid: number;
          usd_high: number;
          source_count: number;
          confidence_score: number;
          source_notes: string | null;
          last_updated: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rate_benchmarks']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['rate_benchmarks']['Insert']>;
      };
      rate_sources: {
        Row: {
          id: string;
          name: string;
          source_type: string;
          source_url: string | null;
          reliability_weight: number;
          collected_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rate_sources']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['rate_sources']['Insert']>;
      };
      exchange_rates: {
        Row: {
          id: number;
          base_currency: string;
          quote_currency: string;
          rate: number;
          source: string;
          provider_updated_at: string | null;
          fetched_at: string;
          raw: unknown;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['exchange_rates']['Row'], 'id' | 'created_at' | 'fetched_at'>;
        Update: Partial<Database['public']['Tables']['exchange_rates']['Insert']>;
      };
    };
  };
};
