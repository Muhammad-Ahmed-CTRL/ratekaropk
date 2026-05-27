import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pakistan Freelancer Tax Calculator',
  description:
    'Estimate monthly and annual freelancer tax in Pakistan, including PSEB registered IT export tax treatment and net take-home income.',
  alternates: {
    canonical: '/tax',
  },
  openGraph: {
    title: 'Pakistan Freelancer Tax Calculator',
    description:
      'Estimate Pakistani freelancer tax, PSEB status impact, net income, and annual projections.',
    url: '/tax',
  },
};

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
