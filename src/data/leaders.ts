// "What Great Leaders Share": research backbone + 29 leader profiles.
// Style labels and trait marks are editorial judgments from the cited sources, not measured scores.

export const styles = {
  commanding: { label: 'Commanding', src: 'Goleman (“coercive”)', def: 'Sets the direction and demands compliance. Fast in a crisis; corrosive to the working climate over time.' },
  visionary: { label: 'Visionary', src: 'Goleman (“authoritative”)', def: 'Mobilizes people toward a vision and leaves the route to them. The style Goleman found most positive for climate.' },
  pacesetting: { label: 'Pacesetting', src: 'Goleman', def: 'Sets very high standards and models them. Quick results from strong teams; burns others out.' },
  democratic: { label: 'Democratic', src: 'Lewin; Goleman', def: 'Builds consensus through participation. Slower, but wins commitment.' },
  affiliative: { label: 'Affiliative', src: 'Goleman', def: 'Creates emotional bonds and harmony; puts people first.' },
  coaching: { label: 'Coaching', src: 'Goleman', def: 'Develops people for the long term.' },
  transformational: { label: 'Transformational', src: 'Burns (1978)', def: 'Raises followers’ goals and sense of purpose, changing what people want, not just what they do.' },
  servant: { label: 'Servant', src: 'Greenleaf (1970s)', def: 'Leads by serving the people led, putting their growth and the mission ahead of the leader.' },
  delegative: { label: 'Delegative', src: 'Lewin (“laissez-faire”)', def: 'Sets broad goals, picks strong people and hands off the details.' },
} as const;
export type StyleId = keyof typeof styles;

// Traits, each tied to the research that supports it.
export const traits = [
  { id: 'vision', label: 'Vision', research: 'GLOBE: “foresight” and “plans ahead” are universally endorsed. Kouzes & Posner: “forward-looking” is the No. 2 admired quality.', def: 'A clear, compelling picture of where to go.' },
  { id: 'comm', label: 'Inspiring communication', research: 'GLOBE: “communicative” and “motive arouser” are universal. Kouzes & Posner: “inspiring” is in the top four.', def: 'Moves people, in speech or in writing.' },
  { id: 'resolve', label: 'Resolve', research: 'Collins: “professional will” is half of Level 5 leadership. GLOBE: “dynamic” is universal.', def: 'Holds course through setbacks and pressure.' },
  { id: 'decisive', label: 'Decisiveness', research: 'GLOBE: “decisive” is universally endorsed across 62 societies.', def: 'Makes big calls when they need making.' },
  { id: 'competence', label: 'Competence', research: 'Kouzes & Posner: “competent” is in the top four. GLOBE: “informed,” “intelligent,” “administratively skilled.”', def: 'Deep mastery of the work itself.' },
  { id: 'team', label: 'Team and coalition building', research: 'GLOBE: “team builder,” “coordinator,” “win-win problem solver” are universal.', def: 'Brings people, factions or allies together.' },
  { id: 'standards', label: 'High standards', research: 'GLOBE: “excellence-oriented” is universal. Goleman: pacesetting gets results but can harm climate.', def: 'Demands and models excellence and discipline.' },
  { id: 'adapt', label: 'Adaptability', research: 'Goleman: the best leaders switch among styles. Elberse on Ferguson: “never stop adapting.”', def: 'Changes course when the facts change.' },
  { id: 'humility', label: 'Humility', research: 'Collins: “personal humility” is the other half of Level 5. GLOBE: “egocentric” is universally rejected.', def: 'Shares credit, admits error, listens.' },
  { id: 'empathy', label: 'Empathy', research: 'GLOBE: the “humane-oriented” style varies by culture. Project Oxygen: caring about team members’ wellbeing marks great managers.', def: 'Leads from an understanding of how others feel.' },
  { id: 'risk', label: 'Risk-taking', research: 'GLOBE: “risk taker” is culturally contingent: valued in some societies, distrusted in others.', def: 'Makes bold bets others avoid.' },
  { id: 'delegate', label: 'Delegation', research: 'Project Oxygen: great managers empower the team and don’t micromanage. Lewin: pure hands-off leadership performed worst.', def: 'Hands real authority to others.' },
] as const;
export type TraitId = (typeof traits)[number]['id'];

export const fields = {
  politics: 'Politics and statecraft',
  military: 'Military and science',
  business: 'Business',
  movement: 'Movements and nonprofits',
  media: 'Media and sport',
} as const;
export type FieldId = keyof typeof fields;

export interface Leader {
  id: string; name: string; short: string; role: string; region: string; years: string; year: number; field: FieldId;
  style: StyleId; style2?: StyleId; traits: TraitId[];
  summary: string;
  key: { t: string; e: string }[];        // defining characteristics with evidence
  decision: string;                       // signature decision
  successes: string[]; shortcomings: string[];
}

