import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freelance Proposal Generator Pakistan',
  description:
    'Generate client-ready freelance proposals using your calculated hourly rate, project context, skill, and experience level.',
  alternates: {
    canonical: '/proposals',
  },
  openGraph: {
    title: 'Freelance Proposal Generator Pakistan',
    description:
      'Create professional proposals for local and international freelance clients with RateKaro PK.',
    url: '/proposals',
  },
};

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
