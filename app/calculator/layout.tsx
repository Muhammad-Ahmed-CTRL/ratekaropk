import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freelancer Rate Calculator Pakistan',
  description:
    'Calculate hourly freelance rates in Pakistan by skill, experience level, city, and local or foreign client type using market benchmark metadata.',
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'Freelancer Rate Calculator Pakistan',
    description:
      'Estimate Pakistani freelancer rates across development, design, marketing, business, creative, and AI skills.',
    url: '/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
