export interface Athlete {
  id: string;
  name: string;
  nickname: string;
  sport: string;
  role: string;
  nationality: string;
  born: string;
  died?: string;
  netWorth?: string;
  era: string;
  image?: string;
}

export const sportCategories = [
  { name: "Basketball", count: 5 },
  { name: "Soccer", count: 4 },
  { name: "Tennis", count: 7 },
  { name: "Athletics", count: 4 },
  { name: "Swimming", count: 3 },
  { name: "American Football", count: 4 },
  { name: "Ice Hockey", count: 3 },
  { name: "Gymnastics", count: 2 },
  { name: "Golf", count: 2 },
  { name: "Cricket", count: 3 },
  { name: "Formula 1", count: 2 },
  { name: "Baseball", count: 2 },
  { name: "Boxing", count: 2 },
  { name: "Multi-Sport", count: 2 },
  { name: "Other Sports", count: 6 },
];

export const athletes: Athlete[] = [
  // Basketball (1-5)
  { id: "michael-jordan", name: "Michael Jordan", nickname: "His Airness", sport: "Basketball", role: "Basketball", nationality: "American", born: "1963", netWorth: "$3.2B", era: "Modern Era", image: "/images/sports/michael-jordan.jpg" },
  { id: "lebron-james", name: "LeBron James", nickname: "King James", sport: "Basketball", role: "Basketball", nationality: "American", born: "1984", netWorth: "$1.2B", era: "Modern Era", image: "/images/sports/lebron-james.jpg" },
  { id: "stephen-curry", name: "Stephen Curry", nickname: "The Baby-Faced Assassin", sport: "Basketball", role: "Basketball", nationality: "American", born: "1988", netWorth: "$200M+", era: "Modern Era" },
  { id: "wilt-chamberlain", name: "Wilt Chamberlain", nickname: "Wilt the Stilt", sport: "Basketball", role: "Basketball", nationality: "American", born: "1936", died: "1999", era: "Golden Age" },
  { id: "diana-taurasi", name: "Diana Taurasi", nickname: "The White Mamba", sport: "Basketball", role: "Basketball", nationality: "American", born: "1982", era: "Modern Era" },
  // Soccer (6-9)
  { id: "cristiano-ronaldo", name: "Cristiano Ronaldo", nickname: "CR7", sport: "Soccer", role: "Soccer", nationality: "Portuguese", born: "1985", netWorth: "$800M", era: "Modern Era", image: "/images/sports/cristiano-ronaldo.jpg" },
  { id: "lionel-messi", name: "Lionel Messi", nickname: "La Pulga", sport: "Soccer", role: "Soccer", nationality: "Argentine", born: "1987", netWorth: "$700M", era: "Modern Era", image: "/images/sports/lionel-messi.jpg" },
  { id: "pele", name: "Pele", nickname: "The King", sport: "Soccer", role: "Soccer", nationality: "Brazilian", born: "1940", died: "2022", era: "Golden Age" },
  { id: "marta", name: "Marta", nickname: "Pele in Skirts", sport: "Soccer", role: "Soccer", nationality: "Brazilian", born: "1986", era: "Modern Era" },
  // Tennis (10-16)
  { id: "serena-williams", name: "Serena Williams", nickname: "The GOAT", sport: "Tennis", role: "Tennis", nationality: "American", born: "1981", netWorth: "$300M", era: "Modern Era" },
  { id: "roger-federer", name: "Roger Federer", nickname: "The Maestro", sport: "Tennis", role: "Tennis", nationality: "Swiss", born: "1981", netWorth: "$600M", era: "Modern Era" },
  { id: "novak-djokovic", name: "Novak Djokovic", nickname: "The Joker", sport: "Tennis", role: "Tennis", nationality: "Serbian", born: "1987", netWorth: "$250M", era: "Modern Era" },
  { id: "rafael-nadal", name: "Rafael Nadal", nickname: "The King of Clay", sport: "Tennis", role: "Tennis", nationality: "Spanish", born: "1986", netWorth: "$220M", era: "Modern Era" },
  { id: "martina-navratilova", name: "Martina Navratilova", nickname: "The Tennis Legend", sport: "Tennis", role: "Tennis", nationality: "Czech-American", born: "1956", era: "Golden Age" },
  { id: "chris-evert", name: "Chris Evert", nickname: "The Ice Princess", sport: "Tennis", role: "Tennis", nationality: "American", born: "1954", era: "Golden Age" },
  { id: "billie-jean-king", name: "Billie Jean King", nickname: "The Pioneer", sport: "Tennis", role: "Tennis", nationality: "American", born: "1943", era: "Golden Age" },
  // Athletics (17-20)
  { id: "usain-bolt", name: "Usain Bolt", nickname: "Lightning Bolt", sport: "Athletics", role: "Athletics", nationality: "Jamaican", born: "1986", netWorth: "$90M", era: "Modern Era" },
  { id: "jesse-owens", name: "Jesse Owens", nickname: "The Buckeye Bullet", sport: "Athletics", role: "Athletics", nationality: "American", born: "1913", died: "1980", era: "Golden Age" },
  { id: "carl-lewis", name: "Carl Lewis", nickname: "The Son of the Wind", sport: "Athletics", role: "Athletics", nationality: "American", born: "1961", era: "Modern Era" },
  { id: "allyson-felix", name: "Allyson Felix", nickname: "The Speed Queen", sport: "Athletics", role: "Athletics", nationality: "American", born: "1985", era: "Modern Era" },
  // Swimming (21-23)
  { id: "michael-phelps", name: "Michael Phelps", nickname: "The Baltimore Bullet", sport: "Swimming", role: "Swimming", nationality: "American", born: "1985", netWorth: "$100M", era: "Modern Era" },
  { id: "katie-ledecky", name: "Katie Ledecky", nickname: "The Distance Queen", sport: "Swimming", role: "Swimming", nationality: "American", born: "1997", era: "Modern Era" },
  { id: "mark-spitz", name: "Mark Spitz", nickname: "The Golden Shark", sport: "Swimming", role: "Swimming", nationality: "American", born: "1950", era: "Golden Age" },
  // American Football (24-27)
  { id: "tom-brady", name: "Tom Brady", nickname: "The GOAT", sport: "American Football", role: "American Football", nationality: "American", born: "1977", netWorth: "$300M", era: "Modern Era" },
  { id: "patrick-mahomes", name: "Patrick Mahomes", nickname: "The Wizard", sport: "American Football", role: "American Football", nationality: "American", born: "1995", era: "Modern Era" },
  { id: "jerry-rice", name: "Jerry Rice", nickname: "The GOAT WR", sport: "American Football", role: "American Football", nationality: "American", born: "1962", era: "Modern Era" },
  { id: "peyton-manning", name: "Peyton Manning", nickname: "The Sheriff", sport: "American Football", role: "American Football", nationality: "American", born: "1976", era: "Modern Era" },
  // Ice Hockey (28-30)
  { id: "wayne-gretzky", name: "Wayne Gretzky", nickname: "The Great One", sport: "Ice Hockey", role: "Ice Hockey", nationality: "Canadian", born: "1961", netWorth: "$250M", era: "Modern Era" },
  { id: "bobby-orr", name: "Bobby Orr", nickname: "The Defenseman", sport: "Ice Hockey", role: "Ice Hockey", nationality: "Canadian", born: "1948", era: "Golden Age" },
  { id: "sidney-crosby", name: "Sidney Crosby", nickname: "Sid the Kid", sport: "Ice Hockey", role: "Ice Hockey", nationality: "Canadian", born: "1987", netWorth: "$80M", era: "Modern Era" },
  // Gymnastics (31-32)
  { id: "simone-biles", name: "Simone Biles", nickname: "The GOAT", sport: "Gymnastics", role: "Gymnastics", nationality: "American", born: "1997", netWorth: "$20M", era: "Modern Era" },
  { id: "nadia-comaneci", name: "Nadia Comaneci", nickname: "The Perfect 10", sport: "Gymnastics", role: "Gymnastics", nationality: "Romanian", born: "1961", era: "Golden Age" },
  // Golf (33-34)
  { id: "tiger-woods", name: "Tiger Woods", nickname: "The Big Cat", sport: "Golf", role: "Golf", nationality: "American", born: "1975", netWorth: "$1.1B", era: "Modern Era" },
  { id: "jack-nicklaus", name: "Jack Nicklaus", nickname: "The Golden Bear", sport: "Golf", role: "Golf", nationality: "American", born: "1940", netWorth: "$400M", era: "Golden Age" },
  // Cricket (35-37)
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", nickname: "The God of Cricket", sport: "Cricket", role: "Cricket", nationality: "Indian", born: "1973", netWorth: "$200M", era: "Modern Era" },
  { id: "virat-kohli", name: "Virat Kohli", nickname: "The Run Machine", sport: "Cricket", role: "Cricket", nationality: "Indian", born: "1988", netWorth: "$120M", era: "Modern Era" },
  { id: "kapil-dev", name: "Kapil Dev", nickname: "The Haryana Hurricane", sport: "Cricket", role: "Cricket", nationality: "Indian", born: "1959", era: "Golden Age" },
  // Formula 1 (38-39)
  { id: "lewis-hamilton", name: "Lewis Hamilton", nickname: "The King", sport: "Formula 1", role: "Formula 1", nationality: "British", born: "1985", netWorth: "$300M", era: "Modern Era" },
  { id: "ayrton-senna", name: "Ayrton Senna", nickname: "The Magic", sport: "Formula 1", role: "Formula 1", nationality: "Brazilian", born: "1960", died: "1994", era: "Golden Age" },
  // Baseball (40-41)
  { id: "shohei-ohtani", name: "Shohei Ohtani", nickname: "Shotime", sport: "Baseball", role: "Baseball", nationality: "Japanese", born: "1994", netWorth: "$100M", era: "Modern Era" },
  { id: "babe-ruth", name: "Babe Ruth", nickname: "The Sultan of Swat", sport: "Baseball", role: "Baseball", nationality: "American", born: "1895", died: "1948", era: "Early Masters" },
  // Boxing (42-43)
  { id: "muhammad-ali", name: "Muhammad Ali", nickname: "The Greatest", sport: "Boxing", role: "Boxing", nationality: "American", born: "1942", died: "2016", era: "Golden Age", image: "/images/sports/muhammad-ali.jpg" },
  { id: "floyd-mayweather", name: "Floyd Mayweather", nickname: "Money", sport: "Boxing", role: "Boxing", nationality: "American", born: "1977", netWorth: "$450M", era: "Modern Era" },
  // Multi-Sport (44-45)
  { id: "jim-thorpe", name: "Jim Thorpe", nickname: "The World's Greatest Athlete", sport: "Multi-Sport", role: "Multi-Sport", nationality: "American", born: "1887", died: "1953", era: "Early Masters" },
  { id: "bo-jackson", name: "Bo Jackson", nickname: "The Bo Knows", sport: "Multi-Sport", role: "Multi-Sport", nationality: "American", born: "1962", era: "Modern Era" },
  // Other Sports (46-51)
  { id: "jon-jones", name: "Jon Jones", nickname: "Bones", sport: "MMA", role: "MMA", nationality: "American", born: "1987", era: "Modern Era" },
  { id: "lin-dan", name: "Lin Dan", nickname: "Super Dan", sport: "Badminton", role: "Badminton", nationality: "Chinese", born: "1983", era: "Modern Era" },
  { id: "eddy-merckx", name: "Eddy Merckx", nickname: "The Cannibal", sport: "Cycling", role: "Cycling", nationality: "Belgian", born: "1945", era: "Golden Age" },
  { id: "ma-long", name: "Ma Long", nickname: "The Dragon", sport: "Table Tennis", role: "Table Tennis", nationality: "Chinese", born: "1988", era: "Modern Era" },
  { id: "dhyan-chand", name: "Dhyan Chand", nickname: "The Wizard", sport: "Field Hockey", role: "Field Hockey", nationality: "Indian", born: "1905", died: "1979", era: "Early Masters" },
  { id: "mike-tyson", name: "Mike Tyson", nickname: "Iron Mike", sport: "Boxing", role: "Boxing", nationality: "American", born: "1966", netWorth: "$10M", era: "Modern Era" },
];
