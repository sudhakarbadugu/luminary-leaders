/** Data loader for JSON-based leader data */
// @ts-expect-error - Vite handles JSON imports
import leadersData from './json/leaders.json';
// @ts-expect-error - Vite handles JSON imports
import tradersData from './json/traders.json';
// @ts-expect-error - Vite handles JSON imports
import sportsData from './json/sports.json';
// @ts-expect-error - Vite handles JSON imports
import cricketData from './json/cricket.json';
// @ts-expect-error - Vite handles JSON imports
import scientistsData from './json/scientists.json';
// @ts-expect-error - Vite handles JSON imports
import indexData from './json/index.json';

// Rich entry type from JSON (enhanced with full MD content)
export interface LeaderEntry {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  born?: string;
  died?: string;
  nationality?: string;
  role?: string;
  company?: string;
  era?: string;
  yearStart?: number;
  yearEnd?: number | string;
  sport?: string;
  strategy?: string;
  field?: string;
  nickname?: string;
  markets?: string[];
  netWorth?: string;
  image: string;
  category: string;
  // Rich biography data
  bio: string;
  hook?: string;
  origin?: string;
  fire?: string;
  grind?: string;
  test?: string;
  philosophy?: string;
  legacy?: string;
  finalMotivation?: string;
  // Subsections (key events with context)
  subsections?: {
    fire?: Record<string, string>;
    grind?: Record<string, string>;
    test?: Record<string, string>;
    legacy?: Record<string, string>;
  };
  // Extracted data points
  quotes?: string[];
  milestones?: { year: string; title?: string; event: string }[];
  actionableSteps?: { title: string; description: string }[];
  stats?: {
    netWorth?: string;
    education?: string;
    roles?: string[];
    birthDate?: string;
    deathDate?: string;
  };
}

export interface IndexEntry {
  slug: string;
  category: string;
  name: string;
  born?: string;
  hasBio?: boolean;
  quoteCount?: number;
  milestoneCount?: number;
}

export interface IndexData {
  total: number;
  categories: Record<string, number>;
  items: IndexEntry[];
}

export const leadersJson: LeaderEntry[] = leadersData as unknown as LeaderEntry[];
export const tradersJson: LeaderEntry[] = tradersData as unknown as LeaderEntry[];
export const sportsJson: LeaderEntry[] = sportsData as unknown as LeaderEntry[];
export const cricketJson: LeaderEntry[] = cricketData as unknown as LeaderEntry[];
export const scientistsJson: LeaderEntry[] = scientistsData as unknown as LeaderEntry[];
export const indexJson: IndexData = indexData as unknown as IndexData;

// Build name -> entry lookup (case-insensitive)
const nameIndex: Map<string, LeaderEntry> = new Map();
[...leadersJson, ...tradersJson, ...sportsJson, ...cricketJson, ...scientistsJson]
  .forEach(entry => nameIndex.set(entry.name.toLowerCase(), entry));

