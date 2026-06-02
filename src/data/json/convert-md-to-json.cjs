const fs = require('fs');
const path = require('path');

const MD_DIR = path.join(__dirname, '..', 'md');
const OUT_DIR = __dirname;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Category detection by filename
const CRICKET_NAMES = new Set([
  'adam-gilchrist','alastair-cook','anil-kumble','babar-azam','ben-stokes',
  'brian-lara','curtly-ambrose','dale-steyn','dennis-lillee','don-bradman',
  'glenn-mcgrath','ian-botham','imran-khan','inzamam-ul-haq','james-anderson',
  'javed-miandad','jasprit-bumrah','joel-garner','joe-root','kapil-dev',
  'kumar-sangakkara','mahela-jayawardene','malcolm-marshall','mitchell-starc',
  'muttiah-muralitharan','pat-cummins','rahul-dravid','ravindra-jadeja',
  'ricky-ponting','sachin-tendulkar','sanath-jayasuriya','shane-warne',
  'shoaib-akhtar','sourav-ganguly','stuart-broad','sunil-gavaskar','viv-richards',
  'waqar-younis','wasim-akram','w-g-grace','yashasvi-jaiswal','yuvraj-singh'
]);

const SPORTS_NAMES = new Set([
  'allyson-felix','ayrton-senna','babe-ruth','bill-bowerman','bill-russell',
  'cristiano-ronaldo','diego-maradona','diana-taurasi','johan-cruyff',
  'kobe-bryant','lebron-james','lionel-messi','michael-jordan',
  'michael-phelps','muhammad-ali','nadia-comaneci','novak-djokovic','pele',
  'rafael-nadal','roger-federer','serena-williams','simone-biles','tiger-woods',
  'usain-bolt','wayne-gretzky','zinedine-zidane'
]);

const TRADER_NAMES = new Set([
  'andy-krieger','benjamin-graham','bernard-baruch','bill-ackman','bill-dunn',
  'bill-miller','bruce-kovner','cathie-wood','charlie-munger','cliff-asness',
  'david-einhorn','david-tepper','ed-seykota','george-soros','howard-marks',
  'jack-dorsey','james-simons','jesse-livermore','joe-lewis','larry-hite',
  'linda-raschke','marty-schwartz','michael-marcus','nassim-taleb','peter-lynch',
  'peter-thiel','ray-dalio','richard-dennis','rakesh-jhunjhunwala','stanley-druckenmiller',
  'warren-buffett','william-oneil','w-d-gann'
]);

const SCIENTIST_NAMES = new Set([
  'ada-lovelace','al-khwarizmi','alan-turing','albert-einstein','alexander-fleming',
  'archimedes','aristotle','benjamin-franklin','carl-sagan','charles-darwin',
  'claude-shannon','demis-hassabis','dmitri-mendeleev','douglas-engelbart',
  'galileo-galilei','geoffrey-hinton','grace-hopper','gregor-mendel','isaac-newton',
  'james-clerk-maxwell','james-watson','john-von-neumann','katalin-kariko',
  'louis-pasteur','marie-curie','niels-bohr','nikola-tesla','richard-feynman',
  'rosalind-franklin','stephen-hawking','tim-berners-lee','vint-cerf','werner-heisenberg',
  'yann-lecun','yoshua-bengio'
]);

// Era mapping based on birth year
function getEra(bornStr, category) {
  const yearMatch = bornStr.match(/(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1]) : 2000;
  
  if (category === 'cricket') {
    if (year < 1900) return 'Early Masters';
    if (year < 1960) return 'Golden Age';
    if (year < 1985) return 'Modern Legend';
    return 'Modern Era';
  }
  if (category === 'traders') {
    if (year < 1900) return 'Early Masters';
    if (year < 1950) return 'Value & Growth';
    if (year < 1970) return 'Trend & System';
    if (year < 1990) return 'Macro & Forex';
    if (year < 2000) return 'Hedge Fund Era';
    return 'Quant Revolution';
  }
  if (category === 'scientists') {
    if (year < 1600) return 'Foundational Giants';
    if (year < 1900) return 'Revolutionary Thinkers';
    if (year < 1950) return 'Foundational Giants';
    return 'Modern Influencers';
  }
  if (category === 'sports') {
    if (year < 1940) return 'Golden Age';
    if (year < 1970) return 'Golden Age';
    return 'Modern Era';
  }
  // leaders
  if (year < 1940) return 'The Foundation';
  if (year < 1960) return 'The Early Machines';
  if (year < 1980) return 'The Personal Computer';
  if (year < 1995) return 'The Internet Age';
  if (year < 2005) return 'Dot-Com & Mobile';
  if (year < 2015) return 'Cloud & AI';
  return 'The Frontier';
}

