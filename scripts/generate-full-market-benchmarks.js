const fs = require('fs');
const path = require('path');

const FX = 280;
const TODAY = '2026-05-28';
const OUT_DIR = path.join(process.cwd(), 'outputs', 'rate_benchmarks_2026');
const experiences = ['junior', 'mid', 'senior'];
const clientTypes = ['local', 'foreign'];

function parseSkills() {
  const text = fs.readFileSync(path.join(process.cwd(), 'lib', 'rateData.ts'), 'utf8');
  return [...text.matchAll(/skill:\s*'([^']+)',\s*category:\s*'([^']+)',\s*slug:\s*'([^']+)'/g)].map(
    ([, skill, category, slug]) => ({ skill, category, slug })
  );
}

const categoryBase = {
  Development: {
    local: [[500, 1000, 1500], [1500, 2500, 4000], [4000, 6000, 8500]],
    foreign: [[10, 15, 25], [25, 40, 60], [55, 85, 120]],
    sourceCount: 4,
    confidence: 78,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against PASHA salary survey, Upwork Pakistan developer pages, Indeed Pakistan salary pages, and local market proxies. Source count/confidence capped to avoid inflated AI-reported counts.',
  },
  Design: {
    local: [[300, 600, 1000], [1000, 1700, 2800], [2800, 4500, 7000]],
    foreign: [[5, 10, 16], [15, 25, 40], [35, 55, 85]],
    sourceCount: 4,
    confidence: 76,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against Upwork Pakistan design pages, Indeed Pakistan design salaries, Skills360/market training signals, and local project-pricing proxies.',
  },
  'Content & Marketing': {
    local: [[250, 550, 950], [900, 1700, 2800], [2600, 4300, 6500]],
    foreign: [[5, 10, 16], [15, 25, 40], [35, 55, 85]],
    sourceCount: 4,
    confidence: 74,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against PayScale/Indeed Pakistan signals, Upwork Pakistan writing/SEO pages, Pakistani digital marketing salary guides, and per-piece pricing converted to hourly equivalents.',
  },
  'Business Services': {
    local: [[200, 450, 800], [800, 1500, 2600], [2400, 4000, 6500]],
    foreign: [[3, 6, 10], [10, 16, 26], [25, 40, 65]],
    sourceCount: 3,
    confidence: 70,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against Workstaff360, RemotePeople, Indeed/Payscale salary proxies, and Upwork virtual assistant/business-service pages.',
  },
  Creative: {
    local: [[300, 700, 1200], [1200, 2200, 3600], [3500, 5500, 8500]],
    foreign: [[6, 12, 20], [20, 32, 50], [45, 70, 105]],
    sourceCount: 3,
    confidence: 66,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against Upwork Pakistan video/design pages, Twine-style project pricing, and local creative production proxies.',
  },
  'AI & Emerging': {
    local: [[500, 1000, 1600], [1600, 2800, 4500], [4000, 6500, 9500]],
    foreign: [[10, 18, 28], [25, 40, 60], [45, 70, 100]],
    sourceCount: 3,
    confidence: 62,
    notes:
      'Normalized from GPT/Gemini/Kimi research supplied on 2026-05-28; reconciled against Upwork Zapier/no-code/chatbot pages, Pakistan developer salary proxies, and AI workflow market signals. Confidence intentionally capped because many inputs are proxy estimates.',
  },
};

