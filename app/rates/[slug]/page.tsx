import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calculator, Database, HelpCircle, ShieldCheck } from 'lucide-react';
import { rateData } from '@/lib/rateData';
import { absoluteUrl, skillLongTailKeywords, skillRatePath, siteName } from '@/lib/seoConfig';
import { confidenceLabel, formatCurrency, getSkillBenchmarks } from '@/lib/seoMarket';

type PageProps = {
  params: {
    slug: string;
  };
};

const experienceOrder = ['junior', 'mid', 'senior'];

export function generateStaticParams() {
  return rateData.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const skill = rateData.find((entry) => entry.slug === params.slug);
  if (!skill) return {};

  const title = `${skill.skill} Hourly Rate in Pakistan`;
  const description = `See ${skill.skill} freelance rate benchmarks in Pakistan for junior, mid, and senior freelancers serving local and foreign clients.`;

  return {
    title,
    description,
    keywords: skillLongTailKeywords(skill.skill),
    alternates: {
      canonical: skillRatePath(skill.slug),
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: skillRatePath(skill.slug),
    },
  };
}

export default async function SkillRatePage({ params }: PageProps) {
  const skill = rateData.find((entry) => entry.slug === params.slug);
  if (!skill) notFound();

  const benchmarks = await getSkillBenchmarks(skill.slug);
  const hasBenchmarks = benchmarks.length > 0;
  const relatedSkills = rateData
    .filter((entry) => entry.category === skill.category && entry.slug !== skill.slug)
    .slice(0, 5);

  // Dynamic FAQ content
  const localPkrLow = formatCurrency(skill.junior.pkr.low, 'PKR');
  const localPkrHigh = formatCurrency(skill.senior.pkr.high, 'PKR');
  const foreignUsdLow = formatCurrency(skill.junior.usd.low, 'USD');
  const foreignUsdHigh = formatCurrency(skill.senior.usd.high, 'USD');

  const faqs = [
    {
      q: `How much should a ${skill.skill} freelancer charge in Pakistan?`,
      a: `Based on our verified rate benchmarks, a freelance ${skill.skill.toLowerCase()} in Pakistan typically charges between ${localPkrLow} and ${localPkrHigh} per hour for local clients, or between ${foreignUsdLow} and ${foreignUsdHigh} per hour for foreign/international clients, depending on their experience level (Junior, Mid, or Senior).`,
    },
    {
      q: `Should ${skill.skill} freelancers charge different rates for foreign clients?`,
      a: `Yes. Freelancers in Pakistan should charge higher rates for foreign clients due to their higher purchasing power, additional transaction and international transfer fees, platform commissions (e.g. Upwork/Fiverr), and currency conversion risks. Typically, international client rates are 2x to 3x higher than local Pakistani rates.`,
    },
    {
      q: `What affects ${skill.skill} freelance rates?`,
      a: `Several key factors influence freelance rates for ${skill.skill.toLowerCase()} in Pakistan:
• Experience level: Senior practitioners charge significantly more.
• Client location: Foreign clients command USD rates, while local Pakistani clients pay in PKR.
• Technical specialization: Specific sub-skills, frameworks, or tools can command premium rates.
• Project complexity and urgency: High-priority or extremely complex tasks dictate higher fees.`,
    },
    {
      q: `Are these ${skill.skill} rates guaranteed?`,
      a: `No, these rates are market benchmarks gathered from historical Supabase records, freelancer platforms, and local industry surveys. They are intended for guidance and estimation purposes. Your actual hourly rate will depend on your specific portfolio strength, negotiation skills, and individual project requirements.`,
    },
  ];

  // Schema: WebPage / WebApplication
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${skill.skill} Hourly Rate in Pakistan`,
    url: absoluteUrl(skillRatePath(skill.slug)),
    description: `Market benchmark page for ${skill.skill} freelance rates in Pakistan.`,
    about: {
      '@type': 'Thing',
      name: `${skill.skill} freelance rates`,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: absoluteUrl('/'),
    },
  };

  // Schema: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${skill.skill} Hourly Rate`,
        item: absoluteUrl(skillRatePath(skill.slug)),
      },
    ],
  };

  // Schema: FAQPage
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a.replace(/\n/g, ' '),
      },
    })),
  };

  // Calculate high-level confidence and counts
  const maxConfidence = hasBenchmarks
    ? Math.max(...benchmarks.map((b) => b.confidence_score))
    : 70;
  const totalSources = hasBenchmarks
    ? benchmarks.reduce((sum, b) => sum + b.source_count, 0)
    : 0;
  const lastUpdatedDate = hasBenchmarks
    ? new Date(Math.max(...benchmarks.map((b) => new Date(b.last_updated).getTime())))
    : new Date();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B8B9E] mb-3">
          {skill.category} rate benchmark
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {skill.skill} hourly rate in Pakistan
        </h1>
        <p className="max-w-3xl text-[#A7A7B7] leading-relaxed">
          Compare junior, mid, and senior {skill.skill.toLowerCase()} freelance rates for Pakistani
          local clients and foreign clients. Use this page as a benchmark, then calculate your own
          rate with city, experience, and client context.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <section className="rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-[rgba(255,255,255,0.06)]">
              <div>
                <h2 className="text-xl font-semibold text-[#00F5C4]">Remote hourly benchmarks</h2>
                <p className="text-sm text-[#8B8B9E] mt-1">
                  Verified Supabase rows where available. Limited rows are clearly labeled.
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

            {hasBenchmarks ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0A0A0F] text-[#8B8B9E]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Experience</th>
                      <th className="px-5 py-3 font-semibold">Client</th>
                      <th className="px-5 py-3 font-semibold">PKR/hr</th>
                      <th className="px-5 py-3 font-semibold">USD/hr</th>
                      <th className="px-5 py-3 font-semibold">Trust</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...benchmarks]
                      .sort((a, b) => {
                        const exp = experienceOrder.indexOf(a.experience) - experienceOrder.indexOf(b.experience);
                        return exp || a.client_type.localeCompare(b.client_type);
                      })
                      .map((row) => (
                        <tr key={`${row.experience}-${row.client_type}`} className="border-t border-[rgba(255,255,255,0.06)]">
                          <td className="px-5 py-4 capitalize text-white">{row.experience}</td>
                          <td className="px-5 py-4 capitalize text-[#E2E2E2]">{row.client_type}</td>
                          <td className="px-5 py-4 font-mono text-[#F5A623]">
                            {formatCurrency(row.pkr_low, 'PKR')} - {formatCurrency(row.pkr_high, 'PKR')}
                          </td>
                          <td className="px-5 py-4 font-mono text-[#F5A623]">
                            {formatCurrency(row.usd_low, 'USD')} - {formatCurrency(row.usd_high, 'USD')}
                          </td>
                          <td className="px-5 py-4 text-[#8B8B9E]">
                            <span className="inline-flex items-center gap-2">
                              <ShieldCheck size={14} className="text-[#00F5C4]" />
                              {confidenceLabel(row.confidence_score)} · {row.source_count} source
                              {row.source_count === 1 ? '' : 's'}
                            </span>
                            <span className="block mt-1 text-xs">
                              Updated {new Date(row.last_updated).toLocaleDateString('en-PK')}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <div className="rounded-xl border border-[rgba(245,166,35,0.35)] bg-[rgba(245,166,35,0.06)] p-5 text-sm text-[#E2E2E2]">
                  <div className="flex items-start gap-3">
                    <Database size={18} className="text-[#F5A623] mt-0.5" />
                    <div>
                      <h2 className="font-semibold text-white">Verified benchmark pending</h2>
                      <p className="mt-1 text-[#A7A7B7]">
                        This skill is in the RateKaro taxonomy, but its fresh Supabase benchmark is
                        still being reviewed. You can use the public{' '}
                        <Link href="/calculator" className="text-[#00F5C4] hover:underline font-semibold">
                          Freelancer Rate Calculator
                        </Link>{' '}
                        to estimate your customized rate in the meantime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Source and Trust Notes Section */}
          {hasBenchmarks && (
            <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#00F5C4]" />
                Source & Trust Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#A7A7B7] border-b border-[rgba(255,255,255,0.06)] pb-6 mb-6">
                <div>
                  <span className="text-[#8B8B9E] block text-xs uppercase tracking-wider mb-1">Confidence Score</span>
                  <span className="text-white font-semibold text-base">{confidenceLabel(maxConfidence)}</span>
                </div>
                <div>
                  <span className="text-[#8B8B9E] block text-xs uppercase tracking-wider mb-1">Total Verified Sources</span>
                  <span className="text-white font-semibold text-base">{totalSources} sources</span>
                </div>
                <div>
                  <span className="text-[#8B8B9E] block text-xs uppercase tracking-wider mb-1">Last Updated</span>
                  <span className="text-white font-semibold text-base">{lastUpdatedDate.toLocaleDateString('en-PK')}</span>
                </div>
              </div>
              {/* Display source notes if they exist */}
              {benchmarks.some((b) => b.source_notes) && (
                <div className="text-xs text-[#8B8B9E] leading-relaxed">
                  <span className="text-white font-semibold block mb-1 text-sm">Source Notes:</span>
                  <p className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 text-[#A7A7B7]">
                    {benchmarks.find((b) => b.source_notes)?.source_notes}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* FAQ Section */}
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle size={24} className="text-[#00F5C4]" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[rgba(255,255,255,0.06)] pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-white text-base mb-2 flex items-start gap-2">
                    <span className="text-[#00F5C4] font-mono">Q.</span>
                    {faq.q}
                  </h3>
                  <div className="text-[#A7A7B7] text-sm leading-relaxed pl-5 whitespace-pre-line">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] mb-4">
              Best for searches like
            </h2>
            <ul className="space-y-3 text-sm text-[#E2E2E2]">
              {skillLongTailKeywords(skill.skill).map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] mb-4">
              Related rate pages
            </h2>
            <div className="flex flex-col gap-3">
              {relatedSkills.map((related) => (
                <Link
                  key={related.slug}
                  href={skillRatePath(related.slug)}
                  className="inline-flex items-center justify-between gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4] transition-colors"
                >
                  {related.skill}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-10 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0F] p-6">
        <h2 className="text-2xl font-semibold text-white mb-3">
          How to set your {skill.skill.toLowerCase()} rate
        </h2>
        <p className="text-[#A7A7B7] leading-relaxed">
          Start with the benchmark range for your experience level, then adjust for portfolio
          strength, niche complexity, turnaround time, client geography, and project risk. For
          international clients, quote in USD and keep PKR as your internal planning number.
        </p>
      </section>
    </div>
  );
}