// Sport detection for athletes
function getSport(name, content) {
  const lower = (name + ' ' + content.slice(0, 2000)).toLowerCase();
  if (lower.includes('basketball') || lower.includes('nba') || name.match(/jordan|lebron|curry|chamberlain|taurasi|bryant/i)) return 'Basketball';
  if (lower.includes('soccer') || lower.includes('football') && !lower.includes('american') || name.match(/ronaldo|messi|pele|marta|maradona|cruyff|zidane/i)) return 'Soccer';
  if (lower.includes('tennis') || name.match(/federer|djokovic|nadal|serena|evert|navratilova|king/i)) return 'Tennis';
  if (lower.includes('athletics') || lower.includes('sprint') || lower.includes('olympic') || name.match(/bolt|owens|lewis|felix/i)) return 'Athletics';
  if (lower.includes('swimming') || lower.includes('swimmer') || name.match(/phelps|ledecky|spitz/i)) return 'Swimming';
  if (lower.includes('american football') || lower.includes('nfl') || name.match(/brady|mahomes|rice|manning/i)) return 'American Football';
  if (lower.includes('ice hockey') || lower.includes('nhl') || name.match(/gretzky|orr|crosby/i)) return 'Ice Hockey';
  if (lower.includes('gymnastics') || lower.includes('gymnast') || name.match(/biles|comaneci/i)) return 'Gymnastics';
  if (lower.includes('golf') || lower.includes('pga') || name.match(/woods|nicklaus/i)) return 'Golf';
  if (lower.includes('formula 1') || lower.includes('f1') || lower.includes('racing') || name.match(/senna/i)) return 'Formula 1';
  if (lower.includes('baseball') || name.match(/ruth/i)) return 'Baseball';
  if (lower.includes('boxing') || lower.includes('boxer') || name.match(/ali/i)) return 'Boxing';
  return 'Other Sports';
}

// Strategy detection for traders
function getStrategy(name, content) {
  const lower = content.slice(0, 2000).toLowerCase();
  if (lower.includes('value investing') || lower.includes('value investor')) return 'Value Investing';
  if (lower.includes('trend following') || lower.includes('systematic')) return 'Trend Following';
  if (lower.includes('global macro') || lower.includes('macro')) return 'Global Macro';
  if (lower.includes('activist') || lower.includes('activism')) return 'Activist Investing';
  if (lower.includes('quant') || lower.includes('algorithm') || lower.includes('mathematical')) return 'Quant';
  if (lower.includes('contrarian')) return 'Contrarian';
  if (lower.includes('breakout') || lower.includes('momentum')) return 'Momentum / Breakout';
  return 'Multi-Strategy';
}

// Field detection for scientists
function getField(name, content) {
  const lower = content.slice(0, 2000).toLowerCase();
  if (lower.includes('physics') || name.match(/newton|einstein|tesla|hawking|feynman|bohr|heisenberg|curie|maxwell|planck/i)) return 'Physics';
  if (lower.includes('mathematics') || lower.includes('mathematician') || name.match(/lovelace|khwarizmi|turing|johnson|hypatia/i)) return 'Mathematics';
  if (lower.includes('computer science') || lower.includes('computing') || lower.includes('artificial intelligence') || lower.includes(' ai ') || name.match(/berners-lee|hinton|bengio|lecun|ng|hassabis|cerf|shannon/i)) return 'Computer Science & AI';
  if (lower.includes('biology') || lower.includes('genetic') || name.match(/darwin|mendel|goodall|doudna|pasteur/i)) return 'Biology';
  if (lower.includes('chemistry') || lower.includes('chemical') || name.match(/mendeleev|curie|franklin/i)) return 'Chemistry';
  if (lower.includes('economics') || name.match(/acemoglu|johnson|robinson/i)) return 'Economics';
  return 'Other';
}

// Role extraction from subtitle
function getRole(subtitle, category) {
  if (!subtitle) return '';
  // Extract role from subtitle like "The Man Who Broke the Bank of England"
  // or use category-specific defaults
  return subtitle;
}

