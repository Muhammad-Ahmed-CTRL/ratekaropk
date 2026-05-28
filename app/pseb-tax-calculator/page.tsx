import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Receipt, HelpCircle, ShieldCheck, BookOpen } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'PSEB Tax Calculator - IT Export Withholding Tax for Pakistani Freelancers',
  description:
    'Calculate PSEB IT export withholding tax for Pakistani freelancers. Compare 0.25% PSEB-registered vs 1% non-registered rates on foreign remittances under Section 154A.',
  keywords: [
    'PSEB tax calculator',
    'PSEB withholding tax',
    'Section 154A tax calculator',
    'IT export tax Pakistan',
    'PSEB freelancer tax rate',
  ],
  alternates: {
    canonical: '/pseb-tax-calculator',
  },
  openGraph: {
    title: 'PSEB Tax Calculator - IT Export Withholding Tax for Pakistani Freelancers',
    description:
      'Compare 0.25% PSEB vs 1% non-registered withholding tax on IT export remittances.',
    url: '/pseb-tax-calculator',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'What is PSEB and why does it matter for tax?',
    a: 'The Pakistan Software Export Board (PSEB) is the government body facilitating IT exports. Freelancers registered with PSEB qualify for a reduced 0.25% final withholding tax rate on IT export proceeds under Section 154A, compared to the 1% default for unregistered exporters.',
  },
  {
    q: 'How much can I save with PSEB registration?',
    a: 'PSEB registration reduces your withholding tax from 1% to 0.25% on foreign IT export proceeds - a 75% reduction. For a freelancer earning $2,000/month, this means saving approximately $15/month or $180/year in withholding tax alone.',
  },
  {
    q: 'Does PSEB registration affect my local PKR income tax?',
    a: 'No. PSEB registration specifically impacts the withholding tax on foreign currency remittances received through banking channels for IT/ITES services. Local PKR income from Pakistani clients is still taxed under standard FBR progressive slabs.',
  },
  {
    q: 'What services qualify for the PSEB concessionary tax rate?',
    a: 'Qualifying services include software development, web development, mobile app development, graphic design, SEO, content writing, video editing, virtual assistance, data entry, call center services, and other IT-enabled services (ITES).',
  },
  {
    q: 'How do I register with PSEB?',
    a: 'Registration is done online through the PSEB portal. You need a valid CNIC, NTN certificate from FBR, a bank certificate confirming your freelancer account, and proof of foreign remittances (such as Upwork/Fiverr invoices or bank statements).',
  },
];

export default function PSEBTaxCalculatorPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'PSEB Tax Calculator',
        item: absoluteUrl('/pseb-tax-calculator'),
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
    name: 'PSEB Tax Calculator',
    url: absoluteUrl('/pseb-tax-calculator'),
    description:
      'Calculate PSEB IT export withholding tax and compare registered vs unregistered rates.',
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
          PSEB IT Export Tax
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          PSEB Tax{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Calculator
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed mb-8">
          See exactly how PSEB registration affects your withholding tax on IT export proceeds.
          Compare the 0.25% concessionary rate against the 1% default and calculate your actual
          savings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tax" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <Receipt size={18} />
              Open Tax Calculator
            </button>
          </Link>
          <Link href="/guides/pseb-registration-freelancers" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2">
              <BookOpen size={18} />
              PSEB Registration Guide
            </button>
          </Link>
        </div>
      </Reveal>

      {/* PSEB vs Non-PSEB Comparison */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#00F5C4]" />
            PSEB Registered vs Non-Registered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[rgba(0,245,196,0.25)] bg-[rgba(0,245,196,0.04)] p-5">
              <h3 className="text-lg font-bold text-[#00F5C4] mb-3">With PSEB Registration</h3>
              <ul className="space-y-2 text-sm text-[#A7A7B7]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  0.25% flat final withholding tax
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  Final Tax Regime (no further tax computation needed)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  Access to PSEB training and subsidized workspaces
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00F5C4] mt-0.5">-</span>
                  Official government recognition as IT exporter
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)] p-5">
              <h3 className="text-lg font-bold text-[#F5A623] mb-3">Without PSEB Registration</h3>
              <ul className="space-y-2 text-sm text-[#A7A7B7]">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A623] mt-0.5">-</span>
                  1% default withholding tax
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A623] mt-0.5">-</span>
                  4x higher withholding than PSEB rate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A623] mt-0.5">-</span>
                  No access to PSEB benefits and programs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A623] mt-0.5">-</span>
                  Still required to file annual FBR return
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Related Resources */}
      <section className="mb-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-white">Related PSEB and tax resources</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Link
              href="/guides/pseb-registration-freelancers"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">PSEB Registration Guide</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Step-by-step process and document checklist
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
                Deep dive into the IT export final tax regime
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/freelancer-tax-calculator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Full Tax Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Includes both local and foreign income calculations
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/calculator"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Rate Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Find your competitive hourly rate before calculating tax
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
            PSEB Tax FAQ
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
            Calculate your PSEB tax savings
          </h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            See exactly how much you save with PSEB registration on your IT export income.
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
