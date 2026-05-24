export interface Leader {
  id: number;
  name: string;
  role: string;
  company: string;
  yearStart: number;
  yearEnd: number | string;
  image?: string;
  era: string;
}

export const eras = [
  { name: "The Foundation", range: "1840s-1940s", desc: "The mathematical and theoretical pioneers who defined computation before machines existed.", leaders: "Ada Lovelace, Alan Turing, Grace Hopper" },
  { name: "The Early Machines", range: "1940s-1960s", desc: "The builders of the first electronic computers and the frameworks that made them possible.", leaders: "John von Neumann, Claude Shannon, Douglas Engelbart" },
  { name: "The Personal Computer", range: "1970s-1980s", desc: "The rebels and visionaries who put computing power into the hands of individuals.", leaders: "Steve Jobs, Bill Gates, Steve Wozniak" },
  { name: "The Internet Age", range: "1990s", desc: "The architects who wove the world's information into a connected web.", leaders: "Tim Berners-Lee, Vint Cerf, Linus Torvalds" },
  { name: "The Dot-Com Boom", range: "1995-2000", desc: "The entrepreneurs who saw the commercial potential of the connected world.", leaders: "Jeff Bezos, Larry Page, Sergey Brin" },
  { name: "Mobile & Social", range: "2000s-2010s", desc: "The builders of always-connected devices and social platforms that changed human interaction.", leaders: "Mark Zuckerberg, Steve Jobs, Brian Chesky" },
  { name: "Cloud & AI", range: "2010s-2020s", desc: "The leaders who moved computation to the cloud and began teaching machines to think.", leaders: "Satya Nadella, Jensen Huang, Demis Hassabis" },
  { name: "The Frontier", range: "2020s+", desc: "The explorers charting the next frontiers of artificial general intelligence and beyond.", leaders: "Sam Altman, Dario Amodei, Fei-Fei Li" },
];

