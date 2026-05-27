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
    {
      url: `${siteUrl}/proposals`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const ratePages: MetadataRoute.Sitemap = rateData.map((skill) => ({
    url: `${siteUrl}${skillRatePath(skill.slug)}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: skill.slug === 'web-dev' ? 0.85 : 0.72,
  }));

  return [...corePages, ...ratePages];
}
