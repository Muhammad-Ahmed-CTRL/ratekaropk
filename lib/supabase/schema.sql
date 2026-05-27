-- ============================================================
-- RateKaro PK — Supabase Schema
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLE: skills ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.skills (
  id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name     text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'Development',
    'Design',
    'Content & Marketing',
    'Business Services',
    'Creative',
    'AI & Emerging'
  )),
  slug     text NOT NULL UNIQUE
);

-- ─── TABLE: rate_submissions ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rate_submissions (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_id   uuid NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  city       text NOT NULL,
  experience text NOT NULL CHECK (experience IN ('junior', 'mid', 'senior')),
  pkr_rate   integer NOT NULL CHECK (pkr_rate > 0),
  usd_rate   numeric(10, 2) NOT NULL CHECK (usd_rate > 0),
  verified   boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── TABLE: saved_rates ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_rates (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill       text NOT NULL,
  experience  text NOT NULL,
  city        text NOT NULL,
  client_type text NOT NULL CHECK (client_type IN ('local', 'foreign')),
  pkr_low     integer NOT NULL,
  pkr_mid     integer NOT NULL,
  pkr_high    integer NOT NULL,
  usd_low     numeric(10, 2) NOT NULL,
  usd_mid     numeric(10, 2) NOT NULL,
  usd_high    numeric(10, 2) NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── TABLE: proposals ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.proposals (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_description text NOT NULL,
  rate_used           numeric(10, 2) NOT NULL,
  generated_text      text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- ─── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_rate_submissions_skill_id ON public.rate_submissions(skill_id);
CREATE INDEX IF NOT EXISTS idx_saved_rates_user_id ON public.saved_rates(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_user_id ON public.proposals(user_id);

-- ─── Row Level Security ──────────────────────────────────────
ALTER TABLE public.saved_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals   ENABLE ROW LEVEL SECURITY;

-- saved_rates policies
CREATE POLICY "Users can view own saved_rates"
  ON public.saved_rates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved_rates"
  ON public.saved_rates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved_rates"
  ON public.saved_rates FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved_rates"
  ON public.saved_rates FOR DELETE
  USING (auth.uid() = user_id);

-- proposals policies
CREATE POLICY "Users can view own proposals"
  ON public.proposals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own proposals"
  ON public.proposals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own proposals"
  ON public.proposals FOR DELETE
  USING (auth.uid() = user_id);

-- ─── Seed skills table ───────────────────────────────────────
INSERT INTO public.skills (name, category, slug) VALUES
  -- Development
  ('Web Dev', 'Development', 'web-dev'),
  ('Frontend Dev', 'Development', 'frontend-dev'),
  ('Backend Dev', 'Development', 'backend-dev'),
  ('Full Stack', 'Development', 'full-stack'),
  ('Mobile Dev (React Native)', 'Development', 'mobile-dev-react-native'),
  ('Flutter Dev', 'Development', 'flutter-dev'),
  ('WordPress Dev', 'Development', 'wordpress-dev'),
  ('Shopify Dev', 'Development', 'shopify-dev'),
  ('Python Dev', 'Development', 'python-dev'),
  ('Node.js Dev', 'Development', 'nodejs-dev'),
  ('PHP Dev', 'Development', 'php-dev'),
  ('DevOps / Cloud', 'Development', 'devops-cloud'),
  -- Design
  ('UI/UX Design', 'Design', 'ui-ux-design'),
  ('Graphic Design', 'Design', 'graphic-design'),
  ('Logo Design', 'Design', 'logo-design'),
  ('Brand Identity', 'Design', 'brand-identity'),
  ('Motion Graphics', 'Design', 'motion-graphics'),
  ('Video Editing', 'Design', 'video-editing'),
  ('3D Design', 'Design', '3d-design'),
  ('Figma Design', 'Design', 'figma-design'),
  -- Content & Marketing
  ('Content Writing', 'Content & Marketing', 'content-writing'),
  ('Copywriting', 'Content & Marketing', 'copywriting'),
  ('SEO', 'Content & Marketing', 'seo'),
  ('Social Media', 'Content & Marketing', 'social-media'),
  ('Email Marketing', 'Content & Marketing', 'email-marketing'),
  ('Blog Writing', 'Content & Marketing', 'blog-writing'),
  ('Technical Writing', 'Content & Marketing', 'technical-writing'),
  ('Translation (EN/UR)', 'Content & Marketing', 'translation-en-ur'),
  -- Business Services
  ('Virtual Assistant', 'Business Services', 'virtual-assistant'),
  ('Data Entry', 'Business Services', 'data-entry'),
  ('Project Management', 'Business Services', 'project-management'),
  ('Business Analysis', 'Business Services', 'business-analysis'),
  ('Customer Support', 'Business Services', 'customer-support'),
  ('HR Consulting', 'Business Services', 'hr-consulting'),
  -- Creative
  ('Video Production', 'Creative', 'video-production'),
  ('Podcast Editing', 'Creative', 'podcast-editing'),
  ('Photography Edit', 'Creative', 'photography-edit'),
  ('Animation', 'Creative', 'animation'),
  ('Thumbnail Design', 'Creative', 'thumbnail-design'),
  ('Ad Creative', 'Creative', 'ad-creative'),
  -- AI & Emerging
  ('AI Prompt Engineering', 'AI & Emerging', 'ai-prompt-engineering'),
  ('Chatbot Development', 'AI & Emerging', 'chatbot-development'),
  ('AI Content Creation', 'AI & Emerging', 'ai-content-creation'),
  ('Automation (Zapier/Make)', 'AI & Emerging', 'automation-zapier-make'),
  ('No-Code Development', 'AI & Emerging', 'no-code-development')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Current-market benchmark upgrade
-- ============================================================

CREATE TABLE IF NOT EXISTS public.rate_sources (
  id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name               text NOT NULL,
  source_type        text NOT NULL CHECK (source_type IN ('marketplace_api', 'public_report', 'admin_import', 'verified_submission')),
  source_url         text,
  reliability_weight numeric(4, 2) NOT NULL DEFAULT 1.00 CHECK (reliability_weight > 0),
  collected_at       timestamptz NOT NULL DEFAULT now(),
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.rate_benchmarks (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_slug       text NOT NULL,
  skill_name       text NOT NULL,
  category         text NOT NULL,
  city             text NOT NULL,
  experience       text NOT NULL CHECK (experience IN ('junior', 'mid', 'senior')),
  client_type      text NOT NULL CHECK (client_type IN ('local', 'foreign')),
  pkr_low          integer NOT NULL CHECK (pkr_low > 0),
  pkr_mid          integer NOT NULL CHECK (pkr_mid > 0),
  pkr_high         integer NOT NULL CHECK (pkr_high > 0),
  usd_low          numeric(10, 2) NOT NULL CHECK (usd_low > 0),
  usd_mid          numeric(10, 2) NOT NULL CHECK (usd_mid > 0),
  usd_high         numeric(10, 2) NOT NULL CHECK (usd_high > 0),
  source_count     integer NOT NULL DEFAULT 1 CHECK (source_count > 0),
  confidence_score integer NOT NULL DEFAULT 50 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  source_notes     text,
  last_updated     timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (skill_slug, city, experience, client_type)
);

CREATE TABLE IF NOT EXISTS public.tax_estimates (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  monthly_income    integer NOT NULL CHECK (monthly_income >= 0),
  is_pseb           boolean NOT NULL,
  tax_amount        integer NOT NULL CHECK (tax_amount >= 0),
  net_income        integer NOT NULL CHECK (net_income >= 0),
  annual_projection integer NOT NULL CHECK (annual_projection >= 0),
  effective_rate    numeric(8, 4) NOT NULL CHECK (effective_rate >= 0),
  tax_rate          text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tax_estimates_user_id ON public.tax_estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_rate_benchmarks_lookup ON public.rate_benchmarks(skill_slug, city, experience, client_type);
CREATE INDEX IF NOT EXISTS idx_rate_benchmarks_last_updated ON public.rate_benchmarks(last_updated DESC);

ALTER TABLE public.tax_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tax_estimates"
  ON public.tax_estimates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tax_estimates"
  ON public.tax_estimates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tax_estimates"
  ON public.tax_estimates FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tax_estimates"
  ON public.tax_estimates FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view rate_benchmarks"
  ON public.rate_benchmarks FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view rate_sources"
  ON public.rate_sources FOR SELECT
  USING (true);

ALTER TABLE public.rate_submissions
  ADD COLUMN IF NOT EXISTS submitted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS client_type text CHECK (client_type IN ('local', 'foreign')),
  ADD COLUMN IF NOT EXISTS source_type text CHECK (source_type IN ('marketplace_api', 'public_report', 'admin_import', 'verified_submission', 'community')),
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS notes text;