const skillTuning = {
  'web-dev': { local: 1, foreign: 1, confidence: 80 },
  'frontend-dev': { local: 1.05, foreign: 0.95, confidence: 80 },
  'backend-dev': { local: 1.12, foreign: 1.08, confidence: 80 },
  'full-stack': { local: 1.18, foreign: 1.15, confidence: 80 },
  'mobile-dev-react-native': { local: 1.12, foreign: 1.08, confidence: 76 },
  'flutter-dev': { local: 1.08, foreign: 1.02, confidence: 74 },
  'wordpress-dev': { local: 0.72, foreign: 0.65, confidence: 78 },
  'shopify-dev': { local: 0.95, foreign: 0.95, confidence: 76 },
  'python-dev': { local: 1.1, foreign: 1.05, confidence: 78 },
  'nodejs-dev': { local: 1.08, foreign: 1.05, confidence: 76 },
  'php-dev': { local: 0.78, foreign: 0.75, confidence: 76 },
  'devops-cloud': { local: 1.35, foreign: 1.25, confidence: 74 },
  'ui-ux-design': { local: 1.18, foreign: 1.12, confidence: 78 },
  'graphic-design': { local: 1, foreign: 1, confidence: 82 },
  'logo-design': { local: 0.85, foreign: 0.85, confidence: 72 },
  'brand-identity': { local: 1.1, foreign: 1.18, confidence: 70 },
  'motion-graphics': { local: 1.15, foreign: 1.2, confidence: 72 },
  'video-editing': { local: 0.95, foreign: 0.92, confidence: 78 },
  '3d-design': { local: 1.2, foreign: 1.25, confidence: 66 },
  'figma-design': { local: 1.08, foreign: 1.08, confidence: 74 },
  'content-writing': { local: 1, foreign: 1, confidence: 78 },
  copywriting: { local: 1.15, foreign: 1.18, confidence: 72 },
  seo: { local: 1.18, foreign: 1.15, confidence: 80 },
  'social-media': { local: 0.95, foreign: 0.95, confidence: 76 },
  'email-marketing': { local: 1.05, foreign: 1.08, confidence: 72 },
  'blog-writing': { local: 0.88, foreign: 0.85, confidence: 74 },
  'technical-writing': { local: 1.22, foreign: 1.25, confidence: 70 },
  'translation-en-ur': { local: 0.8, foreign: 0.8, confidence: 68 },
  'virtual-assistant': { local: 0.75, foreign: 0.62, confidence: 78 },
  'data-entry': { local: 0.55, foreign: 0.52, confidence: 80 },
  'project-management': { local: 1.12, foreign: 1.25, confidence: 66 },
  'business-analysis': { local: 1.18, foreign: 1.22, confidence: 76 },
  'customer-support': { local: 0.7, foreign: 0.72, confidence: 78 },
  'hr-consulting': { local: 0.95, foreign: 1.05, confidence: 64 },
  'video-production': { local: 1.15, foreign: 1.18, confidence: 66 },
  'podcast-editing': { local: 0.9, foreign: 0.9, confidence: 60 },
  'photography-edit': { local: 0.82, foreign: 0.8, confidence: 60 },
  animation: { local: 1.2, foreign: 1.25, confidence: 64 },
  'thumbnail-design': { local: 0.75, foreign: 0.75, confidence: 60 },
  'ad-creative': { local: 1, foreign: 1.05, confidence: 58 },
  'ai-prompt-engineering': { local: 1.18, foreign: 1.18, confidence: 62 },
  'chatbot-development': { local: 1.35, foreign: 1.35, confidence: 62 },
  'ai-content-creation': { local: 0.9, foreign: 0.9, confidence: 55 },
  'automation-zapier-make': { local: 1, foreign: 1, confidence: 66 },
  'no-code-development': { local: 0.95, foreign: 0.95, confidence: 60 },
};

const sourceUrls = {
  Development:
    'Sources: https://www.pasha.org.pk/publications/salary-survey-2024-2025/ | https://www.upwork.com/resources/upwork-hourly-rates | https://pk.indeed.com/',
  Design:
    'Sources: https://www.upwork.com/hire/graphic-designers/pk/ | https://pk.indeed.com/ | https://skills360.com.pk/blogs/5-benefits-of-taking-graphic-designing-course',
  'Content & Marketing':
    'Sources: https://www.upwork.com/hire/content-writers/pk/ | https://pk.indeed.com/ | https://www.payscale.com/research/PK',
  'Business Services':
    'Sources: https://workstaff360.com/average-salary-in-pakistan/ | https://www.upwork.com/hire/virtual-assistants/pk/ | https://remotepeople.com/countries/pakistan/average-salary/',
  Creative:
    'Sources: https://www.upwork.com/hire/video-editors/pk/ | https://www.getharvest.com/calculators/hourly-rate-calculator-in-pakistan | https://skills360.com.pk/',
  'AI & Emerging':
    'Sources: https://www.upwork.com/hire/zapier-developers/ | https://www.upwork.com/hire/no-code-developers/ | https://www.upwork.com/hire/chatbot-developers/',
};

function scaleRange(range, factor, roundTo = 1) {
  const scaled = range.map((value) => value * factor);
  return scaled.map((value) => {
    const rounded = Math.round(value / roundTo) * roundTo;
    return Math.max(roundTo, rounded);
  });
}

function clampForeignUsd(slug, experience, range) {
  const caps = {
    junior: 35,
    mid: 75,
    senior: 130,
  };
  const aiCaps = {
    junior: 35,
    mid: 80,
    senior: 150,
  };
  const cap = slug.includes('ai-') || slug.includes('chatbot') ? aiCaps[experience] : caps[experience];
  const high = Math.min(range[2], cap);
  const mid = Math.min(range[1], Math.max(range[0] + 1, Math.round(high * 0.7)));
  const low = Math.min(range[0], Math.max(1, Math.round(mid * 0.65)));
  return [low, mid, high];
}

