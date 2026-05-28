import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Proposal Generator - RateKaro PK',
  description:
    'Generate client-ready freelance proposals using your calculated hourly rate, project context, skill, and experience level.',
  alternates: {
    canonical: '/proposals',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'AI Proposal Generator - RateKaro PK',
    description:
      'Create professional proposals for local and international freelance clients with RateKaro PK.',
    url: '/proposals',
  },
};

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
