import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Calculator, CheckSquare, ExternalLink, HelpCircle, Landmark, ShieldAlert } from 'lucide-react';
import { absoluteUrl, siteName } from '@/lib/seoConfig';

type PageProps = {
  params: {
    slug: string;
  };
};

type GuideContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lastUpdated: string;
  readTime: string;
  category: string;
  intro: string;
  sections: {
    h2: string;
    body: string;
    subsections?: { h3: string; body: string }[];
  }[];
  faqs: { q: string; a: string }[];
  disclaimer: string;
};

const guidesData: Record<string, GuideContent> = {
  'freelancer-tax-pakistan': {
    slug: 'freelancer-tax-pakistan',
    title: 'Freelancer Tax in Pakistan: Complete Guide for 2026',
    metaTitle: 'Freelancer Tax in Pakistan: Complete Guide for 2026',
    metaDescription: 'Complete guide to freelancer income tax in Pakistan. Learn about tax rates, FBR filing, local vs foreign income tax, and FBR taxation slabs.',
    keywords: ['freelancer tax Pakistan 2026', 'freelance income tax slabs', 'FBR tax for freelancers', 'Pakistan freelancer tax calculator'],
    lastUpdated: 'May 2026',
    readTime: '6 min read',
    category: 'Taxation',
    intro: 'Navigating the tax landscape as a freelancer in Pakistan can be overwhelming. With constant policy changes and differing rates for local vs. foreign income, understanding your compliance duties is crucial. This comprehensive guide breaks down FBR regulations, tax slabs, and essential steps to legally minimize your tax liability in 2026.',
    sections: [
      {
        h2: 'Understanding Freelancer Income Tax in Pakistan',
        body: 'Under the Federal Board of Revenue (FBR) regulations, freelancer income in Pakistan is broadly categorized into two types: Foreign Source Income (proceeds brought into the country via official banking channels for services exported abroad) and Local Source Income (PKR earned from clients situated within Pakistan). Your filing status, registration credentials, and remittance purpose codes determine your tax rate.',
      },
      {
        h2: 'Tax Rates: Local vs Foreign Income proceeds',
        body: 'The taxation framework differs vastly based on the origin of your clients. It is highly beneficial for freelancers to structure their clients and receive remittances properly to utilize FBR incentives.',
        subsections: [
          {
            h3: 'Foreign Client Remittances (Concessionary Regime)',
            body: 'If you receive foreign currency remittances for IT or IT-enabled services (ITES) through banking channels, you qualify for a reduced taxation bracket under Section 154A. Freelancers registered with the Pakistan Software Export Board (PSEB) enjoy a flat 0.25% final withholding tax rate on export receipts. Unregistered freelancers are taxed at 1% of the total remittance value.',
          },
          {
            h3: 'Local Pakistani Clients (Progressive Business/Salary Slabs)',
            body: 'Any income received in PKR from clients in Pakistan does not qualify for Section 154A concessionary tax. Instead, this local income is treated as normal business income (or salary, if under a direct employment contract) and is subject to progressive FBR tax slabs starting from 2.5% to 35% depending on your annual income bracket (exceeding the PKR 600,000 threshold).',
          },
        ],
      },
      {
        h2: 'Common Freelancer Tax Filing Mistakes to Avoid',
        body: 'Many Pakistani freelancers make costly errors due to misinformation, which can lead to audit notices or FBR penalties. Ensure you avoid these common pitfalls:',
        subsections: [
          {
            h3: '1. Mistaking Withholding Tax as the Final File',
            body: 'A very common myth is that because the bank already deducted 0.25% or 1% withholding tax, there is no need to file a tax return. This is incorrect. You must file an annual tax return declaring your income and claiming the deducted amount as tax paid.',
          },
          {
            h3: '2. Declaring Foreign Remittance under the Wrong Purpose Code',
            body: 'When foreign income is credited, banks assign a purpose code. For IT exports, you must request your bank to use the correct purpose code (e.g. 9186 for software development or 9188 for IT-enabled services) to qualify for Section 154A benefits. Using general family maintenance codes will result in normal taxation.',
          },
          {
            h3: '3. Failing to Register with PSEB',
            body: 'Registration with the Pakistan Software Export Board (PSEB) is mandatory to enjoy the ultra-low 0.25% tax rate. Without active PSEB registration, your bank is legally required to deduct 1% withholding tax on all foreign incoming funds.',
          },
        ],
      },
      {
        h2: 'How to Estimate and File Your Tax',
        body: 'Filing taxes requires diligent record-keeping of all bank statements, invoices, and withholding slips. You can use the public RateKaro PK Tax Calculator to model your income, compare FBR slabs, and save estimates for your tax preparer.',
      },
    ],
    faqs: [
      {
        q: 'Are freelancers tax-exempt in Pakistan?',
        a: 'Freelancers are not completely tax-exempt. However, IT export proceeds registered with PSEB are taxed at an ultra-low final rate of 0.25% under Section 154A until 2026. Local PKR income from Pakistani clients is taxed under standard progressive business/salary tax slabs.',
      },
      {
        q: 'What is the difference between tax rates on local and foreign income?',
        a: 'Foreign income proceeds from IT services or IT-enabled services attract a flat 0.25% or 1% withholding tax under Section 154A (if registered). Local income is treated as normal business/salary income and is subject to progressive income tax slabs ranging from 2.5% to 35%.',
      },
      {
        q: 'What happens if I do not register with PSEB?',
        a: 'If you receive foreign remittance but are not registered with PSEB, the withholding tax rate on your export proceeds increases from 0.25% to 1%. Furthermore, you lose access to various PSEB benefits, such as subsidized workspaces and international marketing support.',
      },
      {
        q: 'Do I need to file a tax return if my tax is already withheld by the bank?',
        a: 'Yes. Withholding tax is not a substitute for filing a tax return. All tax residents of Pakistan with taxable income above PKR 600,000 must file their annual tax return using the FBR Iris portal, declaring both their local and foreign source incomes and claiming taxes withheld.',
      },
      {
        q: 'Is there a penalty for late filing for freelancers?',
        a: 'Yes. Late filing of income tax returns can lead to financial penalties, delay in active taxpayer listing (ATL), and higher default withholding tax rates as a non-filer on banking transactions and asset purchases.',
      },
    ],
    disclaimer: 'This is educational information, not tax advice. Please consult an active, FBR-licensed tax consultant or active legal counsel before taking action on FBR matters.',
  },
  'pseb-registration-freelancers': {
    slug: 'pseb-registration-freelancers',
    title: 'PSEB Registration for Freelancers in Pakistan',
    metaTitle: 'PSEB Registration for Freelancers in Pakistan',
    metaDescription: 'Step-by-step guide to PSEB registration for Pakistani freelancers. Learn who should register, registration benefits, fees, and documents checklist.',
    keywords: ['PSEB registration for freelancers', 'PSEB freelancer certificate', 'how to register with PSEB', 'Pakistan Software Export Board'],
    lastUpdated: 'May 2026',
    readTime: '5 min read',
    category: 'PSEB',
    intro: 'The Pakistan Software Export Board (PSEB) is the official apex government body tasked with facilitating the IT and software export sector in Pakistan. If you are an individual freelancer exporting IT services or IT-enabled services, registering with PSEB is the single most beneficial step you can take. Here is how you register, why it matters, and a quick step-by-step checklist.',
    sections: [
      {
        h2: 'Why Registering with PSEB is Crucial for Freelancers',
        body: 'Previously, IT exports enjoyed a general tax exemption. Under the current tax structure, FBR imposes a withholding regime. Registered IT freelancers enjoy a highly subsidized withholding tax of just 0.25% on export proceeds. If you are not registered, banks will withhold 1.0% by default. This makes PSEB registration an instant 75% tax-saving mechanism on withholding tax.',
      },
      {
        h2: 'Who is Eligible for PSEB Registration?',
        body: 'Any individual, startup, sole proprietor, or corporate entity engaged in the export of IT products, software development, web application engineering, graphic design, content writing, virtual assistance, search engine optimization (SEO), video editing, or call center services is fully eligible for PSEB registration.',
      },
      {
        h2: 'Core Benefits of PSEB Freelancer Registration',
        body: 'Beyond direct tax savings under FBR Section 154A, registering with PSEB opens doors to several growth opportunities:',
        subsections: [
          {
            h3: '1. Access to 0.25% Flat Tax Rate',
            body: 'Eligible for low concessionary final withholding tax on foreign inbound banking remittances.',
          },
          {
            h3: '2. Subsidized Training & Certifications',
            body: 'Access to government-sponsored high-demand IT certifications, cloud workshops, and professional development programs.',
          },
          {
            h3: '3. International Marketing & Tech Expos',
            body: 'Possibility to join official Pakistani trade delegations to global tech expos and industry events.',
          },
          {
            h3: '4. Software Technology Park Workspace Access',
            body: 'Eligibility to rent state-of-the-art office spaces and co-working facilities in Software Technology Parks across Pakistan at highly subsidized rental rates.',
          },
        ],
      },
      {
        h2: 'Step-by-Step Documents Checklist for Registration',
        body: 'Registering with PSEB is an online process handled on their web portal. Ensure you have the following digitized documents ready before beginning:',
        subsections: [
          {
            h3: '1. Personal Credentials',
            body: 'Valid Computerized National Identity Card (CNIC) front and back, and a professional passport-sized photograph.',
          },
          {
            h3: '2. FBR Registration proof',
            body: 'National Tax Number (NTN) certificate indicating FBR taxpayer registration.',
          },
          {
            h3: '3. Financial validation',
            body: 'A Bank Certificate confirming your active personal or business freelancer account. Also, gather recent foreign remittance statements or platform invoice proofs (such as Upwork/Fiverr invoice logs) showing foreign proceeds.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Who should register with PSEB?',
        a: 'Any freelancer in Pakistan providing IT services, software development, graphic design, content writing, SEO, digital marketing, or other IT-enabled services (ITES) to international clients should register with PSEB.',
      },
      {
        q: 'What are the core benefits of PSEB registration?',
        a: 'The major benefits include: access to a reduced flat withholding tax rate of 0.25% on export remittance under Section 154A, eligibility for subsidized training and certifications, free IP addresses, subsidized workspaces in software technology parks, and official recognition.',
      },
      {
        q: 'What documents do I need to register with PSEB as an individual freelancer?',
        a: 'You need a CNIC, a passport-sized photograph, an active NTN certificate from FBR, a bank certificate confirming your freelancer/business account, and proof of recent freelance export remittances (such as Upwork/Fiverr invoices or bank statements).',
      },
      {
        q: 'How much does PSEB registration cost for freelancers?',
        a: 'The registration fee for individual freelancers is typically low (around PKR 1,000 to PKR 5,000 depending on the current schedule), and it needs to be renewed annually. Check the official PSEB website for updated schedules.',
      },
      {
        q: 'Can a student register with PSEB as a freelancer?',
        a: 'Yes. Any resident individual in Pakistan, including students, who earns foreign exchange through IT/ITES exports can register with PSEB, provided they possess a valid CNIC and an FBR NTN.',
      },
    ],
    disclaimer: 'This is educational information, not tax advice. Please consult an active, FBR-licensed tax consultant or active legal counsel before taking action on FBR matters.',
  },
  'section-154a-freelancer-tax': {
    slug: 'section-154a-freelancer-tax',
    title: 'Section 154A and 0.25% Tax for IT Export Freelancers',
    metaTitle: 'Section 154A and 0.25% Tax for IT Export Freelancers',
    metaDescription: 'Complete breakdown of FBR Section 154A for IT exporters and freelancers in Pakistan. Learn how to qualify for the 0.25% concessionary tax rate.',
    keywords: ['Section 154A income tax ordinance', '0.25 tax rate IT exports', 'freelancer final tax regime', 'FBR section 154a requirements'],
    lastUpdated: 'May 2026',
    readTime: '6 min read',
    category: 'Tax Code',
    intro: 'FBR Section 154A of the Income Tax Ordinance is the premier legal statute governing tax deductions on the export of IT and IT-enabled services in Pakistan. It institutes a Final Tax Regime (FTR) designed to incentivize the inflow of foreign currency. Let’s demystify how this tax code works and how you can ensure your banking partners comply with the 0.25% withholding rate.',
    sections: [
      {
        h2: 'Demystifying Section 154A of the Income Tax Ordinance',
        body: 'Section 154A states that every bank processing incoming foreign exchange proceeds for software export, IT services, and IT-enabled services (ITES) must deduct income tax from the gross transaction value. This deduction acts as a Final Tax for the earned income, meaning freelancers do not have to calculate progressive tax brackets or deduct business expenses on these specific foreign proceeds.',
      },
      {
        h2: 'How to Qualify for the Flat 0.25% Concessionary Tax Rate',
        body: 'By default, the withholding tax rate under Section 154A is 1%. However, the law provides a special concessionary rate of 0.25% for export proceeds if the taxpayer fulfills strict regulatory criteria:',
        subsections: [
          {
            h3: '1. Professional Registration',
            body: 'The individual freelancer or business must be actively registered with the Pakistan Software Export Board (PSEB) or the Pakistan Agricultural Technology Board (PATB) at the time the remittance is processed.',
          },
          {
            h3: '2. FBR Tax Return Filing',
            body: 'You must file your annual Income Tax Return with FBR under the correct category by the statutory deadline each fiscal year.',
          },
          {
            h3: '3. Provincial Sales Tax Compliance',
            body: 'You must file sales tax returns (even if zero-rated or exempt) with your respective provincial revenue authority (such as SRB in Sindh, PRA in Punjab, or BRA in Balochistan) if legally required by provincial laws.',
          },
        ],
      },
      {
        h2: 'Crucial Eligibility Caveats and Compliance Requirements',
        body: 'While 0.25% sounds highly favorable, FBR enforces strict compliance. If any of the conditions are violated, or if you fail to file your returns on time, the tax officer can retroactively revoke your concessionary status, taxing your entire proceeds under progressive business income slabs (up to 35%!). This makes prompt annual filing non-negotiable.',
      },
      {
        h2: 'Role of Banks and PRCs in Remittance Processing',
        body: 'When your export earnings land in Pakistan, your local bank processes the transfer and issues an electronic Payment Realization Certificate (e-PRC). This certificate is your absolute proof of export. Ensure your bank tags the transaction under the correct IT export purpose code (such as software development or software consulting) and provides the PRC. FBR audits will require these certificates to validate your final tax claims.',
      },
    ],
    faqs: [
      {
        q: 'What is Section 154A of the Income Tax Ordinance?',
        a: 'Section 154A governs the tax on export of IT and IT-enabled services. It establishes a final tax regime where tax is withheld by banks at the time of receiving export proceeds.',
      },
      {
        q: 'How do I get the 0.25% tax rate instead of 1%?',
        a: 'To qualify for the 0.25% rate, you must satisfy three conditions: be registered with the Pakistan Software Export Board (PSEB) or Pakistan Agricultural Technology Board (PATB), file your sales tax returns with provincial revenue authorities if required, and file your annual FBR income tax returns.',
      },
      {
        q: 'What falls under IT and ITES exports?',
        a: 'IT services include software development, web development, app engineering, and systems integration. ITES includes web design, graphic design, content writing, SEO, video editing, localizing, transcription, remote customer support, and online data entry.',
      },
      {
        q: 'Do I need a foreign bank account to receive these funds?',
        a: 'No. The export proceeds must be remitted directly into your Pakistani bank account through banking channels. You must request a Payment Realization Certificate (PRC) or e-PRC from your bank for every foreign transfer as proof of service export.',
      },
      {
        q: 'Can I receive remittances via Wise, Payoneer, or Binance?',
        a: 'Remittances received through legitimate fintech channels like Wise or Payoneer that land into your Pakistani bank account are eligible, provided they are declared as IT export proceeds and your bank issues an e-PRC under the correct purpose code.',
      },
    ],
    disclaimer: 'This is educational information, not tax advice. Please consult an active, FBR-licensed tax consultant or active legal counsel before taking action on FBR matters.',
  },
  'fbr-freelancer-filing-checklist': {
    slug: 'fbr-freelancer-filing-checklist',
    title: 'FBR Filing Checklist for Pakistani Freelancers',
    metaTitle: 'FBR Filing Checklist for Pakistani Freelancers',
    metaDescription: 'Get the complete FBR filing checklist for Pakistani freelancers. Prepare your NTN, collect PRCs, bank statements, and file taxes with confidence.',
    keywords: ['FBR freelancer filing checklist', 'FBR Iris portal freelancer', 'NTN registration Pakistan', 'how to file tax return freelancer'],
    lastUpdated: 'May 2026',
    readTime: '6 min read',
    category: 'Filing',
    intro: 'Filing your FBR tax return does not have to be a nightmare. As a freelancer, staying organized with your documents is the best way to ensure smooth filing on the Iris portal. Here is our practical step-by-step checklist to gather your paperwork, calculate your income, and execute your FBR tax return filing workflow with confidence.',
    sections: [
      {
        h2: 'The Ultimate Freelancer FBR Tax Filing Checklist',
        body: 'Whether you plan to file your taxes yourself through the Iris portal or hire an FBR-licensed tax consultant, you must systematically gather your documents. A complete checklist protects you in the event of an FBR audit.',
      },
      {
        h2: 'Step 1: Setting Up Your NTN and Iris Account',
        body: 'Your first step is registering for a National Tax Number (NTN) if you do not have one. You can complete this online on the FBR Iris portal by submitting your CNIC, verified mobile number (registered under your name), email address, and home address. This registers you as an active taxpayer.',
      },
      {
        h2: 'Step 2: Gathering Income & Withholding Documentation',
        body: 'This is the most critical step for IT exporters. Collect the following documents covering the fiscal year (July 1 to June 30):',
        subsections: [
          {
            h3: '1. Bank Statements',
            body: 'Detailed, stamped bank account statements for all your bank accounts in Pakistan.',
          },
          {
            h3: '2. Payment Realization Certificates (PRCs)',
            body: 'Physical or digital e-PRCs issued by your bank for every foreign remittance received during the fiscal year. These serve as verified proof of your export proceeds.',
          },
          {
            h3: '3. Withholding Tax Certificates',
            body: 'Certificates showing any taxes deducted by your bank on foreign remittances, or taxes withheld on phone bills, internet bills, vehicle registrations, and utility payments.',
          },
        ],
      },
      {
        h2: 'Step 3: Calculating Expenses and Net Wealth',
        body: 'If you have local PKR income, you must calculate business expenses to offset tax slabs. Deductible items include: co-working spaces/office rent, internet and phone bills, software/SaaS subscriptions, computer/hardware depreciation, and travel costs. Under the Section 154A FTR regime, you will also need to submit your Wealth Statement detailing your local and foreign assets.',
      },
      {
        h2: 'Step 4: Executing the Freelancer Tax Workflow',
        body: 'Utilize RateKaro PK to organize your rates, tax estimates, and earnings. Log into Iris, enter your foreign proceeds under FTR (Section 154A), local business proceeds under standard slabs, declare your withholding credits, reconcile your wealth statement, and submit your return by the annual deadline (typically September 30).',
      },
    ],
    faqs: [
      {
        q: 'What documents do I need before filing my tax return as a freelancer?',
        a: 'You need: your CNIC, FBR NTN login details, bank account statements for the fiscal year (July 1 to June 30), e-PRCs (Payment Realization Certificates) for all foreign proceeds, withholding tax certificates from banks, utility bills, and proof of any deductible expenses/investments.',
      },
      {
        q: 'How do I register for an FBR NTN?',
        a: 'You can register for an NTN online through the FBR Iris portal (https://iris.fbr.gov.pk) by providing your CNIC, mobile number registered under your CNIC, email address, and business details if registering as a sole proprietor.',
      },
      {
        q: 'Can I claim business expenses against my freelance income?',
        a: 'If your income is taxed under standard business slabs (local source income), you can deduct legitimate business expenses such as internet bills, co-working space rent, software subscriptions, and computer depreciation. Under final tax regime (Section 154A), expenses are not deductible against the final withheld tax.',
      },
      {
        q: 'What is a Payment Realization Certificate (PRC) and why is it important?',
        a: 'A PRC (or e-PRC) is an official document issued by your bank confirming that foreign currency was received from abroad and converted into PKR for IT/ITES services. It is the absolute legal proof required to claim the low withholding tax rates.',
      },
      {
        q: 'How does RateKaro PK help in the FBR filing process?',
        a: 'RateKaro PK provides a dedicated Tax Calculator that helps you calculate your tax brackets, net take-home, and effective tax rates based on current FBR rules. You can save your estimates and sync them directly to your dashboard as a handy reference.',
      },
    ],
    disclaimer: 'This is educational information, not tax advice. Please consult an active, FBR-licensed tax consultant or active legal counsel before taking action on FBR matters.',
  },
};

export function generateStaticParams() {
  return [
    { slug: 'freelancer-tax-pakistan' },
    { slug: 'pseb-registration-freelancers' },
    { slug: 'section-154a-freelancer-tax' },
    { slug: 'fbr-freelancer-filing-checklist' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = guidesData[params.slug];
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.metaTitle} | ${siteName}`,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const guide = guidesData[params.slug];
  if (!guide) notFound();

  // Internal Links context
  const siblingGuides = Object.values(guidesData).filter((g) => g.slug !== guide.slug);

  // Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    name: guide.title,
    headline: guide.title,
    description: guide.metaDescription,
    url: absoluteUrl(`/guides/${guide.slug}`),
    datePublished: '2026-05-28T00:00:00.000Z',
    dateModified: '2026-05-28T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: siteName,
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/brand/ratekaro-logo-transparent.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    inLanguage: 'en-PK',
  };

  // Breadcrumb Schema
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
        name: 'Guides',
        item: absoluteUrl(`/guides/${guide.slug}`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: absoluteUrl(`/guides/${guide.slug}`),
      },
    ],
  };

  // FAQ Schema
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <article className="space-y-8">
          {/* Header */}
          <header className="border-b border-[rgba(255,255,255,0.06)] pb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(0,245,196,0.08)] border border-[rgba(0,245,196,0.2)] text-[#00F5C4] mb-4">
              <BookOpen size={12} />
              {guide.category} Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {guide.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B8B9E] font-medium">
              <span>Published: {guide.lastUpdated}</span>
              <span>•</span>
              <span>{guide.readTime}</span>
            </div>
          </header>

          {/* Intro */}
          <p className="text-lg text-[#E2E2E2] leading-relaxed font-medium bg-[#111118] border-l-4 border-[#00F5C4] p-5 rounded-r-xl">
            {guide.intro}
          </p>

          {/* Content sections */}
          <div className="space-y-10 text-[#A7A7B7] leading-relaxed">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight border-b border-[rgba(255,255,255,0.04)] pb-2">
                  {section.h2}
                </h2>
                <p className="text-sm md:text-base">{section.body}</p>

                {section.subsections && (
                  <div className="space-y-6 mt-4 pl-4 border-l border-[rgba(255,255,255,0.06)]">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          {sub.h3}
                        </h3>
                        <p className="text-sm">{sub.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Disclaimer Alert Box */}
          <div className="rounded-xl border border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)] p-5 text-sm text-[#E2E2E2]">
            <div className="flex items-start gap-3">
              <ShieldAlert size={20} className="text-[#F5A623] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-1">Tax Disclaimer</span>
                <p className="text-xs text-[#A7A7B7] leading-relaxed">
                  {guide.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Internal Conversion Callouts */}
          <section className="rounded-2xl border border-[rgba(0,245,196,0.18)] bg-[#111118] p-6 space-y-6">
            <h3 className="text-xl font-bold text-white">Optimize Your Tax Liability Now</h3>
            <p className="text-sm text-[#A7A7B7] leading-relaxed">
              Use our public finance calculators to accurately model your local and foreign freelance rates, and see how registering with PSEB can instantly save you up to 75% on withholding tax deductions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/tax"
                className="btn-teal inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-center"
              >
                <Calculator size={16} />
                Open Tax Calculator
              </Link>
              <Link
                href="/calculator"
                className="btn-outline inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-center border-[rgba(255,255,255,0.1)] hover:border-[#00F5C4] text-white hover:text-[#00F5C4]"
              >
                Freelancer Rate Calculator
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle size={24} className="text-[#00F5C4]" />
              FAQ on Freelancer Tax in Pakistan
            </h2>
            <div className="space-y-6">
              {guide.faqs.map((faq, index) => (
                <div key={index} className="border-b border-[rgba(255,255,255,0.06)] pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-white text-base mb-2 flex items-start gap-2">
                    <span className="text-[#00F5C4] font-mono">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-[#A7A7B7] text-sm leading-relaxed pl-5 whitespace-pre-line">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related Guides */}
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] mb-4">
              More Freelancer Guides
            </h3>
            <div className="flex flex-col gap-3">
              {siblingGuides.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/guides/${sibling.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0F]/50 px-4 py-3 text-sm text-[#E2E2E2] hover:border-[#00F5C4] hover:text-[#00F5C4] transition-all"
                >
                  <span className="font-semibold group-hover:text-[#00F5C4] transition-colors">{sibling.title}</span>
                  <span className="text-xs text-[#8B8B9E]">{sibling.readTime}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Official Resources */}
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] flex items-center gap-2">
              <Landmark size={14} className="text-[#00F5C4]" />
              Official Resources
            </h3>
            <div className="space-y-3">
              <a
                href="https://fbr.gov.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 text-sm text-[#E2E2E2] hover:text-[#00F5C4] transition-colors bg-[#0A0A0F] border border-[rgba(255,255,255,0.04)] px-4 py-3 rounded-xl"
              >
                FBR Pakistan Portal
                <ExternalLink size={12} />
              </a>
              <a
                href="https://pseb.org.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 text-sm text-[#E2E2E2] hover:text-[#00F5C4] transition-colors bg-[#0A0A0F] border border-[rgba(255,255,255,0.04)] px-4 py-3 rounded-xl"
              >
                PSEB Official Site
                <ExternalLink size={12} />
              </a>
            </div>
          </section>

          {/* Quick FBR Checklist summary card */}
          <section className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111118] p-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8B8B9E] flex items-center gap-2">
              <CheckSquare size={14} className="text-[#00F5C4]" />
              FBR Filing Essentials
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A7A7B7]">
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4]">•</span>
                Active NTN & Iris login
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4]">•</span>
                Digital Payment Certificates (e-PRCs)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4]">•</span>
                Active PSEB certification
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4]">•</span>
                Wealth statement reconciliation
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
