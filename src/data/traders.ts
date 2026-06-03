export interface Trader {
  id: string;
  name: string;
  nickname: string;
  markets: string[];
  strategy: string;
  role: string;
  nationality: string;
  born: string;
  netWorth?: string;
  died?: string;
  era: string;
  image?: string;
}

export const traderEras = [
  { name: "Early Masters", range: "1800s–1950s", desc: "The pioneers who defined speculation, chart reading, and concentrated bets before modern finance theory existed.", traders: "Jesse Livermore, Bernard Baruch, W.D. Gann" },
  { name: "Value & Growth", range: "1950s–1980s", desc: "The thinkers who built the intellectual frameworks of value investing, growth investing, and bottom-up stock selection.", traders: "Benjamin Graham, Warren Buffett, Peter Lynch" },
  { name: "Trend & System", range: "1970s–1990s", desc: "The systematic traders who proved rules-based trend following and risk management could generate extraordinary returns.", traders: "Richard Dennis, Ed Seykota, Michael Marcus" },
  { name: "Macro & Forex", range: "1980s–2000s", desc: "The global macro titans who traded currencies, interest rates, and geopolitical events at massive scale.", traders: "George Soros, Paul Tudor Jones, Bruce Kovner" },
  { name: "Hedge Fund Era", range: "1990s–2010s", desc: "The managers who turned trading into an institutional art form, managing billions with precision.", traders: "Ray Dalio, Steven Cohen, David Tepper" },
  { name: "Quant Revolution", range: "1990s–Present", desc: "The mathematical minds who replaced intuition with algorithms, data, and factor models.", traders: "Jim Simons, Cliff Asness, David Harding" },
  { name: "Modern Era", range: "2000s–Present", desc: "The contemporary traders adapting classic principles to today's complex, interconnected markets.", traders: "Mark Minervini, Bill Ackman, Rakesh Jhunjhunwala" },
];

