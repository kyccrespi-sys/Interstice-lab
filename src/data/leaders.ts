// Leaders for "What Great Leaders Share". Style labels, trait marks and map placements are
// editorial judgments drawn from the cited sources, not measured scores.

export const styles = {
  commanding: { label: 'Commanding', src: 'Goleman (“coercive”)', def: 'Sets the direction and demands compliance: “Do what I tell you.” Fast in a crisis, corrosive over time.' },
  visionary: { label: 'Visionary', src: 'Goleman (“authoritative”)', def: 'Mobilizes people toward a vision and leaves the route to them: “Come with me.”' },
  pacesetting: { label: 'Pacesetting', src: 'Goleman', def: 'Sets very high standards and models them: “Do as I do, now.” Fast results from strong teams; burns others out.' },
  democratic: { label: 'Democratic', src: 'Lewin; Goleman', def: 'Builds consensus through participation: “What do you think?”' },
  affiliative: { label: 'Affiliative', src: 'Goleman', def: 'Creates emotional bonds and harmony: “People come first.”' },
  coaching: { label: 'Coaching', src: 'Goleman', def: 'Develops people for the future: “Try this.”' },
  transformational: { label: 'Transformational', src: 'Burns (1978)', def: 'Raises followers’ goals and sense of purpose, changing what people want, not just what they do.' },
  servant: { label: 'Servant', src: 'Greenleaf (1970s)', def: 'Leads by serving the people being led, putting their growth and the mission ahead of the leader.' },
  delegative: { label: 'Delegative', src: 'Lewin (“laissez-faire”)', def: 'Sets broad goals, picks people and hands off the details.' },
} as const;
export type StyleId = keyof typeof styles;

export const traits = [
  { id: 'resolve', label: 'Resolve', def: 'Holds course under pressure and setbacks.' },
  { id: 'comm', label: 'Communication', def: 'Unusually skilled at reaching people, in speech or in writing.' },
  { id: 'vision', label: 'Clear vision', def: 'A simple, compelling picture of where to go.' },
  { id: 'adapt', label: 'Adaptability', def: 'Changes course when the facts change.' },
  { id: 'coalition', label: 'Coalition-building', def: 'Brings rivals, parties or factions together.' },
  { id: 'decisive', label: 'Decisiveness', def: 'Makes big calls quickly when it counts.' },
  { id: 'risk', label: 'Risk-taking', def: 'Makes bold bets others avoid.' },
  { id: 'prep', label: 'Preparation', def: 'Relentless homework, rehearsal or standards.' },
  { id: 'empathy', label: 'Empathy', def: 'Leads from an understanding of how others feel.' },
  { id: 'humility', label: 'Humility', def: 'Shares credit, admits error, listens.' },
  { id: 'delegate', label: 'Delegation', def: 'Lets others run things and owns the result.' },
] as const;
export type TraitId = (typeof traits)[number]['id'];

export interface Leader {
  id: string; name: string; short: string; role: string; years: string; year: number; field: string;
  style: StyleId; style2?: StyleId; traits: TraitId[];
  successes: string[]; shortcomings: string[]; contested?: string;
  talk: string; x: number; y: number;
}

