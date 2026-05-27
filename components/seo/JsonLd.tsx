export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RateKaro PK',
    url: 'https://ratekaro.pk',
    description: 'Pakistan\'s first freelancer rate intelligence tool. Get market rates, tax calculations, and AI proposals tailored for Pakistani freelancers.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
    },
    creator: {
      '@type': 'Organization',
      name: 'RateKaro PK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
