# RateKaro PK SEO Growth Plan

Generated: 2026-05-28

## Executive Priority
RateKaro PK should rank around three connected search intents:

1. Freelancer rate discovery: "freelancer rate calculator Pakistan", "web developer hourly rate Pakistan", "graphic designer rate Pakistan".
2. Freelancer tax/PSEB guidance: "freelancer tax calculator Pakistan", "PSEB tax calculator", "154A freelancer tax Pakistan".
3. Client-conversion workflow: "freelance proposal generator Pakistan", "Upwork proposal template Pakistan", "how to quote foreign clients from Pakistan".

The highest-impact technical gap was missing indexable long-tail pages. That is now fixed with `/rates/[slug]` pages for every app skill and sitemap inclusion.

## Implemented In This Pass
- Added metadataBase, title template, canonical defaults, Twitter metadata, richer Open Graph, and index/follow Googlebot settings.
- Added route metadata for `/calculator`, `/tax`, `/proposals`, `/dashboard`, and auth pages.
- Marked dashboard/auth routes noindex and disallowed them in robots.
- Added `/rates/[slug]` pages for all 45 skills.
- Added 45 rate URLs to sitemap with stable lastmod.
- Added internal links from homepage and footer to high-value rate pages.
- Added skill-page schema and global Organization/WebSite/WebApplication JSON-LD.
- Added calculator query support: `/calculator?skill=seo`.
- Removed one decorative hero orb and one external texture request to reduce visual noise and avoid a third-party render dependency.
- Fixed footer encoding and middleware TypeScript build issue.

## Keyword Clusters

| Cluster | Example Keywords | Intent | Difficulty | Traffic Potential | Best Page Type | Content Angle |
|---|---|---:|---:|---:|---|---|
| Rate calculator | freelancer rate calculator Pakistan, freelance hourly rate Pakistan, Upwork rate calculator Pakistan | Commercial | Medium | High | `/calculator` | Calculate rate by skill, experience, city, and client type |
| Web/dev rates | web developer hourly rate Pakistan, React developer rate Pakistan, WordPress developer rate Pakistan | Commercial | Medium | High | `/rates/web-dev`, `/rates/frontend-dev`, `/rates/wordpress-dev` | Local vs foreign client hourly ranges |
| Design rates | graphic designer rate Pakistan, logo design charges Pakistan, UI UX designer hourly rate Pakistan | Commercial | Low-Med | Medium | `/rates/graphic-design`, `/rates/logo-design`, `/rates/ui-ux-design` | Pricing benchmarks with portfolio-level guidance |
| SEO/marketing rates | SEO freelancer rate Pakistan, social media manager charges Pakistan, email marketing freelancer Pakistan | Commercial | Low-Med | Medium | `/rates/seo`, `/rates/social-media`, `/rates/email-marketing` | Retainer vs hourly pricing guidance |
| Tax/PSEB | freelancer tax calculator Pakistan, PSEB tax calculator, 0.25% PSEB tax Pakistan | Informational/Commercial | Medium | High | `/tax` + future guide pages | Explain assumptions, eligibility, and calculations clearly |
| Proposal conversion | freelance proposal generator Pakistan, Upwork proposal template Pakistan | Transactional | Low | Medium | `/proposals` + templates hub | Generate proposal after calculating market rate |
| AI/emerging skills | AI automation freelancer rate Pakistan, prompt engineering rate Pakistan, chatbot developer rate Pakistan | Commercial | Low | Growing | `/rates/ai-prompt-engineering`, `/rates/chatbot-development` | New, low-competition skill pricing pages |

## Content Silos

### Rates Silo
- Pillar: `/calculator`
- Children: `/rates/web-dev`, `/rates/full-stack`, `/rates/graphic-design`, `/rates/seo`, and all other skill pages.
- Internal links: homepage -> calculator -> skill pages -> related skill pages -> calculator with query param.