export const leaders: Leader[] = [
  // Tier 1: Foundational Pioneers
  { id: 1, name: "Ada Lovelace", role: "Mathematician", company: "Analytical Engine", yearStart: 1815, yearEnd: 1852, image: "/images/ada-lovelace.jpg", era: "The Foundation" },
  { id: 2, name: "Alan Turing", role: "Mathematician & Logician", company: "Father of Computer Science", yearStart: 1912, yearEnd: 1954, image: "/images/alan-turing.jpg", era: "The Foundation" },
  { id: 3, name: "Grace Hopper", role: "Computer Scientist", company: "US Navy / COBOL", yearStart: 1906, yearEnd: 1992, image: "/images/grace-hopper.jpg", era: "The Foundation" },
  { id: 4, name: "John von Neumann", role: "Mathematician", company: "Computer Architecture", yearStart: 1903, yearEnd: 1957, image: "/images/von-neumann.jpg", era: "The Foundation" },
  { id: 5, name: "Claude Shannon", role: "Mathematician & Engineer", company: "Information Theory", yearStart: 1916, yearEnd: 2001, era: "The Foundation" },
  { id: 6, name: "Douglas Engelbart", role: "Engineer & Inventor", company: "Computer Mouse / GUI", yearStart: 1925, yearEnd: 2013, era: "The Early Machines" },
  { id: 7, name: "Tim Berners-Lee", role: "Computer Scientist", company: "World Wide Web", yearStart: 1955, yearEnd: "Present", image: "/images/tim-berners-lee.jpg", era: "The Internet Age" },
  { id: 8, name: "Vint Cerf", role: "Computer Scientist", company: "TCP/IP (Internet)", yearStart: 1943, yearEnd: "Present", era: "The Internet Age" },
  { id: 9, name: "Ken Thompson", role: "Programmer", company: "UNIX & C Language", yearStart: 1943, yearEnd: "Present", image: "/images/linus-torvalds.jpg", era: "The Early Machines" },
  { id: 10, name: "Linus Torvalds", role: "Software Engineer", company: "Linux & Git", yearStart: 1969, yearEnd: "Present", image: "/images/linus-torvalds.jpg", era: "The Internet Age" },
  // Tier 2: Personal Computing
  { id: 11, name: "Steve Jobs", role: "Co-founder & CEO", company: "Apple", yearStart: 1955, yearEnd: 2011, image: "/images/steve-jobs.jpg", era: "The Personal Computer" },
  { id: 12, name: "Steve Wozniak", role: "Co-founder & Engineer", company: "Apple", yearStart: 1950, yearEnd: "Present", era: "The Personal Computer" },
  { id: 13, name: "Bill Gates", role: "Co-founder & CEO", company: "Microsoft", yearStart: 1955, yearEnd: "Present", image: "/images/bill-gates.jpg", era: "The Personal Computer" },
  { id: 14, name: "Paul Allen", role: "Co-founder", company: "Microsoft", yearStart: 1953, yearEnd: 2018, era: "The Personal Computer" },
  { id: 15, name: "Michael Dell", role: "Founder & CEO", company: "Dell", yearStart: 1965, yearEnd: "Present", era: "The Personal Computer" },
  { id: 16, name: "Andy Grove", role: "CEO", company: "Intel", yearStart: 1936, yearEnd: 2016, era: "The Early Machines" },
  { id: 17, name: "Gordon Moore", role: "Co-founder", company: "Intel", yearStart: 1929, yearEnd: 2023, era: "The Early Machines" },
  { id: 18, name: "Marc Andreessen", role: "Co-founder", company: "Netscape / a16z", yearStart: 1971, yearEnd: "Present", era: "The Dot-Com Boom" },
  // Tier 3: Internet & E-commerce
  { id: 19, name: "Jeff Bezos", role: "Founder & CEO", company: "Amazon", yearStart: 1964, yearEnd: "Present", image: "/images/jeff-bezos.jpg", era: "The Dot-Com Boom" },
  { id: 20, name: "Larry Page", role: "Co-founder", company: "Google", yearStart: 1973, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 21, name: "Sergey Brin", role: "Co-founder", company: "Google", yearStart: 1973, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 22, name: "Pierre Omidyar", role: "Founder", company: "eBay", yearStart: 1967, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 23, name: "Jack Ma", role: "Founder", company: "Alibaba", yearStart: 1964, yearEnd: "Present", image: "/images/jack-ma.jpg", era: "The Dot-Com Boom" },
  { id: 24, name: "Reed Hastings", role: "Co-founder & CEO", company: "Netflix", yearStart: 1960, yearEnd: "Present", era: "Mobile & Social" },
  { id: 25, name: "Brian Chesky", role: "Co-founder & CEO", company: "Airbnb", yearStart: 1981, yearEnd: "Present", era: "Mobile & Social" },
  { id: 26, name: "Mark Zuckerberg", role: "Founder & CEO", company: "Meta", yearStart: 1984, yearEnd: "Present", image: "/images/mark-zuckerberg.jpg", era: "Mobile & Social" },
  { id: 27, name: "Evan Spiegel", role: "Co-founder & CEO", company: "Snapchat", yearStart: 1990, yearEnd: "Present", era: "Mobile & Social" },
  { id: 28, name: "Drew Houston", role: "Co-founder & CEO", company: "Dropbox", yearStart: 1983, yearEnd: "Present", era: "Mobile & Social" },
  { id: 29, name: "Patrick & John Collison", role: "Co-founders", company: "Stripe", yearStart: 1988, yearEnd: "Present", era: "Mobile & Social" },
  { id: 30, name: "Daniel Ek", role: "Founder & CEO", company: "Spotify", yearStart: 1983, yearEnd: "Present", era: "Mobile & Social" },
  { id: 31, name: "Brian Acton & Jan Koum", role: "Co-founders", company: "WhatsApp", yearStart: 1972, yearEnd: "Present", era: "Mobile & Social" },
  { id: 32, name: "Kevin Systrom & Mike Krieger", role: "Co-founders", company: "Instagram", yearStart: 1983, yearEnd: "Present", era: "Mobile & Social" },
  { id: 33, name: "Jack Dorsey", role: "Co-founder", company: "Twitter / Block", yearStart: 1976, yearEnd: "Present", era: "Mobile & Social" },
  { id: 34, name: "Reid Hoffman", role: "Co-founder", company: "LinkedIn", yearStart: 1967, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 35, name: "Peter Thiel", role: "Co-founder", company: "PayPal / Palantir", yearStart: 1967, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 36, name: "Max Levchin", role: "Co-founder", company: "PayPal / Affirm", yearStart: 1975, yearEnd: "Present", era: "The Dot-Com Boom" },
  // Tier 4: Mobile & Hardware
  { id: 37, name: "Elon Musk", role: "CEO & Chief Engineer", company: "Tesla / SpaceX / xAI", yearStart: 1971, yearEnd: "Present", image: "/images/elon-musk.jpg", era: "Cloud & AI" },
  { id: 38, name: "Sundar Pichai", role: "CEO", company: "Google / Alphabet", yearStart: 1972, yearEnd: "Present", image: "/images/sundar-pichai.jpg", era: "Cloud & AI" },
  { id: 39, name: "Satya Nadella", role: "CEO", company: "Microsoft", yearStart: 1967, yearEnd: "Present", image: "/images/satya-nadella.jpg", era: "Cloud & AI" },
  { id: 40, name: "Sheryl Sandberg", role: "COO", company: "Meta", yearStart: 1969, yearEnd: "Present", era: "Mobile & Social" },
  { id: 41, name: "Susan Wojcicki", role: "CEO", company: "YouTube", yearStart: 1968, yearEnd: 2024, era: "Mobile & Social" },
  { id: 42, name: "Tony Fadell", role: "Engineer & Designer", company: "iPod / Nest", yearStart: 1969, yearEnd: "Present", era: "Mobile & Social" },
  { id: 43, name: "Jony Ive", role: "Chief Design Officer", company: "Apple", yearStart: 1967, yearEnd: "Present", era: "The Personal Computer" },
  { id: 44, name: "Lisa Su", role: "CEO", company: "AMD", yearStart: 1969, yearEnd: "Present", image: "/images/lisa-su.jpg", era: "Cloud & AI" },
  { id: 45, name: "Jensen Huang", role: "Founder & CEO", company: "NVIDIA", yearStart: 1963, yearEnd: "Present", image: "/images/jensen-huang.jpg", era: "Cloud & AI" },
  // Tier 5: AI & Future Tech
  { id: 46, name: "Demis Hassabis", role: "CEO & Co-founder", company: "DeepMind", yearStart: 1976, yearEnd: "Present", image: "/images/demis-hassabis.jpg", era: "Cloud & AI" },
  { id: 47, name: "Sam Altman", role: "CEO", company: "OpenAI", yearStart: 1985, yearEnd: "Present", image: "/images/sam-altman.jpg", era: "The Frontier" },
  { id: 48, name: "Dario & Daniela Amodei", role: "Co-founders", company: "Anthropic", yearStart: 1983, yearEnd: "Present", era: "The Frontier" },
  { id: 49, name: "Fei-Fei Li", role: "Professor & Researcher", company: "ImageNet / Stanford", yearStart: 1976, yearEnd: "Present", era: "The Frontier" },
  { id: 50, name: "Yann LeCun", role: "Chief AI Scientist", company: "Meta AI", yearStart: 1960, yearEnd: "Present", era: "Cloud & AI" },
  { id: 51, name: "Geoffrey Hinton", role: "Professor Emeritus", company: "Deep Learning Pioneer", yearStart: 1947, yearEnd: "Present", era: "Cloud & AI" },
  { id: 52, name: "Yoshua Bengio", role: "Professor", company: "Mila / Universite de Montreal", yearStart: 1964, yearEnd: "Present", era: "Cloud & AI" },
  { id: 53, name: "Andrej Karpathy", role: "AI Researcher", company: "Tesla AI / OpenAI", yearStart: 1986, yearEnd: "Present", era: "The Frontier" },
  { id: 54, name: "Noam Shazeer", role: "Co-founder & CEO", company: "Character.AI", yearStart: 1976, yearEnd: "Present", era: "The Frontier" },
  { id: 55, name: "Ilya Sutskever", role: "Co-founder & Chief Scientist", company: "SSI / OpenAI", yearStart: 1986, yearEnd: "Present", era: "The Frontier" },
  // Tier 6: Women Trailblazers
  { id: 56, name: "Meg Whitman", role: "CEO", company: "eBay / HP", yearStart: 1956, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 57, name: "Marissa Mayer", role: "CEO", company: "Yahoo / Google", yearStart: 1975, yearEnd: "Present", era: "Mobile & Social" },
  { id: 58, name: "Safra Catz", role: "CEO", company: "Oracle", yearStart: 1961, yearEnd: "Present", era: "Cloud & AI" },
  { id: 59, name: "Ginni Rometty", role: "CEO", company: "IBM", yearStart: 1957, yearEnd: "Present", era: "Cloud & AI" },
  { id: 60, name: "Ursula Burns", role: "CEO", company: "Xerox", yearStart: 1958, yearEnd: "Present", era: "The Personal Computer" },
  { id: 61, name: "Kimberly Bryant", role: "Founder", company: "Black Girls CODE", yearStart: 1967, yearEnd: "Present", era: "Mobile & Social" },
  { id: 62, name: "Reshma Saujani", role: "Founder", company: "Girls Who Code", yearStart: 1975, yearEnd: "Present", era: "Mobile & Social" },
  { id: 63, name: "Whitney Wolfe Herd", role: "Founder & CEO", company: "Bumble", yearStart: 1989, yearEnd: "Present", era: "Mobile & Social" },
  { id: 64, name: "Sara Blakely", role: "Founder", company: "Spanx", yearStart: 1971, yearEnd: "Present", era: "Mobile & Social" },
  { id: 65, name: "Sophia Amoruso", role: "Founder", company: "Nasty Gal / Girlboss", yearStart: 1984, yearEnd: "Present", era: "Mobile & Social" },
  // Tier 7: Global Tech Leaders
  { id: 66, name: "Masayoshi Son", role: "Founder & CEO", company: "SoftBank", yearStart: 1957, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 67, name: "Pony Ma", role: "Founder & CEO", company: "Tencent", yearStart: 1971, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 68, name: "Robin Li", role: "Co-founder & CEO", company: "Baidu", yearStart: 1968, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 69, name: "Lei Jun", role: "Founder & CEO", company: "Xiaomi", yearStart: 1969, yearEnd: "Present", era: "Mobile & Social" },
  { id: 70, name: "Cheng Wei (Will)", role: "Founder & CEO", company: "Didi", yearStart: 1983, yearEnd: "Present", era: "Mobile & Social" },
  { id: 71, name: "Ritesh Agarwal", role: "Founder & CEO", company: "OYO", yearStart: 1993, yearEnd: "Present", era: "Mobile & Social" },
  { id: 72, name: "Byju Raveendran", role: "Founder", company: "BYJU's", yearStart: 1980, yearEnd: "Present", era: "Mobile & Social" },
  { id: 73, name: "Kiran Mazumdar-Shaw", role: "Founder & Chairperson", company: "Biocon", yearStart: 1953, yearEnd: "Present", era: "The Early Machines" },
  { id: 74, name: "Strive Masiyiwa", role: "Founder & Executive Chairman", company: "Econet", yearStart: 1961, yearEnd: "Present", era: "Mobile & Social" },
  { id: 75, name: "Iyinoluwa Aboyeji", role: "Co-founder", company: "Flutterwave", yearStart: 1993, yearEnd: "Present", era: "The Frontier" },
  { id: 76, name: "Daniel Dines", role: "Co-founder & CEO", company: "UiPath", yearStart: 1972, yearEnd: "Present", era: "Cloud & AI" },
  { id: 77, name: "Marcos Galperin", role: "Founder & CEO", company: "MercadoLibre", yearStart: 1971, yearEnd: "Present", era: "The Dot-Com Boom" },
  { id: 78, name: "Hermann Hauser", role: "Co-founder", company: "ARM", yearStart: 1948, yearEnd: "Present", era: "The Personal Computer" },
  { id: 79, name: "Niklas Zennstrom", role: "Co-founder", company: "Skype", yearStart: 1966, yearEnd: "Present", era: "Mobile & Social" },
  { id: 80, name: "Taavet Hinrikus", role: "Co-founder & Chairman", company: "Wise", yearStart: 1980, yearEnd: "Present", era: "Mobile & Social" },
  // Tier 8: Social Impact
  { id: 81, name: "Marc Benioff", role: "Co-founder & CEO", company: "Salesforce", yearStart: 1964, yearEnd: "Present", era: "Cloud & AI" },
  { id: 82, name: "Sal Khan", role: "Founder & CEO", company: "Khan Academy", yearStart: 1976, yearEnd: "Present", era: "Mobile & Social" },
  { id: 83, name: "Ryan Hoover", role: "Founder", company: "Product Hunt", yearStart: 1987, yearEnd: "Present", era: "Mobile & Social" },
  { id: 84, name: "Arlan Hamilton", role: "Founder & Managing Partner", company: "Backstage Capital", yearStart: 1978, yearEnd: "Present", era: "The Frontier" },
  { id: 85, name: "Tristan Harris", role: "Co-founder", company: "Center for Humane Tech", yearStart: 1983, yearEnd: "Present", era: "The Frontier" },
  { id: 86, name: "Jimmy Wales", role: "Co-founder", company: "Wikipedia", yearStart: 1966, yearEnd: "Present", era: "The Internet Age" },
  { id: 87, name: "Brewster Kahle", role: "Founder", company: "Internet Archive", yearStart: 1960, yearEnd: "Present", era: "The Internet Age" },
  { id: 88, name: "Craig Newmark", role: "Founder", company: "Craigslist", yearStart: 1952, yearEnd: "Present", era: "The Internet Age" },
  { id: 89, name: "Daphne Koller", role: "Co-founder", company: "Coursera / insitro", yearStart: 1968, yearEnd: "Present", era: "Cloud & AI" },
  { id: 90, name: "Mitch Kapor", role: "Founder", company: "Lotus 1-2-3 / EFF", yearStart: 1950, yearEnd: "Present", era: "The Personal Computer" },
  // Additional to reach 100
  { id: 91, name: "Ray Ozzie", role: "Chief Software Architect", company: "Lotus Notes / Microsoft", yearStart: 1955, yearEnd: "Present", era: "The Personal Computer" },
  { id: 92, name: "Sebastian Thrun", role: "Co-founder", company: "Google X / Udacity", yearStart: 1967, yearEnd: "Present", era: "Cloud & AI" },
  { id: 93, name: "Travis Kalanick", role: "Co-founder", company: "Uber", yearStart: 1976, yearEnd: "Present", era: "Mobile & Social" },
  { id: 94, name: "Aaron Levie", role: "Co-founder & CEO", company: "Box", yearStart: 1985, yearEnd: "Present", era: "Mobile & Social" },
  { id: 95, name: "Guilherme Benchimol", role: "Founder & CEO", company: "XP Inc", yearStart: 1976, yearEnd: "Present", era: "Mobile & Social" },
  { id: 96, name: "Miki Kuusi", role: "Co-founder & CEO", company: "Wolt", yearStart: 1985, yearEnd: "Present", era: "Mobile & Social" },
  { id: 97, name: "Dennis Ritchie", role: "Computer Scientist", company: "UNIX / C Language", yearStart: 1941, yearEnd: 2011, era: "The Early Machines" },
  { id: 98, name: "Bob Kahn", role: "Computer Scientist", company: "TCP/IP (Internet)", yearStart: 1938, yearEnd: "Present", era: "The Internet Age" },
  { id: 99, name: "Tim Cook", role: "CEO", company: "Apple", yearStart: 1960, yearEnd: "Present", image: "/images/tim-cook.jpg", era: "Mobile & Social" },
  { id: 100, name: "Angela Ahrendts", role: "SVP Retail", company: "Apple / Burberry", yearStart: 1960, yearEnd: "Present", era: "Mobile & Social" },
];

export const leadersWithImages = leaders.filter(l => l.image);