export const traders: Trader[] = [
  // Early Masters
  { id: "jesse-livermore", name: "Jesse Livermore", nickname: "Greatest Bear of Wall Street", markets: ["Stocks", "Commodities"], strategy: "Price Action & Psychology", role: "Price Action & Psychology", nationality: "American", born: "1877", netWorth: "$100M (at peak)", era: "Early Masters", image: "/images/traders/jesse-livermore.jpg" },
  { id: "bernard-baruch", name: "Bernard Baruch", nickname: "The Lone Wolf of Wall Street", markets: ["Stocks"], strategy: "Contrarian Speculation", role: "Contrarian Speculation", nationality: "American", born: "1870", netWorth: "$2.5B (inflation adj.)", era: "Early Masters" },
  { id: "w-d-gann", name: "W.D. Gann", nickname: "Master of Time & Price", markets: ["Stocks", "Commodities"], strategy: "Geometric Forecasting", role: "Geometric Forecasting", nationality: "American", born: "1878", era: "Early Masters" },
  { id: "richard-donchian", name: "Richard Donchian", nickname: "Father of Trend Following", markets: ["Commodities", "Futures"], strategy: "Rules-Based Trend", role: "Rules-Based Trend", nationality: "American", born: "1905", era: "Early Masters" },
  { id: "gerald-loeb", name: "Gerald Loeb", nickname: "The Battle for Survival", markets: ["Stocks"], strategy: "Concentrated Trading", role: "Concentrated Trading", nationality: "American", born: "1899", era: "Early Masters" },
  { id: "nicolas-darvas", name: "Nicolas Darvas", nickname: "The Box Theory Creator", markets: ["Stocks"], strategy: "Breakout / Box Theory", role: "Breakout / Box Theory", nationality: "Hungarian-American", born: "1920", era: "Early Masters" },
  // Value & Growth
  { id: "benjamin-graham", name: "Benjamin Graham", nickname: "Father of Value Investing", markets: ["Stocks"], strategy: "Value Investing", role: "Value Investing", nationality: "American", born: "1894", era: "Value & Growth" },
  { id: "warren-buffett", name: "Warren Buffett", nickname: "The Oracle of Omaha", markets: ["Stocks"], strategy: "Long-Term Value", role: "Long-Term Value", nationality: "American", born: "1930", netWorth: "$140B", era: "Value & Growth", image: "/images/traders/warren-buffett.jpg" },
  { id: "peter-lynch", name: "Peter Lynch", nickname: "Legend of Fidelity", markets: ["Stocks"], strategy: "Bottom-Up Growth", role: "Bottom-Up Growth", nationality: "American", born: "1944", netWorth: "$450M", era: "Value & Growth" },
  { id: "william-o-neil", name: "William O'Neil", nickname: "CANSLIM Creator", markets: ["Stocks"], strategy: "CANSLIM Momentum", role: "CANSLIM Momentum", nationality: "American", born: "1933", netWorth: "$500M", era: "Value & Growth" },
  { id: "jim-rogers", name: "Jim Rogers", nickname: "The Commodities Investor", markets: ["Commodities", "Stocks"], strategy: "Global Macro", role: "Global Macro", nationality: "American", born: "1942", netWorth: "$300M", era: "Value & Growth" },
  { id: "joe-lewis", name: "Joe Lewis", nickname: "The Currency Billionaire", markets: ["Forex", "Stocks"], strategy: "Macro / Currency", role: "Macro / Currency", nationality: "British", born: "1937", netWorth: "$5.6B", era: "Value & Growth" },
  // Trend & System
  { id: "richard-dennis", name: "Richard Dennis", nickname: "Prince of the Pit", markets: ["Commodities", "Futures"], strategy: "Trend Following", role: "Trend Following", nationality: "American", born: "1949", netWorth: "$200M", era: "Trend & System" },
  { id: "ed-seykota", name: "Ed Seykota", nickname: "Trend Following Wizard", markets: ["Futures", "Commodities"], strategy: "Systematic Trend", role: "Systematic Trend", nationality: "American", born: "1946", netWorth: "$200M", era: "Trend & System" },
  { id: "michael-marcus", name: "Michael Marcus", nickname: "The Compounding Wizard", markets: ["Commodities", "Forex"], strategy: "Trend Following", role: "Trend Following", nationality: "American", born: "1950s", netWorth: "$100M+", era: "Trend & System" },
  { id: "bruce-kovner", name: "Bruce Kovner", nickname: "The Macro Maestro", markets: ["Forex", "Bonds", "Commodities"], strategy: "Global Macro", role: "Global Macro", nationality: "American", born: "1945", netWorth: "$6.5B", era: "Trend & System" },
  { id: "larry-hite", name: "Larry Hite", nickname: "Godfather of Managed Futures", markets: ["Futures", "Stocks"], strategy: "Systematic Trend", role: "Systematic Trend", nationality: "American", born: "1941", era: "Trend & System" },
  { id: "bill-dunn", name: "Bill Dunn", nickname: "The CTA Pioneer", markets: ["Futures", "Commodities"], strategy: "Long-Term Trend", role: "Long-Term Trend", nationality: "American", born: "1942", era: "Trend & System" },
  { id: "marty-schwartz", name: "Marty Schwartz", nickname: "Pit Bull", markets: ["Stocks", "Futures", "Forex"], strategy: "Technical Analysis", role: "Technical Analysis", nationality: "American", born: "1945", netWorth: "$20M+", era: "Trend & System" },
  { id: "linda-bradford-raschke", name: "Linda Bradford Raschke", nickname: "The Technical Expert", markets: ["Futures", "Stocks"], strategy: "Short-Term Technical", role: "Short-Term Technical", nationality: "American", born: "1959", era: "Trend & System" },
  // Macro & Forex
  { id: "george-soros", name: "George Soros", nickname: "Man Who Broke the Bank of England", markets: ["Forex", "Stocks", "Bonds"], strategy: "Global Macro", role: "Global Macro", nationality: "Hungarian-American", born: "1930", netWorth: "$6.5B", era: "Macro & Forex", image: "/images/traders/george-soros.jpg" },
  { id: "paul-tudor-jones", name: "Paul Tudor Jones", nickname: "The Crash Predictor", markets: ["Global Macro", "Futures"], strategy: "Macro Trading", role: "Macro Trading", nationality: "American", born: "1954", netWorth: "$8.5B", era: "Macro & Forex" },
  { id: "stanley-druckenmiller", name: "Stanley Druckenmiller", nickname: "The Duquesne Dynamo", markets: ["Global Macro", "Stocks"], strategy: "Macro Top-Down", role: "Macro Top-Down", nationality: "American", born: "1953", netWorth: "$10B", era: "Macro & Forex" },
  { id: "bill-lipschutz", name: "Bill Lipschutz", nickname: "Sultan of Currencies", markets: ["Forex"], strategy: "Currency Trading", role: "Currency Trading", nationality: "American", born: "1956", netWorth: "$2B", era: "Macro & Forex" },
  { id: "andy-krieger", name: "Andy Krieger", nickname: "The Kiwi Crusher", markets: ["Forex"], strategy: "Currency Speculation", role: "Currency Speculation", nationality: "American", born: "1956", era: "Macro & Forex" },
  { id: "colm-o-shea", name: "Colm O'Shea", nickname: "The Global Macro Thinker", markets: ["Global Macro", "Bonds"], strategy: "Fundamental Macro", role: "Fundamental Macro", nationality: "Irish", born: "1970s", era: "Macro & Forex" },
  // Hedge Fund Era
  { id: "ray-dalio", name: "Ray Dalio", nickname: "Architect of All Weather", markets: ["Global Macro", "Bonds"], strategy: "Risk Parity", role: "Risk Parity", nationality: "American", born: "1949", netWorth: "$16B", era: "Hedge Fund Era", image: "/images/traders/ray-dalio.jpg" },
  { id: "john-paulson", name: "John Paulson", nickname: "The Subprime Slayer", markets: ["Stocks", "Credit Derivatives"], strategy: "Event-Driven", role: "Event-Driven", nationality: "American", born: "1955", netWorth: "$3B", era: "Hedge Fund Era" },
  { id: "steven-cohen", name: "Steven Cohen", nickname: "SAC Capital King", markets: ["Stocks", "Options"], strategy: "Quantitative Discretionary", role: "Quantitative Discretionary", nationality: "American", born: "1956", netWorth: "$21B", era: "Hedge Fund Era" },
  { id: "david-tepper", name: "David Tepper", nickname: "The Appaloosa Assassin", markets: ["Stocks", "Distressed Debt"], strategy: "Distressed Investing", role: "Distressed Investing", nationality: "American", born: "1957", netWorth: "$20B", era: "Hedge Fund Era" },
  { id: "carl-icahn", name: "Carl Icahn", nickname: "The Activist Assassin", markets: ["Stocks"], strategy: "Activist Investing", role: "Activist Investing", nationality: "American", born: "1936", netWorth: "$7B", era: "Hedge Fund Era" },
  { id: "bill-ackman", name: "Bill Ackman", nickname: "Pershing Square Prince", markets: ["Stocks"], strategy: "Concentrated Value", role: "Concentrated Value", nationality: "American", born: "1966", netWorth: "$9B", era: "Hedge Fund Era" },
  { id: "michael-steinhardt", name: "Michael Steinhardt", nickname: "The Block Trader", markets: ["Stocks", "Bonds"], strategy: "Variant Perception", role: "Variant Perception", nationality: "American", born: "1940", netWorth: "$1B", era: "Hedge Fund Era" },
  { id: "peter-schiff", name: "Peter Schiff", nickname: "The Gold Bug", markets: ["Gold", "Currencies", "Stocks"], strategy: "Macro / Contrarian", role: "Macro / Contrarian", nationality: "American", born: "1963", netWorth: "$50M", era: "Hedge Fund Era" },
  // Quant Revolution
  { id: "jim-simons", name: "Jim Simons", nickname: "The Quant King", markets: ["Stocks", "Futures"], strategy: "Quantitative", role: "Quantitative", nationality: "American", born: "1938", died: "2024", netWorth: "$30B", era: "Quant Revolution", image: "/images/traders/jim-simons.jpg" },
  { id: "cliff-asness", name: "Cliff Asness", nickname: "AQR Architect", markets: ["Stocks", "Bonds", "Currencies"], strategy: "Factor Investing", role: "Factor Investing", nationality: "American", born: "1966", netWorth: "$1B", era: "Quant Revolution" },
  { id: "david-harding", name: "David Harding", nickname: "The Winton Founder", markets: ["Futures", "Commodities", "Stocks"], strategy: "Systematic Trend", role: "Systematic Trend", nationality: "British", born: "1962", netWorth: "$2.5B", era: "Quant Revolution" },
  { id: "john-w-henry", name: "John W. Henry", nickname: "The Trend Owner", markets: ["Futures", "Commodities"], strategy: "Trend Following", role: "Trend Following", nationality: "American", born: "1949", netWorth: "$3B", era: "Quant Revolution" },
  { id: "leda-braga", name: "Leda Braga", nickname: "The Systematica Founder", markets: ["Futures", "Stocks", "Bonds"], strategy: "Quantitative / Trend", role: "Quantitative / Trend", nationality: "Brazilian-British", born: "1968", era: "Quant Revolution" },
  { id: "ken-tropin", name: "Ken Tropin", nickname: "The Macro CTA", markets: ["Futures", "Global Macro"], strategy: "Managed Futures", role: "Managed Futures", nationality: "American", born: "1950s", era: "Quant Revolution" },
  { id: "edward-thorp", name: "Edward Thorp", nickname: "The Quant Pioneer", markets: ["Stocks", "Options"], strategy: "Statistical Arbitrage", role: "Statistical Arbitrage", nationality: "American", born: "1932", netWorth: "$800M", era: "Quant Revolution" },
  { id: "tom-baldwin", name: "Tom Baldwin", nickname: "The Bond Pit Giant", markets: ["Bonds", "Futures"], strategy: "Pit Trading", role: "Pit Trading", nationality: "American", born: "1950s", era: "Quant Revolution" },
  { id: "tony-saliba", name: "Tony Saliba", nickname: "The Options Wizard", markets: ["Options"], strategy: "Structured Options", role: "Structured Options", nationality: "American", born: "1950s", era: "Quant Revolution" },
  // Modern Era
  { id: "mark-minervini", name: "Mark Minervini", nickname: "The SEPA Champion", markets: ["Stocks"], strategy: "Momentum / SEPA", role: "Momentum / SEPA", nationality: "American", born: "1962", netWorth: "$50M+", era: "Modern Era" },
  { id: "rakesh-jhunjhunwala", name: "Rakesh Jhunjhunwala", nickname: "India's Big Bull", markets: ["Stocks"], strategy: "Value & Growth", role: "Value & Growth", nationality: "Indian", born: "1960", died: "2022", netWorth: "$5.8B", era: "Modern Era", image: "/images/traders/rakesh-jhunjhunwala.jpg" },
  { id: "radhakishan-damani", name: "Radhakishan Damani", nickname: "The DMart Visionary", markets: ["Stocks"], strategy: "Conservative Value", role: "Conservative Value", nationality: "Indian", born: "1954", netWorth: "$18B", era: "Modern Era" },
  { id: "vijay-kedia", name: "Vijay Kedia", nickname: "The Multibagger King", markets: ["Stocks"], strategy: "Small-Cap Growth", role: "Small-Cap Growth", nationality: "Indian", born: "1959", netWorth: "$500M", era: "Modern Era" },
  { id: "porinju-veliyath", name: "Porinju Veliyath", nickname: "The Contrarian Investor", markets: ["Stocks"], strategy: "Contrarian Small-Cap", role: "Contrarian Small-Cap", nationality: "Indian", born: "1962", netWorth: "$100M", era: "Modern Era" },
  { id: "nick-leeson", name: "Nick Leeson", nickname: "The Rogue Trader", markets: ["Futures"], strategy: "N/A (Cautionary)", role: "N/A (Cautionary)", nationality: "British", born: "1967", era: "Modern Era" },
  { id: "chris-camillo", name: "Chris Camillo", nickname: "The Social Arb", markets: ["Stocks"], strategy: "Social Sentiment", role: "Social Sentiment", nationality: "American", born: "1980s", era: "Modern Era" },
];
