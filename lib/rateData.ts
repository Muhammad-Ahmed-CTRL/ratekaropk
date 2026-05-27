export type RateEntry = {
  skill: string;
  category: string;
  slug: string;
  junior: { pkr: { low: number; high: number }; usd: { low: number; high: number } };
  mid: { pkr: { low: number; high: number }; usd: { low: number; high: number } };
  senior: { pkr: { low: number; high: number }; usd: { low: number; high: number } };
};

export const categoryOrder = [
  'Development',
  'Design',
  'Content & Marketing',
  'Business Services',
  'Creative',
  'AI & Emerging',
] as const;

export type Category = (typeof categoryOrder)[number];

export const rateData: RateEntry[] = [
  // ─── DEVELOPMENT (12) ───────────────────────────────────────
  {
    skill: 'Web Dev',
    category: 'Development',
    slug: 'web-dev',
    junior: { pkr: { low: 35000, high: 80000 }, usd: { low: 8, high: 22 } },
    mid:    { pkr: { low: 80000, high: 180000 }, usd: { low: 18, high: 45 } },
    senior: { pkr: { low: 150000, high: 400000 }, usd: { low: 35, high: 90 } },
  },
  {
    skill: 'Frontend Dev',
    category: 'Development',
    slug: 'frontend-dev',
    junior: { pkr: { low: 30000, high: 70000 }, usd: { low: 7, high: 18 } },
    mid:    { pkr: { low: 70000, high: 160000 }, usd: { low: 16, high: 40 } },
    senior: { pkr: { low: 140000, high: 350000 }, usd: { low: 32, high: 80 } },
  },
  {
    skill: 'Backend Dev',
    category: 'Development',
    slug: 'backend-dev',
    junior: { pkr: { low: 35000, high: 85000 }, usd: { low: 8, high: 22 } },
    mid:    { pkr: { low: 85000, high: 190000 }, usd: { low: 20, high: 48 } },
    senior: { pkr: { low: 160000, high: 420000 }, usd: { low: 38, high: 95 } },
  },
  {
    skill: 'Full Stack',
    category: 'Development',
    slug: 'full-stack',
    junior: { pkr: { low: 40000, high: 90000 }, usd: { low: 10, high: 25 } },
    mid:    { pkr: { low: 90000, high: 200000 }, usd: { low: 22, high: 52 } },
    senior: { pkr: { low: 180000, high: 450000 }, usd: { low: 42, high: 100 } },
  },
  {
    skill: 'Mobile Dev (React Native)',
    category: 'Development',
    slug: 'mobile-dev-react-native',
    junior: { pkr: { low: 35000, high: 80000 }, usd: { low: 9, high: 22 } },
    mid:    { pkr: { low: 80000, high: 185000 }, usd: { low: 20, high: 48 } },
    senior: { pkr: { low: 160000, high: 400000 }, usd: { low: 38, high: 92 } },
  },
  {
    skill: 'Flutter Dev',
    category: 'Development',
    slug: 'flutter-dev',
    junior: { pkr: { low: 30000, high: 75000 }, usd: { low: 8, high: 20 } },
    mid:    { pkr: { low: 75000, high: 170000 }, usd: { low: 18, high: 44 } },
    senior: { pkr: { low: 150000, high: 380000 }, usd: { low: 35, high: 88 } },
  },
  {
    skill: 'WordPress Dev',
    category: 'Development',
    slug: 'wordpress-dev',
    junior: { pkr: { low: 20000, high: 50000 }, usd: { low: 5, high: 14 } },
    mid:    { pkr: { low: 50000, high: 120000 }, usd: { low: 12, high: 30 } },
    senior: { pkr: { low: 100000, high: 250000 }, usd: { low: 24, high: 60 } },
  },
  {
    skill: 'Shopify Dev',
    category: 'Development',
    slug: 'shopify-dev',
    junior: { pkr: { low: 25000, high: 60000 }, usd: { low: 6, high: 16 } },
    mid:    { pkr: { low: 60000, high: 140000 }, usd: { low: 14, high: 36 } },
    senior: { pkr: { low: 120000, high: 300000 }, usd: { low: 28, high: 70 } },
  },
  {
    skill: 'Python Dev',
    category: 'Development',
    slug: 'python-dev',
    junior: { pkr: { low: 35000, high: 80000 }, usd: { low: 8, high: 22 } },
    mid:    { pkr: { low: 80000, high: 190000 }, usd: { low: 20, high: 48 } },
    senior: { pkr: { low: 165000, high: 420000 }, usd: { low: 40, high: 95 } },
  },
  {
    skill: 'Node.js Dev',
    category: 'Development',
    slug: 'nodejs-dev',
    junior: { pkr: { low: 30000, high: 75000 }, usd: { low: 8, high: 20 } },
    mid:    { pkr: { low: 75000, high: 175000 }, usd: { low: 18, high: 45 } },
    senior: { pkr: { low: 150000, high: 390000 }, usd: { low: 36, high: 90 } },
  },
  {
    skill: 'PHP Dev',
    category: 'Development',
    slug: 'php-dev',
    junior: { pkr: { low: 20000, high: 50000 }, usd: { low: 5, high: 14 } },
    mid:    { pkr: { low: 50000, high: 120000 }, usd: { low: 12, high: 30 } },
    senior: { pkr: { low: 100000, high: 250000 }, usd: { low: 24, high: 58 } },
  },
  {
    skill: 'DevOps / Cloud',
    category: 'Development',
    slug: 'devops-cloud',
    junior: { pkr: { low: 40000, high: 95000 }, usd: { low: 10, high: 26 } },
    mid:    { pkr: { low: 95000, high: 220000 }, usd: { low: 24, high: 56 } },
    senior: { pkr: { low: 200000, high: 500000 }, usd: { low: 48, high: 115 } },
  },

  // ─── DESIGN (8) ─────────────────────────────────────────────
  {
    skill: 'UI/UX Design',
    category: 'Design',
    slug: 'ui-ux-design',
    junior: { pkr: { low: 25000, high: 65000 }, usd: { low: 6, high: 18 } },
    mid:    { pkr: { low: 65000, high: 155000 }, usd: { low: 16, high: 40 } },
    senior: { pkr: { low: 140000, high: 360000 }, usd: { low: 34, high: 85 } },
  },
  {
    skill: 'Graphic Design',
    category: 'Design',
    slug: 'graphic-design',
    junior: { pkr: { low: 20000, high: 50000 }, usd: { low: 5, high: 14 } },
    mid:    { pkr: { low: 50000, high: 120000 }, usd: { low: 12, high: 30 } },
    senior: { pkr: { low: 100000, high: 260000 }, usd: { low: 24, high: 62 } },
  },
  {
    skill: 'Logo Design',
    category: 'Design',
    slug: 'logo-design',
    junior: { pkr: { low: 15000, high: 40000 }, usd: { low: 4, high: 11 } },
    mid:    { pkr: { low: 40000, high: 100000 }, usd: { low: 10, high: 26 } },
    senior: { pkr: { low: 90000, high: 230000 }, usd: { low: 22, high: 56 } },
  },
  {
    skill: 'Brand Identity',
    category: 'Design',
    slug: 'brand-identity',
    junior: { pkr: { low: 25000, high: 65000 }, usd: { low: 6, high: 17 } },
    mid:    { pkr: { low: 65000, high: 150000 }, usd: { low: 15, high: 38 } },
    senior: { pkr: { low: 130000, high: 320000 }, usd: { low: 30, high: 76 } },
  },
  {
    skill: 'Motion Graphics',
    category: 'Design',
    slug: 'motion-graphics',
    junior: { pkr: { low: 25000, high: 60000 }, usd: { low: 6, high: 16 } },
    mid:    { pkr: { low: 60000, high: 145000 }, usd: { low: 14, high: 36 } },
    senior: { pkr: { low: 130000, high: 320000 }, usd: { low: 30, high: 75 } },
  },
  {
    skill: 'Video Editing',
    category: 'Design',
    slug: 'video-editing',
    junior: { pkr: { low: 18000, high: 45000 }, usd: { low: 4, high: 12 } },
    mid:    { pkr: { low: 45000, high: 110000 }, usd: { low: 10, high: 28 } },
    senior: { pkr: { low: 95000, high: 240000 }, usd: { low: 22, high: 58 } },
  },
  {
    skill: '3D Design',
    category: 'Design',
    slug: '3d-design',
    junior: { pkr: { low: 25000, high: 65000 }, usd: { low: 6, high: 17 } },
    mid:    { pkr: { low: 65000, high: 155000 }, usd: { low: 16, high: 40 } },
    senior: { pkr: { low: 140000, high: 350000 }, usd: { low: 33, high: 84 } },
  },
  {
    skill: 'Figma Design',
    category: 'Design',
    slug: 'figma-design',
    junior: { pkr: { low: 22000, high: 55000 }, usd: { low: 5, high: 15 } },
    mid:    { pkr: { low: 55000, high: 135000 }, usd: { low: 13, high: 34 } },
    senior: { pkr: { low: 120000, high: 300000 }, usd: { low: 28, high: 72 } },
  },

  // ─── CONTENT & MARKETING (8) ────────────────────────────────
  {
    skill: 'Content Writing',
    category: 'Content & Marketing',
    slug: 'content-writing',
    junior: { pkr: { low: 15000, high: 38000 }, usd: { low: 4, high: 10 } },
    mid:    { pkr: { low: 38000, high: 90000 }, usd: { low: 9, high: 23 } },
    senior: { pkr: { low: 80000, high: 200000 }, usd: { low: 19, high: 48 } },
  },
  {
    skill: 'Copywriting',
    category: 'Content & Marketing',
    slug: 'copywriting',
    junior: { pkr: { low: 18000, high: 45000 }, usd: { low: 4, high: 12 } },
    mid:    { pkr: { low: 45000, high: 110000 }, usd: { low: 11, high: 28 } },
    senior: { pkr: { low: 95000, high: 240000 }, usd: { low: 22, high: 58 } },
  },
  {
    skill: 'SEO',
    category: 'Content & Marketing',
    slug: 'seo',
    junior: { pkr: { low: 20000, high: 50000 }, usd: { low: 5, high: 13 } },
    mid:    { pkr: { low: 50000, high: 120000 }, usd: { low: 12, high: 30 } },
    senior: { pkr: { low: 100000, high: 260000 }, usd: { low: 24, high: 62 } },
  },
  {
    skill: 'Social Media',
    category: 'Content & Marketing',
    slug: 'social-media',
    junior: { pkr: { low: 15000, high: 40000 }, usd: { low: 4, high: 10 } },
    mid:    { pkr: { low: 40000, high: 95000 }, usd: { low: 9, high: 24 } },
    senior: { pkr: { low: 80000, high: 210000 }, usd: { low: 19, high: 50 } },
  },
  {
    skill: 'Email Marketing',
    category: 'Content & Marketing',
    slug: 'email-marketing',
    junior: { pkr: { low: 18000, high: 45000 }, usd: { low: 4, high: 12 } },
    mid:    { pkr: { low: 45000, high: 110000 }, usd: { low: 11, high: 28 } },
    senior: { pkr: { low: 95000, high: 240000 }, usd: { low: 22, high: 58 } },
  },
  {
    skill: 'Blog Writing',
    category: 'Content & Marketing',
    slug: 'blog-writing',
    junior: { pkr: { low: 12000, high: 32000 }, usd: { low: 3, high: 9 } },
    mid:    { pkr: { low: 32000, high: 80000 }, usd: { low: 8, high: 20 } },
    senior: { pkr: { low: 70000, high: 180000 }, usd: { low: 17, high: 43 } },
  },
  {
    skill: 'Technical Writing',
    category: 'Content & Marketing',
    slug: 'technical-writing',
    junior: { pkr: { low: 20000, high: 52000 }, usd: { low: 5, high: 14 } },
    mid:    { pkr: { low: 52000, high: 125000 }, usd: { low: 13, high: 32 } },
    senior: { pkr: { low: 110000, high: 275000 }, usd: { low: 26, high: 65 } },
  },
  {
    skill: 'Translation (EN/UR)',
    category: 'Content & Marketing',
    slug: 'translation-en-ur',
    junior: { pkr: { low: 12000, high: 30000 }, usd: { low: 3, high: 8 } },
    mid:    { pkr: { low: 30000, high: 72000 }, usd: { low: 7, high: 18 } },
    senior: { pkr: { low: 60000, high: 160000 }, usd: { low: 14, high: 38 } },
  },

  // ─── BUSINESS SERVICES (6) ──────────────────────────────────
  {
    skill: 'Virtual Assistant',
    category: 'Business Services',
    slug: 'virtual-assistant',
    junior: { pkr: { low: 15000, high: 38000 }, usd: { low: 4, high: 10 } },
    mid:    { pkr: { low: 38000, high: 90000 }, usd: { low: 9, high: 23 } },
    senior: { pkr: { low: 80000, high: 200000 }, usd: { low: 19, high: 48 } },
  },
  {
    skill: 'Data Entry',
    category: 'Business Services',
    slug: 'data-entry',
    junior: { pkr: { low: 10000, high: 28000 }, usd: { low: 3, high: 7 } },
    mid:    { pkr: { low: 28000, high: 65000 }, usd: { low: 6, high: 16 } },
    senior: { pkr: { low: 55000, high: 140000 }, usd: { low: 13, high: 34 } },
  },
  {
    skill: 'Project Management',
    category: 'Business Services',
    slug: 'project-management',
    junior: { pkr: { low: 30000, high: 72000 }, usd: { low: 7, high: 19 } },
    mid:    { pkr: { low: 72000, high: 170000 }, usd: { low: 17, high: 43 } },
    senior: { pkr: { low: 150000, high: 375000 }, usd: { low: 35, high: 88 } },
  },
  {
    skill: 'Business Analysis',
    category: 'Business Services',
    slug: 'business-analysis',
    junior: { pkr: { low: 30000, high: 75000 }, usd: { low: 7, high: 20 } },
    mid:    { pkr: { low: 75000, high: 175000 }, usd: { low: 18, high: 44 } },
    senior: { pkr: { low: 155000, high: 385000 }, usd: { low: 36, high: 90 } },
  },
  {
    skill: 'Customer Support',
    category: 'Business Services',
    slug: 'customer-support',
    junior: { pkr: { low: 12000, high: 32000 }, usd: { low: 3, high: 9 } },
    mid:    { pkr: { low: 32000, high: 78000 }, usd: { low: 8, high: 20 } },
    senior: { pkr: { low: 68000, high: 175000 }, usd: { low: 16, high: 42 } },
  },
  {
    skill: 'HR Consulting',
    category: 'Business Services',
    slug: 'hr-consulting',
    junior: { pkr: { low: 25000, high: 62000 }, usd: { low: 6, high: 16 } },
    mid:    { pkr: { low: 62000, high: 148000 }, usd: { low: 15, high: 37 } },
    senior: { pkr: { low: 130000, high: 325000 }, usd: { low: 30, high: 76 } },
  },

  // ─── CREATIVE (6) ───────────────────────────────────────────
  {
    skill: 'Video Production',
    category: 'Creative',
    slug: 'video-production',
    junior: { pkr: { low: 22000, high: 55000 }, usd: { low: 5, high: 15 } },
    mid:    { pkr: { low: 55000, high: 135000 }, usd: { low: 13, high: 34 } },
    senior: { pkr: { low: 120000, high: 300000 }, usd: { low: 28, high: 72 } },
  },
  {
    skill: 'Podcast Editing',
    category: 'Creative',
    slug: 'podcast-editing',
    junior: { pkr: { low: 15000, high: 38000 }, usd: { low: 4, high: 10 } },
    mid:    { pkr: { low: 38000, high: 92000 }, usd: { low: 9, high: 23 } },
    senior: { pkr: { low: 80000, high: 205000 }, usd: { low: 19, high: 49 } },
  },
  {
    skill: 'Photography Edit',
    category: 'Creative',
    slug: 'photography-edit',
    junior: { pkr: { low: 15000, high: 40000 }, usd: { low: 4, high: 10 } },
    mid:    { pkr: { low: 40000, high: 95000 }, usd: { low: 9, high: 24 } },
    senior: { pkr: { low: 82000, high: 210000 }, usd: { low: 19, high: 50 } },
  },
  {
    skill: 'Animation',
    category: 'Creative',
    slug: 'animation',
    junior: { pkr: { low: 25000, high: 65000 }, usd: { low: 6, high: 17 } },
    mid:    { pkr: { low: 65000, high: 155000 }, usd: { low: 16, high: 40 } },
    senior: { pkr: { low: 140000, high: 350000 }, usd: { low: 33, high: 84 } },
  },
  {
    skill: 'Thumbnail Design',
    category: 'Creative',
    slug: 'thumbnail-design',
    junior: { pkr: { low: 12000, high: 30000 }, usd: { low: 3, high: 8 } },
    mid:    { pkr: { low: 30000, high: 72000 }, usd: { low: 7, high: 18 } },
    senior: { pkr: { low: 62000, high: 160000 }, usd: { low: 15, high: 38 } },
  },
  {
    skill: 'Ad Creative',
    category: 'Creative',
    slug: 'ad-creative',
    junior: { pkr: { low: 18000, high: 45000 }, usd: { low: 4, high: 12 } },
    mid:    { pkr: { low: 45000, high: 110000 }, usd: { low: 11, high: 28 } },
    senior: { pkr: { low: 95000, high: 240000 }, usd: { low: 22, high: 58 } },
  },

  // ─── AI & EMERGING (5) ──────────────────────────────────────
  {
    skill: 'AI Prompt Engineering',
    category: 'AI & Emerging',
    slug: 'ai-prompt-engineering',
    junior: { pkr: { low: 25000, high: 65000 }, usd: { low: 6, high: 17 } },
    mid:    { pkr: { low: 65000, high: 155000 }, usd: { low: 15, high: 40 } },
    senior: { pkr: { low: 140000, high: 360000 }, usd: { low: 33, high: 85 } },
  },
  {
    skill: 'Chatbot Development',
    category: 'AI & Emerging',
    slug: 'chatbot-development',
    junior: { pkr: { low: 30000, high: 75000 }, usd: { low: 7, high: 20 } },
    mid:    { pkr: { low: 75000, high: 180000 }, usd: { low: 18, high: 45 } },
    senior: { pkr: { low: 160000, high: 400000 }, usd: { low: 38, high: 95 } },
  },
  {
    skill: 'AI Content Creation',
    category: 'AI & Emerging',
    slug: 'ai-content-creation',
    junior: { pkr: { low: 18000, high: 45000 }, usd: { low: 4, high: 12 } },
    mid:    { pkr: { low: 45000, high: 110000 }, usd: { low: 11, high: 27 } },
    senior: { pkr: { low: 95000, high: 235000 }, usd: { low: 22, high: 56 } },
  },
  {
    skill: 'Automation (Zapier/Make)',
    category: 'AI & Emerging',
    slug: 'automation-zapier-make',
    junior: { pkr: { low: 22000, high: 55000 }, usd: { low: 5, high: 15 } },
    mid:    { pkr: { low: 55000, high: 135000 }, usd: { low: 13, high: 34 } },
    senior: { pkr: { low: 120000, high: 300000 }, usd: { low: 28, high: 70 } },
  },
  {
    skill: 'No-Code Development',
    category: 'AI & Emerging',
    slug: 'no-code-development',
    junior: { pkr: { low: 20000, high: 52000 }, usd: { low: 5, high: 14 } },
    mid:    { pkr: { low: 52000, high: 125000 }, usd: { low: 12, high: 32 } },
    senior: { pkr: { low: 110000, high: 275000 }, usd: { low: 26, high: 65 } },
  },
];

