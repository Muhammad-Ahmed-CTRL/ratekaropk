import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/login', '/signup', '/proposals'],
    },
    sitemap: 'https://ratekaropk.site/sitemap.xml',
  };
}
