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

// Leader bios: merge old TS bio with new JSON content
export const enrichedBioData = bioData.map((bio, i) => {
  const leader = leaders[i];
  if (!leader) return bio;
  const jsonEntry = json.getJsonBioByName(leader.name);
  if (!jsonEntry) return bio;
  return {
    ...bio,
    bio: jsonEntry.bio || bio.bio,
    quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
  };
});

// Trader bios: merge old TS bio with new JSON content
export const enrichedTraderBioData = traderBioData.map((bio, i) => {
  const trader = traders[i];
  if (!trader) return bio;
  const jsonEntry = json.getJsonBioByName(trader.name);
  if (!jsonEntry) return bio;
  return {
    ...bio,
    bio: jsonEntry.bio || bio.bio,
    quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
  };
});

// Athlete bios: merge old TS bio with new JSON content
export const enrichedAthleteBioData = athleteBioData.map((bio, i) => {
  const athlete = athletes[i];
  if (!athlete) return bio;
  const jsonEntry = json.getJsonBioByName(athlete.name);
  if (!jsonEntry) return bio;
  return {
    ...bio,
    bio: jsonEntry.bio || bio.bio,
    quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
  };
});

// Cricketer bios: merge old TS bio with new JSON content
export const enrichedCricketerBioData = cricketerBioData.map((bio, i) => {
  const cricketer = cricketers[i];
  if (!cricketer) return bio;
  const jsonEntry = json.getJsonBioByName(cricketer.name);
  if (!jsonEntry) return bio;
  return {
    ...bio,
    bio: jsonEntry.bio || bio.bio,
    quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
  };
});

// Scientist bios: merge old TS bio with new JSON content
export const enrichedScientistBioData = scientistBioData.map((bio, i) => {
  const scientist = scientists[i];
  if (!scientist) return bio;
  const jsonEntry = json.getJsonBioByName(scientist.name);
  if (!jsonEntry) return bio;
  return {
    ...bio,
    bio: jsonEntry.bio || bio.bio,
    quotes: (jsonEntry.quotes?.length ?? 0) > 0 ? jsonEntry.quotes : bio.quotes,
  };
});

// Export all enriched data
export { leaders, traders, athletes, cricketers, scientists };
export { enrichedBioData as bioData, enrichedTraderBioData as traderBioData, enrichedAthleteBioData as athleteBioData, enrichedCricketerBioData as cricketerBioData, enrichedScientistBioData as scientistBioData };
export { json as jsonLoader };
