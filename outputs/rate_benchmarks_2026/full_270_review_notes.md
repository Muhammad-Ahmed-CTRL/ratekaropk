# Full 270 Benchmark Import

Generated: 2026-05-27T21:25:49.218Z

- Rows: 270
- Skills: 45
- Experiences per skill: 3
- Client types per experience: 2
- Source count was capped to 2-4 because pasted AI research inflated counts.
- Confidence was capped to 50-82 because missing skills are normalized/admin-reviewed benchmark rows, not direct marketplace API pulls.
- Foreign senior rates were capped to prevent extreme AI-generated outliers from becoming production defaults.
- Use supabase_full_270_with_source_notes.sql in Supabase SQL Editor to store source_notes.
- REST import can use ratekaro_full_270_normalized.core.json when source_notes column is absent.
- Imported 270 core rows into live Supabase rate_benchmarks.
- Imported 270 admin_import evidence rows into live Supabase rate_sources.
- Live DB currently does not have rate_benchmarks.source_notes; run add_source_notes_column.sql or supabase_full_270_with_source_notes.sql in Supabase SQL Editor to show source notes directly on rate pages.
