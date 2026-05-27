import { absoluteUrl, primaryKeywords, siteName, seoDescription } from '@/lib/seoConfig';

export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#organization'),
        name: siteName,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/brand/ratekaro-logo-transparent.png'),
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        name: siteName,
        url: absoluteUrl('/'),
        publisher: {
          '@id': absoluteUrl('/#organization'),
        },
        inLanguage: 'en-PK',
        keywords: primaryKeywords.join(', '),
      },
      {
        '@type': 'WebApplication',
        '@id': absoluteUrl('/#webapp'),
        name: siteName,
        url: absoluteUrl('/'),
        description: seoDescription,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PKR',
        },
        creator: {
          '@id': absoluteUrl('/#organization'),
        },
        featureList: [
          'Pakistan freelancer rate calculator',
          'PSEB and FBR tax estimate calculator',
          'AI freelance proposal generator',
          'Local and foreign client rate benchmarking',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