### Tax Silo
- Pillar: `/tax`
- Future pages:
  - `/guides/freelancer-tax-pakistan`
  - `/guides/pseb-registration-freelancers`
  - `/guides/section-154a-freelancer-tax`
  - `/guides/fbr-freelancer-filing-checklist`

### Proposal Silo
- Pillar: `/proposals`
- Future pages:
  - `/templates/upwork-proposal-template-pakistan`
  - `/templates/web-development-proposal-template`
  - `/templates/seo-proposal-template`
  - `/guides/how-to-quote-foreign-clients-pakistan`

## On-Page Recommendations

### Homepage
- Primary title target: "RateKaro PK - Freelancer Rate Calculator for Pakistan".
- Strengthen above-the-fold copy around "freelancer rate calculator Pakistan".
- Keep claims specific: "market benchmark", "live exchange check", "confidence metadata".
- Avoid unverifiable "real-time rates" unless each displayed benchmark is live.

### Calculator
- Add an indexable intro block above the app controls or server-rendered text near the top.
- Add FAQ schema later for "How do I calculate my freelance rate in Pakistan?"
- Add links from selected skills to `/rates/[slug]`.

### Tax
- Avoid saying "current tax brackets" unless code is updated against the exact current Finance Act.
- Add a disclaimer and source links to FBR/PSEB.
- Add FAQ schema around PSEB registration, 0.25% export tax, and local vs foreign income.

### Rate Pages
- Current pages are intentionally clean and indexable.
- Next upgrade: add exact source notes per benchmark row after adding `source_notes` column to Supabase.
- Add "last verified" and "limited data" copy for skills without imported benchmark rows.

## Technical SEO Priorities

P0:
- Submit sitemap in Google Search Console.
- Verify canonical URLs use production domain.
- Ensure Supabase benchmark rows exist for all 45 skills so rate pages do not show "pending" too often.

P1:
- Add source_notes to `rate_benchmarks` and render source summaries on rate pages.
- Add FAQPage schema to homepage, calculator, tax, and top skill pages.
- Add BreadcrumbList schema to `/rates/[slug]`.
- Create guide/template directories for tax and proposal content.

P2:
- Add image alt text audit for every custom image.
- Add Lighthouse CI or a basic Web Vitals check before deployment.
- Add Search Console query tracking workflow.

## Search Console Setup
1. Add a Domain property for `ratekaro.pk`.
2. Verify via DNS TXT record.
3. Submit `https://ratekaro.pk/sitemap.xml`.
4. Inspect `/calculator`, `/tax`, `/rates/web-dev`, `/rates/seo`, and `/rates/ai-prompt-engineering`.
5. Request indexing for the homepage and top 10 commercial pages first.
6. Monitor Pages report for "Discovered - currently not indexed" and "Crawled - currently not indexed".
7. Monitor Performance by query groups: "rate", "tax", "PSEB", "proposal", and skill names.
8. Review Enhancements after schema rollout.

## Competitor/Market Notes
- Pakistan web development pricing pages are already ranking with direct rate tables, so RateKaro needs better structure, fresher dates, and calculator utility.
- PSEB/freelancer tax content is active in 2026; tax pages need official-source caution and update discipline.
- AI automation, prompt engineering, chatbot development, and no-code development are lower-competition opportunities with growing commercial intent.

## Sources Reviewed
- https://idtpakistan.pk/blog/freelancers-web-development-rates-pakistan/
- https://www.jobbers.io/best-freelancing-skills-in-pakistan-top-15-high-paying-skills/
- https://www.oicci.org/app/media/2026/04/OICCI-DIGITAL-REPORT-2025-FINAL.pdf
- https://finance.gov.pk/survey/chapter_25/15_Information_Technology.pdf
- https://pakistantaxes.com/freelancer-tax-pakistan/
- https://www.pasha.org.pk/wp-content/uploads/Federal-Budget-2026%E2%80%9327-Policy-Recommendations.pdf