export const cityMultipliers: Record<string, number> = {
  karachi: 1.0,
  lahore: 0.95,
  islamabad: 1.05,
  rawalpindi: 0.92,
  peshawar: 0.88,
  quetta: 0.85,
  multan: 0.9,
  remote: 1.0,
};

export const foreignMultiplier: number = 2.2;

export const DEFAULT_USD_TO_PKR = 278;

export function getRateBySlug(slug: string): RateEntry | undefined {
  return rateData.find((r) => r.slug === slug);
}

export function getSkillsByCategory(category: string): RateEntry[] {
  return rateData.filter((r) => r.category === category);
}

export function computeRate(
  entry: RateEntry,
  experience: 'junior' | 'mid' | 'senior',
  city: string,
  clientType: 'local' | 'foreign',
  usdToPkr: number = DEFAULT_USD_TO_PKR
): {
  pkrLow: number;
  pkrMid: number;
  pkrHigh: number;
  usdLow: number;
  usdMid: number;
  usdHigh: number;
} {
  const base = entry[experience];
  const cityMult = cityMultipliers[city.toLowerCase()] ?? 1.0;
  const foreignMult = clientType === 'foreign' ? foreignMultiplier : 1.0;

  const pkrLow = Math.round(base.pkr.low * cityMult * foreignMult);
  const pkrHigh = Math.round(base.pkr.high * cityMult * foreignMult);
  const pkrMid = Math.round((pkrLow + pkrHigh) / 2);

  const usdLow = clientType === 'foreign' ? base.usd.low : Math.round(pkrLow / usdToPkr);
  const usdHigh = clientType === 'foreign' ? base.usd.high : Math.round(pkrHigh / usdToPkr);
  const usdMid = Math.round((usdLow + usdHigh) / 2);

  return { pkrLow, pkrMid, pkrHigh, usdLow, usdMid, usdHigh };
}
