import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, HelpCircle, DollarSign, Percent, Globe } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Upwork Rate Calculator Pakistan - Set Competitive Freelance Rates',
  description:
    'Calculate your ideal Upwork hourly rate as a Pakistani freelancer. Account for Upwork service fees, currency conversion, and compare with local market benchmarks.',
  keywords: [
    'Upwork rate calculator Pakistan',
    'Upwork hourly rate Pakistani freelancer',
    'Upwork freelance pricing Pakistan',
    'how much to charge on Upwork Pakistan',
    'Upwork service fee calculator',
  ],
  alternates: {
    canonical: '/upwork-rate-calculator-pakistan',
  },
  openGraph: {
    title: 'Upwork Rate Calculator Pakistan - Set Competitive Freelance Rates',
    description:
      'Calculate competitive Upwork rates for Pakistani freelancers. Account for service fees and currency conversion.',
    url: '/upwork-rate-calculator-pakistan',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How much does Upwork charge in service fees?',
    a: 'Upwork charges a sliding service fee: 20% on the first $500 billed with a client, 10% on billings between $500.01 and $10,000, and 5% on billings exceeding $10,000 with the same client. This fee is deducted from your earnings before payout.',
  },
  {
    q: 'How should Pakistani freelancers account for Upwork fees when setting rates?',
    a: 'Factor in the 20% fee for new clients when setting your rate. If your target take-home is $20/hr, you should charge at least $25/hr to account for the fee. For established clients past $500, the fee drops to 10%, so your effective rate improves over time.',
  },
  {
    q: 'What is a competitive Upwork rate for Pakistani freelancers?',
    a: 'Rates vary significantly by skill and experience. Web developers typically charge $15-$50/hr, graphic designers $10-$35/hr, and content writers $8-$25/hr on Upwork. Use the RateKaro calculator to get benchmarks specific to your skill.',
  },
  {
    q: 'Should I charge the same rate on Upwork as direct clients?',
    a: 'Generally, you should charge slightly higher on Upwork to account for service fees. However, Upwork provides client acquisition, payment protection, and dispute resolution, which has value. Many freelancers charge 10-20% more on Upwork than for direct clients.',
  },
  {
    q: 'How does currency conversion affect my Upwork earnings?',
    a: 'Upwork pays in USD. When withdrawing to a Pakistani bank account, the USD-to-PKR exchange rate applies. Use direct bank transfer for the best rates. The RateKaro calculator shows both USD and PKR ranges to help you plan.',
  },
];

export default function UpworkRateCalculatorPakistanPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Upwork Rate Calculator Pakistan',
        item: absoluteUrl('/upwork-rate-calculator-pakistan'),
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
    name: 'Upwork Rate Calculator Pakistan',
    url: absoluteUrl('/upwork-rate-calculator-pakistan'),
    description:
      'Calculate competitive Upwork hourly rates for Pakistani freelancers with fee adjustments.',
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
          Optimized for Upwork
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Upwork Rate Calculator{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Pakistan
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed mb-8">
          Set competitive hourly rates on Upwork that account for service fees, currency
          conversion, and Pakistani market benchmarks. Know your true take-home before you bid.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/calculator" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <Calculator size={18} />
              Calculate My Rate
            </button>
          </Link>
          <Link href="/proposal-generator-pakistan" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2">
              Generate Proposal
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </Reveal>

      {/* Upwork Fee Breakdown */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Understanding Upwork service fees
          </h2>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem className="rounded-xl border border-[rgba(0,245,196,0.15)] bg-[#0A0A0F]/50 p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] flex items-center justify-center mb-3 text-[#00F5C4] mx-auto">
                <Percent size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#F5A623] mb-1">20%</h3>
              <p className="text-sm text-[#A7A7B7]">
                First $500 billed with each client
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-xl border border-[rgba(0,245,196,0.15)] bg-[#0A0A0F]/50 p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] flex items-center justify-center mb-3 text-[#00F5C4] mx-auto">
                <DollarSign size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#F5A623] mb-1">10%</h3>
              <p className="text-sm text-[#A7A7B7]">
                $500.01 - $10,000 with same client
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-xl border border-[rgba(0,245,196,0.15)] bg-[#0A0A0F]/50 p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] flex items-center justify-center mb-3 text-[#00F5C4] mx-auto">
                <Globe size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#00F5C4] mb-1">5%</h3>
              <p className="text-sm text-[#A7A7B7]">
                Over $10,000 with same client
              </p>
            </StaggerItem>
          </Stagger>
        </section>
      </Reveal>

      {/* Tips for Pakistani Freelancers */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Upwork rate tips for Pakistani freelancers
          </h2>
          <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
            <p>
              <strong className="text-white">Factor in the 20% fee for new clients</strong> - When starting with a new client, Upwork takes 20% of your first $500. Set your rate high enough that your net earnings still meet your target take-home.
            </p>
            <p>
              <strong className="text-white">Build long-term relationships</strong> - The fee drops to 10% after $500 and 5% after $10,000 with the same client. Long-term clients are more profitable due to lower platform fees.
            </p>
            <p>
              <strong className="text-white">Use bank transfer for withdrawal</strong> - Direct bank transfer typically offers the best USD-to-PKR conversion rate compared to other withdrawal methods.
            </p>
            <p>
              <strong className="text-white">Position yourself competitively</strong> - Pakistani freelancers have a significant cost advantage in the global market. Use the RateKaro benchmarks to price competitively while still earning fair rates for the Pakistani market.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Related Tools */}
      <section className="mb-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-white">Related tools and guides</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Link
              href="/freelance-rate-calculator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">General Rate Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                All-platform rate benchmarks for 45+ skills
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
                Generate winning Upwork proposals with AI
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/freelancer-tax-calculator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Tax Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Calculate tax on your Upwork earnings
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
                Most popular skill on Upwork - see Pakistan benchmarks
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
            Upwork Rate FAQ
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
            Set your Upwork rate with confidence
          </h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            Use data-driven benchmarks to price your Upwork services competitively in the Pakistani
            freelance market.
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
