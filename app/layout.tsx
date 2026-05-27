import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { DevServiceWorkerReset } from '@/components/DevServiceWorkerReset';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ratekaro.pk'),
  title: 'RateKaro PK - Pakistan\'s Freelancer Rate Intelligence',
  description: 'Pakistan\'s first freelancer rate intelligence tool. Get market rates, tax calculations, and AI proposals tailored for Pakistani freelancers.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'RateKaro PK - Pakistan\'s Freelancer Rate Intelligence',
    description: 'Pakistan\'s first freelancer rate intelligence tool. Get market rates, tax calculations, and AI proposals tailored for Pakistani freelancers.',
    url: 'https://ratekaro.pk',
    siteName: 'RateKaro PK',
    images: [
      {
        url: '/brand/ratekaro-logo-black.png',
        width: 1448,
        height: 1086,
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-primary text-white antialiased selection:bg-teal-glow selection:text-teal">
        <JsonLd />
        <DevServiceWorkerReset />
        <ToastProvider />
        <Navbar />
        <main className="min-h-screen pt-14 md:pt-16 pb-20 md:pb-0 relative flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
