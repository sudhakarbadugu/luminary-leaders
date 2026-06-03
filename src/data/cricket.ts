export interface Cricketer {
  id: string;
  name: string;
  nickname: string;
  nationality: string;
  born: string;
  died?: string;
  role: string;
  era: string;
  image?: string;
}

export const cricketerCategories = [
  { name: "Batsman", count: 22 },
  { name: "Bowler", count: 14 },
  { name: "All-Rounder", count: 8 },
  { name: "Wicketkeeper", count: 4 },
  { name: "All-Rounder/Captain", count: 3 },
];

export const cricketers: Cricketer[] = [
  // Top Tier Legends & Icons (1-15)
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", nickname: "The God of Cricket", nationality: "Indian", born: "1973", role: "Batsman", era: "Modern Legend", image: "/images/cricket/sachin-tendulkar.jpg" },
  { id: "ms-dhoni", name: "MS Dhoni", nickname: "Captain Cool", nationality: "Indian", born: "1981", role: "Wicketkeeper/Captain", era: "Modern Legend", image: "/images/cricket/ms-dhoni.jpg" },
  { id: "virat-kohli", name: "Virat Kohli", nickname: "The Run Machine", nationality: "Indian", born: "1988", role: "Batsman", era: "Modern Legend", image: "/images/cricket/virat-kohli.jpg" },
  { id: "don-bradman", name: "Don Bradman", nickname: "The Don", nationality: "Australian", born: "1908", died: "2001", role: "Batsman", era: "Early Masters" },
  { id: "kapil-dev", name: "Kapil Dev", nickname: "The Haryana Hurricane", nationality: "Indian", born: "1959", role: "All-Rounder", era: "Golden Age" },
  { id: "shane-warne", name: "Shane Warne", nickname: "The King of Spin", nationality: "Australian", born: "1969", died: "2022", role: "Bowler", era: "Modern Legend" },
  { id: "garry-sobers", name: "Garry Sobers", nickname: "The Greatest All-Rounder", nationality: "West Indian", born: "1936", role: "All-Rounder", era: "Golden Age" },
  { id: "imran-khan", name: "Imran Khan", nickname: "The Lion", nationality: "Pakistani", born: "1952", role: "All-Rounder/Captain", era: "Golden Age" },
  { id: "brian-lara", name: "Brian Lara", nickname: "The Prince", nationality: "West Indian", born: "1969", role: "Batsman", era: "Modern Legend" },
  { id: "jacques-kallis", name: "Jacques Kallis", nickname: "The Complete Cricketer", nationality: "South African", born: "1975", role: "All-Rounder", era: "Modern Legend" },
  { id: "muttiah-muralitharan", name: "Muttiah Muralitharan", nickname: "The Smiling Assassin", nationality: "Sri Lankan", born: "1972", role: "Bowler", era: "Modern Legend" },
  { id: "viv-richards", name: "Viv Richards", nickname: "Master Blaster", nationality: "West Indian", born: "1952", role: "Batsman", era: "Golden Age" },
  { id: "ian-botham", name: "Ian Botham", nickname: "Beefy", nationality: "English", born: "1955", role: "All-Rounder", era: "Golden Age" },
  { id: "rahul-dravid", name: "Rahul Dravid", nickname: "The Wall", nationality: "Indian", born: "1973", role: "Batsman", era: "Modern Legend" },
  { id: "yuvraj-singh", name: "Yuvraj Singh", nickname: "The Sixer King", nationality: "Indian", born: "1981", role: "All-Rounder", era: "Modern Legend" },
  // Modern Inspirations & Consistent Performers (16-35)
  { id: "ravindra-jadeja", name: "Ravindra Jadeja", nickname: "Sir Jadeja", nationality: "Indian", born: "1988", role: "All-Rounder", era: "Modern Era" },
  { id: "jasprit-bumrah", name: "Jasprit Bumrah", nickname: "The Yorker King", nationality: "Indian", born: "1993", role: "Bowler", era: "Modern Era" },
  { id: "sunil-gavaskar", name: "Sunil Gavaskar", nickname: "The Little Master", nationality: "Indian", born: "1949", role: "Batsman", era: "Golden Age" },
  { id: "anil-kumble", name: "Anil Kumble", nickname: "Jumbo", nationality: "Indian", born: "1970", role: "Bowler", era: "Modern Legend" },
  { id: "sourav-ganguly", name: "Sourav Ganguly", nickname: "The Prince of Kolkata", nationality: "Indian", born: "1972", role: "Batsman/Captain", era: "Modern Legend" },
  { id: "ricky-ponting", name: "Ricky Ponting", nickname: "Punter", nationality: "Australian", born: "1974", role: "Batsman/Captain", era: "Modern Legend" },
  { id: "steve-smith", name: "Steve Smith", nickname: "The New Bradman", nationality: "Australian", born: "1989", role: "Batsman", era: "Modern Era" },
  { id: "ab-de-villiers", name: "AB de Villiers", nickname: "Mr. 360", nationality: "South African", born: "1984", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: "adam-gilchrist", name: "Adam Gilchrist", nickname: "Gilly", nationality: "Australian", born: "1971", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: "wasim-akram", name: "Wasim Akram", nickname: "The Sultan of Swing", nationality: "Pakistani", born: "1966", role: "Bowler", era: "Modern Legend" },
  { id: "waqar-younis", name: "Waqar Younis", nickname: "The Toe Crusher", nationality: "Pakistani", born: "1971", role: "Bowler", era: "Modern Legend" },
  { id: "glenn-mcgrath", name: "Glenn McGrath", nickname: "Pigeon", nationality: "Australian", born: "1970", role: "Bowler", era: "Modern Legend" },
  { id: "curtly-ambrose", name: "Curtly Ambrose", nickname: "The Gentle Giant", nationality: "West Indian", born: "1963", role: "Bowler", era: "Golden Age" },
  { id: "malcolm-marshall", name: "Malcolm Marshall", nickname: "The Whispering Death", nationality: "West Indian", born: "1958", died: "1999", role: "Bowler", era: "Golden Age" },
  { id: "kumar-sangakkara", name: "Kumar Sangakkara", nickname: "The Mataram Maestro", nationality: "Sri Lankan", born: "1977", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: "mahela-jayawardene", name: "Mahela Jayawardene", nickname: "The Silk", nationality: "Sri Lankan", born: "1977", role: "Batsman", era: "Modern Legend" },
  { id: "sanath-jayasuriya", name: "Sanath Jayasuriya", nickname: "The Matara Marvel", nationality: "Sri Lankan", born: "1969", role: "All-Rounder", era: "Modern Legend" },
  { id: "javed-miandad", name: "Javed Miandad", nickname: "The Street Fighter", nationality: "Pakistani", born: "1957", role: "Batsman", era: "Golden Age" },
  { id: "shoaib-akhtar", name: "Shoaib Akhtar", nickname: "The Rawalpindi Express", nationality: "Pakistani", born: "1975", role: "Bowler", era: "Modern Legend" },
  { id: "dale-steyn", name: "Dale Steyn", nickname: "The Steyn Gun", nationality: "South African", born: "1983", role: "Bowler", era: "Modern Era" },
  // Rising Stars, All-Rounders & Global Role Models (36-51)
  { id: "ben-stokes", name: "Ben Stokes", nickname: "The Superhuman", nationality: "English", born: "1991", role: "All-Rounder", era: "Modern Era" },
  { id: "joe-root", name: "Joe Root", nickname: "The Yorkshire Wizard", nationality: "English", born: "1990", role: "Batsman", era: "Modern Era" },
  { id: "r-ashwin", name: "R Ashwin", nickname: "The Professor", nationality: "Indian", born: "1986", role: "Bowler", era: "Modern Era" },
  { id: "hardik-pandya", name: "Hardik Pandya", nickname: "The Rockstar", nationality: "Indian", born: "1993", role: "All-Rounder", era: "Modern Era" },
  { id: "yashasvi-jaiswal", name: "Yashasvi Jaiswal", nickname: "The Rising Star", nationality: "Indian", born: "2001", role: "Batsman", era: "Modern Era" },
  { id: "babar-azam", name: "Babar Azam", nickname: "The King", nationality: "Pakistani", born: "1994", role: "Batsman", era: "Modern Era" },
  { id: "mitchell-starc", name: "Mitchell Starc", nickname: "The Yorker Specialist", nationality: "Australian", born: "1990", role: "Bowler", era: "Modern Era" },
  { id: "pat-cummins", name: "Pat Cummins", nickname: "The Leader", nationality: "Australian", born: "1993", role: "Bowler/Captain", era: "Modern Era" },
  { id: "kagiso-rabada", name: "Kagiso Rabada", nickname: "KG", nationality: "South African", born: "1995", role: "Bowler", era: "Modern Era" },
  { id: "alastair-cook", name: "Alastair Cook", nickname: "The Chef", nationality: "English", born: "1984", role: "Batsman", era: "Modern Era" },
  { id: "james-anderson", name: "James Anderson", nickname: "The Burnley Express", nationality: "English", born: "1982", role: "Bowler", era: "Modern Era" },
  { id: "stuart-broad", name: "Stuart Broad", nickname: "Broady", nationality: "English", born: "1986", role: "Bowler", era: "Modern Era" },
  { id: "inzamam-ul-haq", name: "Inzamam-ul-Haq", nickname: "Inzy", nationality: "Pakistani", born: "1970", role: "Batsman", era: "Modern Legend" },
  { id: "dennis-lillee", name: "Dennis Lillee", nickname: "The Menace", nationality: "Australian", born: "1949", role: "Bowler", era: "Golden Age" },
  { id: "joel-garner", name: "Joel Garner", nickname: "Big Bird", nationality: "West Indian", born: "1952", role: "Bowler", era: "Golden Age" },
  { id: "w-g-grace", name: "W.G. Grace", nickname: "The Doctor", nationality: "English", born: "1848", died: "1915", role: "Batsman/All-Rounder", era: "Early Masters" },
];
