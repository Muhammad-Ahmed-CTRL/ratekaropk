import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import { JsonLd } from '@/components/seo/JsonLd';
import { DevServiceWorkerReset } from '@/components/DevServiceWorkerReset';
import { defaultOgImage, primaryKeywords, seoDescription, siteName, siteUrl } from '@/lib/seoConfig';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: 'RateKaro PK - Freelancer Rate Calculator for Pakistan',
    template: `%s | ${siteName}`,
  },
  description: seoDescription,
  keywords: primaryKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'RateKaro PK - Freelancer Rate Calculator for Pakistan',
    description: seoDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'RateKaro PK freelancer rate calculator',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateKaro PK - Freelancer Rate Calculator for Pakistan',
    description: seoDescription,
    images: [defaultOgImage],
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
