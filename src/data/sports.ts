export interface Athlete {
  id: number;
  name: string;
  nickname: string;
  sport: string;
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
  { id: 1, name: "Michael Jordan", nickname: "His Airness", sport: "Basketball", nationality: "American", born: "1963", netWorth: "$3.2B", era: "Modern Era", image: "/images/sports/michael-jordan.jpg" },
  { id: 2, name: "LeBron James", nickname: "King James", sport: "Basketball", nationality: "American", born: "1984", netWorth: "$1.2B", era: "Modern Era", image: "/images/sports/lebron-james.jpg" },
  { id: 3, name: "Stephen Curry", nickname: "The Baby-Faced Assassin", sport: "Basketball", nationality: "American", born: "1988", netWorth: "$200M+", era: "Modern Era" },
  { id: 4, name: "Wilt Chamberlain", nickname: "Wilt the Stilt", sport: "Basketball", nationality: "American", born: "1936", died: "1999", era: "Golden Age" },
  { id: 5, name: "Diana Taurasi", nickname: "The White Mamba", sport: "Basketball", nationality: "American", born: "1982", era: "Modern Era" },
  // Soccer (6-9)
  { id: 6, name: "Cristiano Ronaldo", nickname: "CR7", sport: "Soccer", nationality: "Portuguese", born: "1985", netWorth: "$800M", era: "Modern Era", image: "/images/sports/cristiano-ronaldo.jpg" },
  { id: 7, name: "Lionel Messi", nickname: "La Pulga", sport: "Soccer", nationality: "Argentine", born: "1987", netWorth: "$700M", era: "Modern Era", image: "/images/sports/lionel-messi.jpg" },
  { id: 8, name: "Pele", nickname: "The King", sport: "Soccer", nationality: "Brazilian", born: "1940", died: "2022", era: "Golden Age" },
  { id: 9, name: "Marta", nickname: "Pele in Skirts", sport: "Soccer", nationality: "Brazilian", born: "1986", era: "Modern Era" },
  // Tennis (10-16)
  { id: 10, name: "Serena Williams", nickname: "The GOAT", sport: "Tennis", nationality: "American", born: "1981", netWorth: "$300M", era: "Modern Era" },
  { id: 11, name: "Roger Federer", nickname: "The Maestro", sport: "Tennis", nationality: "Swiss", born: "1981", netWorth: "$600M", era: "Modern Era" },
  { id: 12, name: "Novak Djokovic", nickname: "The Joker", sport: "Tennis", nationality: "Serbian", born: "1987", netWorth: "$250M", era: "Modern Era" },
  { id: 13, name: "Rafael Nadal", nickname: "The King of Clay", sport: "Tennis", nationality: "Spanish", born: "1986", netWorth: "$220M", era: "Modern Era" },
  { id: 14, name: "Martina Navratilova", nickname: "The Tennis Legend", sport: "Tennis", nationality: "Czech-American", born: "1956", era: "Golden Age" },
  { id: 15, name: "Chris Evert", nickname: "The Ice Princess", sport: "Tennis", nationality: "American", born: "1954", era: "Golden Age" },
  { id: 16, name: "Billie Jean King", nickname: "The Pioneer", sport: "Tennis", nationality: "American", born: "1943", era: "Golden Age" },
  // Athletics (17-20)
  { id: 17, name: "Usain Bolt", nickname: "Lightning Bolt", sport: "Athletics", nationality: "Jamaican", born: "1986", netWorth: "$90M", era: "Modern Era" },
  { id: 18, name: "Jesse Owens", nickname: "The Buckeye Bullet", sport: "Athletics", nationality: "American", born: "1913", died: "1980", era: "Golden Age" },
  { id: 19, name: "Carl Lewis", nickname: "The Son of the Wind", sport: "Athletics", nationality: "American", born: "1961", era: "Modern Era" },
  { id: 20, name: "Allyson Felix", nickname: "The Speed Queen", sport: "Athletics", nationality: "American", born: "1985", era: "Modern Era" },
  // Swimming (21-23)
  { id: 21, name: "Michael Phelps", nickname: "The Baltimore Bullet", sport: "Swimming", nationality: "American", born: "1985", netWorth: "$100M", era: "Modern Era" },
  { id: 22, name: "Katie Ledecky", nickname: "The Distance Queen", sport: "Swimming", nationality: "American", born: "1997", era: "Modern Era" },
  { id: 23, name: "Mark Spitz", nickname: "The Golden Shark", sport: "Swimming", nationality: "American", born: "1950", era: "Golden Age" },
  // American Football (24-27)
  { id: 24, name: "Tom Brady", nickname: "The GOAT", sport: "American Football", nationality: "American", born: "1977", netWorth: "$300M", era: "Modern Era" },
  { id: 25, name: "Patrick Mahomes", nickname: "The Wizard", sport: "American Football", nationality: "American", born: "1995", era: "Modern Era" },
  { id: 26, name: "Jerry Rice", nickname: "The GOAT WR", sport: "American Football", nationality: "American", born: "1962", era: "Modern Era" },
  { id: 27, name: "Peyton Manning", nickname: "The Sheriff", sport: "American Football", nationality: "American", born: "1976", era: "Modern Era" },
  // Ice Hockey (28-30)
  { id: 28, name: "Wayne Gretzky", nickname: "The Great One", sport: "Ice Hockey", nationality: "Canadian", born: "1961", netWorth: "$250M", era: "Modern Era" },
  { id: 29, name: "Bobby Orr", nickname: "The Defenseman", sport: "Ice Hockey", nationality: "Canadian", born: "1948", era: "Golden Age" },
  { id: 30, name: "Sidney Crosby", nickname: "Sid the Kid", sport: "Ice Hockey", nationality: "Canadian", born: "1987", netWorth: "$80M", era: "Modern Era" },
  // Gymnastics (31-32)
  { id: 31, name: "Simone Biles", nickname: "The GOAT", sport: "Gymnastics", nationality: "American", born: "1997", netWorth: "$20M", era: "Modern Era" },
  { id: 32, name: "Nadia Comaneci", nickname: "The Perfect 10", sport: "Gymnastics", nationality: "Romanian", born: "1961", era: "Golden Age" },
  // Golf (33-34)
  { id: 33, name: "Tiger Woods", nickname: "The Big Cat", sport: "Golf", nationality: "American", born: "1975", netWorth: "$1.1B", era: "Modern Era" },
  { id: 34, name: "Jack Nicklaus", nickname: "The Golden Bear", sport: "Golf", nationality: "American", born: "1940", netWorth: "$400M", era: "Golden Age" },
  // Cricket (35-37)
  { id: 35, name: "Sachin Tendulkar", nickname: "The God of Cricket", sport: "Cricket", nationality: "Indian", born: "1973", netWorth: "$200M", era: "Modern Era" },
  { id: 36, name: "Virat Kohli", nickname: "The Run Machine", sport: "Cricket", nationality: "Indian", born: "1988", netWorth: "$120M", era: "Modern Era" },
  { id: 37, name: "Kapil Dev", nickname: "The Haryana Hurricane", sport: "Cricket", nationality: "Indian", born: "1959", era: "Golden Age" },
  // Formula 1 (38-39)
  { id: 38, name: "Lewis Hamilton", nickname: "The King", sport: "Formula 1", nationality: "British", born: "1985", netWorth: "$300M", era: "Modern Era" },
  { id: 39, name: "Ayrton Senna", nickname: "The Magic", sport: "Formula 1", nationality: "Brazilian", born: "1960", died: "1994", era: "Golden Age" },
  // Baseball (40-41)
  { id: 40, name: "Shohei Ohtani", nickname: "Shotime", sport: "Baseball", nationality: "Japanese", born: "1994", netWorth: "$100M", era: "Modern Era" },
  { id: 41, name: "Babe Ruth", nickname: "The Sultan of Swat", sport: "Baseball", nationality: "American", born: "1895", died: "1948", era: "Early Masters" },
  // Boxing (42-43)
  { id: 42, name: "Muhammad Ali", nickname: "The Greatest", sport: "Boxing", nationality: "American", born: "1942", died: "2016", era: "Golden Age", image: "/images/sports/muhammad-ali.jpg" },
  { id: 43, name: "Floyd Mayweather", nickname: "Money", sport: "Boxing", nationality: "American", born: "1977", netWorth: "$450M", era: "Modern Era" },
  // Multi-Sport (44-45)
  { id: 44, name: "Jim Thorpe", nickname: "The World's Greatest Athlete", sport: "Multi-Sport", nationality: "American", born: "1887", died: "1953", era: "Early Masters" },
  { id: 45, name: "Bo Jackson", nickname: "The Bo Knows", sport: "Multi-Sport", nationality: "American", born: "1962", era: "Modern Era" },
  // Other Sports (46-51)
  { id: 46, name: "Jon Jones", nickname: "Bones", sport: "MMA", nationality: "American", born: "1987", era: "Modern Era" },
  { id: 47, name: "Lin Dan", nickname: "Super Dan", sport: "Badminton", nationality: "Chinese", born: "1983", era: "Modern Era" },
  { id: 48, name: "Eddy Merckx", nickname: "The Cannibal", sport: "Cycling", nationality: "Belgian", born: "1945", era: "Golden Age" },
  { id: 49, name: "Ma Long", nickname: "The Dragon", sport: "Table Tennis", nationality: "Chinese", born: "1988", era: "Modern Era" },
  { id: 50, name: "Dhyan Chand", nickname: "The Wizard", sport: "Field Hockey", nationality: "Indian", born: "1905", died: "1979", era: "Early Masters" },
  { id: 51, name: "Mike Tyson", nickname: "Iron Mike", sport: "Boxing", nationality: "American", born: "1966", netWorth: "$10M", era: "Modern Era" },
];