export const leaders: Leader[] = [
  // ───── 1926–1959 ─────
  {
    id: 'gandhi', name: 'Mohandas K. Gandhi', short: 'Gandhi', role: 'Leader of Indian independence', region: 'India', years: '1920–48', year: 1930, field: 'movement',
    style: 'servant', style2: 'transformational', traits: ['vision', 'comm', 'resolve', 'team', 'humility', 'risk', 'adapt'],
    summary: 'Turned nonviolent mass protest into a force that helped end British rule in India.',
    key: [
      { t: 'Moral authority through example', e: 'Lived simply and took the same risks he asked of others, including prison and long fasts.' },
      { t: 'Symbols ordinary people could join', e: 'Chose the salt tax, a burden on every household, as the target of his 1930 march.' },
      { t: 'Disciplined nonviolence', e: 'Satyagraha, “holding onto truth,” paired defiance of unjust laws with acceptance of the penalty.' },
    ],
    decision: 'The 1930 Salt March: a 240-mile walk to the sea to make salt in defiance of British law. Britain jailed more than 60,000 protesters and support for home rule grew.',
    successes: ['Led the Salt March (1930) and the Quit India campaign (1942)', 'Made nonviolent resistance a model used worldwide, including by King', 'Independence for India in 1947'],
    shortcomings: ['Early writings in South Africa used racist language about Black Africans', 'His 1932 fast forced B. R. Ambedkar to drop separate electorates for Dalits, a choice Ambedkarites still contest', 'Could not prevent partition and the violence that came with it'],
  },
  {
    id: 'fdr', name: 'Franklin D. Roosevelt', short: 'Roosevelt', role: 'U.S. president', region: 'United States', years: '1933–45', year: 1933, field: 'politics',
    style: 'transformational', style2: 'visionary', traits: ['vision', 'comm', 'resolve', 'decisive', 'team', 'adapt', 'empathy', 'risk'],
    summary: 'Led the U.S. through the Depression and most of World War II; elected four times.',
    key: [
      { t: 'Plain-spoken reassurance', e: 'About 30 radio “fireside chats,” in the simplest language he could find, starting eight days into office.' },
      { t: 'Bold experimentation', e: 'Launched program after program in his first months and kept what worked.' },
      { t: 'Coalition-building', e: 'Held together a broad and often uneasy political coalition for 12 years.' },
    ],
    decision: 'Closing every bank in the country in March 1933, then explaining by radio why it was safe to put money back.',
    successes: ['Ended the 1933 banking panic within weeks', 'The New Deal, including Social Security (1935)', 'Led the U.S. and its allies through most of World War II'],
    shortcomings: ['His 1937 plan to enlarge the Supreme Court failed and split his own party', 'Signed Executive Order 9066 (1942), leading to the incarceration of about 120,000 Japanese Americans'],
  },
  {
    id: 'marshall', name: 'George C. Marshall', short: 'Marshall', role: 'U.S. Army chief of staff, secretary of state', region: 'United States', years: '1939–51', year: 1939, field: 'military',
    style: 'pacesetting', style2: 'delegative', traits: ['competence', 'decisive', 'resolve', 'team', 'standards', 'humility', 'delegate'],
    summary: 'Built the U.S. Army for World War II, then designed the plan that rebuilt Western Europe.',
    key: [
      { t: 'Picking people', e: 'Promoted a generation of commanders, among them Eisenhower and Bradley, and removed officers he judged unfit.' },
      { t: 'Selflessness', e: 'Let Eisenhower command D-Day rather than pressing for the role himself.' },
      { t: 'Systems thinking', e: 'Ran the war as an organization: building, supplying and deploying an army of more than eight million.' },
    ],
    decision: 'Proposing in 1947 that the U.S. fund Europe’s recovery. The program delivered more than $13 billion.',
    successes: ['Grew the Army from under 200,000 to more than 8 million', 'The Marshall Plan; the only Army general awarded the Nobel Peace Prize (1953)', 'Chose Eisenhower to lead the Allied invasion of Europe'],
    shortcomings: ['His 1946 mission to end China’s civil war failed', 'Was attacked by Senator Joseph McCarthy after the Communist victory in China'],
  },
  {
    id: 'churchill', name: 'Winston Churchill', short: 'Churchill', role: 'U.K. prime minister', region: 'United Kingdom', years: '1940–45', year: 1940, field: 'politics',
    style: 'visionary', style2: 'commanding', traits: ['vision', 'comm', 'resolve', 'decisive', 'risk', 'standards'],
    summary: 'Kept Britain fighting in 1940 and built the alliance that won the war in Europe.',
    key: [
      { t: 'Defiance under pressure', e: 'Refused to negotiate with Hitler in May 1940 when some in his cabinet wanted to.' },
      { t: 'Words as weapons', e: 'Drew on the Bible and Shakespeare and typed his speeches in short lines to pace them.' },
      { t: 'Relentless energy', e: 'Drove ministers and generals hard, often to their exhaustion.' },
    ],
    decision: 'Fighting on after France fell in 1940, rather than seeking terms.',
    successes: ['Persuaded Britain to fight on alone in 1940', 'Built the alliance with the U.S. and the Soviet Union', 'Nobel Prize in Literature (1953)'],
    shortcomings: ['Voted out in 1945, weeks after victory in Europe', 'His record on empire, including policy during the 1943 Bengal famine, is fiercely criticized'],
  },
  {
    id: 'oppenheimer', name: 'J. Robert Oppenheimer', short: 'Oppenheimer', role: 'Director, Los Alamos Laboratory', region: 'United States', years: '1943–45', year: 1943, field: 'military',
    style: 'visionary', style2: 'democratic', traits: ['vision', 'comm', 'competence', 'team', 'standards'],
    summary: 'Led the wartime laboratory that built the first atomic bombs.',
    key: [
      { t: 'Recruiting talent', e: 'Persuaded many of the era’s leading scientists to move to a secret mesa in New Mexico.' },
      { t: 'Open debate', e: 'Pushed for open technical discussion across the lab and shielded staff from security rules where he could.' },
      { t: 'Mastery of the science', e: 'Could follow and connect the work of every group, earning authority without a military title.' },
    ],
    decision: 'Choosing Los Alamos as the site and running it as one open scientific community rather than sealed teams.',
    successes: ['Delivered the first nuclear test, Trinity, in July 1945', 'Built a model for big collaborative science', 'Later one of the most influential science advisers in government'],
    shortcomings: ['Admitted in 1954 that an account he had given security officers was “a tissue of lies,” which harmed a friend', 'Lost his security clearance in 1954; the decision was vacated only in 2022', 'Carried lasting moral doubts about the weapon he led'],
  },
  {
    id: 'ike', name: 'Dwight D. Eisenhower', short: 'Eisenhower', role: 'Allied commander, U.S. president', region: 'United States', years: '1944–61', year: 1944, field: 'military',
    style: 'delegative', style2: 'democratic', traits: ['competence', 'decisive', 'resolve', 'team', 'humility', 'delegate'],
    summary: 'Commanded the Allied invasion of Europe, then served two terms as president.',
    key: [
      { t: 'Holding coalitions together', e: 'Kept British, American and other commanders working as one Allied command.' },
      { t: 'Owning the outcome', e: 'Before D-Day he drafted a note taking full blame if the landings failed.' },
      { t: '“Hidden-hand” influence', e: 'As president he delegated widely and worked behind the scenes, often vague in public, precise on paper.' },
    ],
    decision: 'Launching D-Day on June 6, 1944, in a narrow gap in bad weather.',
    successes: ['Led the D-Day landings and the liberation of Western Europe', 'Ended the fighting in Korea (1953)', 'Signed the act that built the Interstate Highway System (1956)'],
    shortcomings: ['Seen as passive at the time; historians ranked him 21st in 1962', 'Avoided confronting Senator McCarthy in public'],
  },
  {
    id: 'wooden', name: 'John Wooden', short: 'Wooden', role: 'Basketball coach, UCLA', region: 'United States', years: '1948–75', year: 1948, field: 'media',
    style: 'coaching', style2: 'pacesetting', traits: ['competence', 'standards', 'humility', 'comm', 'adapt'],
    summary: 'Won 10 national titles in 12 years, still the benchmark in American college sport.',
    key: [
      { t: 'Teacher first', e: 'Called himself a teacher; said what he missed most in retirement was practice.' },
      { t: 'Fundamentals and detail', e: 'Built success on short, simple lessons and his 25-block “Pyramid of Success.”' },
      { t: 'Patience', e: 'Coached 16 seasons before his first national title, then won ten of the next twelve.' },
    ],
    decision: 'Defining success as doing your best, not the scoreboard, and teaching it daily.',
    successes: ['10 NCAA titles in 12 years, including seven in a row', 'An 88-game winning streak', 'A leadership philosophy studied far outside sport'],
    shortcomings: ['A booster, Sam Gilbert, gave players gifts that broke NCAA rules during the dynasty years'],
  },
  {
    id: 'mlk', name: 'Martin Luther King Jr.', short: 'King', role: 'Civil rights leader', region: 'United States', years: '1955–68', year: 1955, field: 'movement',
    style: 'transformational', style2: 'servant', traits: ['vision', 'comm', 'resolve', 'team', 'empathy', 'humility', 'adapt', 'risk'],
    summary: 'Led the American civil rights movement to landmark laws through nonviolent protest.',
    key: [
      { t: 'A moral vision people could see', e: 'The “dream” turned a legal fight into a shared picture of the country.' },
      { t: 'Listening', e: 'Took advice from figures like Bayard Rustin, and improvised the “dream” passage after Mahalia Jackson called out to him.' },
      { t: 'Courage', e: 'Jailed many times; kept leading under constant threat.' },
    ],
    decision: 'Bringing the movement to Birmingham in 1963 and accepting arrest, which produced his “Letter from Birmingham Jail.”',
    successes: ['The Montgomery bus boycott (1955–56)', 'The 1963 March on Washington', 'Helped win the Civil Rights Act (1964) and Voting Rights Act (1965); Nobel Peace Prize (1964)'],
    shortcomings: ['The Albany, Georgia campaign (1961–62) fell short of its goals', 'The 1966 Chicago housing campaign won little lasting change'],
  },
  {
    id: 'lky', name: 'Lee Kuan Yew', short: 'Lee', role: 'Prime minister of Singapore', region: 'Singapore', years: '1959–90', year: 1959, field: 'politics',
    style: 'commanding', style2: 'visionary', traits: ['vision', 'decisive', 'resolve', 'competence', 'standards'],
    summary: 'Turned a small port with no natural resources into one of the richest countries in the world.',
    key: [
      { t: 'Long-range planning', e: 'Built policy around a clear economic plan: foreign investment, education, housing.' },
      { t: 'Zero tolerance for corruption', e: 'Made clean government a defining feature of the state.' },
      { t: 'Control', e: 'Prized order over open debate, and said so openly.' },
    ],
    decision: 'Betting Singapore’s future on foreign investment and manufacturing after it was expelled from Malaysia in 1965.',
    successes: ['GDP per person rose from about $500 in 1965 to about $55,000 by 2013', 'One of the world’s least corrupt governments', 'Stable relations among Chinese, Malay and Indian communities'],
    shortcomings: ['Detained opponents without trial, including in 1963’s Operation Coldstore', 'Restricted the press and used defamation suits against critics'],
  },
  // ───── 1960–1989 ─────
  {
    id: 'walton', name: 'Sam Walton', short: 'Walton', role: 'Founder, Walmart', region: 'United States', years: '1962–92', year: 1962, field: 'business',
    style: 'servant', style2: 'democratic', traits: ['vision', 'team', 'humility', 'adapt', 'risk', 'standards'],
    summary: 'Built a single discount store into the world’s largest retailer.',
    key: [
      { t: 'Close to the front line', e: 'Flew his own plane to visit stores and walked rivals’ aisles with a notepad.' },
      { t: 'Partnership with staff', e: 'Called employees “associates” and shared profits with them.' },
      { t: 'Frugality', e: 'Kept costs, and his own style, famously modest.' },
    ],
    decision: 'Opening big discount stores in small towns that rivals like Kmart ignored.',
    successes: ['Grew Walmart into the world’s largest retailer', 'Pioneered the small-town discount model and its supply system', 'Built unusual loyalty among store staff'],
    shortcomings: ['Opposed unions; criticized over pay and labor practices', 'Blamed for hurting small local businesses'],
  },
  {
    id: 'graham', name: 'Katharine Graham', short: 'Graham', role: 'Publisher, The Washington Post', region: 'United States', years: '1963–91', year: 1963, field: 'business',
    style: 'delegative', style2: 'democratic', traits: ['resolve', 'decisive', 'risk', 'delegate', 'adapt'],
    summary: 'Took over the Post after her husband’s death and made it a national newspaper.',
    key: [
      { t: 'Courage despite self-doubt', e: 'Wrote openly about her insecurity in the early years, and made the hardest calls anyway.' },
      { t: 'Backing her people', e: 'Gave editor Ben Bradlee and his reporters room to pursue the biggest stories.' },
      { t: 'Learning on the job', e: 'Had no executive experience when she took over in 1963.' },
    ],
    decision: 'Publishing the Pentagon Papers in 1971 against her lawyers’ advice, days after the company went public.',
    successes: ['The Pentagon Papers; vindicated by the Supreme Court (1971)', 'Backed the Watergate reporting', 'First woman to lead a Fortune 500 company; Pulitzer Prize for her memoir (1998)'],
    shortcomings: ['The bitter 1975–76 pressmen’s strike; strikers burned her in effigy', 'Critics found her own account of the strike one-sided'],
  },
  {
    id: 'buffett', name: 'Warren Buffett', short: 'Buffett', role: 'CEO, Berkshire Hathaway', region: 'United States', years: '1965–2025', year: 1965, field: 'business',
    style: 'delegative', traits: ['competence', 'comm', 'humility', 'resolve', 'delegate'],
    summary: 'Turned a failing textile mill into one of the world’s largest companies.',
    key: [
      { t: 'Radical delegation', e: 'Bought companies and left their managers almost completely alone.' },
      { t: 'Patience and discipline', e: 'Ignored short-term pressure for six decades.' },
      { t: 'Candor in writing', e: 'His annual letters owned his mistakes in plain language.' },
    ],
    decision: 'Keeping Berkshire’s headquarters tiny and decentralized while it grew to hundreds of thousands of employees.',
    successes: ['About 20% compounded annual gains from 1965 to 2024, roughly double the S&P 500', 'Built a company of more than 390,000 employees', 'Shareholder letters that became a business classic'],
    shortcomings: ['Admitted his hands-off style let underperforming businesses languish', 'Berkshire’s structure departs from common governance norms'],
  },
  {
    id: 'morita', name: 'Akio Morita', short: 'Morita', role: 'Co-founder and chairman, Sony', region: 'Japan', years: '1946–94', year: 1971, field: 'business',
    style: 'visionary', style2: 'democratic', traits: ['vision', 'comm', 'risk', 'resolve', 'adapt'],
    summary: 'Built Sony into a global brand and changed what “Made in Japan” meant.',
    key: [
      { t: 'Global from the start', e: 'Refused a huge early order that would have put another company’s name on Sony radios.' },
      { t: 'Trusting instinct over research', e: 'Doubted that any market research could have predicted the Walkman.' },
      { t: 'Open debate', e: 'Encouraged argument unfettered by hierarchy inside Sony.' },
    ],
    decision: 'Launching the Walkman in 1979, a tape player with no recording function, over internal doubts.',
    successes: ['The Walkman (1979) and, with Philips, the compact disc (1982)', 'One of the first Japanese companies listed on the New York Stock Exchange (1961)', 'Turned “Made in Japan” into a mark of quality'],
    shortcomings: ['Betamax lost the video format war to VHS; Sony only began selling VHS in 1988', 'Criticized at home for attacking the Japanese business model'],
  },
  {
    id: 'hesselbein', name: 'Frances Hesselbein', short: 'Hesselbein', role: 'CEO, Girl Scouts of the USA', region: 'United States', years: '1976–90', year: 1976, field: 'movement',
    style: 'democratic', style2: 'servant', traits: ['vision', 'comm', 'team', 'humility', 'empathy', 'delegate'],
    summary: 'Revived a declining Girl Scouts and became a model for nonprofit leadership.',
    key: [
      { t: '“Circular management”', e: 'Replaced the hierarchy with concentric circles of shared responsibility.' },
      { t: 'Mission first', e: 'Recommitted the organization to helping each girl reach her potential.' },
      { t: 'Inclusion', e: 'Opened the organization to communities it had not served.' },
    ],
    decision: 'Creating the Daisy program for younger girls and broadening who the Girl Scouts served.',
    successes: ['Membership reached 2.25 million girls, with 780,000 mostly volunteer staff', 'Minority membership tripled', 'Peter Drucker called her the best CEO in America; Presidential Medal of Freedom (1998)'],
    shortcomings: ['We found no major documented failures, itself a reminder that nonprofit leaders get far less scrutiny than CEOs or presidents'],
  },
  {
    id: 'maathai', name: 'Wangari Maathai', short: 'Maathai', role: 'Founder, Green Belt Movement', region: 'Kenya', years: '1977–2011', year: 1977, field: 'movement',
    style: 'transformational', style2: 'democratic', traits: ['vision', 'comm', 'resolve', 'team', 'risk'],
    summary: 'Built a grassroots movement that planted tens of millions of trees and fought for democracy.',
    key: [
      { t: 'A simple, local action', e: 'Started with one act anyone could do, planting a tree, and linked it to water, food and income.' },
      { t: 'Empowering others', e: 'Trained more than 30,000 women in forestry and related trades.' },
      { t: 'Courage', e: 'Arrested, jailed and beaten for opposing Kenya’s one-party government.' },
    ],
    decision: 'Linking tree planting to women’s livelihoods and democracy rather than treating it as conservation alone.',
    successes: ['More than 51 million trees planted', 'First African woman to win the Nobel Peace Prize (2004)', 'Elected to Kenya’s parliament in 2002 with 98% of the vote'],
    shortcomings: ['In 2004 she was reported as saying HIV was engineered; she said she was misquoted but would not rule it out'],
  },
  {
    id: 'thatcher', name: 'Margaret Thatcher', short: 'Thatcher', role: 'U.K. prime minister', region: 'United Kingdom', years: '1979–90', year: 1979, field: 'politics',
    style: 'commanding', style2: 'visionary', traits: ['vision', 'comm', 'resolve', 'decisive', 'standards'],
    summary: 'Remade the British economy; the longest-serving U.K. prime minister of the 20th century.',
    key: [
      { t: 'Conviction', e: 'Called herself “a conviction politician,” not a consensus one.' },
      { t: 'Refusal to retreat', e: '“The lady’s not for turning” (1980), with unemployment above two million.' },
      { t: 'Preparation', e: 'Famous for mastering detail and outworking her ministers.' },
    ],
    decision: 'Holding her economic course in 1980–81 despite a recession and a cabinet revolt.',
    successes: ['Won three general elections', 'Brought inflation down from above 20%', 'Victory in the Falklands War (1982)'],
    shortcomings: ['Unemployment passed 3 million in 1982 and stayed high until 1987', 'The poll tax set off riots in 1990; her party forced her out that year'],
  },
  {
    id: 'reagan', name: 'Ronald Reagan', short: 'Reagan', role: 'U.S. president', region: 'United States', years: '1981–89', year: 1981, field: 'politics',
    style: 'visionary', style2: 'delegative', traits: ['vision', 'comm', 'resolve', 'adapt', 'delegate'],
    summary: 'Two-term president who presided over falling inflation and the end of the Cold War.',
    key: [
      { t: 'Optimism', e: 'Set out to make Americans “believe in themselves again,” which he called his greatest achievement.' },
      { t: 'Stories over statistics', e: 'Known as “the Great Communicator” for word pictures and anecdotes.' },
      { t: 'Broad goals, wide delegation', e: 'Set direction and left execution to his team.' },
    ],
    decision: 'Moving from confrontation to negotiation with Mikhail Gorbachev, leading to the 1987 INF Treaty.',
    successes: ['Inflation fell and a long peacetime expansion followed', 'Re-elected in 1984, carrying 49 of 50 states', 'The INF Treaty (1987)'],
    shortcomings: ['The national debt nearly tripled', 'The Iran-Contra affair, a cost of loose delegation', 'Criticized as slow to respond to AIDS'],
  },
  {
    id: 'welch', name: 'Jack Welch', short: 'Welch', role: 'CEO, General Electric', region: 'United States', years: '1981–2001', year: 1981, field: 'business',
    style: 'pacesetting', style2: 'commanding', traits: ['vision', 'comm', 'resolve', 'decisive', 'competence', 'risk', 'standards'],
    summary: 'Made GE the world’s most valuable company and its management style the most copied.',
    key: [
      { t: 'Differentiation', e: 'Ranked managers every year: top 20% rewarded, bottom 10% out.' },
      { t: 'Candor', e: 'Called the lack of candor business’s “biggest dirty little secret.”' },
      { t: 'Developing leaders', e: 'Made GE’s Crotonville school a pipeline of future CEOs.' },
    ],
    decision: 'Requiring every GE business to be first or second in its market, or be sold or closed.',
    successes: ['Market value grew from about $14 billion to about $410 billion', 'Fortune’s “manager of the century” (1999)', 'A generation of CEOs trained at GE'],
    shortcomings: ['Cut tens of thousands of jobs; nicknamed “Neutron Jack”', '“Rank and yank” spread widely, then was abandoned, including by GE itself in 2015', 'GE Capital, built under him, nearly sank GE in 2008'],
  },
  {
    id: 'kelleher', name: 'Herb Kelleher', short: 'Kelleher', role: 'Co-founder and CEO, Southwest Airlines', region: 'United States', years: '1981–2001', year: 1981, field: 'business',
    style: 'affiliative', style2: 'servant', traits: ['comm', 'team', 'empathy', 'humility', 'resolve', 'risk'],
    summary: 'Built the most consistently profitable airline in America on an “employees first” culture.',
    key: [
      { t: 'Employees first', e: 'Argued that well-treated employees create happy customers, who reward shareholders.' },
      { t: 'Fun as a strategy', e: 'Turned up in costume, joined baggage handlers at Thanksgiving, and kept no imperial perks.' },
      { t: 'Loyalty in bad times', e: 'Treated no-layoffs as a core promise.' },
    ],
    decision: 'Keeping all employees after 9/11 while the three biggest U.S. airlines laid off nearly 50,000.',
    successes: ['47 consecutive profitable years, 1973 to 2019, unmatched in the industry', 'Never laid off employees', 'Among the first U.S. airlines with profit sharing'],
    shortcomings: ['The lean, low-cost model under-invested in technology; years after he left, outdated scheduling systems caused the 2022 holiday meltdown'],
  },
  {
    id: 'ferguson', name: 'Alex Ferguson', short: 'Ferguson', role: 'Manager, Manchester United', region: 'United Kingdom', years: '1986–2013', year: 1986, field: 'media',
    style: 'commanding', style2: 'coaching', traits: ['resolve', 'decisive', 'standards', 'adapt', 'competence'],
    summary: 'The most successful manager in English football history.',
    key: [
      { t: 'Building from the youth up', e: 'Invested in young players as the club’s foundation.' },
      { t: 'Control', e: 'Never let any player become bigger than the club.' },
      { t: 'Constant renewal', e: 'Rebuilt winning teams before they declined, and kept adapting for 26 years.' },
    ],
    decision: 'Rebuilding a title-winning team around young academy players in the 1990s.',
    successes: ['38 trophies, including 13 league titles and two Champions League titles', 'A Harvard Business School case study on his methods', 'Won the league in his final season'],
    shortcomings: ['Feared for the “hairdryer” tirades at players', 'The club declined sharply after he left; his chosen successor had its worst start in years'],
  },
  {
    id: 'oprah', name: 'Oprah Winfrey', short: 'Winfrey', role: 'Talk-show host, media founder', region: 'United States', years: '1986–2011', year: 1986, field: 'media',
    style: 'affiliative', style2: 'visionary', traits: ['vision', 'comm', 'resolve', 'adapt', 'risk', 'empathy'],
    summary: 'Built a media company on the most popular daytime talk show in America.',
    key: [
      { t: 'Self-disclosure', e: 'Shared her own life on air, creating a more intimate, confessional television.' },
      { t: 'Ownership', e: 'Owned her own production company, Harpo.' },
      { t: 'Reinvention', e: 'Shifted the show in the mid-1990s toward books and self-improvement.' },
    ],
    decision: 'Taking ownership of her show through Harpo rather than staying a hired host.',
    successes: ['The top-rated daytime talk show for 25 seasons', 'Oprah’s Book Club (1996)', 'First Black woman billionaire, per Forbes (2003)'],
    shortcomings: ['Criticized for spreading a “confession culture”', 'Gave a platform to controversial self-help and health ideas'],
  },
  // ───── 1990–2023 ─────
  {
    id: 'mandela', name: 'Nelson Mandela', short: 'Mandela', role: 'President of South Africa', region: 'South Africa', years: '1994–99', year: 1994, field: 'politics',
    style: 'servant', style2: 'transformational', traits: ['vision', 'comm', 'resolve', 'team', 'empathy', 'humility', 'adapt'],
    summary: 'Led South Africa from apartheid to democracy without civil war.',
    key: [
      { t: 'Reconciliation', e: 'Reached out to groups that were not his allies, including former enemies.' },
      { t: 'Symbolic acts', e: 'Wore the Springbok jersey, a symbol of white rugby, at the 1995 World Cup final.' },
      { t: 'Leading from behind', e: 'Compared good leadership to a shepherd guiding his flock from the back.' },
    ],
    decision: 'Stepping down after a single term in 1999, setting an example of peaceful handover.',
    successes: ['Negotiated the end of apartheid; Nobel Peace Prize (1993)', 'First president of a fully democratic South Africa', 'A peaceful transition many feared impossible'],
    shortcomings: ['Did little on HIV/AIDS in office, which he later acknowledged; infection among pregnant women rose from 7.6% to 22.4%', 'Deep poverty and crime remained'],
  },
  {
    id: 'bezos', name: 'Jeff Bezos', short: 'Bezos', role: 'Founder and CEO, Amazon', region: 'United States', years: '1994–2021', year: 1994, field: 'business',
    style: 'pacesetting', style2: 'visionary', traits: ['vision', 'comm', 'resolve', 'decisive', 'standards', 'risk', 'adapt'],
    summary: 'Built an online bookstore into the world’s largest online retailer and cloud provider.',
    key: [
      { t: 'Long-term thinking', e: 'Accepted years of thin profits to build scale.' },
      { t: 'Writing to think', e: 'Replaced slides with six-page memos, read in silence at the start of meetings.' },
      { t: 'High standards', e: 'Built a demanding culture around measurable results.' },
    ],
    decision: 'Launching Amazon Web Services in 2006, renting out the computing infrastructure Amazon had built for itself.',
    successes: ['The world’s largest online retailer', 'AWS and much of the cloud-computing market', 'A widely copied culture of written decision-making'],
    shortcomings: ['Long-running criticism of warehouse working conditions', 'Sued by the FTC and 17 states in 2023 for illegally maintaining monopoly power'],
  },
  {
    id: 'jobs', name: 'Steve Jobs', short: 'Jobs', role: 'Co-founder and CEO, Apple', region: 'United States', years: '1997–2011', year: 1997, field: 'business',
    style: 'visionary', style2: 'pacesetting', traits: ['vision', 'comm', 'resolve', 'decisive', 'standards', 'risk'],
    summary: 'Saved Apple from near-bankruptcy and turned it into the most valuable company in the world.',
    key: [
      { t: 'Focus', e: 'On returning in 1997 he cut Apple’s sprawling product line to a few lines.' },
      { t: 'Perfectionism', e: 'Obsessed over design details and rehearsed keynotes relentlessly.' },
      { t: 'Persuasion', e: 'Colleagues described a “reality distortion field” that made the impossible feel settled.' },
    ],
    decision: 'Killing most of Apple’s products in 1997 to focus on a handful.',
    successes: ['Turned around an Apple close to bankruptcy', 'The iMac, iPod, iPhone and iPad', 'Funded and led Pixar through its first feature films'],
    shortcomings: ['Pushed out of Apple by its board in 1985', 'Known for harsh treatment of colleagues'],
  },
  {
    id: 'merkel', name: 'Angela Merkel', short: 'Merkel', role: 'Chancellor of Germany', region: 'Germany', years: '2005–21', year: 2005, field: 'politics',
    style: 'democratic', traits: ['resolve', 'competence', 'team', 'standards', 'adapt', 'humility'],
    summary: 'Led Germany for 16 years and steadied Europe through repeated crises.',
    key: [
      { t: 'Patience', e: 'Moved “step by step,” often staying silent in talks before reframing the deal.' },
      { t: 'A scientist’s method', e: 'Trained in quantum chemistry; known for honesty about what was not yet known.' },
      { t: 'Consensus-building', e: 'Spent months assembling coalition governments.' },
    ],
    decision: 'Keeping Germany open to refugees in 2015, when more than a million asylum seekers arrived. Still argued over: admired as humane, attacked as reckless.',
    successes: ['Won four elections', 'Steered Europe through the euro crisis', 'Praised for calm, science-based communication early in COVID-19'],
    shortcomings: ['Backed Nord Stream 2 after Russia took Crimea; later conceded she had not responded adequately to Russian aggression', 'Critics cite a reform backlog and under-investment in defense'],
  },
  {
    id: 'nooyi', name: 'Indra Nooyi', short: 'Nooyi', role: 'CEO, PepsiCo', region: 'United States (born in India)', years: '2006–18', year: 2006, field: 'business',
    style: 'visionary', style2: 'transformational', traits: ['vision', 'competence', 'comm', 'resolve', 'adapt'],
    summary: 'Grew PepsiCo while steering it toward healthier products.',
    key: [
      { t: 'Purpose with profit', e: '“Performance with Purpose” tied growth to health and sustainability goals.' },
      { t: 'Strategic foresight', e: 'Drove the Tropicana and Quaker Oats deals before she became CEO.' },
      { t: 'Hands-on', e: 'Toured stores herself, down to how customers carried a case of water.' },
    ],
    decision: 'Resisting activist Nelson Peltz’s push to split PepsiCo’s snacks and drinks.',
    successes: ['Net revenue grew from $35 billion to $63.5 billion', 'Healthier products rose from 38% to 50% of sales', 'Kept PepsiCo intact against activist pressure'],
    shortcomings: ['A costly 2008 logo redesign drew ridicule at first', 'Years of pressure from investors over performance'],
  },
  {
    id: 'barra', name: 'Mary Barra', short: 'Barra', role: 'CEO, General Motors', region: 'United States', years: '2014–', year: 2014, field: 'business',
    style: 'visionary', style2: 'democratic', traits: ['vision', 'resolve', 'decisive', 'team', 'adapt', 'humility'],
    summary: 'First woman to lead a global automaker; steered GM through a deadly recall crisis.',
    key: [
      { t: 'Owning failure', e: 'Took public responsibility for an ignition-switch defect she inherited, weeks into the job.' },
      { t: 'Changing the culture', e: 'Created “Speak Up for Safety” so employees would raise problems early.' },
      { t: 'Big bets', e: 'Committed tens of billions to electric and self-driving cars.' },
    ],
    decision: 'Facing the ignition-switch scandal head-on in 2014 rather than defending the old GM.',
    successes: ['Led GM through the recall and a culture reset', 'Profits of $10.1 billion in 2023 despite a strike', 'Early electric-vehicle leadership with the Chevy Bolt'],
    shortcomings: ['Electric-vehicle demand and rollout came slower than promised', 'The Cruise self-driving unit fell into crisis in 2023'],
  },
  {
    id: 'nadella', name: 'Satya Nadella', short: 'Nadella', role: 'CEO, Microsoft', region: 'United States (born in India)', years: '2014–', year: 2014, field: 'business',
    style: 'coaching', style2: 'transformational', traits: ['vision', 'comm', 'team', 'adapt', 'humility', 'empathy', 'risk'],
    summary: 'Revived a stalled Microsoft through cloud computing and a culture change.',
    key: [
      { t: 'Learn-it-all culture', e: 'Borrowed Carol Dweck’s growth mindset to replace a “know-it-all” culture.' },
      { t: 'Empathy as strategy', e: 'Asked executives to read Nonviolent Communication; treats empathy as a hard skill.' },
      { t: 'Partnerships over rivalry', e: 'Worked with former competitors and invested early in OpenAI.' },
    ],
    decision: 'Making the cloud, not Windows, the center of Microsoft.',
    successes: ['Market value rose from about $300 billion to more than $3 trillion', 'Azure became a leading cloud platform', 'A widely studied culture turnaround'],
    shortcomings: ['About 10,000 job cuts in 2023', 'Very large AI bets whose payoff is not yet proven'],
  },
  {
    id: 'ardern', name: 'Jacinda Ardern', short: 'Ardern', role: 'Prime minister of New Zealand', region: 'New Zealand', years: '2017–23', year: 2017, field: 'politics',
    style: 'affiliative', style2: 'democratic', traits: ['comm', 'team', 'decisive', 'adapt', 'empathy'],
    summary: 'Led New Zealand through a terror attack and the pandemic with an empathetic style.',
    key: [
      { t: 'Empathy in crisis', e: 'Her response to the 2019 Christchurch attack drew worldwide attention.' },
      { t: 'Direct, informal communication', e: 'Facebook Live sessions from home during lockdown.' },
      { t: 'Speed', e: 'Moved fast on guns and on closing the border.' },
    ],
    decision: 'Banning military-style semi-automatic weapons within 26 days of the Christchurch attack.',
    successes: ['The gun law passed 119 to 1', 'One of the lowest COVID-19 death rates early in the pandemic', 'A landslide re-election in 2020'],
    shortcomings: ['Missed promised goals on housing and child poverty', 'Resigned in 2023 as polls fell, saying she had nothing left “in the tank”'],
  },
];