function rowFor(skill, experience, clientType) {
  const base = categoryBase[skill.category];
  const tuning = skillTuning[skill.slug] || { local: 1, foreign: 1, confidence: base.confidence };
  const expIndex = experiences.indexOf(experience);
  const sourceCount = Math.max(2, Math.min(4, base.sourceCount));
  const confidence = Math.max(50, Math.min(82, tuning.confidence ?? base.confidence));
  const note = `${base.notes} ${sourceUrls[skill.category]}`;

  if (clientType === 'local') {
    const [pkrLow, pkrMid, pkrHigh] = scaleRange(base.local[expIndex], tuning.local, 50);
    return {
      skill_slug: skill.slug,
      skill_name: skill.skill,
      category: skill.category,
      city: 'remote',
      experience,
      client_type: clientType,
      pkr_low: pkrLow,
      pkr_mid: pkrMid,
      pkr_high: pkrHigh,
      usd_low: Number((pkrLow / FX).toFixed(2)),
      usd_mid: Number((pkrMid / FX).toFixed(2)),
      usd_high: Number((pkrHigh / FX).toFixed(2)),
      source_count: sourceCount,
      confidence_score: confidence,
      source_notes: note,
      last_updated: TODAY,
    };
  }

  const [usdLow, usdMid, usdHigh] = clampForeignUsd(
    skill.slug,
    experience,
    scaleRange(base.foreign[expIndex], tuning.foreign, 1)
  );

  return {
    skill_slug: skill.slug,
    skill_name: skill.skill,
    category: skill.category,
    city: 'remote',
    experience,
    client_type: clientType,
    pkr_low: Math.round(usdLow * FX),
    pkr_mid: Math.round(usdMid * FX),
    pkr_high: Math.round(usdHigh * FX),
    usd_low: usdLow,
    usd_mid: usdMid,
    usd_high: usdHigh,
    source_count: sourceCount,
    confidence_score: confidence,
    source_notes: note,
    last_updated: TODAY,
  };
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows) {
  const headers = [
    'skill_slug',
    'skill_name',
    'category',
    'city',
    'experience',
    'client_type',
    'pkr_low',
    'pkr_mid',
    'pkr_high',
    'usd_low',
    'usd_mid',
    'usd_high',
    'source_count',
    'confidence_score',
    'source_notes',
    'last_updated',
  ];
  return [headers.join(','), ...rows.map((row) => headers.map((key) => csvEscape(row[key])).join(','))].join('\n');
}

function makeSql(rows) {
  const values = rows
    .map((row) => {
      const fields = [
        row.skill_slug,
        row.skill_name,
        row.category,
        row.city,
        row.experience,
        row.client_type,
        row.pkr_low,
        row.pkr_mid,
        row.pkr_high,
        row.usd_low,
        row.usd_mid,
        row.usd_high,
        row.source_count,
        row.confidence_score,
        row.source_notes,
        `${row.last_updated}T00:00:00Z`,
      ];
      return `(${fields
        .map((value) =>
          typeof value === 'number' ? String(value) : `'${String(value).replace(/'/g, "''")}'`
        )
        .join(', ')})`;
    })
    .join(',\n');

  return `alter table public.rate_benchmarks add column if not exists source_notes text;\n\ninsert into public.rate_benchmarks (\n  skill_slug, skill_name, category, city, experience, client_type,\n  pkr_low, pkr_mid, pkr_high, usd_low, usd_mid, usd_high,\n  source_count, confidence_score, source_notes, last_updated\n)\nvalues\n${values}\non conflict (skill_slug, city, experience, client_type) do update set\n  skill_name = excluded.skill_name,\n  category = excluded.category,\n  pkr_low = excluded.pkr_low,\n  pkr_mid = excluded.pkr_mid,\n  pkr_high = excluded.pkr_high,\n  usd_low = excluded.usd_low,\n  usd_mid = excluded.usd_mid,\n  usd_high = excluded.usd_high,\n  source_count = excluded.source_count,\n  confidence_score = excluded.confidence_score,\n  source_notes = excluded.source_notes,\n  last_updated = excluded.last_updated;\n`;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const skills = parseSkills();
  const rows = skills.flatMap((skill) =>
    experiences.flatMap((experience) => clientTypes.map((clientType) => rowFor(skill, experience, clientType)))
  );
  const coreRows = rows.map(({ source_notes, ...row }) => row);

  fs.writeFileSync(path.join(OUT_DIR, 'ratekaro_full_270_normalized.csv'), toCsv(rows));
  fs.writeFileSync(path.join(OUT_DIR, 'ratekaro_full_270_normalized.core.json'), JSON.stringify(coreRows, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'supabase_full_270_with_source_notes.sql'), makeSql(rows));
  fs.writeFileSync(
    path.join(OUT_DIR, 'add_source_notes_column.sql'),
    'alter table public.rate_benchmarks add column if not exists source_notes text;\n'
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'full_270_review_notes.md'),
    `# Full 270 Benchmark Import\n\nGenerated: ${new Date().toISOString()}\n\n- Rows: ${rows.length}\n- Skills: ${skills.length}\n- Experiences per skill: 3\n- Client types per experience: 2\n- Source count was capped to 2-4 because pasted AI research inflated counts.\n- Confidence was capped to 50-82 because missing skills are normalized/admin-reviewed benchmark rows, not direct marketplace API pulls.\n- Foreign senior rates were capped to prevent extreme AI-generated outliers from becoming production defaults.\n- Use supabase_full_270_with_source_notes.sql in Supabase SQL Editor to store source_notes.\n- REST import can use ratekaro_full_270_normalized.core.json when source_notes column is absent.\n`
  );
  console.log(JSON.stringify({ rows: rows.length, skills: skills.length, outDir: OUT_DIR }, null, 2));
}

main();
