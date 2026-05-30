import { MetadataRoute } from 'next';
import { rateData } from '@/lib/rateData';
import { siteUrl, skillRatePath } from '@/lib/seoConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-28T00:00:00.000Z');
  
  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/calculator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tax`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  /* SEO landing pages (public, indexable) */
  const seoLandingPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/freelance-rate-calculator-pakistan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/freelancer-tax-calculator-pakistan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pseb-tax-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/proposal-generator-pakistan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/upwork-rate-calculator-pakistan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/freelancer-pricing-methodology`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/guides/freelancer-tax-pakistan`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/pseb-registration-freelancers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/section-154a-freelancer-tax`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/fbr-freelancer-filing-checklist`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  /* Pakistan rate pages — /rates/[slug] */
  const pkRatePages: MetadataRoute.Sitemap = rateData.map((skill) => ({
    url: `${siteUrl}${skillRatePath(skill.slug)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: skill.slug === 'web-dev' ? 0.85 : 0.72,
  }));

  /* Global Lite — India rate pages — /rates/india/[slug] */
  const indiaRatePages: MetadataRoute.Sitemap = rateData.map((skill) => ({
    url: `${siteUrl}/rates/india/${skill.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

  /* Global Lite — Bangladesh rate pages — /rates/bangladesh/[slug] */
  const bangladeshRatePages: MetadataRoute.Sitemap = rateData.map((skill) => ({
    url: `${siteUrl}/rates/bangladesh/${skill.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

  return [
    ...corePages,
    ...seoLandingPages,
    ...guidePages,
    ...pkRatePages,
    ...indiaRatePages,
    ...bangladeshRatePages,
  ];
}
