// Leaders for "How Leaders Talk". Placements on the style map (x, y) are editorial judgments
// drawn from the sources, not measured scores.
//   x: 0 = decides from the top (directive) … 1 = decides with others (participative)
//   y: 0 = formal, broadcast, from a distance … 1 = conversational, direct, up close
export interface Leader {
  id: string; name: string; role: string; years: string; year: number; era: string;
  lead: string; talk: string; move: string; catch: string; x: number; y: number;
}

export const eras = [
  { id: 'radio', label: 'Radio', span: '1930s–40s', channel: 'A voice in the living room' },
  { id: 'org', label: 'The organization', span: '1950s', channel: 'The staff system and the press conference' },
  { id: 'tv', label: 'Television', span: '1960s–80s', channel: 'The image, the stage, the sound bite' },
  { id: 'symbol', label: 'Global media', span: '1990s', channel: 'One picture seen by the whole world' },
  { id: 'platform', label: 'Platforms', span: '2000s', channel: 'The keynote, the memo, the talk show' },
  { id: 'network', label: 'Networks', span: '2010s–20s', channel: 'Live, unfiltered, from the kitchen table' },
];

export const leaders: Leader[] = [
  {
    id: 'fdr', name: 'Franklin D. Roosevelt', role: 'U.S. president', years: '1933–45', year: 1933, era: 'radio',
    lead: 'Took office in a banking panic and used the radio to build public support for the New Deal, then for the war.',
    talk: 'About 30 evening “fireside chats” from 1933 to 1944, in deliberately simple language with concrete examples and analogies. The first came eight days after his inauguration, explaining the bank crisis.',
    move: 'Talking to one family at a time, at national scale.',
    catch: 'His formal addresses were another matter: his State of the Union speeches average a 12.5 grade reading level, among the most complex of the century.',
    x: 0.36, y: 0.78,
  },
  {
    id: 'churchill', name: 'Winston Churchill', role: 'U.K. prime minister', years: '1940–45', year: 1940, era: 'radio',
    lead: 'A wartime leader who set the direction himself and pressed it hard.',
    talk: 'Broadcast 24 times on the BBC from June 1940 to May 1945, drawing on the Bible and Shakespeare and favoring short, old English words. He typed his notes in short lines, like a psalm, to pace the delivery.',
    move: 'Telling the country the truth about the danger, then giving it a reason to fight on.',
    catch: 'Before 1940 his grand style often seemed out of place. Even after he became prime minister, one Conservative MP dismissed him as a “second-rate rhetorician.”',
    x: 0.12, y: 0.2,
  },
  {
    id: 'ike', name: 'Dwight D. Eisenhower', role: 'U.S. president', years: '1953–61', year: 1953, era: 'org',
    lead: 'The general ran the White House like a staff: wide delegation, and much of his influence exercised out of sight. Political scientist Fred Greenstein called it the “hidden-hand presidency.”',
    talk: 'Often vague in press conferences, sometimes on purpose, but precise on paper.',
    move: 'Letting others take the credit, and the heat, while he steered.',
    catch: 'At the time many saw him as passive; a 1962 poll of historians ranked him 21st. A 2025 study argues his behind-the-scenes approach failed on the 1956 highway program.',
    x: 0.58, y: 0.28,
  },
  {
    id: 'mlk', name: 'Martin Luther King Jr.', role: 'Civil rights leader', years: '1955–68', year: 1963, era: 'tv',
    lead: 'Led through a coalition, as first president of the Southern Christian Leadership Conference, and by listening: advisers such as Bayard Rustin helped shape his commitment to nonviolence.',
    talk: 'A preacher’s oratory, rich with theology, in front of 250,000 people at the March on Washington in 1963.',
    move: 'The “dream” passage was not in his prepared text. When Mahalia Jackson called out “Tell them about the dream, Martin,” he set the script aside.',
    catch: 'Some advisers had argued against the dream lines, and he had only a few minutes. One of the best-known speeches in American history was partly improvised.',
    x: 0.66, y: 0.46,
  },
  {
    id: 'thatcher', name: 'Margaret Thatcher', role: 'U.K. prime minister', years: '1979–90', year: 1979, era: 'tv',
    lead: 'Called herself a conviction politician, not a consensus one, and refused to change course under pressure.',
    talk: 'Worked with speechwriter Ronald Millar on sharp contrasting lines, and trained her voice lower: one analysis measured a drop of 46 Hz.',
    move: '“You turn if you want to. The lady’s not for turning” (1980).',
    catch: 'She said it as unemployment passed two million. Her refusal to turn won admirers and made her one of Britain’s most divisive leaders.',
    x: 0.1, y: 0.36,
  },
  {
    id: 'reagan', name: 'Ronald Reagan', role: 'U.S. president', years: '1981–89', year: 1981, era: 'tv',
    lead: 'Set a few broad goals, picked people, and delegated the rest.',
    talk: 'A former radio announcer, actor and General Electric spokesman who had toured GE plants in 38 states. Known for word pictures and stories; earned the nickname “the Great Communicator.”',
    move: '“I wasn’t a great communicator, but I communicated great things” (farewell address, 1989).',
    catch: 'Even sympathetic analysts note the cost of loose delegation: people down the line could make serious mistakes, as in the Iran-Contra affair.',
    x: 0.55, y: 0.6,
  },
  {
    id: 'welch', name: 'Jack Welch', role: 'CEO, General Electric', years: '1981–2001', year: 1981, era: 'tv',
    lead: 'Ranked every manager: top 20% rewarded, middle 70% coached, bottom 10% out. Businesses had to be first or second in their market or be sold.',
    talk: 'Prized blunt candor, calling the lack of it business’s biggest dirty little secret. Invested his own time in GE’s leadership school at Crotonville.',
    move: 'Making differentiation the center of management.',
    catch: 'Early job cuts of roughly 100,000 earned him the nickname “Neutron Jack.” The “rank and yank” system spread widely, then fell out of favor: Microsoft dropped stack ranking in 2013 and GE itself in 2015.',
    x: 0.06, y: 0.56,
  },
  {
    id: 'oprah', name: 'Oprah Winfrey', role: 'Talk-show host, media founder', years: '1986–2011', year: 1986, era: 'platform',
    lead: 'Built her own production company, Harpo, and a media business around her show.',
    talk: 'Credited with creating a more intimate, confessional form of television: she shared her own life, cried and laughed on air, and drew out guests’ stories. More than 15 million people watched daily.',
    move: 'Self-disclosure: going first, so the audience feels like a friend.',
    catch: 'Critics charged her with spreading a confession culture and promoting controversial self-help ideas.',
    x: 0.72, y: 0.92,
  },
  {
    id: 'mandela', name: 'Nelson Mandela', role: 'President of South Africa', years: '1994–99', year: 1995, era: 'symbol',
    lead: 'Reached out to groups that were not his allies, and spoke of leading from behind, like a shepherd.',
    talk: 'Let a single act carry the message. At the 1995 Rugby World Cup final he walked out in the Springbok jersey, a symbol of white Afrikaner rugby, wearing captain François Pienaar’s number 6.',
    move: 'Wearing the other side’s colors.',
    catch: 'It was not a blank check: a share of the tournament’s profits was set aside for rugby in disadvantaged areas, and he had to persuade his own party to back the event.',
    x: 0.8, y: 0.5,
  },
  {
    id: 'jobs', name: 'Steve Jobs', role: 'CEO, Apple', years: '1997–2011', year: 2007, era: 'platform',
    lead: 'Exacting and hands-on; colleagues described a “reality distortion field” that could make the impossible feel settled.',
    talk: 'Rehearsed keynotes relentlessly. At Macworld 2007 he teased three products, an iPod, a phone and an internet device, then revealed they were one: the iPhone.',
    move: 'The rule of three, and the reveal.',
    catch: 'The same field that inspired people could, in the words of an early colleague, bend any fact to fit the purpose at hand.',
    x: 0.1, y: 0.72,
  },
  {
    id: 'bezos', name: 'Jeff Bezos', role: 'CEO, Amazon', years: '1994–2021', year: 2004, era: 'platform',
    lead: 'In June 2004 banned slide presentations in senior meetings and required written, narratively structured memos of up to six pages.',
    talk: 'Meetings begin in silence while everyone reads. He argued a memo is harder to write than a 20-page deck because it forces you to decide what matters most.',
    move: 'Writing it down before talking it through.',
    catch: 'Amazon was still listed among large companies ranking employees against each other in 2014.',
    x: 0.38, y: 0.14,
  },
  {
    id: 'merkel', name: 'Angela Merkel', role: 'Chancellor of Germany', years: '2005–21', year: 2005, era: 'network',
    lead: 'A scientist with a doctorate in quantum chemistry: quiet, patient, deliberate, moving “step by step” and building consensus.',
    talk: 'Understated and unemotional, and willing to say what was not yet known, which drew praise during the COVID-19 pandemic.',
    move: 'Waiting, listening, then reframing the deal.',
    catch: 'Critics now call her a tactician more than a strategist. She backed the Nord Stream 2 gas pipeline after Russia took Crimea, and in 2022 conceded she had not responded adequately to Russian aggression.',
    x: 0.74, y: 0.24,
  },
  {
    id: 'nadella', name: 'Satya Nadella', role: 'CEO, Microsoft', years: '2014–', year: 2014, era: 'network',
    lead: 'Set out to turn a combative “know-it-all” culture into “learn-it-alls,” borrowing Carol Dweck’s idea of the growth mindset.',
    talk: 'Asked his top executives to read <em>Nonviolent Communication</em>, and treats empathy as a hard skill, not a soft one.',
    move: 'Leading the culture change by example rather than decree.',
    catch: 'Some of the ground was laid before him: Microsoft ended its stack-ranking reviews in late 2013, months before he became CEO.',
    x: 0.86, y: 0.64,
  },
  {
    id: 'ardern', name: 'Jacinda Ardern', role: 'Prime minister of New Zealand', years: '2017–23', year: 2020, era: 'network',
    lead: 'Science-led and empathetic in crisis, after the 2019 Christchurch attack and in the 2020 pandemic.',
    talk: 'Went on Facebook Live in casual clothes, after putting her toddler to bed, to “check in” with the country. Researchers credited the informal sessions with building “a team of five million.”',
    move: 'Talking from the kitchen table, not the podium.',
    catch: 'Border closures drew criticism at home, polls fell in 2022, and in January 2023 she resigned, saying she no longer had “enough in the tank.”',
    x: 0.84, y: 0.88,
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

// Average length of a candidate sound bite on U.S. network evening news, presidential campaigns.
// Sources: Hallin (1992); summarized in Rhetoric & Public Affairs (2012).
export const soundbites = [
  { y: 1968, s: 43 }, { y: 1972, s: 25 }, { y: 1976, s: 18 }, { y: 1980, s: 12 }, { y: 1984, s: 10 }, { y: 1988, s: 8.9 },
];
