import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Receipt, HelpCircle, ShieldCheck, Landmark, Percent } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Freelancer Tax Calculator Pakistan - Estimate FBR Tax and Take-Home Pay',
  description:
    'Estimate your freelancer income tax in Pakistan including PSEB IT export tax, FBR progressive slabs, and net take-home pay for local and foreign income.',
  keywords: [
    'freelancer tax calculator Pakistan',
    'Pakistan freelance tax estimate',
    'FBR tax calculator freelancers',
    'PSEB tax calculator',
    'freelancer take-home pay Pakistan',
  ],
  alternates: {
    canonical: '/freelancer-tax-calculator-pakistan',
  },
  openGraph: {
    title: 'Freelancer Tax Calculator Pakistan - Estimate FBR Tax and Take-Home Pay',
    description:
      'Estimate your freelancer income tax in Pakistan. Calculate PSEB IT export tax, FBR slabs, and net take-home pay.',
    url: '/freelancer-tax-calculator-pakistan',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'What tax rate do PSEB-registered freelancers pay in Pakistan?',
    a: 'PSEB-registered freelancers who export IT or IT-enabled services through banking channels pay a flat 0.25% final withholding tax on foreign remittances under Section 154A of the Income Tax Ordinance.',
  },
  {
    q: 'How is local freelance income taxed in Pakistan?',
    a: 'Local PKR income from Pakistani clients does not qualify for the Section 154A concessionary rate. It is taxed under FBR progressive business/salary slabs ranging from 2.5% to 35% depending on your annual income bracket.',
  },
  {
    q: 'Do I still need to file a tax return if tax is withheld by my bank?',
    a: 'Yes. Withholding tax is not a substitute for filing your annual tax return. You must file through the FBR Iris portal declaring all income sources and claiming withheld amounts as tax credits.',
  },
  {
    q: 'What is the difference between PSEB and non-PSEB tax rates?',
    a: 'With active PSEB registration, the withholding tax on IT export proceeds is 0.25%. Without PSEB registration, the default rate is 1% on foreign remittances. This makes PSEB registration an instant 75% saving on withholding tax.',
  },
  {
    q: 'Can I use the tax calculator for both local and foreign income?',
    a: 'Yes. The RateKaro tax calculator models both income types, showing how PSEB registration, client type, and income brackets affect your effective tax rate and net take-home pay.',
  },
];

export default function FreelancerTaxCalculatorPakistanPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Freelancer Tax Calculator Pakistan',
        item: absoluteUrl('/freelancer-tax-calculator-pakistan'),
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
    name: 'Freelancer Tax Calculator Pakistan',
    url: absoluteUrl('/freelancer-tax-calculator-pakistan'),
    description:
      'Estimate freelancer income tax in Pakistan with PSEB and FBR slab calculations.',
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
          Free Tax Estimation Tool
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Freelancer Tax Calculator{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Pakistan
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed mb-8">
          Navigate FBR tax slabs, PSEB IT export exemptions, and progressive income brackets.
          Estimate your monthly and annual take-home pay as a Pakistani freelancer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tax" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <Receipt size={18} />
              Open Tax Calculator
            </button>
          </Link>
          <Link href="/guides/freelancer-tax-pakistan" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2">
              Read Tax Guide
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </Reveal>

      {/* Key Tax Facts */}
      <section className="mb-20">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Key tax facts for Pakistani freelancers
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4] mx-auto">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#00F5C4] mb-1">0.25%</h3>
            <p className="text-sm text-[#A7A7B7]">
              Flat final tax rate on IT export proceeds with PSEB registration
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4] mx-auto">
              <Percent size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#00F5C4] mb-1">1%</h3>
            <p className="text-sm text-[#A7A7B7]">
              Default withholding rate without PSEB registration on foreign income
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4] mx-auto">
              <Landmark size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#00F5C4] mb-1">2.5%-35%</h3>
            <p className="text-sm text-[#A7A7B7]">
              Progressive FBR tax slabs for local PKR freelance income
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* What the calculator covers */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">What the tax calculator covers</h2>
          <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
            <p>
              <strong className="text-white">Foreign income (Section 154A)</strong> - Model the impact of PSEB registration on your IT/ITES export proceeds. Compare the 0.25% concessionary rate versus the 1% default rate.
            </p>
            <p>
              <strong className="text-white">Local income (progressive slabs)</strong> - Enter your PKR income from Pakistani clients and see which FBR tax bracket applies, from the tax-free threshold up to the highest slab.
            </p>
            <p>
              <strong className="text-white">Net take-home calculation</strong> - See your effective tax rate and actual take-home pay per month and per year after all applicable deductions.
            </p>
            <p>
              <strong className="text-white">PSEB vs non-PSEB comparison</strong> - Toggle PSEB registration on and off to see exactly how much you save by registering with the Pakistan Software Export Board.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Related Resources */}
      <section className="mb-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-white">Related tax guides and tools</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Link
              href="/guides/freelancer-tax-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Freelancer Tax Guide 2026</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Complete guide to FBR tax for Pakistani freelancers
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/pseb-tax-calculator"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">PSEB Tax Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Focused on PSEB IT export withholding tax
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/guides/section-154a-freelancer-tax"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Section 154A Explained</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                How the 0.25% concessionary tax rate works
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/guides/fbr-freelancer-filing-checklist"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">FBR Filing Checklist</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Step-by-step document preparation for filing
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Estimate your freelancer tax now
          </h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            Free, instant, and built specifically for the Pakistani freelance tax landscape.
          </p>
          <Link href="/tax">
            <button className="btn-teal px-10 py-4 rounded-full text-lg font-bold inline-flex items-center gap-3">
              Open Tax Calculator <ArrowRight size={20} />
            </button>
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