// ───── Research data ─────

// Kouzes & Posner, Characteristics of Admired Leaders: % of respondents choosing each quality (pick 7 of 20).
export const kp = {
  years: [1987, 1995, 2002, 2007, 2012],
  rows: [
    { q: 'Honest', v: [83, 88, 88, 89, 89] },
    { q: 'Forward-looking', v: [62, 75, 71, 71, 71] },
    { q: 'Competent', v: [67, 63, 66, 68, 69] },
    { q: 'Inspiring', v: [58, 68, 65, 69, 69] },
    { q: 'Intelligent', v: [43, 40, 47, 48, 45] },
  ],
};

// Judge, Bono, Ilies & Gerhardt (2002): correlations of Big Five traits with leadership (222 correlations, 73 samples).
export const bigFive = [
  { t: 'Extraversion', r: 0.31 },
  { t: 'Conscientiousness', r: 0.28 },
  { t: 'Openness to experience', r: 0.24 },
  { t: 'Agreeableness', r: 0.08 },
  { t: 'Neuroticism', r: -0.24 },
];

// GLOBE (House et al., 2004): 22 universally positive and 8 universally negative leader attributes.
export const globePositive = ['Trustworthy', 'Just', 'Honest', 'Foresight', 'Plans ahead', 'Encouraging', 'Positive', 'Dynamic', 'Motive arouser', 'Confidence builder', 'Motivational', 'Dependable', 'Intelligent', 'Decisive', 'Effective bargainer', 'Win-win problem solver', 'Administratively skilled', 'Communicative', 'Informed', 'Coordinator', 'Team builder', 'Excellence-oriented'];
export const globeNegative = ['Loner', 'Asocial', 'Non-cooperative', 'Irritable', 'Non-explicit', 'Egocentric', 'Ruthless', 'Dictatorial'];

