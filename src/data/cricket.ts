export interface Cricketer {
  id: number;
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
  { id: 1, name: "Sachin Tendulkar", nickname: "The God of Cricket", nationality: "Indian", born: "1973", role: "Batsman", era: "Modern Legend", image: "/images/cricket/sachin-tendulkar.jpg" },
  { id: 2, name: "MS Dhoni", nickname: "Captain Cool", nationality: "Indian", born: "1981", role: "Wicketkeeper/Captain", era: "Modern Legend", image: "/images/cricket/ms-dhoni.jpg" },
  { id: 3, name: "Virat Kohli", nickname: "The Run Machine", nationality: "Indian", born: "1988", role: "Batsman", era: "Modern Legend", image: "/images/cricket/virat-kohli.jpg" },
  { id: 4, name: "Don Bradman", nickname: "The Don", nationality: "Australian", born: "1908", died: "2001", role: "Batsman", era: "Early Masters" },
  { id: 5, name: "Kapil Dev", nickname: "The Haryana Hurricane", nationality: "Indian", born: "1959", role: "All-Rounder", era: "Golden Age" },
  { id: 6, name: "Shane Warne", nickname: "The King of Spin", nationality: "Australian", born: "1969", died: "2022", role: "Bowler", era: "Modern Legend" },
  { id: 7, name: "Garry Sobers", nickname: "The Greatest All-Rounder", nationality: "West Indian", born: "1936", role: "All-Rounder", era: "Golden Age" },
  { id: 8, name: "Imran Khan", nickname: "The Lion", nationality: "Pakistani", born: "1952", role: "All-Rounder/Captain", era: "Golden Age" },
  { id: 9, name: "Brian Lara", nickname: "The Prince", nationality: "West Indian", born: "1969", role: "Batsman", era: "Modern Legend" },
  { id: 10, name: "Jacques Kallis", nickname: "The Complete Cricketer", nationality: "South African", born: "1975", role: "All-Rounder", era: "Modern Legend" },
  { id: 11, name: "Muttiah Muralitharan", nickname: "The Smiling Assassin", nationality: "Sri Lankan", born: "1972", role: "Bowler", era: "Modern Legend" },
  { id: 12, name: "Viv Richards", nickname: "Master Blaster", nationality: "West Indian", born: "1952", role: "Batsman", era: "Golden Age" },
  { id: 13, name: "Ian Botham", nickname: "Beefy", nationality: "English", born: "1955", role: "All-Rounder", era: "Golden Age" },
  { id: 14, name: "Rahul Dravid", nickname: "The Wall", nationality: "Indian", born: "1973", role: "Batsman", era: "Modern Legend" },
  { id: 15, name: "Yuvraj Singh", nickname: "The Sixer King", nationality: "Indian", born: "1981", role: "All-Rounder", era: "Modern Legend" },
  // Modern Inspirations & Consistent Performers (16-35)
  { id: 16, name: "Ravindra Jadeja", nickname: "Sir Jadeja", nationality: "Indian", born: "1988", role: "All-Rounder", era: "Modern Era" },
  { id: 17, name: "Jasprit Bumrah", nickname: "The Yorker King", nationality: "Indian", born: "1993", role: "Bowler", era: "Modern Era" },
  { id: 18, name: "Sunil Gavaskar", nickname: "The Little Master", nationality: "Indian", born: "1949", role: "Batsman", era: "Golden Age" },
  { id: 19, name: "Anil Kumble", nickname: "Jumbo", nationality: "Indian", born: "1970", role: "Bowler", era: "Modern Legend" },
  { id: 20, name: "Sourav Ganguly", nickname: "The Prince of Kolkata", nationality: "Indian", born: "1972", role: "Batsman/Captain", era: "Modern Legend" },
  { id: 21, name: "Ricky Ponting", nickname: "Punter", nationality: "Australian", born: "1974", role: "Batsman/Captain", era: "Modern Legend" },
  { id: 22, name: "Steve Smith", nickname: "The New Bradman", nationality: "Australian", born: "1989", role: "Batsman", era: "Modern Era" },
  { id: 23, name: "AB de Villiers", nickname: "Mr. 360", nationality: "South African", born: "1984", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: 24, name: "Adam Gilchrist", nickname: "Gilly", nationality: "Australian", born: "1971", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: 25, name: "Wasim Akram", nickname: "The Sultan of Swing", nationality: "Pakistani", born: "1966", role: "Bowler", era: "Modern Legend" },
  { id: 26, name: "Waqar Younis", nickname: "The Toe Crusher", nationality: "Pakistani", born: "1971", role: "Bowler", era: "Modern Legend" },
  { id: 27, name: "Glenn McGrath", nickname: "Pigeon", nationality: "Australian", born: "1970", role: "Bowler", era: "Modern Legend" },
  { id: 28, name: "Curtly Ambrose", nickname: "The Gentle Giant", nationality: "West Indian", born: "1963", role: "Bowler", era: "Golden Age" },
  { id: 29, name: "Malcolm Marshall", nickname: "The Whispering Death", nationality: "West Indian", born: "1958", died: "1999", role: "Bowler", era: "Golden Age" },
  { id: 30, name: "Kumar Sangakkara", nickname: "The Mataram Maestro", nationality: "Sri Lankan", born: "1977", role: "Wicketkeeper/Batsman", era: "Modern Legend" },
  { id: 31, name: "Mahela Jayawardene", nickname: "The Silk", nationality: "Sri Lankan", born: "1977", role: "Batsman", era: "Modern Legend" },
  { id: 32, name: "Sanath Jayasuriya", nickname: "The Matara Marvel", nationality: "Sri Lankan", born: "1969", role: "All-Rounder", era: "Modern Legend" },
  { id: 33, name: "Javed Miandad", nickname: "The Street Fighter", nationality: "Pakistani", born: "1957", role: "Batsman", era: "Golden Age" },
  { id: 34, name: "Shoaib Akhtar", nickname: "The Rawalpindi Express", nationality: "Pakistani", born: "1975", role: "Bowler", era: "Modern Legend" },
  { id: 35, name: "Dale Steyn", nickname: "The Steyn Gun", nationality: "South African", born: "1983", role: "Bowler", era: "Modern Era" },
  // Rising Stars, All-Rounders & Global Role Models (36-51)
  { id: 36, name: "Ben Stokes", nickname: "The Superhuman", nationality: "English", born: "1991", role: "All-Rounder", era: "Modern Era" },
  { id: 37, name: "Joe Root", nickname: "The Yorkshire Wizard", nationality: "English", born: "1990", role: "Batsman", era: "Modern Era" },
  { id: 38, name: "R Ashwin", nickname: "The Professor", nationality: "Indian", born: "1986", role: "Bowler", era: "Modern Era" },
  { id: 39, name: "Hardik Pandya", nickname: "The Rockstar", nationality: "Indian", born: "1993", role: "All-Rounder", era: "Modern Era" },
  { id: 40, name: "Yashasvi Jaiswal", nickname: "The Rising Star", nationality: "Indian", born: "2001", role: "Batsman", era: "Modern Era" },
  { id: 41, name: "Babar Azam", nickname: "The King", nationality: "Pakistani", born: "1994", role: "Batsman", era: "Modern Era" },
  { id: 42, name: "Mitchell Starc", nickname: "The Yorker Specialist", nationality: "Australian", born: "1990", role: "Bowler", era: "Modern Era" },
  { id: 43, name: "Pat Cummins", nickname: "The Leader", nationality: "Australian", born: "1993", role: "Bowler/Captain", era: "Modern Era" },
  { id: 44, name: "Kagiso Rabada", nickname: "KG", nationality: "South African", born: "1995", role: "Bowler", era: "Modern Era" },
  { id: 45, name: "Alastair Cook", nickname: "The Chef", nationality: "English", born: "1984", role: "Batsman", era: "Modern Era" },
  { id: 46, name: "James Anderson", nickname: "The Burnley Express", nationality: "English", born: "1982", role: "Bowler", era: "Modern Era" },
  { id: 47, name: "Stuart Broad", nickname: "Broady", nationality: "English", born: "1986", role: "Bowler", era: "Modern Era" },
  { id: 48, name: "Inzamam-ul-Haq", nickname: "Inzy", nationality: "Pakistani", born: "1970", role: "Batsman", era: "Modern Legend" },
  { id: 49, name: "Dennis Lillee", nickname: "The Menace", nationality: "Australian", born: "1949", role: "Bowler", era: "Golden Age" },
  { id: 50, name: "Joel Garner", nickname: "Big Bird", nationality: "West Indian", born: "1952", role: "Bowler", era: "Golden Age" },
  { id: 51, name: "W.G. Grace", nickname: "The Doctor", nationality: "English", born: "1848", died: "1915", role: "Batsman/All-Rounder", era: "Early Masters" },
];
