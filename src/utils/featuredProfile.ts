import { leaders } from '../data/leaders';
import { traders } from '../data/traders';
import { athletes } from '../data/sports';
import { cricketers } from '../data/cricket';
import { scientists } from '../data/scientists';
import { bioData } from '../data/bios';
import { traderBioData } from '../data/traderBios';
import { athleteBioData } from '../data/sportsBios';
import { cricketerBioData } from '../data/cricketBios';
import { scientistBioData } from '../data/scientistBios';

interface ProfileItem {
  id: string;
  name: string;
  nickname?: string;
  role?: string;
  nationality?: string;
  born?: string;
  era?: string;
  image?: string;
}

interface BioEntry {
  nationality?: string;
  born?: string;
  era?: string;
  bio?: string;
  quotes?: string[];
}

export interface FeaturedProfile {
  id: string;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  name: string;
  nickname: string;
  image?: string;
  field: string;
  nationality: string;
  born: string;
  era: string;
  bio: string;
  quote: string;
}

const allProfiles: { items: ProfileItem[]; category: FeaturedProfile['category']; fieldKey: string; bioData: Record<string, BioEntry> }[] = [
  { items: leaders, category: 'leader', fieldKey: 'role', bioData: bioData },
  { items: traders, category: 'trader', fieldKey: 'strategy', bioData: traderBioData },
  { items: athletes, category: 'athlete', fieldKey: 'sport', bioData: athleteBioData },
  { items: cricketers, category: 'cricketer', fieldKey: 'role', bioData: cricketerBioData },
  { items: scientists, category: 'scientist', fieldKey: 'field', bioData: scientistBioData },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getFeaturedProfile(): FeaturedProfile {
  const dayOfYear = getDayOfYear();

  const flat: { item: ProfileItem; category: FeaturedProfile['category']; fieldKey: string; bioData: Record<string, BioEntry> }[] = [];
  for (const group of allProfiles) {
    for (const item of group.items) {
      flat.push({ item, category: group.category, fieldKey: group.fieldKey, bioData: group.bioData });
    }
  }

  const index = dayOfYear % flat.length;
  const selected = flat[index];
  const bio = selected.bioData[selected.item.id];

  return {
    id: selected.item.id,
    category: selected.category,
    name: selected.item.name,
    nickname: selected.item.nickname || '',
    image: selected.item.image,
    field: String((selected.item as unknown as Record<string, unknown>)[selected.fieldKey] ?? ''),
    nationality: bio?.nationality || selected.item.nationality || '',
    born: bio?.born || selected.item.born || '',
    era: bio?.era || selected.item.era || '',
    bio: bio?.bio ? bio.bio.split('\n\n')[0].substring(0, 280) + '...' : '',
    quote: bio?.quotes?.[0] || '',
  };
}