// Periods by the year each leader took the defining role.
export const periods = [
  { label: '1926–1959', from: 1900, to: 1959 },
  { label: '1960–1989', from: 1960, to: 1989 },
  { label: '1990–2023', from: 1990, to: 2100 },
];

// Communication data (supporting).
export const sotu = [
  { p: 'Coolidge', y: 1923, g: 11.3 }, { p: 'F. Roosevelt', y: 1934, g: 12.5 }, { p: 'Truman', y: 1946, g: 10.6 },
  { p: 'Eisenhower', y: 1953, g: 12.8 }, { p: 'Kennedy', y: 1961, g: 13.2 }, { p: 'L. Johnson', y: 1964, g: 10.4 },
  { p: 'Nixon', y: 1970, g: 11.6 }, { p: 'Ford', y: 1975, g: 11.2 }, { p: 'Carter', y: 1978, g: 10.8 },
  { p: 'Reagan', y: 1982, g: 10.3 }, { p: 'G.H.W. Bush', y: 1990, g: 8.6 }, { p: 'Clinton', y: 1994, g: 9.5 },
  { p: 'G.W. Bush', y: 2002, g: 10.4 }, { p: 'Obama', y: 2010, g: 8.6 },
];
export const soundbites = [
  { y: 1968, s: 43 }, { y: 1972, s: 25 }, { y: 1976, s: 18 }, { y: 1980, s: 12 }, { y: 1984, s: 10 }, { y: 1988, s: 8.9 },
];
