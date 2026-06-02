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

// Extract structured sections with subsections
function parseSections(content) {
  const sections = {};
  const lines = content.split('\n');
  let currentSection = null;
  let currentSubsection = null;
  let buffer = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Main section header: ## 1. THE HOOK or ## 1. THE HOOK — Subtitle
    const mainMatch = line.match(/^##\s+\d+\.\s+(.+)/);
    if (mainMatch) {
      if (currentSection) {
        const body = buffer.trim();
        if (currentSubsection) {
          sections[currentSection].subsections[currentSubsection] = body;
        } else {
          sections[currentSection].body = body;
        }
      }
      currentSection = mainMatch[1].trim().toUpperCase();
      currentSubsection = null;
      buffer = '';
      if (!sections[currentSection]) {
        sections[currentSection] = { body: '', subsections: {} };
      }
      continue;
    }
    
    // Subsection header: ### PayPal Sale (2002)
    const subMatch = line.match(/^###\s+(.+)/);
    if (subMatch && currentSection) {
      if (buffer.trim()) {
        if (currentSubsection) {
          sections[currentSection].subsections[currentSubsection] = buffer.trim();
        } else {
          sections[currentSection].body += (sections[currentSection].body ? '\n\n' : '') + buffer.trim();
        }
      }
      currentSubsection = subMatch[1].trim();
      buffer = '';
      continue;
    }
    
    // Accumulate body text
    if (line.trim() && !line.startsWith('---')) {
      buffer += line + '\n';
    }
  }
  
  // Flush last buffer
  if (currentSection && buffer.trim()) {
    if (currentSubsection) {
      sections[currentSection].subsections[currentSubsection] = buffer.trim();
    } else {
      sections[currentSection].body += (sections[currentSection].body ? '\n\n' : '') + buffer.trim();
    }
  }
  
  return sections;
}

function extractQuotes(content) {
  const quotes = [];
  const matches = content.match(/"([^"]{10,500})"/g);
  if (matches) {
    matches.forEach(q => {
      const clean = q.replace(/^"|"$/g, '').trim();
      if (clean.length > 20 && clean.length < 400) quotes.push(clean);
    });
  }
  return [...new Set(quotes)].slice(0, 12);
}

function extractActionableSteps(content) {
  const steps = [];
  const stepRegex = /^\d+\.\s+\*\*([^*]+)\*\*\s*[-—:]?\s*([\s\S]*?)(?=^\d+\.\s+\*\*|^\*\*|$)/gm;
  let m;
  while ((m = stepRegex.exec(content)) !== null) {
    steps.push({ title: m[1].trim(), description: m[2].replace(/\n+/g, ' ').trim() });
  }
  if (steps.length === 0) {
    // Fallback for numbered list with bold
    const altRegex = /(\d+)\.\s+\*\*([^*]+)\*\*\s*[-—]?\s*([^\n]+)/g;
    while ((m = altRegex.exec(content)) !== null) {
      steps.push({ title: m[2].trim(), description: m[3].trim() });
    }
  }
  return steps.slice(0, 10);
}

function extractMilestonesFromSubsections(sections) {
  const milestones = [];
  
  // From THE TEST subsections (each ### has a title like "PayPal Sale (2002)")
  const testSection = Object.keys(sections).find(k => k.includes('TEST'));
  if (testSection && sections[testSection].subsections) {
    Object.entries(sections[testSection].subsections).forEach(([title, body]) => {
      const yearMatch = title.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
      if (yearMatch) {
        milestones.push({ year: yearMatch[1], title: title.replace(/\(\d{4}\)/, '').trim(), event: body.slice(0, 300).trim() });
      }
    });
  }
  
  // From THE FIRE subsections (### Year Range or ### Event (Year))
  const fireSection = Object.keys(sections).find(k => k.includes('FIRE'));
  if (fireSection && sections[fireSection].subsections) {
    Object.entries(sections[fireSection].subsections).forEach(([title, body]) => {
      const yearMatch = title.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
      if (yearMatch && !milestones.find(m => m.year === yearMatch[1] && m.title === title)) {
        milestones.push({ year: yearMatch[1], title: title.replace(/\(\d{4}\)/, '').trim(), event: body.slice(0, 300).trim() });
      }
    });
  }
  
  return milestones;
}

function extractKeyStats(content) {
  const stats = {};
  
  // Net worth
  const netWorth = content.match(/(?:worth|valued at|net worth)[^\n]*?\$([0-9,.]+)\s*(trillion|billion|million)/i);
  if (netWorth) stats.netWorth = '$' + netWorth[1] + ' ' + netWorth[2];
  
  // Education
  const edu = content.match(/(?:studied at|graduated from|attended|degree from|University of|College of)[^\n.]*/i);
  if (edu) stats.education = edu[0].trim();
  
  // Key roles / positions
  const roles = content.match(/(?:CEO|Founder|President|Chairman|Director|VP|Vice President|CTO|COO|CFO|General|Prime Minister|President|King|Queen)[^\n.]*/gi);
  if (roles) stats.roles = [...new Set(roles.slice(0, 5))];
  
  // Birth date (more flexible)
  const born = content.match(/(?:born|birth)[^\n]*?([A-Z][a-z]+\s+\d{1,2},?\s+\d{4}|\d{4})/i);
  if (born) stats.birthDate = born[1].trim();
  
  // Death date
  const died = content.match(/(?:died|passed away|death)[^\n]*?([A-Z][a-z]+\s+\d{1,2},?\s+\d{4}|\d{4})/i);
  if (died) stats.deathDate = died[1].trim();
  
  return stats;
}

