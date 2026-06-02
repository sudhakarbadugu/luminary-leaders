import { leaders } from './leaders';
import { bioData } from './bios';
import { traders } from './traders';
import { traderBioData } from './traderBios';
import { athletes } from './sports';
import { athleteBioData } from './sportsBios';
import { cricketers } from './cricket';
import { cricketerBioData } from './cricketBios';
import { scientists } from './scientists';
import { scientistBioData } from './scientistBios';
import * as json from './dataLoader';

/** Legacy adapter: enriches old TS data with new JSON data */

function enrichRecord<T extends { id: number; bio: string; quotes?: string[] }>(
  record: Record<number, T>,
  people: { id: number; name: string }[]
): Record<number, T> {
  const result: Record<number, T> = {};
  for (const bio of Object.values(record)) {
    const person = people.find(p => p.id === bio.id);
    if (!person) {
      result[bio.id] = bio;
      continue;
    }
    const jsonEntry = json.getJsonBioByName(person.name);
    if (!jsonEntry) {
      result[bio.id] = bio;
      continue;
    }
    result[bio.id] = {
      ...bio,
      bio: jsonEntry.bio || bio.bio,
      quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
    };
  }
  return result;
}

export const enrichedBioData = enrichRecord(bioData, leaders);
export const enrichedTraderBioData = enrichRecord(traderBioData, traders);
export const enrichedAthleteBioData = enrichRecord(athleteBioData, athletes);
export const enrichedCricketerBioData = enrichRecord(cricketerBioData, cricketers);
export const enrichedScientistBioData = enrichRecord(scientistBioData, scientists);

// Export all enriched data
export { leaders, traders, athletes, cricketers, scientists };
export { enrichedBioData as bioData, enrichedTraderBioData as traderBioData, enrichedAthleteBioData as athleteBioData, enrichedCricketerBioData as cricketerBioData, enrichedScientistBioData as scientistBioData };
export { json as jsonLoader };