export const leaders: Leader[] = [
  {
    id: 'fdr', name: 'Franklin D. Roosevelt', short: 'Roosevelt', role: 'U.S. president', years: '1933–45', year: 1933, field: 'Politics',
    style: 'transformational', style2: 'visionary', traits: ['vision', 'resolve', 'comm', 'adapt', 'coalition', 'decisive', 'risk', 'empathy'],
    successes: ['Ended the 1933 banking panic in his first weeks, explaining it to the country by radio', 'The New Deal, including Social Security (1935)', 'Led the United States through most of World War II; elected four times'],
    shortcomings: ['His 1937 plan to enlarge the Supreme Court failed and split his own party', 'Signed Executive Order 9066 (1942), which led to the incarceration of about 120,000 Japanese Americans'],
    talk: 'About 30 radio “fireside chats” in deliberately plain language.', x: 0.36, y: 0.78,
  },
  {
    id: 'churchill', name: 'Winston Churchill', short: 'Churchill', role: 'U.K. prime minister', years: '1940–45', year: 1940, field: 'Politics',
    style: 'visionary', style2: 'commanding', traits: ['vision', 'resolve', 'comm', 'decisive', 'risk', 'prep'],
    successes: ['Persuaded Britain to fight on alone in 1940', 'Built the wartime alliance with the United States and the Soviet Union', 'Nobel Prize in Literature (1953)'],
    shortcomings: ['Voted out in the 1945 general election, weeks after victory in Europe', 'His record on empire, including policy during the 1943 Bengal famine, is fiercely criticized'],
    talk: '24 wartime BBC broadcasts, in short, old English words.', x: 0.12, y: 0.2,
  },
  {
    id: 'ike', name: 'Dwight D. Eisenhower', short: 'Eisenhower', role: 'Allied commander, U.S. president', years: '1944–61', year: 1944, field: 'Military and politics',
    style: 'delegative', style2: 'democratic', traits: ['resolve', 'coalition', 'decisive', 'prep', 'humility', 'delegate'],
    successes: ['Held the Allied command together and launched D-Day (1944)', 'Ended the fighting in Korea with the 1953 armistice', 'Signed the act that built the Interstate Highway System (1956)'],
    shortcomings: ['Seen at the time as passive; a 1962 poll of historians ranked him 21st', 'Avoided confronting Senator Joseph McCarthy in public, working against him only behind the scenes'],
    talk: 'Often vague in press conferences, precise on paper.', x: 0.58, y: 0.28,
  },
  {
    id: 'mlk', name: 'Martin Luther King Jr.', short: 'King', role: 'Civil rights leader', years: '1955–68', year: 1955, field: 'Social movement',
    style: 'transformational', style2: 'servant', traits: ['vision', 'resolve', 'comm', 'adapt', 'coalition', 'risk', 'empathy', 'humility'],
    successes: ['Rose to lead the Montgomery bus boycott (1955–56)', 'The 1963 March on Washington and the “I Have a Dream” speech', 'Helped win the Civil Rights Act (1964) and Voting Rights Act (1965); Nobel Peace Prize (1964)'],
    shortcomings: ['The Albany, Georgia campaign (1961–62) ended without its main goals', 'The 1966 Chicago campaign against housing segregation won little lasting change'],
    talk: 'A preacher’s oratory; the “dream” passage was improvised.', x: 0.66, y: 0.46,
  },
  {
    id: 'thatcher', name: 'Margaret Thatcher', short: 'Thatcher', role: 'U.K. prime minister', years: '1979–90', year: 1979, field: 'Politics',
    style: 'commanding', style2: 'visionary', traits: ['vision', 'resolve', 'comm', 'decisive', 'prep'],
    successes: ['Won three general elections; the longest-serving British prime minister of the 20th century', 'Brought inflation down from above 20%', 'Victory in the Falklands War (1982)'],
    shortcomings: ['Unemployment passed 3 million in 1982 and stayed that high until 1987', 'The poll tax set off riots in 1990; her own party forced her out that November'],
    talk: '“The lady’s not for turning”; trained her voice lower.', x: 0.1, y: 0.36,
  },
  {
    id: 'reagan', name: 'Ronald Reagan', short: 'Reagan', role: 'U.S. president', years: '1981–89', year: 1981, field: 'Politics',
    style: 'visionary', style2: 'delegative', traits: ['vision', 'resolve', 'comm', 'adapt', 'delegate'],
    successes: ['Inflation fell sharply and the longest peacetime expansion to that time followed', 'Re-elected in 1984, carrying 49 of 50 states', 'Signed the INF Treaty with the Soviet Union (1987); his policies contributed to the end of the Cold War'],
    shortcomings: ['The national debt nearly tripled', 'The Iran-Contra affair, a cost of loose delegation', 'Criticized as slow to respond to the AIDS epidemic'],
    talk: '“The Great Communicator”: stories and word pictures.', x: 0.55, y: 0.6,
  },
  {
    id: 'welch', name: 'Jack Welch', short: 'Welch', role: 'CEO, General Electric', years: '1981–2001', year: 1981, field: 'Business',
    style: 'pacesetting', style2: 'commanding', traits: ['vision', 'resolve', 'comm', 'decisive', 'risk', 'prep'],
    successes: ['GE’s market value grew from about $14 billion to about $410 billion', 'Fortune named him “manager of the century” (1999)', 'Built GE’s Crotonville school into a pipeline of future CEOs'],
    shortcomings: ['Tens of thousands of job cuts earned him the name “Neutron Jack”', 'Forced “rank and yank”: the bottom 10% out every year', 'GE Capital, built under him, nearly sank GE in the 2008 financial crisis'],
    talk: 'Prized blunt candor.', x: 0.06, y: 0.56,
  },
  {
    id: 'oprah', name: 'Oprah Winfrey', short: 'Winfrey', role: 'Talk-show host, media founder', years: '1986–2011', year: 1986, field: 'Media and business',
    style: 'affiliative', style2: 'visionary', traits: ['vision', 'resolve', 'comm', 'adapt', 'risk', 'empathy'],
    successes: ['Hosted the top-rated daytime talk show for 25 seasons', 'Owned her own studio, Harpo, and launched Oprah’s Book Club (1996)', 'Forbes named her the first Black woman billionaire (2003)'],
    shortcomings: ['Criticized for spreading a “confession culture”', 'Gave a platform to controversial self-help and health ideas'],
    talk: 'Self-disclosure: going first so the audience feels like a friend.', x: 0.72, y: 0.9,
  },
  {
    id: 'mandela', name: 'Nelson Mandela', short: 'Mandela', role: 'President of South Africa', years: '1994–99', year: 1994, field: 'Politics',
    style: 'servant', style2: 'transformational', traits: ['vision', 'resolve', 'comm', 'adapt', 'coalition', 'empathy', 'humility'],
    successes: ['Negotiated the end of apartheid; Nobel Peace Prize (1993)', 'First president of a fully democratic South Africa (1994)', 'Made reconciliation visible, as at the 1995 Rugby World Cup, and stepped down after one term'],
    shortcomings: ['Did little on HIV/AIDS in office, which he later acknowledged; infection among pregnant women rose from 7.6% to 22.4%', 'Deep poverty and high crime remained when he left office'],
    talk: 'Let symbols speak: the Springbok jersey, number 6.', x: 0.8, y: 0.5,
  },
  {
    id: 'jobs', name: 'Steve Jobs', short: 'Jobs', role: 'CEO, Apple', years: '1997–2011', year: 1997, field: 'Business',
    style: 'visionary', style2: 'pacesetting', traits: ['vision', 'resolve', 'comm', 'decisive', 'risk', 'prep'],
    successes: ['Returned in 1997 to an Apple near bankruptcy and turned it around', 'The iMac, iPod, iPhone and iPad', 'Funded and led Pixar through its first feature films'],
    shortcomings: ['Pushed out of Apple by its board in 1985', 'Known for harsh treatment of colleagues, and a “reality distortion field” that could bend facts'],
    talk: 'Rehearsed keynotes relentlessly; the rule of three.', x: 0.1, y: 0.72,
  },
  {
    id: 'bezos', name: 'Jeff Bezos', short: 'Bezos', role: 'Founder and CEO, Amazon', years: '1994–2021', year: 2000, field: 'Business',
    style: 'pacesetting', style2: 'visionary', traits: ['vision', 'resolve', 'comm', 'adapt', 'decisive', 'risk', 'prep'],
    successes: ['Grew an online bookstore into the world’s largest online retailer', 'Launched Amazon Web Services and much of the cloud-computing market', 'Built a culture of long-term bets and written six-page memos'],
    shortcomings: ['Long-running criticism of warehouse working conditions', 'Sued by the FTC and 17 states in 2023 for illegally maintaining monopoly power', 'Still ranked employees against each other in the 2010s'],
    talk: 'Banned slides in senior meetings; memos read in silence.', x: 0.38, y: 0.14,
  },
  {
    id: 'merkel', name: 'Angela Merkel', short: 'Merkel', role: 'Chancellor of Germany', years: '2005–21', year: 2005, field: 'Politics',
    style: 'democratic', traits: ['resolve', 'adapt', 'coalition', 'prep', 'humility'],
    successes: ['Won four elections and led for 16 years', 'Steered Europe through the euro crisis', 'Praised for calm, science-based communication early in the COVID-19 pandemic'],
    shortcomings: ['Backed Nord Stream 2 after Russia took Crimea; later conceded she had not responded adequately to Russian aggression', 'Critics cite a reform backlog and under-investment in defense'],
    contested: 'In 2015 she kept Germany open to refugees, and more than a million asylum seekers arrived. Admired as humane, attacked as reckless; still argued over.',
    talk: 'Understated, “step by step,” honest about the unknown.', x: 0.74, y: 0.24,
  },
  {
    id: 'nadella', name: 'Satya Nadella', short: 'Nadella', role: 'CEO, Microsoft', years: '2014–', year: 2014, field: 'Business',
    style: 'coaching', style2: 'transformational', traits: ['vision', 'comm', 'adapt', 'coalition', 'risk', 'empathy', 'humility'],
    successes: ['Grew Microsoft’s market value from about $300 billion to more than $3 trillion', 'Turned the company toward cloud computing', 'Changed a “know-it-all” culture into one of “learn-it-alls”'],
    shortcomings: ['About 10,000 job cuts in 2023, after 7,800 in 2015 when the inherited Nokia phone deal was written off', 'Very large AI bets whose payoff is not yet proven'],
    talk: 'Treats empathy as a hard skill.', x: 0.86, y: 0.64,
  },
  {
    id: 'ardern', name: 'Jacinda Ardern', short: 'Ardern', role: 'Prime minister of New Zealand', years: '2017–23', year: 2017, field: 'Politics',
    style: 'affiliative', style2: 'democratic', traits: ['comm', 'adapt', 'coalition', 'decisive', 'empathy'],
    successes: ['Banned military-style semi-automatic weapons 26 days after the Christchurch attack, by 119 votes to 1', 'One of the lowest COVID-19 death rates in the developed world early in the pandemic', 'Won a landslide re-election in 2020'],
    shortcomings: ['Missed promised goals on housing and child poverty', 'Border closures drew criticism at home; she resigned in 2023 as polls fell'],
    talk: 'Facebook Live from home after putting her toddler to bed.', x: 0.84, y: 0.88,
  },
];

