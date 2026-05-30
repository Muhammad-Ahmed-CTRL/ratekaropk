import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calculator, Database, ShieldCheck } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { rateData } from '@/lib/rateData';
import { absoluteUrl, siteName, siteUrl } from '@/lib/seoConfig';
import { confidenceLabel, formatCurrency, getSkillBenchmarks } from '@/lib/seoMarket';
import { fallbackUsdExchangeRates, getCountryBySlug, globalLiteCountries } from '@/lib/countryConfig';

// params.slug = country slug (e.g. 'india', 'bangladesh')
// params.skill = skill slug (e.g. 'web-dev', 'seo')
type PageProps = {
  params: {
    slug: string;   // country slug
    skill: string;  // skill slug
  };
};

const supportedCountrySlugs = ['india', 'bangladesh'];

export function generateStaticParams() {
  return supportedCountrySlugs.flatMap((countrySlug) =>
    rateData.map((skill) => ({
      slug: countrySlug,
      skill: skill.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = getCountryBySlug(params.slug);
  const skill = rateData.find((entry) => entry.slug === params.skill);

  if (!country || !skill || country.code === 'PK') return {};

  const title = `${skill.skill} Freelance Rates in ${country.name}`;
  const description = `See ${skill.skill} freelance rate estimates in ${country.name}. Global Lite benchmarks show ${country.currency} and USD ranges for local and foreign clients.`;
  const canonical = `/rates/${country.slug}/${skill.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `${siteUrl}${canonical}`,
    },
  };
}

export default async function CountrySkillRatePage({ params }: PageProps) {
  const country = getCountryBySlug(params.slug);
  const skill = rateData.find((entry) => entry.slug === params.skill);

  if (!country || !skill || country.code === 'PK') notFound();

  const benchmarks = await getSkillBenchmarks(skill.slug, country.code);
  const hasBenchmarks = benchmarks.length > 0;
  const rows = hasBenchmarks
    ? benchmarks
    : (['junior', 'mid', 'senior'] as const).flatMap((experience) => {
        const base = skill[experience];
        const usdToLocal = fallbackUsdExchangeRates[country.currency];
        const localLow = Math.round(base.usd.low * country.localClientUsdMultiplier * usdToLocal);
        const localHigh = Math.round(base.usd.high * country.localClientUsdMultiplier * usdToLocal);

        return [
          {
            skill_slug: skill.slug,
            skill_name: skill.skill,
            category: skill.category,
            city: 'remote',
            country_code: country.code,
            currency_code: country.currency,
            experience,
            client_type: 'local' as const,
            pkr_low: localLow,
            pkr_mid: Math.round((localLow + localHigh) / 2),
            pkr_high: localHigh,
            usd_low: Math.round(localLow / usdToLocal),
            usd_mid: Math.round((localLow + localHigh) / (usdToLocal * 2)),
            usd_high: Math.round(localHigh / usdToLocal),
            source_count: 1,
            confidence_score: 45,
            last_updated: new Date(Date.UTC(2026, 4, 1)).toISOString(),
            source_notes: `Limited ${country.name} sample coverage. Treat this as a directional Global Lite estimate until verified rows are imported.`,
          },
        ];
      });

  const relatedCountries = globalLiteCountries.filter((entry) => entry.code !== country.code);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${skill.skill} Freelance Rates in ${country.name}`,
    url: absoluteUrl(`/rates/${country.slug}/${skill.slug}`),
    description: `Global Lite benchmark page for ${skill.skill} freelance rates in ${country.name}.`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: absoluteUrl('/'),
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <Reveal className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B8B9E] mb-3">
          Global Lite benchmark
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {skill.skill} freelance rates in {country.name}
        </h1>
        <p className="max-w-3xl text-[#A7A7B7] leading-relaxed">
          Compare {skill.skill.toLowerCase()} freelance pricing in {country.name}. This page is
          for rate benchmarking only; tax guidance is not available for {country.name} yet.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <Reveal>
            <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-[rgba(255,255,255,0.06)]">
                <div>
                  <h2 className="text-xl font-semibold text-[#00F5C4]">Remote country benchmarks</h2>
                  <p className="text-sm text-[#8B8B9E] mt-1">
                    {hasBenchmarks ? 'Verified Supabase rows where available.' : 'Directional estimate only — verified rows pending.'}
                  </p>
                </div>
                <Link
                  href={`/calculator?skill=${skill.slug}`}
                  className="btn-teal inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                >
                  <Calculator size={16} />
                  Calculate exact rate
                </Link>
              </div>

              {/* Prominent missing-benchmark warning */}
              {!hasBenchmarks && (
                <div className="mx-5 mt-5 rounded-xl border border-[rgba(245,166,35,0.4)] bg-[rgba(245,166,35,0.08)] p-4">
                  <div className="flex items-start gap-3">
                    <Database size={18} className="text-[#F5A623] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white text-sm">
                        Limited Global Lite estimate. Verified country benchmark pending.
                      </p>
                      <p className="mt-1 text-xs text-[#A7A7B7] leading-relaxed">
                        No verified {country.name} rows exist in the benchmark database yet. The figures below are directional estimates derived from global USD skill ranges converted to {country.currency} using fallback exchange rates. Do not use for billing without validation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0A0A0F] text-[#8B8B9E]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Experience</th>
                      <th className="px-5 py-3 font-semibold">Client</th>
                      <th className="px-5 py-3 font-semibold">{country.currency}/hr</th>
                      <th className="px-5 py-3 font-semibold">USD/hr</th>
                      <th className="px-5 py-3 font-semibold">Trust</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={`${row.experience}-${row.client_type}`} className="border-t border-[rgba(255,255,255,0.06)] transition-colors hover:bg-[rgba(0,245,196,0.04)]">
                        <td className="px-5 py-4 capitalize text-white">{row.experience}</td>
                        <td className="px-5 py-4 capitalize text-[#E2E2E2]">{row.client_type}</td>
                        <td className="px-5 py-4 font-mono text-[#F5A623]">
                          {formatCurrency(row.pkr_low, country.currency)} - {formatCurrency(row.pkr_high, country.currency)}
                        </td>
                        <td className="px-5 py-4 font-mono text-[#F5A623]">
                          {formatCurrency(row.usd_low, 'USD')} - {formatCurrency(row.usd_high, 'USD')}
                        </td>
                        <td className="px-5 py-4 text-[#8B8B9E]">
                          <span className="inline-flex items-center gap-2">
                            <ShieldCheck size={14} className="text-[#00F5C4]" />
                            {confidenceLabel(row.confidence_score)} - {row.source_count} source
                            {row.source_count === 1 ? '' : 's'}
                          </span>
                          <span className="block mt-1 text-xs">
                            Updated {new Date(row.last_updated).toLocaleDateString(country.locale)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl border border-[rgba(245,166,35,0.18)] bg-[rgba(245,166,35,0.06)] p-6">
              <div className="flex items-start gap-3">
                <Database size={20} className="text-[#F5A623] mt-0.5" />
                <div>
                  <h2 className="font-semibold text-white">Global Lite data note</h2>
                  <p className="mt-2 text-sm text-[#A7A7B7] leading-relaxed">
                    {country.name} is currently rate-only. RateKaro PK does not provide {country.name}
                    tax advice, filing guidance, or compliance recommendations yet.
                  </p>
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <aside className="space-y-6">
          <Reveal delay={0.05}>
            <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] mb-4">
                Compare this skill
              </h2>
              <Stagger className="flex flex-col gap-3">
                {relatedCountries.map((related) => (
                  <StaggerItem key={related.code}>
                    <Link
                      href={related.code === 'PK' ? `/rates/${skill.slug}` : `/rates/${related.slug}/${skill.slug}`}
                      className="interactive-surface inline-flex w-full items-center justify-between gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
                    >
                      {skill.skill} {related.name}
                      <ArrowRight size={14} />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