// Also build alias map for known name variations
const aliasIndex: Map<string, LeaderEntry> = new Map();
const aliases: Record<string, string> = {
  'sami altman': 'sam-altman',
  'nicola tesla': 'nikola-tesla',
  'peter thiel': 'peter-thiel',
  'brian armstrong': 'brian-armstrong',
  'fred ehrsam': 'fred-ehrsam',
  'vitalik buterin': 'vitalik-buterin',
  'cathie wood': 'cathie-wood',
  'charlie munger': 'charlie-munger',
  'dario amodei': 'dario-amodei',
  'daniela amodei': 'dario-amodei',
  'demis hassabis': 'demis-hassabis',
  'jensen huang': 'jensen-huang',
  'lisa su': 'lisa-su',
  'garrett camp': 'garrett-camp',
  'travis kalanick': 'travis-kalanick',
  'kevin systrom': 'kevin-systrom',
  'mike krieger': 'mike-krieger',
  'nathan blecharczyk': 'nathan-blecharczyk',
  'sheryl sandberg': 'sheryl-sandberg',
  'dustin moskovitz': 'dustin-moskovitz',
  'eduardo saverin': 'eduardo-saverin',
  'larry page': 'larry-page',
  'sergey brin': 'sergey-brin',
  'jack ma': 'jack-ma',
  'elon musk': 'elon-musk',
  'sundar pichai': 'sundar-pichai',
  'satya nadella': 'satya-nadella',
  'jeff bezos': 'jeff-bezos',
  'marc andreessen': 'marc-andreessen',
  'brian chesky': 'brian-chesky',
  'joe gebbia': 'joe-gebbia',
  'andy grove': 'andy-grove',
  'gordon moore': 'gordon-moore',
  'bill gates': 'bill-gates',
  'steve jobs': 'steve-jobs',
  'steve wozniak': 'steve-wozniak',
  'paul allen': 'paul-allen',
  'michael dell': 'michael-dell',
  'reed hastings': 'reed-hastings',
  'mark zuckerberg': 'mark-zuckerberg',
  'ada lovelace': 'ada-lovelace',
  'alan turing': 'alan-turing',
  'grace hopper': 'grace-hopper',
  'claude shannon': 'claude-shannon',
  'douglas engelbart': 'douglas-engelbart',
  'linus torvalds': 'linus-torvalds',
  // traders
  'jesse livermore': 'jesse-livermore',
  'bernard baruch': 'bernard-baruch',
  'benjamin graham': 'benjamin-graham',
  'warren buffett': 'warren-buffett',
  'peter lynch': 'peter-lynch',
  'william oneil': 'william-oneil',
  'jim rogers': 'jim-rogers',
  'richard dennis': 'richard-dennis',
  'ed seykota': 'ed-seykota',
  'michael marcus': 'michael-marcus',
  'bruce kovner': 'bruce-kovner',
  'larry hite': 'larry-hite',
  'bill dunn': 'bill-dunn',
  'marty schwartz': 'marty-schwartz',
  'linda bradford raschke': 'linda-raschke',
  'george soros': 'george-soros',
  'ray dalio': 'ray-dalio',
  'david tepper': 'david-tepper',
  'bill ackman': 'bill-ackman',
  'mark minervini': 'mark-minervini',
  'jim simons': 'jim-simons',
  'cliff asness': 'cliff-asness',
  'rakesh jhunjhunwala': 'rakesh-jhunjhunwala',
  'andy krieger': 'andy-krieger',
  'bill miller': 'bill-miller',
  'stanley druckenmiller': 'stanley-druckenmiller',
  'paul tudor jones': 'paul-tudor-jones',
  'carl icahn': 'carl-icahn',
};
Object.entries(aliases).forEach(([alias, slug]) => {
  const entry = [...leadersJson, ...tradersJson, ...sportsJson, ...cricketJson, ...scientistsJson]
    .find(e => e.slug === slug);
  if (entry) aliasIndex.set(alias, entry);
});

/**
 * Look up a JSON entry by the name from the old TS data.
 * Returns the JSON entry if a matching MD bio exists, or undefined if not.
 */
export function getJsonBioByName(name: string): LeaderEntry | undefined {
  const key = name.toLowerCase();
  return aliasIndex.get(key) || nameIndex.get(key);
}

/**
 * Look up a JSON entry by slug.
 */
export function getJsonBioBySlug(slug: string): LeaderEntry | undefined {
  return [...leadersJson, ...tradersJson, ...sportsJson, ...cricketJson, ...scientistsJson]
    .find(e => e.slug === slug);
}

export function getAllLeaders(): LeaderEntry[] {
  return [...leadersJson, ...tradersJson, ...sportsJson, ...cricketJson, ...scientistsJson];
}

export function getLeaderBySlug(slug: string): LeaderEntry | undefined {
  return getAllLeaders().find(l => l.slug === slug);
}

export function getLeadersByCategory(category: string): LeaderEntry[] {
  switch (category) {
    case 'leaders': return leadersJson;
    case 'traders': return tradersJson;
    case 'sports': return sportsJson;
    case 'cricket': return cricketJson;
    case 'scientists': return scientistsJson;
    default: return getAllLeaders();
  }
}