// Average Flesch-Kincaid grade level of orally delivered State of the Union addresses, by president.
// Source: Smart Politics, University of Minnesota (Ostermeier, 2013). Data ends with Obama's fourth address (2013).
export const sotu = [
  { p: 'Coolidge', y: 1923, g: 11.3 }, { p: 'F. Roosevelt', y: 1934, g: 12.5 }, { p: 'Truman', y: 1946, g: 10.6 },
  { p: 'Eisenhower', y: 1953, g: 12.8 }, { p: 'Kennedy', y: 1961, g: 13.2 }, { p: 'L. Johnson', y: 1964, g: 10.4 },
  { p: 'Nixon', y: 1970, g: 11.6 }, { p: 'Ford', y: 1975, g: 11.2 }, { p: 'Carter', y: 1978, g: 10.8 },
  { p: 'Reagan', y: 1982, g: 10.3 }, { p: 'G.H.W. Bush', y: 1990, g: 8.6 }, { p: 'Clinton', y: 1994, g: 9.5 },
  { p: 'G.W. Bush', y: 2002, g: 10.4 }, { p: 'Obama', y: 2010, g: 8.6 },
];

// Average length of a candidate sound bite on U.S. network evening news, presidential campaigns. Source: Hallin (1992).
export const soundbites = [
  { y: 1968, s: 43 }, { y: 1972, s: 25 }, { y: 1976, s: 18 }, { y: 1980, s: 12 }, { y: 1984, s: 10 }, { y: 1988, s: 8.9 },
];

// Periods used for "what shifted": by the year each leader rose to their defining role.
export const periods = [
  { label: '1933–1960', from: 1900, to: 1960 },
  { label: '1961–1999', from: 1961, to: 1999 },
  { label: '2000–2023', from: 2000, to: 2100 },
];
