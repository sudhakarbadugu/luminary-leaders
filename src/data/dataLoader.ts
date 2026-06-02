/** Data loader for JSON-based leader data */
// @ts-ignore - Vite handles JSON imports
import leadersData from './json/leaders.json';
// @ts-ignore
import tradersData from './json/traders.json';
// @ts-ignore
import sportsData from './json/sports.json';
// @ts-ignore
import cricketData from './json/cricket.json';
// @ts-ignore
import scientistsData from './json/scientists.json';
// @ts-ignore
import indexData from './json/index.json';

// Core entry type from JSON
export interface LeaderEntry {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  bio: string;
  quotes: string[];
  milestones: { year: string; event: string }[];
  born: string;
  died: string;
  nationality: string;
  role: string;
  company: string;
  era: string;
  yearStart: number;
  yearEnd: number | string;
  sport?: string;
  strategy?: string;
  field?: string;
  nickname?: string;
  markets?: string[];
  netWorth?: string;
  image: string;
  category: string;
}

export interface IndexEntry {
  slug: string;
  category: string;
  name: string;
  born: string;
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