function detectCategory(slug, content) {
  if (CRICKET_NAMES.has(slug)) return 'cricket';
  if (SPORTS_NAMES.has(slug)) return 'sports';
  if (TRADER_NAMES.has(slug)) return 'traders';
  if (SCIENTIST_NAMES.has(slug)) return 'scientists';
  
  const lower = content.toLowerCase();
  const first2000 = lower.slice(0, 2000);
  
  if (first2000.includes('cricket') || first2000.includes('wicket') || first2000.includes('batsman') || first2000.includes('bowler')) return 'cricket';
  if (first2000.includes('trader') || first2000.includes('investor') || first2000.includes('hedge fund') || first2000.includes('portfolio') || first2000.includes('stock market') || first2000.includes('wall street')) return 'traders';
  if (first2000.includes('physicist') || first2000.includes('mathematician') || first2000.includes('biologist') || first2000.includes('chemist') || first2000.includes('scientist') || first2000.includes('nobel prize') || first2000.includes('algorithm') || first2000.includes('computer science') || first2000.includes('astronomer') || first2000.includes('geneticist')) return 'scientists';
  if (first2000.includes('basketball') || first2000.includes('soccer') || first2000.includes('football') || first2000.includes('tennis') || first2000.includes('golf') || first2000.includes('formula 1') || first2000.includes('olympic') || first2000.includes('athlete') || first2000.includes('swimmer') || first2000.includes('runner') || first2000.includes('boxer') || first2000.includes('baseball') || first2000.includes('hockey') || first2000.includes('world cup') || first2000.includes('grand slam') || first2000.includes('championship') || first2000.includes('medalist') || first2000.includes('nba') || first2000.includes('f1') || first2000.includes('ufc') || first2000.includes('gymnast') || first2000.includes('marathon') || first2000.includes('sprint')) return 'sports';
  
  return 'leaders';
}

