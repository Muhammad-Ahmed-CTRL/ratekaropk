import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Database, ShieldCheck, HelpCircle, RefreshCw, DollarSign, AlertTriangle } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Freelancer Pricing Methodology - How RateKaro PK Calculates Rates',
  description:
    'Learn how RateKaro PK collects, processes, and presents freelancer rate benchmarks for Pakistan. Understand our Supabase data sources, confidence scoring, and methodology.',
  keywords: [
    'RateKaro methodology',
    'freelancer rate methodology',
    'how freelance rates calculated',
    'Pakistan freelance rate data',
    'rate benchmark methodology',
  ],
  alternates: {
    canonical: '/freelancer-pricing-methodology',
  },
  openGraph: {
    title: 'Freelancer Pricing Methodology - How RateKaro PK Calculates Rates',
    description:
      'Transparent methodology behind RateKaro PK rate benchmarks for Pakistani freelancers.',
    url: '/freelancer-pricing-methodology',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Where does RateKaro get its rate data?',
    a: 'Rate data is collected from multiple sources including freelance platform listings, industry surveys, verified community contributions, and aggregated public pricing data. Each data point is stored in Supabase with source attribution and confidence scoring.',
  },
  {
    q: 'How often is the rate data updated?',
    a: 'Rate benchmarks are reviewed and updated periodically. Each rate entry has a "last updated" timestamp visible on the rate page. Data older than 6 months is flagged as potentially stale and prioritized for refresh.',
  },
  {
    q: 'What does the confidence score mean?',
    a: 'The confidence score (High, Medium, or Low) indicates the reliability of the benchmark based on the number of data sources, recency of data, and consistency across sources. High confidence means 3+ recent, consistent sources.',
  },
  {
    q: 'Can I contribute my rate data to RateKaro?',
    a: 'We are working on community contribution features. For now, rate data is curated by the RateKaro team to ensure accuracy and consistency across the platform.',
  },
  {
    q: 'Are these rates financial advice?',
    a: 'No. RateKaro PK provides market-estimated benchmarks for planning and comparison purposes. These are not financial, tax, or legal advice. Your actual rate should factor in your unique portfolio, negotiation position, and business context.',
  },
];

export default function FreelancerPricingMethodologyPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing Methodology',
        item: absoluteUrl('/freelancer-pricing-methodology'),
      },
    ],
  };

  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'Freelancer Pricing Methodology',
    headline: 'How RateKaro PK Calculates Freelancer Rates',
    url: absoluteUrl('/freelancer-pricing-methodology'),
    description:
      'Transparent methodology behind RateKaro PK rate benchmarks for Pakistani freelancers.',
    datePublished: '2026-05-28T00:00:00.000Z',
    dateModified: '2026-05-28T00:00:00.000Z',
    author: { '@type': 'Organization', name: siteName, url: absoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/brand/ratekaro-logo-transparent.png') },
    },
    mainEntityOfPage: absoluteUrl('/freelancer-pricing-methodology'),
    inLanguage: 'en-PK',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <Reveal className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B8B9E] mb-4">
          Transparency and Trust
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Our Pricing{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Methodology
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed">
          RateKaro PK is built on transparent, data-driven principles. Here is exactly how we
          collect, process, and present freelancer rate benchmarks for the Pakistani market.
        </p>
      </Reveal>

      {/* Content Sections */}
      <article className="space-y-8">
        {/* Data Sources */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Database size={24} className="text-[#00F5C4]" />
              How we collect benchmark data
            </h2>
            <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
              <p>
                RateKaro PK stores all rate benchmarks in a structured Supabase database. Each
                benchmark record includes the skill category, experience level (Junior, Mid, Senior),
                client type (Local or Foreign), PKR and USD rate ranges, source count, confidence
                score, and last-updated timestamp.
              </p>
              <p>
                Data is sourced from freelance platform public listings, anonymized community
                surveys, published industry reports on Pakistani IT exports, and direct verification
                with active freelancers. We do not scrape private user data or violate platform
                terms of service.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Local vs Foreign */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Local-client vs foreign-client benchmarks
            </h2>
            <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
              <p>
                We maintain separate rate benchmarks for local Pakistani clients (PKR) and
                foreign/international clients (USD). This distinction is critical because:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  <span>
                    <strong className="text-white">Budget differences:</strong> Foreign clients typically have 2-3x higher budgets due to purchasing power parity differences.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  <span>
                    <strong className="text-white">Payment currency:</strong> Foreign clients pay in USD, which gets converted to PKR at the prevailing exchange rate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  <span>
                    <strong className="text-white">Competition dynamics:</strong> On platforms like Upwork, Pakistani freelancers compete globally, whereas local projects have a different competitive landscape.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  <span>
                    <strong className="text-white">Tax treatment:</strong> Foreign IT export income qualifies for concessionary tax under Section 154A (0.25% with PSEB), while local income is taxed at progressive FBR slabs.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Confidence Score */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck size={24} className="text-[#00F5C4]" />
              Confidence score explained
            </h2>
            <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
              <p>
                Each benchmark carries a confidence score from 0 to 100, displayed as one of three
                labels on rate pages:
              </p>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <StaggerItem className="rounded-xl border border-[rgba(0,245,196,0.2)] bg-[#0A0A0F]/50 p-4 text-center">
                  <h3 className="text-lg font-bold text-[#00F5C4] mb-1">High</h3>
                  <p className="text-xs text-[#8B8B9E]">
                    Score 80-100. Three or more recent, consistent sources. Most reliable.
                  </p>
                </StaggerItem>
                <StaggerItem className="rounded-xl border border-[rgba(245,166,35,0.2)] bg-[#0A0A0F]/50 p-4 text-center">
                  <h3 className="text-lg font-bold text-[#F5A623] mb-1">Medium</h3>
                  <p className="text-xs text-[#8B8B9E]">
                    Score 50-79. Two sources or some inconsistency. Use as a guide.
                  </p>
                </StaggerItem>
                <StaggerItem className="rounded-xl border border-[rgba(255,100,100,0.2)] bg-[#0A0A0F]/50 p-4 text-center">
                  <h3 className="text-lg font-bold text-[#FF6464] mb-1">Low</h3>
                  <p className="text-xs text-[#8B8B9E]">
                    Score below 50. Single source or limited data. Treat with caution.
                  </p>
                </StaggerItem>
              </Stagger>
            </div>
          </section>
        </Reveal>

        {/* Source Count */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Source count meaning
            </h2>
            <p className="text-[#A7A7B7] text-sm leading-relaxed">
              The source count shown on each rate page indicates how many independent data sources
              contributed to that benchmark. Higher source counts generally correlate with higher
              confidence. A source can be a platform listing analysis, an industry report data
              point, a community survey response, or a verified freelancer self-report.
            </p>
          </section>
        </Reveal>

        {/* Stale Data Logic */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <RefreshCw size={24} className="text-[#00F5C4]" />
              Last updated and stale data logic
            </h2>
            <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
              <p>
                Every benchmark record has a <code className="text-[#00F5C4] bg-[#0A0A0F] px-1.5 py-0.5 rounded">last_updated</code> timestamp
                visible on the rate page. This tells you when the data was last reviewed and
                confirmed.
              </p>
              <p>
                If a benchmark has not been updated within 6 months, it is considered potentially
                stale. Rate pages display the update date prominently so you can assess data
                freshness. Skills with pending benchmark verification display a clear notice
                directing you to the general calculator.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Exchange Rate */}
        <Reveal>
          <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign size={24} className="text-[#00F5C4]" />
              USD/PKR exchange rate handling
            </h2>
            <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
              <p>
                The rate calculator checks the current USD/PKR exchange rate to show accurate
                PKR equivalents for USD-denominated rates. When the exchange rate feed is
                available, it uses the current market rate. When unavailable, the calculator
                uses a clearly labeled fallback rate so calculations can still proceed.
              </p>
              <p>
                Exchange rates fluctuate daily. The displayed PKR values should be treated as
                estimates for planning purposes. Actual PKR receipts depend on your bank&apos;s
                conversion rate at the time of withdrawal.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Disclaimer */}
        <Reveal>
          <section className="rounded-xl border border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)] p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-[#F5A623] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Important disclaimer</h2>
                <div className="space-y-3 text-sm text-[#A7A7B7] leading-relaxed">
                  <p>
                    RateKaro PK provides market-estimated benchmarks and calculators for
                    <strong className="text-white"> planning and comparison purposes only</strong>.
                    The rates, tax calculations, and other outputs provided by our tools are
                    estimates based on aggregated market data and should not be construed as
                    financial, tax, or legal advice.
                  </p>
                  <p>
                    Final pricing decisions, tax filing, and compliance obligations remain your
                    responsibility. We strongly recommend consulting with an FBR-licensed tax
                    consultant or qualified professional for matters relating to taxation,
                    financial planning, or legal compliance.
                  </p>
                  <p>
                    Rate benchmarks may not reflect your specific market conditions, client
                    relationships, or unique value proposition. Use them as starting points for
                    your own pricing strategy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </article>

      {/* FAQ */}
      <Reveal className="mt-12">
        <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle size={24} className="text-[#00F5C4]" />
            Methodology FAQ
          </h2>
          <Stagger className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <div className="interactive-surface rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0F]/50 p-4">
                  <h3 className="font-semibold text-white text-base mb-2 flex items-start gap-2">
                    <span className="text-[#00F5C4] font-mono">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-[#A7A7B7] text-sm leading-relaxed pl-5">{faq.a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.3)] bg-gradient-to-br from-[#111118] to-[#0A0A0F] p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,245,196,0.1)]">
          <h2 className="text-3xl font-bold text-white mb-4">
            Try our tools with confidence
          </h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            Now that you understand our methodology, use our data-driven tools to find your
            competitive rate and manage your freelance finances.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/calculator">
              <button className="btn-teal px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-3">
                Rate Calculator <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/tax">
              <button className="btn-outline px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-3">
                Tax Calculator <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
