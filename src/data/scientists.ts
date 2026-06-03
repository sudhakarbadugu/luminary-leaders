export interface Scientist {
  id: string;
  name: string;
  nickname: string;
  field: string;
  role: string;
  nationality: string;
  born: string;
  died?: string;
  era: string;
  image?: string;
}

export const scientistCategories = [
  { name: "Physics", count: 14 },
  { name: "Mathematics", count: 6 },
  { name: "Biology", count: 8 },
  { name: "Chemistry", count: 7 },
  { name: "Computer Science", count: 8 },
  { name: "AI & ML", count: 7 },
  { name: "Economics", count: 4 },
  { name: "Other", count: 6 },
];

export const scientists: Scientist[] = [
  // Foundational Giants (1-15)
  { id: "isaac-newton", name: "Isaac Newton", nickname: "The Father of Physics", field: "Physics & Mathematics", role: "Physics & Mathematics", nationality: "British", born: "1643", died: "1727", era: "Foundational Giants" },
  { id: "albert-einstein", name: "Albert Einstein", nickname: "The Mind of the Century", field: "Physics", role: "Physics", nationality: "German-American", born: "1879", died: "1955", era: "Foundational Giants", image: "/images/scientists/albert-einstein.jpg" },
  { id: "galileo-galilei", name: "Galileo Galilei", nickname: "The Father of Modern Science", field: "Astronomy & Physics", role: "Astronomy & Physics", nationality: "Italian", born: "1564", died: "1642", era: "Foundational Giants" },
  { id: "charles-darwin", name: "Charles Darwin", nickname: "The Naturalist", field: "Biology", role: "Biology", nationality: "British", born: "1809", died: "1882", era: "Foundational Giants" },
  { id: "marie-curie", name: "Marie Curie", nickname: "The Radiant Pioneer", field: "Physics & Chemistry", role: "Physics & Chemistry", nationality: "Polish-French", born: "1867", died: "1934", era: "Foundational Giants", image: "/images/scientists/marie-curie.jpg" },
  { id: "nikola-tesla", name: "Nikola Tesla", nickname: "The Wizard of Electricity", field: "Electrical Engineering", role: "Electrical Engineering", nationality: "Serbian-American", born: "1856", died: "1943", era: "Foundational Giants", image: "/images/scientists/nikola-tesla.jpg" },
  { id: "james-clerk-maxwell", name: "James Clerk Maxwell", nickname: "The Unifier", field: "Physics", role: "Physics", nationality: "British", born: "1831", died: "1879", era: "Foundational Giants" },
  { id: "archimedes", name: "Archimedes", nickname: "The Sage of Syracuse", field: "Mathematics & Physics", role: "Mathematics & Physics", nationality: "Greek", born: "287 BC", died: "212 BC", era: "Foundational Giants" },
  { id: "louis-pasteur", name: "Louis Pasteur", nickname: "The Microbe Hunter", field: "Biology & Chemistry", role: "Biology & Chemistry", nationality: "French", born: "1822", died: "1895", era: "Foundational Giants" },
  { id: "michael-faraday", name: "Michael Faraday", nickname: "The Experimental Genius", field: "Physics & Chemistry", role: "Physics & Chemistry", nationality: "British", born: "1791", died: "1867", era: "Foundational Giants" },
  { id: "dmitri-mendeleev", name: "Dmitri Mendeleev", nickname: "The Architect of Elements", field: "Chemistry", role: "Chemistry", nationality: "Russian", born: "1834", died: "1907", era: "Foundational Giants" },
  { id: "gregor-mendel", name: "Gregor Mendel", nickname: "The Father of Genetics", field: "Biology", role: "Biology", nationality: "Austrian", born: "1822", died: "1884", era: "Foundational Giants" },
  { id: "alan-turing", name: "Alan Turing", nickname: "The Codebreaker", field: "Computer Science", role: "Computer Science", nationality: "British", born: "1912", died: "1954", era: "Foundational Giants", image: "/images/scientists/alan-turing.jpg" },
  { id: "stephen-hawking", name: "Stephen Hawking", nickname: "The Cosmic Explorer", field: "Physics", role: "Physics", nationality: "British", born: "1942", died: "2018", era: "Foundational Giants", image: "/images/scientists/stephen-hawking.jpg" },
  { id: "richard-feynman", name: "Richard Feynman", nickname: "The Great Explainer", field: "Physics", role: "Physics", nationality: "American", born: "1918", died: "1988", era: "Foundational Giants" },
  // Revolutionary Thinkers (16-30)
  { id: "niels-bohr", name: "Niels Bohr", nickname: "The Atomic Architect", field: "Physics", role: "Physics", nationality: "Danish", born: "1885", died: "1962", era: "Revolutionary Thinkers" },
  { id: "werner-heisenberg", name: "Werner Heisenberg", nickname: "The Uncertainty", field: "Physics", role: "Physics", nationality: "German", born: "1901", died: "1976", era: "Revolutionary Thinkers" },
  { id: "rosalind-franklin", name: "Rosalind Franklin", nickname: "The Dark Lady of DNA", field: "Chemistry & Biology", role: "Chemistry & Biology", nationality: "British", born: "1920", died: "1958", era: "Revolutionary Thinkers", image: "/images/scientists/rosalind-franklin.jpg" },
  { id: "ada-lovelace", name: "Ada Lovelace", nickname: "The Enchantress of Number", field: "Mathematics & Computing", role: "Mathematics & Computing", nationality: "British", born: "1815", died: "1852", era: "Revolutionary Thinkers" },
  { id: "johannes-kepler", name: "Johannes Kepler", nickname: "The Laws of the Cosmos", field: "Astronomy", role: "Astronomy", nationality: "German", born: "1571", died: "1630", era: "Revolutionary Thinkers" },
  { id: "carl-linnaeus", name: "Carl Linnaeus", nickname: "The Name Giver", field: "Biology", role: "Biology", nationality: "Swedish", born: "1707", died: "1778", era: "Revolutionary Thinkers" },
  { id: "max-planck", name: "Max Planck", nickname: "The Quantum Pioneer", field: "Physics", role: "Physics", nationality: "German", born: "1858", died: "1947", era: "Revolutionary Thinkers" },
  { id: "ibn-al-haytham", name: "Ibn al-Haytham", nickname: "The Father of Optics", field: "Optics & Physics", role: "Optics & Physics", nationality: "Iraqi", born: "965", died: "1040", era: "Revolutionary Thinkers" },
  { id: "al-khwarizmi", name: "Al-Khwarizmi", nickname: "The Father of Algebra", field: "Mathematics", role: "Mathematics", nationality: "Persian", born: "780", died: "850", era: "Revolutionary Thinkers" },
  { id: "aristotle", name: "Aristotle", nickname: "The First Teacher", field: "Philosophy & Science", role: "Philosophy & Science", nationality: "Greek", born: "384 BC", died: "322 BC", era: "Revolutionary Thinkers" },
  { id: "jane-goodall", name: "Jane Goodall", nickname: "The Chimpanzee Guardian", field: "Primatology", role: "Primatology", nationality: "British", born: "1934", era: "Revolutionary Thinkers" },
  { id: "katherine-johnson", name: "Katherine Johnson", nickname: "The Human Computer", field: "Mathematics", role: "Mathematics", nationality: "American", born: "1918", died: "2020", era: "Revolutionary Thinkers", image: "/images/scientists/katherine-johnson.jpg" },
  { id: "chien-shiung-wu", name: "Chien-Shiung Wu", nickname: "The First Lady of Physics", field: "Physics", role: "Physics", nationality: "Chinese-American", born: "1912", died: "1997", era: "Revolutionary Thinkers" },
  { id: "hypatia", name: "Hypatia", nickname: "The Martyr of Knowledge", field: "Mathematics & Astronomy", role: "Mathematics & Astronomy", nationality: "Egyptian", born: "355", died: "415", era: "Revolutionary Thinkers" },
  { id: "tim-berners-lee", name: "Tim Berners-Lee", nickname: "The Web Weaver", field: "Computer Science", role: "Computer Science", nationality: "British", born: "1955", era: "Modern Influencers" },
  // Modern Influencers (31-50)
  { id: "demis-hassabis", name: "Demis Hassabis", nickname: "The AI Architect", field: "AI & Neuroscience", role: "AI & Neuroscience", nationality: "British", born: "1976", era: "Modern Influencers" },
  { id: "john-jumper", name: "John Jumper", nickname: "The Protein Decoder", field: "AI", role: "AI", nationality: "American", born: "1984", era: "Modern Influencers" },
  { id: "david-baker", name: "David Baker", nickname: "The Protein Designer", field: "Biochemistry", role: "Biochemistry", nationality: "American", born: "1962", era: "Modern Influencers" },
  { id: "geoffrey-hinton", name: "Geoffrey Hinton", nickname: "The Godfather of Deep Learning", field: "AI & Computer Science", role: "AI & Computer Science", nationality: "British-Canadian", born: "1947", era: "Modern Influencers" },
  { id: "jennifer-doudna", name: "Jennifer Doudna", nickname: "The Gene Editor", field: "Biochemistry", role: "Biochemistry", nationality: "American", born: "1964", era: "Modern Influencers" },
  { id: "emmanuelle-charpentier", name: "Emmanuelle Charpentier", nickname: "The CRISPR Pioneer", field: "Microbiology", role: "Microbiology", nationality: "French", born: "1968", era: "Modern Influencers" },
  { id: "eric-lander", name: "Eric Lander", nickname: "The Genome Mapper", field: "Genomics", role: "Genomics", nationality: "American", born: "1957", era: "Modern Influencers" },
  { id: "robert-langer", name: "Robert Langer", nickname: "The Bioengineer", field: "Biomedical Engineering", role: "Biomedical Engineering", nationality: "American", born: "1948", era: "Modern Influencers" },
  { id: "walter-willett", name: "Walter Willett", nickname: "The Nutrition Oracle", field: "Epidemiology", role: "Epidemiology", nationality: "American", born: "1945", era: "Modern Influencers" },
  { id: "ronald-c-kessler", name: "Ronald C. Kessler", nickname: "The Mind Researcher", field: "Psychiatry", role: "Psychiatry", nationality: "American", born: "1947", era: "Modern Influencers" },
  { id: "zhong-lin-wang", name: "Zhong Lin Wang", nickname: "The Nano Energy Pioneer", field: "Nanotechnology", role: "Nanotechnology", nationality: "Chinese-American", born: "1961", era: "Modern Influencers" },
  { id: "svante-p-bo", name: "Svante Pääbo", nickname: "The Ancient DNA Hunter", field: "Genetics", role: "Genetics", nationality: "Swedish", born: "1955", era: "Modern Influencers" },
  { id: "daron-acemoglu", name: "Daron Acemoglu", nickname: "The Institutions Scholar", field: "Economics", role: "Economics", nationality: "Turkish-American", born: "1967", era: "Modern Influencers" },
  { id: "yoshua-bengio", name: "Yoshua Bengio", nickname: "The Deep Learning Pioneer", field: "AI", role: "AI", nationality: "Canadian", born: "1964", era: "Modern Influencers" },
  { id: "yann-lecun", name: "Yann LeCun", nickname: "The CNN Architect", field: "AI", role: "AI", nationality: "French-American", born: "1960", era: "Modern Influencers" },
  { id: "andrew-ng", name: "Andrew Ng", nickname: "The AI Educator", field: "AI & Machine Learning", role: "AI & Machine Learning", nationality: "American", born: "1976", era: "Modern Influencers" },
  { id: "fei-fei-li", name: "Fei-Fei Li", nickname: "The Visionary of AI", field: "Computer Vision & AI", role: "Computer Vision & AI", nationality: "Chinese-American", born: "1976", era: "Modern Influencers" },
  { id: "vint-cerf", name: "Vint Cerf", nickname: "The Father of the Internet", field: "Computer Science", role: "Computer Science", nationality: "American", born: "1943", era: "Modern Influencers" },
  { id: "james-robinson", name: "James Robinson", nickname: "The Political Economist", field: "Economics", role: "Economics", nationality: "British-American", born: "1960", era: "Modern Influencers" },
  { id: "simon-johnson", name: "Simon Johnson", nickname: "The Crisis Analyst", field: "Economics", role: "Economics", nationality: "British-American", born: "1963", era: "Modern Influencers" },
];