function parseMd(content) {
  const h1Match = content.match(/^#\s+(.+?)(?:\s+[-\u2014]\s+(.+))?\s*$/m);
  const name = h1Match ? h1Match[1].trim() : 'Unknown';
  const subtitle = h1Match && h1Match[2] ? h1Match[2].trim() : '';
  
  // Extract sections (handle both \n\n and single \n after section header)
  const sections = {};
  // First try with blank line after header (full bios)
  const sectionRegex = /##\s+(\d+)\.\s+(.+?)\n+([\s\S]*?)(?=\n##\s+\d+\.|\n---\s*$|$)/g;
  let m;
  while ((m = sectionRegex.exec(content)) !== null) {
    const sectionName = m[2].trim().toUpperCase();
    let body = m[3].trim();
    // Stop at --- separator if present
    if (body.endsWith('---')) body = body.slice(0, -3).trim();
    sections[sectionName] = body;
  }
  
  // Build structured bio
  const bioParts = [];
  const sectionOrder = ['THE HOOK','ORIGIN','THE FIRE','THE GRIND','THE TEST','THE PHILOSOPHY','THE LEGACY','FINAL MOTIVATION'];
  sectionOrder.forEach(title => {
    const key = Object.keys(sections).find(k => k.includes(title));
    if (key) bioParts.push(`**${key}**\n\n${sections[key]}`);
  });
  const bio = bioParts.join('\n\n---\n\n');
  
  // Extract quotes
  const quotes = [];
  const phil = sections['THE PHILOSOPHY'] || sections['THE PHILOSOPHY — STEALABLE WISDOM'] || '';
  const quoteMatches = phil.match(/"([^"]+)"/g);
  if (quoteMatches) quoteMatches.forEach(q => quotes.push(q.replace(/"/g, '')));
  
  // Extract milestones from TEST section and LEGACY
  const milestones = [];
  const test = sections['THE TEST'] || sections['THE TEST — THE BREAKTHROUGH MOMENT'] || sections['THE TEST — THE BREAKTHROUGH'] || '';
  const legacy = sections['THE LEGACY'] || sections['THE LEGACY — THE FOOTPRINT'] || sections['THE LEGACY'] || '';
  const combined = test + '\n' + legacy;
  
  // First try **YYYY**: event format
  const milestoneMatches = combined.match(/\*\*(\d{4}[^*]*)\*\*[:\s—\-]+([^\n]+)/g);
  if (milestoneMatches) {
    milestoneMatches.forEach(mm => {
      const parts = mm.match(/\*\*(\d{4}[^*]*)\*\*[:\s—\-]+([^\n]+)/);
      if (parts) {
        const yearMatch = parts[1].match(/(\d{4})/);
        if (yearMatch) milestones.push({ year: yearMatch[1], event: parts[2].trim() });
      }
    });
  }
  
  // If no structured milestones, extract year+sentence from narrative
  if (milestones.length === 0) {
    const sentences = combined.split(/(?<=[.!?])\s+/);
    sentences.forEach(s => {
      const yearMatch = s.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
      if (yearMatch && s.length < 250 && s.length > 20) {
        milestones.push({ year: yearMatch[1], event: s.trim() });
      }
    });
    // Cap to top 8 most informative
    milestones.splice(8);
  }
  
  // Extract dates
  const origin = sections['ORIGIN'] || sections['THE ORIGIN'] || sections['THE ORIGIN — THE BEFORE'] || '';
  let born = '';
  let died = '';
  const bornMatch = origin.match(/born\s+(?:on\s+)?([A-Za-z]+\s+\d+,?\s+\d{4}|\d{4})/i) || content.match(/born\s+(?:on\s+)?([A-Za-z]+\s+\d+,?\s+\d{4})/i);
  if (bornMatch) born = bornMatch[1].trim();
  const diedMatch = content.match(/died\s+(?:on\s+)?([A-Za-z]+\s+\d+,?\s+\d{4})/i) || content.match(/died\s+(?:on\s+)?(\d{4})/i);
  if (diedMatch) died = diedMatch[1].trim();
  
  // Extract nationality
  let nationality = '';
  const natMatch = origin.match(/(American|British|Indian|Chinese|German|French|Russian|Japanese|Australian|Canadian|Italian|Spanish|Brazilian|South African|Dutch|Swedish|Norwegian|Danish|Finnish|Polish|Portuguese|Irish|Scottish|Welsh|Mexican|Argentine|Swiss|Austrian|Belgian|Turkish|Greek|Israeli|Korean|Indonesian|Malaysian|Singaporean|Thai|Vietnamese|Filipino|Pakistani|Bangladeshi|Sri Lankan|Nepalese|Afghan|Iranian|Iraqi|Syrian|Jordanian|Lebanese|Egyptian|Hungarian|Czech|Romanian|Ukrainian|New Zealand|Icelandic|Estonian|Latvian|Lithuanian|Slovak|Slovenian|Croatian|Serbian|Bulgarian|Albanian|Moldovan|Georgian|Armenian|Azerbaijani|Kazakh|Uzbek|Saudi|Emirati|Qatari|Kuwaiti|Bahraini|Omani|Colombian|Venezuelan|Peruvian|Chilean|Ecuadorian|Bolivian|Paraguayan|Uruguayan|Costa Rican|Panamanian|Guatemalan|Honduran|Salvadoran|Nicaraguan|Cuban|Haitian|Dominican|Jamaican|Trinidadian|Barbadian|Guyanese|Ghanaian|Nigerian|Kenyan|Ugandan|Tanzanian|Ethiopian|Sudanese|Moroccan|Algerian|Tunisian|Libyan|Egyptian|Cameroonian|Senegalese|Ivorian|Zimbabwean|Zambian|Botswanan|Namibian|Rwandan|Congolese|Somali|Malagasy|Mauritian|Seychellois|Comoran|Palestinian|Kurdish|Tibetan|Kashmiri|Bengali|Punjabi|Tamil|Telugu|Kannada|Malayalam|Marathi|Gujarati|Rajasthani|Bhojpuri|Awadhi|Maithili|Odia|Assamese|Nepali|Sinhalese|Burmese|Khmer|Lao|Thai|Vietnamese|Filipino|Indonesian|Malaysian|Singaporean|Chinese|Japanese|Korean|Mongolian|Tibetan|Uyghur|Manchu|Cantonese|Hakka|Hokkien|Teochew|Fujianese|Shanghainese|Sichuanese|Hunanese|Cantonese|Taiwanese|Hong Kong|Macau)/i);
  if (natMatch) nationality = natMatch[1].trim();
  // Check for compound nationalities
  const compoundNat = origin.match(/(American|British|Indian|Chinese|German|French|Russian|Japanese|Australian|Canadian|Italian|Spanish|Brazilian|South African|Dutch|Swedish|Norwegian|Danish|Finnish|Polish|Portuguese|Irish|Scottish|Welsh|Hungarian|Czech|Romanian|Ukrainian|Israeli|Korean|Singaporean|Hong Kong|Taiwanese|Swiss|Austrian|Belgian|Turkish|Greek|Serbian|Croatian|Ukrainian|Georgian|Armenian|Azerbaijani|Kazakh|Saudi|Emirati|Colombian|Peruvian|Chilean|Jamaican|Trinidadian|Ghanaian|Nigerian|Kenyan|Ugandan|Zimbabwean|Zambian|Botswanan|Namibian|Rwandan|Congolese|Somali|Malagasy|Mauritian|Palestinian|Jordanian|Lebanese|Syrian|Iraqi|Iranian|Afghan|Pakistani|Bangladeshi|Sri Lankan|Nepalese|Burmese|Khmer|Lao|Thai|Vietnamese|Filipino|Indonesian|Malaysian|Estonian|Latvian|Lithuanian|Slovak|Slovenian|Bulgarian|Albanian|Moldovan|Icelandic|New Zealand|Serbian)-(American|British|Indian|Chinese|German|French|Russian|Japanese|Australian|Canadian|Italian|Spanish|Brazilian|South African|Dutch|Swedish|Norwegian|Danish|Finnish|Polish|Portuguese|Irish|Scottish|Welsh|Hungarian|Czech|Romanian|Ukrainian|Israeli|Korean|Swiss|Austrian|Belgian|Turkish|Greek|Serbian|Croatian|Georgian|Armenian|Azerbaijani|Kazakh|Saudi|Emirati|Colombian|Peruvian|Chilean|Jamaican|Ghanaian|Nigerian|Kenyan|Pakistani|Bangladeshi|Sri Lankan|Nepalese|Filipino|Indonesian|Malaysian|Thai|Vietnamese|Burmese|Afghan|Iranian|Iraqi|Syrian|Jordanian|Lebanese|Palestinian|Somali|Congolese|Rwandan|Zimbabwean|Zambian|Botswanan|Namibian|Ugandan|Tanzanian|Ghanaian|Nigerian|Ethiopian|Sudanese|Moroccan|Algerian|Tunisian|Libyan|Egyptian|Cameroonian|Senegalese|Ivorian|Mauritian|Malagasy|Seychellois|Comoran|Estonian|Latvian|Lithuanian|Slovak|Slovenian|Bulgarian|Albanian|Moldovan|Icelandic|New Zealand)/i);
  if (compoundNat) nationality = compoundNat[0];
  
  return { name, subtitle, bio, quotes, milestones, born, died, nationality, sections };
}

// Main processing
const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md') && !f.endsWith('-2.md') && f !== 'README.md' && f !== 'luminary-leaders-list.md');
const categories = { leaders: [], traders: [], sports: [], cricket: [], scientists: [] };
const summary = [];

files.forEach(filename => {
  const filepath = path.join(MD_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  const slug = filename.replace('.md', '');
  const category = detectCategory(slug, content);
  const parsed = parseMd(content);
  
  const entry = {
    id: categories[category].length + 1,
    name: parsed.name,
    slug: slug,
    subtitle: parsed.subtitle,
    bio: parsed.bio,
    quotes: parsed.quotes,
    milestones: parsed.milestones,
    born: parsed.born,
    died: parsed.died,
    nationality: parsed.nationality,
    role: parsed.subtitle || '',
    company: '',
    era: getEra(parsed.born, category),
    yearStart: parsed.born ? parseInt((parsed.born.match(/\d{4}/) || ['0'])[0]) || 0 : 0,
    yearEnd: parsed.died ? parseInt((parsed.died.match(/\d{4}/) || ['Present'])[0]) || 'Present' : 'Present',
    sport: category === 'sports' ? getSport(parsed.name, content) : undefined,
    strategy: category === 'traders' ? getStrategy(parsed.name, content) : undefined,
    field: category === 'scientists' ? getField(parsed.name, content) : undefined,
    nickname: '',
    markets: category === 'traders' ? [] : undefined,
    netWorth: '',
    image: `/images/${category === 'cricket' ? 'cricket/' : category === 'sports' ? 'sports/' : category === 'traders' ? 'traders/' : category === 'scientists' ? 'scientists/' : ''}${slug}.jpg`,
    category: category
  };
  
  // Remove undefined fields
  Object.keys(entry).forEach(k => entry[k] === undefined && delete entry[k]);
  
  categories[category].push(entry);
  summary.push({ slug, category, name: parsed.name, born: parsed.born });
});

// Write category JSON files
Object.entries(categories).forEach(([cat, items]) => {
  const outPath = path.join(OUT_DIR, `${cat}.json`);
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
  console.log(`✓ ${cat}.json: ${items.length} entries`);
});

// Write index.json
const index = {
  total: files.length,
  categories: {
    leaders: categories.leaders.length,
    traders: categories.traders.length,
    sports: categories.sports.length,
    cricket: categories.cricket.length,
    scientists: categories.scientists.length
  },
  items: summary
};
fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
console.log(`✓ index.json: ${files.length} total entries`);

console.log('\n=== Category Summary ===');
Object.entries(categories).forEach(([cat, items]) => {
  console.log(`${cat}: ${items.length}`);
});