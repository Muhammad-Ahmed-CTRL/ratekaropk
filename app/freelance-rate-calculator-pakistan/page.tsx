import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, HelpCircle, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator Pakistan - Find Your Ideal Hourly Rate',
  description:
    'Calculate competitive freelance hourly rates in Pakistan for 45+ skills. Compare local and foreign-client benchmarks by experience level, city, and niche.',
  keywords: [
    'freelance rate calculator Pakistan',
    'freelancer hourly rate Pakistan',
    'how much to charge freelancing Pakistan',
    'Pakistan freelance pricing tool',
  ],
  alternates: {
    canonical: '/freelance-rate-calculator-pakistan',
  },
  openGraph: {
    title: 'Freelance Rate Calculator Pakistan - Find Your Ideal Hourly Rate',
    description:
      'Calculate competitive freelance hourly rates in Pakistan for 45+ skills. Compare local and foreign-client benchmarks.',
    url: '/freelance-rate-calculator-pakistan',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How does the RateKaro freelance rate calculator work?',
    a: 'You select your skill, experience level (Junior, Mid, or Senior), city, and client type (Local or Foreign). The calculator uses Supabase benchmark data collected from freelance platforms and industry surveys to output a competitive PKR and USD hourly range.',
  },
  {
    q: 'Is the rate calculator free to use?',
    a: 'Yes. The RateKaro rate calculator is completely free for all Pakistani freelancers. No sign-up is required to calculate your rate.',
  },
  {
    q: 'What skills does the calculator cover?',
    a: 'The calculator currently covers 45+ skills across development, design, marketing, business services, creative, and AI/emerging technology categories.',
  },
  {
    q: 'Should I charge local and foreign clients the same rate?',
    a: 'Typically no. Foreign clients have higher budgets, pay in USD, and expect international-grade deliverables. Pakistani freelancers often charge 2x-3x more for foreign clients compared to local Pakistani clients.',
  },
  {
    q: 'Are these rates guaranteed or just estimates?',
    a: 'These are market-estimated benchmarks based on aggregated data. Your actual rate depends on your portfolio, negotiation, niche complexity, and project scope. They are starting points, not guarantees.',
  },
];

export default function FreelanceRateCalculatorPakistanPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Freelance Rate Calculator Pakistan',
        item: absoluteUrl('/freelance-rate-calculator-pakistan'),
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

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Freelance Rate Calculator Pakistan',
    url: absoluteUrl('/freelance-rate-calculator-pakistan'),
    description:
      'Calculate competitive freelance hourly rates in Pakistan for 45+ skills.',
    isPartOf: { '@type': 'WebSite', name: siteName, url: absoluteUrl('/') },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/* Hero */}
      <Reveal className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B8B9E] mb-4">
          Free Tool for Pakistani Freelancers
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Freelance Rate Calculator{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Pakistan
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed mb-8">
          Stop guessing what to charge. Use market benchmark data across 45+ skills to find your
          competitive hourly rate - whether you serve local Pakistani clients or international
          clients on Upwork, Fiverr, or direct contracts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/calculator" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <Calculator size={18} />
              Open Rate Calculator
            </button>
          </Link>
          <Link href="/freelancer-pricing-methodology" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2">
              Our Methodology
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </Reveal>

      {/* Features */}
      <section className="mb-20">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            What makes this calculator different
          </h2>
          <p className="text-[#8B8B9E] max-w-xl mx-auto">
            Built for Pakistan&apos;s unique freelance ecosystem, not a generic global tool.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Local vs Foreign Benchmarks</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              Separate rate ranges for PKR local clients and USD foreign clients, reflecting actual
              market differences in Pakistan.
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Experience-Based Tiers</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              Junior, Mid, and Senior tiers so you can benchmark yourself accurately regardless of
              where you are in your career.
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">45+ Skills Covered</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              From web development and graphic design to AI prompt engineering and virtual assistance
              - comprehensive coverage of the Pakistani freelance market.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* How It Works */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How to calculate your freelance rate</h2>
          <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
            <p>
              <strong className="text-white">1. Select your skill</strong> - Choose from 45+ categories including Web Development, Graphic Design, SEO, Video Editing, Content Writing, and more.
            </p>
            <p>
              <strong className="text-white">2. Pick your experience level</strong> - Junior (0-2 years), Mid (2-5 years), or Senior (5+ years) to get rates that match your career stage.
            </p>
            <p>
              <strong className="text-white">3. Choose your client type</strong> - Local Pakistani clients (PKR rates) or Foreign/International clients (USD rates) to see appropriate benchmarks.
            </p>
            <p>
              <strong className="text-white">4. Review your range</strong> - Get a low-to-high hourly rate range with confidence scores and source data. Adjust based on your portfolio, niche, and negotiation position.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Related Tools */}
      <section className="mb-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-white">Related tools and resources</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Link
              href="/tax"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Tax Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Estimate PSEB/FBR freelancer tax and take-home pay
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/proposal-generator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">AI Proposal Generator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Create professional client proposals using your calculated rate
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/upwork-rate-calculator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Upwork Rate Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Optimized for Upwork platform fees and international pricing
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/rates/web-dev"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Web Dev Rate Benchmarks</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Detailed hourly rate data for web developers in Pakistan
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* FAQ */}
      <Reveal>
        <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle size={24} className="text-[#00F5C4]" />
            Frequently Asked Questions
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your rate?</h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            Join thousands of Pakistani freelancers who use data-driven benchmarks to price their
            services competitively.
          </p>
          <Link href="/calculator">
            <button className="btn-teal px-10 py-4 rounded-full text-lg font-bold inline-flex items-center gap-3">
              Calculate My Rate <ArrowRight size={20} />
            </button>
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
