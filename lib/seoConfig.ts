import { rateData } from '@/lib/rateData';

export const siteUrl = 'https://www.ratekaropk.site';
export const siteName = 'RateKaro PK';
export const defaultOgImage = '/opengraph-image';

export const primaryKeywords = [
  'freelancer rate calculator Pakistan',
  'freelance hourly rate Pakistan',
  'Pakistani freelancer tax calculator',
  'PSEB tax calculator freelancer',
  'web developer hourly rate Pakistan',
  'Upwork rate calculator Pakistan',
  'freelance proposal generator Pakistan',
];

export const seoDescription =
  'Calculate Pakistan freelancer hourly rates, compare local and foreign-client pricing, estimate PSEB/FBR tax, and create client proposals with RateKaro PK.';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function skillRatePath(slug: string) {
  return `/rates/${slug}`;
}

export function skillLongTailKeywords(skillName: string) {
  const normalized = skillName.replace(/\s*\([^)]*\)/g, '').trim();
  return [
    `${normalized} hourly rate Pakistan`,
    `${normalized} freelance rate Pakistan`,
    `${normalized} rate calculator Pakistan`,
    `how much to charge for ${normalized} in Pakistan`,
    `${normalized} Upwork rate Pakistan`,
  ];
}

export const topRatePageSlugs = [
  'web-dev',
  'frontend-dev',
  'full-stack',
  'wordpress-dev',
  'graphic-design',
  'seo',
  'video-editing',
  'virtual-assistant',
  'ai-prompt-engineering',
];

export function getTopRatePages() {
  return topRatePageSlugs
    .map((slug) => rateData.find((skill) => skill.slug === slug))
    .filter(Boolean) as typeof rateData;
}
