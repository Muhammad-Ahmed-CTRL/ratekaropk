-- ============================================================
-- RateKaro PK — Global Lite Migration
-- ============================================================
-- Run this ONCE in Supabase Dashboard > SQL Editor > New Query
-- before deploying the Global Lite app code to production.
--
-- This is SAFE to run on existing databases:
--   - All existing PK rows get country_code='PK', currency_code='PKR'
--   - No data is deleted or renamed
--   - pkr_* column names are preserved for backward compatibility
--     (they now store local currency values for non-PK countries)
-- ============================================================

-- ─── 1. Add country_code and currency_code to rate_benchmarks ─
ALTER TABLE public.rate_benchmarks
  ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT 'PK',
  ADD COLUMN IF NOT EXISTS currency_code text NOT NULL DEFAULT 'PKR';

-- ─── 2. Add country_code and currency_code to saved_rates ─────
ALTER TABLE public.saved_rates
  ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT 'PK',
  ADD COLUMN IF NOT EXISTS currency_code text NOT NULL DEFAULT 'PKR';

-- ─── 3. Drop the old PK-only unique constraint ────────────────
-- The old constraint only covered (skill_slug, city, experience, client_type).
-- The new one adds country_code so each country can have its own row.
ALTER TABLE public.rate_benchmarks
  DROP CONSTRAINT IF EXISTS rate_benchmarks_skill_slug_city_experience_client_type_key;

-- ─── 4. Create the new country-aware unique index ─────────────
CREATE UNIQUE INDEX IF NOT EXISTS rate_benchmarks_country_unique_idx
  ON public.rate_benchmarks(country_code, skill_slug, city, experience, client_type);

-- ─── 5. Create fast country lookup index ──────────────────────
CREATE INDEX IF NOT EXISTS idx_rate_benchmarks_country_lookup
  ON public.rate_benchmarks(country_code, skill_slug, city, experience, client_type);
