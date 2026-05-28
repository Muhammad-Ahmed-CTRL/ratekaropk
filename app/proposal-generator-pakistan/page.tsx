import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, HelpCircle, Sparkles, Clock, Shield } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Freelance Proposal Generator Pakistan - AI-Powered Client Proposals',
  description:
    'Generate professional, high-converting freelance proposals for Pakistani freelancers. AI-powered tool that creates client-ready proposals using your hourly rate and project context.',
  keywords: [
    'freelance proposal generator Pakistan',
    'AI proposal writer freelancer',
    'Upwork proposal generator',
    'freelance proposal template Pakistan',
    'client proposal tool',
  ],
  alternates: {
    canonical: '/proposal-generator-pakistan',
  },
  openGraph: {
    title: 'Freelance Proposal Generator Pakistan - AI-Powered Client Proposals',
    description:
      'Generate professional freelance proposals tailored to your rate, skill, and project context.',
    url: '/proposal-generator-pakistan',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How does the AI proposal generator work?',
    a: 'You enter your calculated hourly rate, skill, experience level, client type (local or foreign), and a brief project description. The AI generates a professional, client-ready proposal that you can copy and send directly to your client or paste into platforms like Upwork or Fiverr.',
  },
  {
    q: 'Do I need to sign up to use the proposal generator?',
    a: 'Yes. The proposal generator requires a free RateKaro PK account so we can securely save your proposals and provide a consistent experience. The rate calculator and tax calculator remain free without sign-up.',
  },
  {
    q: 'Can I use these proposals on Upwork or Fiverr?',
    a: 'Absolutely. The generated proposals are designed for professional freelance contexts and can be used on any platform including Upwork, Fiverr, Freelancer.com, or for direct client outreach via email.',
  },
  {
    q: 'Does the AI customize proposals for local vs foreign clients?',
    a: 'Yes. The AI adapts tone, positioning, and rate context based on whether you are pitching to a local Pakistani client or a foreign/international client, ensuring the proposal feels appropriate for your target audience.',
  },
  {
    q: 'Are generated proposals unique?',
    a: 'Each proposal is generated fresh based on your specific inputs. While the AI follows a professional structure, the content is unique to your project description, skill, rate, and experience level.',
  },
];

export default function ProposalGeneratorPakistanPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Proposal Generator Pakistan',
        item: absoluteUrl('/proposal-generator-pakistan'),
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
    name: 'Freelance Proposal Generator Pakistan',
    url: absoluteUrl('/proposal-generator-pakistan'),
    description:
      'AI-powered freelance proposal generator for Pakistani freelancers.',
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
          AI-Powered Tool
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Freelance Proposal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5]">
            Generator
          </span>
        </h1>
        <p className="text-lg text-[#A7A7B7] max-w-2xl mx-auto leading-relaxed mb-8">
          Stop spending hours writing proposals. Let AI craft professional, client-ready proposals
          tailored to your hourly rate, skill, and project context - optimized for Pakistani
          freelancers working with local and international clients.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/proposals" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <FileText size={18} />
              Generate a Proposal
            </button>
          </Link>
          <Link href="/calculator" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2">
              Calculate Rate First
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </Reveal>

      {/* Features */}
      <section className="mb-20">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why use AI for your freelance proposals?
          </h2>
          <p className="text-[#8B8B9E] max-w-xl mx-auto">
            Proposals that convert, generated in seconds instead of hours.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Context-Aware</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              The AI uses your rate, skill, experience, and project description to create
              proposals that speak directly to what the client needs.
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <Clock size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Save Hours</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              Generate polished proposals in seconds. Focus your time on delivering great work
              instead of writing pitches from scratch.
            </p>
          </StaggerItem>
          <StaggerItem className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.15)] bg-[#111118] p-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-4 text-[#00F5C4]">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Platform Ready</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              Output is clean plain text ready to paste into Upwork, Fiverr, email, or any
              freelance platform. No markdown, no formatting issues.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* How to Use */}
      <Reveal>
        <section className="interactive-surface rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How to generate a proposal</h2>
          <div className="space-y-4 text-[#A7A7B7] text-sm leading-relaxed">
            <p>
              <strong className="text-white">1. Calculate your rate</strong> - Use the{' '}
              <Link href="/calculator" className="text-[#00F5C4] hover:underline">
                Rate Calculator
              </Link>{' '}
              to find your competitive hourly rate based on skill, experience, and client type.
            </p>
            <p>
              <strong className="text-white">2. Describe the project</strong> - Enter a brief
              description of the client&apos;s project or the job posting you are applying to.
            </p>
            <p>
              <strong className="text-white">3. Generate</strong> - Click generate and receive a
              professional, ready-to-send proposal in seconds.
            </p>
            <p>
              <strong className="text-white">4. Copy and send</strong> - Review the proposal,
              make any personal adjustments, and send it to your client or paste it into the
              platform.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Related Tools */}
      <section className="mb-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-white">Complete your freelance toolkit</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Link
              href="/freelance-rate-calculator-pakistan"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Rate Calculator</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                Find your competitive hourly rate before generating proposals
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
                Estimate your tax and net take-home pay
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
                Calculate rates accounting for Upwork platform fees
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/freelancer-pricing-methodology"
              className="interactive-surface block rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-5 py-4 text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4]"
            >
              <span className="block text-sm font-semibold">Our Methodology</span>
              <span className="block mt-1 text-xs text-[#8B8B9E]">
                How we collect and process rate benchmark data
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
            Proposal Generator FAQ
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
            Create your first AI proposal
          </h2>
          <p className="text-[#8B8B9E] mb-8 max-w-lg mx-auto">
            Stop spending hours on proposals. Generate professional, client-ready pitches in
            seconds.
          </p>
          <Link href="/proposals">
            <button className="btn-teal px-10 py-4 rounded-full text-lg font-bold inline-flex items-center gap-3">
              Generate Proposal <ArrowRight size={20} />
            </button>
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