function parseMd(content) {
  // Extract name from H1
  const h1Match = content.match(/^#\s+(.+?)(?:\s+[-\u2014]\s+(.+))?\s*$/m);
  const name = h1Match ? h1Match[1].trim() : 'Unknown';
  const subtitle = h1Match && h1Match[2] ? h1Match[2].trim() : '';
  
  // Parse structured sections
  const sections = parseSections(content);
  
  // Extract quotes
  const quotes = extractQuotes(content);
  
  // Extract actionable steps
  const actionableSteps = extractActionableSteps(content);
  
  // Extract milestones from subsections
  const milestones = extractMilestonesFromSubsections(sections);
  
  // Extract key stats
  const stats = extractKeyStats(content);
  
  // Build a rich biography object
  const hookSection = Object.keys(sections).find(k => k.includes('HOOK'));
  const originSection = Object.keys(sections).find(k => k.includes('ORIGIN'));
  const fireSection = Object.keys(sections).find(k => k.includes('FIRE'));
  const grindSection = Object.keys(sections).find(k => k.includes('GRIND'));
  const testSection = Object.keys(sections).find(k => k.includes('TEST'));
  const philosophySection = Object.keys(sections).find(k => k.includes('PHILOSOPHY'));
  const legacySection = Object.keys(sections).find(k => k.includes('LEGACY'));
  const finalSection = Object.keys(sections).find(k => k.includes('FINAL') || k.includes('MOTIVATION'));
  
  // Get all section bodies (full text)
  const getBody = (key) => sections[key] ? sections[key].body : '';
  const getSubs = (key) => sections[key] ? sections[key].subsections : {};
  
  // Build flat bio text (no MD formatting) for display
  const bioParts = [];
  if (hookSection) bioParts.push(getBody(hookSection));
  if (originSection) bioParts.push(getBody(originSection));
  if (fireSection) bioParts.push(getBody(fireSection));
  if (grindSection) bioParts.push(getBody(grindSection));
  if (testSection) bioParts.push(getBody(testSection));
  if (philosophySection) bioParts.push(getBody(philosophySection));
  if (legacySection) bioParts.push(getBody(legacySection));
  if (finalSection) bioParts.push(getBody(finalSection));
  const bio = bioParts.filter(Boolean).join('\n\n');
  
  // Determine born/died
  let born = stats.birthDate || '';
  let died = stats.deathDate || '';
  
  // Fallback: extract from ORIGIN text
  if (!born) {
    const origin = getBody(originSection);
    const bornMatch = origin?.match(/(?:was\s+)?(?:born\s+)([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i);
    if (bornMatch) born = bornMatch[1].trim();
    else {
      const yearMatch = origin?.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
      if (yearMatch) born = yearMatch[1];
    }
  }
  
  // Extract nationality
  let nationality = '';
  const origin = getBody(originSection);
  const natMatch = origin?.match(/(?:was\s+)?(?:born\s+)?(?:in\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)(?:,|\s+to)/) || 
                   origin?.match(/(American|British|Indian|Chinese|German|French|Russian|Japanese|Australian|Canadian|Italian|Spanish|Brazilian|South African|Dutch|Swedish|Norwegian|Danish|Finnish|Polish|Portuguese|Irish|Scottish|Welsh|Mexican|Argentine|Swiss|Austrian|Belgian|Turkish|Greek|Israeli|Korean|Indonesian|Malaysian|Singaporean|Thai|Vietnamese|Filipino|Pakistani|Bangladeshi|Sri Lankan|Nepalese|Afghan|Iranian|Iraqi|Syrian|Jordanian|Lebanese|Egyptian|Libyan|Tunisian|Algerian|Moroccan|Sudanese|Ethiopian|Kenyan|Nigerian|Ghanaian|Ugandan|Zimbabwean|Zambian|Botswanan|Namibian|Zimbabwean|Malagasy|Mauritian|Seychellois|Comoran|Jamaican|Trinidadian|Barbadian|Guyanese|Grenadian|Vincentian|Lucian|Dominican|Antiguan|Bermudian|Haitian|Cuban|Dominican|Costa Rican|Panamanian|Guatemalan|Belizean|Salvadoran|Honduran|Nicaraguan|Colombian|Venezuelan|Ecuadorian|Peruvian|Bolivian|Paraguayan|Uruguayan|Surinamese|Guianese|Omani|Qatari|Emirati|Kuwaiti|Bahraini|Saudi|Yemeni|Lebanese|Palestinian|Armenian|Georgian|Azerbaijani|Kazakh|Uzbek|Tajik|Kyrgyz|Turkmen|Mongolian|Bhutanese|Maldivian|Laotian|Cambodian|Myanmarese|Burmese|Bruneian|Timorese|Papua New Guinean|Solomon Islander|Vanuatu|Fijian)/);
  if (natMatch) nationality = natMatch[1].trim();
  
  return { 
    name, subtitle, bio, quotes, actionableSteps, milestones, born, died, nationality, 
    sections: {
      hook: getBody(hookSection),
      origin: getBody(originSection),
      fire: getBody(fireSection),
      grind: getBody(grindSection),
      test: getBody(testSection),
      philosophy: getBody(philosophySection),
      legacy: getBody(legacySection),
      final: getBody(finalSection),
      hookSubsections: getSubs(hookSection),
      originSubsections: getSubs(originSection),
      fireSubsections: getSubs(fireSection),
      grindSubsections: getSubs(grindSection),
      testSubsections: getSubs(testSection),
      philosophySubsections: getSubs(philosophySection),
      legacySubsections: getSubs(legacySection),
      finalSubsections: getSubs(finalSection),
    },
    stats
  };
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
  
  // Build rich entry
  const entry = {
    id: categories[category].length + 1,
    name: parsed.name,
    slug: slug,
    subtitle: parsed.subtitle,
    born: parsed.born,
    died: parsed.died,
    nationality: parsed.nationality,
    role: parsed.subtitle,
    company: '',
    era: '',
    yearStart: parsed.born ? parseInt((parsed.born.match(/\d{4}/) || ['0'])[0]) || 0 : 0,
    yearEnd: parsed.died ? parseInt((parsed.died.match(/\d{4}/) || ['Present'])[0]) || 'Present' : 'Present',
    
    // Rich biography data
    bio: parsed.bio,
    hook: parsed.sections.hook,
    origin: parsed.sections.origin,
    fire: parsed.sections.fire,
    grind: parsed.sections.grind,
    test: parsed.sections.test,
    philosophy: parsed.sections.philosophy,
    legacy: parsed.sections.legacy,
    finalMotivation: parsed.sections.final,
    
    // Subsections (key events with year context)
    subsections: {
      fire: parsed.sections.fireSubsections,
      grind: parsed.sections.grindSubsections,
      test: parsed.sections.testSubsections,
      legacy: parsed.sections.legacySubsections,
    },
    
    // Key data points
    quotes: parsed.quotes,
    milestones: parsed.milestones,
    actionableSteps: parsed.actionableSteps,
    
    // Stats
    stats: parsed.stats,
    
    image: `/images/${category === 'cricket' ? 'cricket/' : category === 'sports' ? 'sports/' : category === 'traders' ? 'traders/' : category === 'scientists' ? 'scientists/' : ''}${slug}.jpg`,
    category: category
  };
  
  // Remove empty fields for cleaner JSON
  Object.keys(entry).forEach(k => {
    const v = entry[k];
    if (typeof v === 'string' && !v) delete entry[k];
    if (Array.isArray(v) && v.length === 0) delete entry[k];
    if (typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length === 0) delete entry[k];
  });
  
  categories[category].push(entry);
  summary.push({ slug, category, name: parsed.name, born: parsed.born, hasBio: !!parsed.bio, quoteCount: parsed.quotes.length, milestoneCount: parsed.milestones.length });
});

// Write category JSON files
Object.entries(categories).forEach(([cat, items]) => {
  const outPath = path.join(OUT_DIR, `${cat}.json`);
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
  console.log(`✓ ${cat}.json: ${items.length} entries`);
});

// Write index.json with metadata
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

// Data quality report
console.log('\n=== Data Quality ===');
const all = [...categories.leaders, ...categories.traders, ...categories.sports, ...categories.cricket, ...categories.scientists];
const hasBio = all.filter(l => l.bio && l.bio.length > 50).length;
const hasQuotes = all.filter(l => l.quotes && l.quotes.length > 0).length;
const hasMilestones = all.filter(l => l.milestones && l.milestones.length > 0).length;
const hasSteps = all.filter(l => l.actionableSteps && l.actionableSteps.length > 0).length;
const hasSubs = all.filter(l => l.subsections && Object.keys(l.subsections).some(k => Object.keys(l.subsections[k]).length > 0)).length;
console.log(`Total: ${all.length}`);
console.log(`Rich bio (>50 chars): ${hasBio} (${Math.round(hasBio/all.length*100)}%)`);
console.log(`Has quotes: ${hasQuotes} (${Math.round(hasQuotes/all.length*100)}%)`);
console.log(`Has milestones: ${hasMilestones} (${Math.round(hasMilestones/all.length*100)}%)`);
console.log(`Has actionable steps: ${hasSteps} (${Math.round(hasSteps/all.length*100)}%)`);
console.log(`Has subsections: ${hasSubs} (${Math.round(hasSubs/all.length*100)}%)`);