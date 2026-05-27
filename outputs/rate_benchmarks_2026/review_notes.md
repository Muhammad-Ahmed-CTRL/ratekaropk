# RateKaro PK Benchmark Import Review

Generated: 2026-05-27T20:36:22.783Z

## Summary
- Input rows: 125
- Final mapped benchmark rows: 92
- App skills covered: 17
- Unmapped/skipped rows: 15
- Invalid rows: 0
- Duplicate combinations resolved: 18
- Rows with computed missing PKR/USD or capped confidence: 32

## Live Supabase Import
- Imported 92 rows into public.rate_benchmarks on 2026-05-28.
- Imported 92 admin_import evidence rows into public.rate_sources.
- Verified anonymous public read from Supabase for frontend-dev mid foreign.
- Verified local /api/market-rate returns sourceType "supabase" and live USD/PKR exchange metadata.

## Covered App Skills
- animation: 6 rows
- backend-dev: 6 rows
- content-writing: 6 rows
- customer-support: 6 rows
- data-entry: 6 rows
- email-marketing: 1 rows
- frontend-dev: 6 rows
- full-stack: 6 rows
- graphic-design: 6 rows
- hr-consulting: 1 rows
- mobile-dev-react-native: 6 rows
- seo: 6 rows
- social-media: 6 rows
- translation-en-ur: 6 rows
- ui-ux-design: 6 rows
- video-editing: 6 rows
- virtual-assistant: 6 rows

## Important Mapping Decisions
- mobile-app -> mobile-dev-react-native
- web-backend -> backend-dev
- web-frontend -> frontend-dev
- mern-stack-developer -> full-stack
- ui-ux-designer -> ui-ux-design
- 2d-3d-animator -> animation
- email-growth-specialist -> email-marketing
- senior-recruiter -> hr-consulting
- ppc-ads, qa-engineer, accountant, sales-pro, account-executive, bookkeeper were skipped because the current app has no exact skill slug.

## Data Quality Notes
- Missing USD values were computed from PKR using FX 278.5.
- Missing PKR values were computed from USD using FX 278.5.
- Gemini rows with missing source_notes had confidence capped at 65.
- final_rate_benchmarks.csv keeps source_notes for audit.
- supabase_rate_benchmarks_insert.sql adds source_notes to rate_benchmarks if it does not already exist.

## Next Recommended App Additions
- Add exact skills for QA Engineer, PPC Ads, Accountant/Bookkeeper, Sales roles if you want to use skipped rows.
