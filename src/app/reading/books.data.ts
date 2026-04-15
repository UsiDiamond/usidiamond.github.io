export interface Book {
  title: string;
  author: string;
  subject: string;
  series?: string;
  parts: number;
  amazonUrl: string;
}

export const BOOKS: Book[] = [
  {
    title: 'Three Books of Occult Philosophy',
    author: 'Henry C. Agrippa',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Three%20Books%20of%20Occult%20Philosophy%20Henry%20C.%20Agrippa&i=stripbooks',
  },
  {
    title: 'The Mixed Multitude',
    author: 'Paweł Maciejko',
    subject: 'Other',
    series: 'Jewish Culture and Contexts',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Mixed%20Multitude%20Pawe%C5%82%20Maciejko&i=stripbooks',
  },
  {
    title: 'The Anarchy',
    author: 'William Dalrymple',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Anarchy%20William%20Dalrymple&i=stripbooks',
  },
  {
    title: 'The Frozen River',
    author: 'Ariel Lawhon',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Frozen%20River%20Ariel%20Lawhon&i=stripbooks',
  },
  {
    title: 'Shadows of the Empire: Star Wars Legends',
    author: 'Steve Perry',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Shadows%20of%20the%20Empire%3A%20Star%20Wars%20Legends%20Steve%20Perry&i=stripbooks',
  },
  {
    title: 'Legend of Zelda Manga series',
    author: 'Akira Himekawa',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Legend%20of%20Zelda%20Complete%20Box%20Set%20Akira%20Himekawa&i=stripbooks',
  },
  {
    title: 'Gundam Wing: Episode Zero',
    author: 'Reku Fuyunagi',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Gundam%20Wing%3A%20Episode%20Zero%20Reku%20Fuyunagi&i=stripbooks',
  },
  {
    title: 'Ursula K. Le Guin',
    author: 'Ursula K. Le Guin',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ursula%20K.%20Le%20Guin%20Ursula%20K.%20Le%20Guin&i=stripbooks',
  },
  {
    title: 'Theo of Golden: A Novel',
    author: 'Allen Levi',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Theo%20of%20Golden%3A%20A%20Novel%20Allen%20Levi&i=stripbooks',
  },
  {
    title: 'The Complete Illustrated Grand Grimoire, Or The Red Dragon',
    author: 'Aaman Lamba',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Complete%20Illustrated%20Grand%20Grimoire%2C%20Or%20The%20Red%20Dragon%20Aaman%20Lamba&i=stripbooks',
  },
  {
    title: 'The King in Yellow',
    author: 'Robert W. Chambers',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20King%20in%20Yellow%20Robert%20W.%20Chambers&i=stripbooks',
  },
  {
    title: 'The Book of Abramelin',
    author: 'Abraham von Worms',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Book%20of%20Abramelin%20Abraham%20von%20Worms&i=stripbooks',
  },
  {
    title: 'On the Road: The Original Scroll',
    author: 'Jack Kerouac',
    subject: 'Memoir & Biography',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=On%20the%20Road%3A%20The%20Original%20Scroll%20Jack%20Kerouac&i=stripbooks',
  },
  {
    title: 'Heart Is A Lonely Hunter',
    author: 'Carson McCullers',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Heart%20Is%20A%20Lonely%20Hunter%20Carson%20McCullers&i=stripbooks',
  },
  {
    title: 'Fear and Loathing in Las Vegas',
    author: 'Hunter S. Thompson',
    subject: 'Memoir & Biography',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Fear%20and%20Loathing%20in%20Las%20Vegas%20Hunter%20S.%20Thompson&i=stripbooks',
  },
  {
    title: 'The Glass Castle: A Memoir',
    author: 'Jeannette Walls',
    subject: 'Memoir & Biography',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Glass%20Castle%3A%20A%20Memoir%20Jeannette%20Walls&i=stripbooks',
  },
  {
    title: 'Between the World and Me',
    author: 'Ta-Nehisi Coates',
    subject: 'Memoir & Biography',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Between%20the%20World%20and%20Me%20Ta-Nehisi%20Coates&i=stripbooks',
  },
  {
    title: 'Half Broke Horses: A True-Life Novel',
    author: 'Jeannette Walls',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Half%20Broke%20Horses%3A%20A%20True-Life%20Novel%20Jeannette%20Walls&i=stripbooks',
  },
  {
    title: 'Di Kats Der Payats: The Cat In The Hat',
    author: 'Dr. Seuss',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Di%20Kats%20Der%20Payats%3A%20The%20Cat%20In%20The%20Hat%20Dr.%20Seuss&i=stripbooks',
  },
  {
    title: 'Eyn Fish Tsvey Fish Royter Fish Bloyer Fish',
    author: 'Dr. Seuss',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Eyn%20Fish%20Tsvey%20Fish%20Royter%20Fish%20Bloyer%20Fish%20Dr.%20Seuss&i=stripbooks',
  },
  {
    title: 'The Magus',
    author: 'Francis Barret',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Magus%20Francis%20Barret&i=stripbooks',
  },
  {
    title: 'Flatland',
    author: 'Edwin A. Abbott',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Flatland%20Edwin%20A.%20Abbott&i=stripbooks',
  },
  {
    title: 'Broken Promises, Broken Dreams',
    author: 'Alice Rothchild',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Broken%20Promises%2C%20Broken%20Dreams%20Alice%20Rothchild&i=stripbooks',
  },
  {
    title: 'Jewish Palestinian Short Stories: Before the Jewish State',
    author: 'Josef Kastein',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Jewish%20Palestinian%20Short%20Stories%3A%20Before%20the%20Jewish%20State%20Josef%20Kastein&i=stripbooks',
  },
  {
    title: 'Michael Crichton Jurassic Park 2 Books Collection Pack Set',
    author: 'Jurassic Park By Micheal Crichton',
    subject: 'Other',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Michael%20Crichton%20Jurassic%20Park%202%20Books%20Collection%20Pack%20Set%20Jurassic%20Park%20By%20Micheal%20Crichton&i=stripbooks',
  },
  {
    title:
      'The Long Earth Series 5 Books Collection Terry Pratchett and Stephen Baxter Box Set',
    author: 'Terry Pratchett',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Long%20Earth%20Series%205%20Books%20Collection%20Terry%20Pratchett%20and%20Stephen%20Baxter%20Box%20Set%20Terry%20Pratchett&i=stripbooks',
  },
  {
    title: 'Xeelee An Omnibus',
    author: 'Baxter Stephen',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Xeelee%20An%20Omnibus%20baxter-stephen&i=stripbooks',
  },
  {
    title: "Frank Herbert's Dune Saga 6-Book Boxed Set",
    author: 'Frank Herbert',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Frank%20Herbert's%20Dune%20Saga%206-Book%20Boxed%20Set%20Frank%20Herbert&i=stripbooks",
  },
  {
    title: 'The Collected Short Stories of Ambrose Bierce',
    author: 'Ambrose Bierce',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Collected%20Short%20Stories%20of%20Ambrose%20Bierce%20Ambrose%20Bierce&i=stripbooks',
  },
  {
    title: 'Nightmares & Dreamscapes',
    author: 'Stephen King',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Nightmares%20%26%20Dreamscapes%20Stephen%20King&i=stripbooks',
  },
  {
    title: 'Books of Earthsea',
    author: 'Ursula K. Le Guin',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Books%20of%20Earthsea%20Ursula%20K.%20Le%20Guin&i=stripbooks',
  },
  {
    title: 'A Wizard of Earthsea',
    author: 'Ursula K. Le Guin',
    subject: 'Fantasy & Science Fiction',
    series: 'The Earthsea Cycle',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=A%20Wizard%20of%20Earthsea%20Ursula%20K.%20Le%20Guin&i=stripbooks',
  },
  {
    title: 'The Sword of Shannara Trilogy',
    author: 'Terry Brooks',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Sword%20of%20Shannara%20Trilogy%20Terry%20Brooks&i=stripbooks',
  },
  {
    title: 'Terry Pratchett Discworld Novels Series 5 Books Collection Box Set',
    author: 'Terry Pratchett',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Terry%20Pratchett%20Discworld%20Novels%20Series%205%20Books%20Collection%20Box%20Set%20Terry%20Pratchett&i=stripbooks',
  },
  {
    title: 'On Writing',
    author: 'Stephen King',
    subject: 'Memoir & Biography',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=On%20Writing%20Stephen%20King&i=stripbooks',
  },
  {
    title:
      'The Dark Tower Series Complete 8 Books Collection Box Set by Stephen King',
    author: 'Stephen King',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Dark%20Tower%20Series%20Complete%208%20Books%20Collection%20Box%20Set%20by%20Stephen%20King%20Stephen%20King&i=stripbooks',
  },
  {
    title: 'The Lotus Sutra',
    author: 'Gene Reeves',
    subject: 'Religion & Philosophy',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Lotus%20Sutra%20Gene%20Reeves&i=stripbooks',
  },
  {
    title: 'The Diamond Sutra',
    author: 'Red Pine',
    subject: 'Religion & Philosophy',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Diamond%20Sutra%20Red%20Pine&i=stripbooks',
  },
  {
    title: 'The Cambridge History of Japan',
    author: 'Various editors',
    subject: 'History & Society',
    parts: 6,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Cambridge%20History%20of%20Japan%20Various%20editors&i=stripbooks',
  },
  {
    title: 'All Together Different',
    author: 'Daniel Katz',
    subject: 'Kabbalah & Jewish Mysticism',
    series: 'Goldstein-Goren in American Jewish History',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=All%20Together%20Different%20Daniel%20Katz&i=stripbooks',
  },
  {
    title: 'Emma Goldman',
    author: 'Vivian Gornick',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Emma%20Goldman%20Vivian%20Gornick&i=stripbooks',
  },
  {
    title: 'Radical Antiquity',
    author: 'Zeichmann Christopher B.',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Radical%20Antiquity%20Zeichmann%20Christopher%20B.&i=stripbooks',
  },
  {
    title: 'The Jews of Kurdistan',
    author: 'Eric Brauer',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Jews%20of%20Kurdistan%20Eric%20Brauer&i=stripbooks',
  },
  {
    title: 'The Jewish Anarchist Movement in America',
    author: 'Joseph Cohen',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Jewish%20Anarchist%20Movement%20in%20America%20Joseph%20Cohen&i=stripbooks',
  },
  {
    title: 'The Road to Reality',
    author: 'Roger Penrose',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Road%20to%20Reality%20Roger%20Penrose&i=stripbooks',
  },
  {
    title: 'Neutrino Physics',
    author: 'Kai Zuber',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Neutrino%20Physics%20Kai%20Zuber&i=stripbooks',
  },
  {
    title: 'Quantum Chromodynamics',
    author: 'Walter Greiner',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Quantum%20Chromodynamics%20Walter%20Greiner&i=stripbooks',
  },
  {
    title: 'Isaac Asimov Robot',
    author: 'Isaac Asimov',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Isaac%20Asimov%207%20Books%20Set%20Collection%20Pack%20Inc%20The%20Rest%20Of%20The%20Robots%2C%20I%20Robot%20Isaac%20Asimov&i=stripbooks',
  },
  {
    title: 'Galactic Empire Series',
    author: 'Isaac Asimov',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Galactic%20Empire%20Series%203%20Books%20Set%20Isaac%20Asimov&i=stripbooks',
  },
  {
    title: 'Algebra',
    author: 'Manfred Einsiedler',
    subject: 'Mathematics',
    series: 'Graduate Texts in Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Algebra%20Manfred%20Einsiedler&i=stripbooks',
  },
  {
    title: 'The Mists of Avalon',
    author: 'Marion Zimmer Bradley',
    subject: 'Fantasy & Science Fiction',
    series: 'Avalon',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Mists%20of%20Avalon%20Marion%20Zimmer%20Bradley&i=stripbooks',
  },
  {
    title: 'The Thrawn Trilogy Boxed Set',
    author: 'Timothy Zahn',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Thrawn%20Trilogy%20Boxed%20Set%20Timothy%20Zahn&i=stripbooks',
  },
  {
    title: 'The Last Herald-Mage Trilogy',
    author: 'Mercedes Lackey',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Last%20Herald-Mage%20Trilogy%20Mercedes%20Lackey&i=stripbooks',
  },
  {
    title: 'The Art of the Dragonlance Saga',
    author: 'Margaret Weis and Tracy Hickman',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Art%20of%20the%20Dragonlance%20Saga%20Margaret%20Weis&i=stripbooks',
  },
  {
    title: 'Unsong',
    author: 'Scott Alexander',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Unsong%20Scott%20Alexander&i=stripbooks',
  },
  {
    title: 'Mystical Dragon Magick',
    author: 'D.J. Conway',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Mystical%20Dragon%20Magick%20D.J.%20Conway&i=stripbooks',
  },
  {
    title: 'Dragon Magick',
    author: 'D.J. Conway',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dragon%20Magick%20D.J.%20Conway&i=stripbooks',
  },
  {
    title: 'Dancing with Dragons',
    author: 'D.J. Conway',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dancing%20with%20Dragons%20D.J.%20Conway&i=stripbooks',
  },
  {
    title: 'Dragonflight',
    author: 'Anne McCaffrey',
    subject: 'Fantasy & Science Fiction',
    series: 'Pern',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dragonflight%20Anne%20McCaffrey&i=stripbooks',
  },
  {
    title: 'The Sorrows of Young Werther',
    author: 'Johann Wolfgang von Goethe',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Sorrows%20of%20Young%20Werther%20Johann%20Wolfgang%20von%20Goethe&i=stripbooks',
  },
  {
    title: 'To the Other Shore',
    author: 'Steven Cassedy',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=To%20the%20Other%20Shore%20Steven%20Cassedy&i=stripbooks',
  },
  {
    title: 'Ancient Jewish Magic: A History',
    author: 'Gideon Bohak',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ancient%20Jewish%20Magic%3A%20A%20History%20Gideon%20Bohak&i=stripbooks',
  },
  {
    title: 'The Aleister Crowley Collection',
    author: 'Aleister Crowley',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Aleister%20Crowley%20Collection%20Aleister%20Crowley&i=stripbooks',
  },
  {
    title: 'Casting Lots',
    author: 'Elisheva Nesher',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Casting%20Lots%20Elisheva%20Nesher&i=stripbooks',
  },
  {
    title: 'Ashkenazi Herbalism',
    author: 'Deatra Cohen',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ashkenazi%20Herbalism%20Deatra%20Cohen&i=stripbooks',
  },
  {
    title: 'Woven Roots',
    author: 'Deatra Cohen',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Woven%20Roots%20Deatra%20Cohen&i=stripbooks',
  },
  {
    title: 'CHASING DRAGONS BETWEEN DIMENSIONS',
    author: 'Matthew Emmanuel Weinberg',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=CHASING%20DRAGONS%20BETWEEN%20DIMENSIONS%20Matthew%20Emmanuel%20Weinberg&i=stripbooks',
  },
  {
    title: 'Statistical Physics of Fields',
    author: 'Mehran Kardar',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Statistical%20Physics%20of%20Fields%20Mehran%20Kardar&i=stripbooks',
  },
  {
    title: 'Venetian Rapier',
    author: 'Leoni',
    subject: 'Fencing & Historical Martial Arts',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Venetian%20Rapier%20Leoni&i=stripbooks',
  },
  {
    title: 'The Flower of Battle: MS Ludwig XV13',
    author: 'Colin Hatcher',
    subject: 'Fencing & Historical Martial Arts',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Flower%20of%20Battle%3A%20MS%20Ludwig%20XV13%20Colin%20Hatcher&i=stripbooks',
  },
  {
    title: 'The Long Sword Gloss of GNM Manuscript 3227a',
    author: 'Michael Chidester',
    subject: 'Fencing & Historical Martial Arts',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Long%20Sword%20Gloss%20of%20GNM%20Manuscript%203227a%20Michael%20Chidester&i=stripbooks',
  },
  {
    title: 'Pieces of Ringeck',
    author: 'Sigmund Ainring',
    subject: 'Fencing & Historical Martial Arts',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Pieces%20of%20Ringeck%20Sigmund%20Ainring&i=stripbooks',
  },
  {
    title: 'Risk and Insurance: A Graduate Text',
    author: 'Søren Asmussen',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Risk%20and%20Insurance%3A%20A%20Graduate%20Text%20S%C3%B8ren%20Asmussen&i=stripbooks',
  },
  {
    title: 'Graph Theory',
    author: 'Reinhard Diestel',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Graph%20Theory%20Reinhard%20Diestel&i=stripbooks',
  },
  {
    title: 'Optimal Transport',
    author: 'Gero Friesecke',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Optimal%20Transport%20Gero%20Friesecke&i=stripbooks',
  },
  {
    title: 'Foundational Description of the Art of Fencing',
    author: 'Joachim Meyer',
    subject: 'Fencing & Historical Martial Arts',
    parts: 3,
    amazonUrl:
      'https://www.amazon.com/s?k=Foundational%20Description%20of%20the%20Art%20of%20Fencing%20Joachim%20Meyer&i=stripbooks',
  },
  {
    title: 'The Golden Bough',
    author: 'Sir James George Frazer',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Golden%20Bough%20Sir%20James%20George%20Frazer&i=stripbooks',
  },
  {
    title: 'New Millennium Magic',
    author: 'Donald Tyson',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=New%20Millennium%20Magic%20Donald%20Tyson&i=stripbooks',
  },
  {
    title: 'The Koren Illustrated Tehillim, the Magerman Edition',
    author: 'Jonathan Sacks',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Koren%20Illustrated%20Tehillim%2C%20the%20Magerman%20Edition%20Jonathan%20Sacks&i=stripbooks',
  },
  {
    title: 'Here Where We Live Is Our Country',
    author: 'Molly Crabapple',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Here%20Where%20We%20Live%20Is%20Our%20Country%20Molly%20Crabapple&i=stripbooks',
  },
  {
    title: 'There is Nothing So Whole as a Broken Heart',
    author: 'Cindy Milstein',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=There%20is%20Nothing%20So%20Whole%20as%20a%20Broken%20Heart%20Cindy%20Milstein&i=stripbooks',
  },
  {
    title: 'Classical Field Theory',
    author: 'Horaƫiu Năstase',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Classical%20Field%20Theory%20Hora%C6%ABiu%20N%C4%83stase&i=stripbooks',
  },
  {
    title: 'Essays on the Theory of Numbers',
    author: 'Richard Dedekind',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Essays%20on%20the%20Theory%20of%20Numbers%20Richard%20Dedekind&i=stripbooks',
  },
  {
    title: 'Tikkunei Ha-Zohar',
    author: 'R Shimon bar Yochai',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Tikkunei%20Ha-Zohar%20R%20Shimon%20bar%20Yochai&i=stripbooks',
  },
  {
    title: 'Quantum Field Theory and the Standard Model',
    author: 'Matthew D. Schwartz',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Quantum%20Field%20Theory%20and%20the%20Standard%20Model%20Matthew%20D.%20Schwartz&i=stripbooks',
  },
  {
    title: 'Introduction to the AdS/CFT Correspondence',
    author: 'Horaƫiu Năstase',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Introduction%20to%20the%20AdS%2FCFT%20Correspondence%20Hora%C6%ABiu%20N%C4%83stase&i=stripbooks',
  },
  {
    title: 'Transcendental Numbers',
    author: 'M. Ram Ram Murty',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Transcendental%20Numbers%20M.%20Ram%20Ram%20Murty&i=stripbooks',
  },
  {
    title: 'Inequalities',
    author: 'G. H. Hardy',
    subject: 'Mathematics',
    series: 'Cambridge Mathematical Library',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Inequalities%20G.%20H.%20Hardy&i=stripbooks',
  },
  {
    title: 'The Lion Cub of Prague',
    author: 'M.D. Kuhr, Moshe David',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Lion%20Cub%20of%20Prague%20M.D.%20Kuhr%2C%20Moshe%20David&i=stripbooks',
  },
  {
    title: 'Shomer Emunim',
    author: 'Rabbi Yosef Ergas',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Shomer%20Emunim%20Rabbi%20Yosef%20Ergas&i=stripbooks',
  },
  {
    title: 'Shemot in Context',
    author: 'Elia Benamozegh',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Shemot%20in%20Context%20Elia%20Benamozegh&i=stripbooks',
  },
  {
    title:
      'Perek Shirah - The Song of the Universe Pocket Size Deluxe Embossed Cover',
    author: 'Rabbi Nosson Scherman',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Perek%20Shirah%20-%20The%20Song%20of%20the%20Universe%20Pocket%20Size%20Deluxe%20Embossed%20Cover%20Rabbi%20Nosson%20Scherman&i=stripbooks',
  },
  {
    title: 'Indo-European Cognate Dictionary',
    author: 'Fiona McPherson PhD',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Indo-European%20Cognate%20Dictionary%20Fiona%20McPherson%20PhD&i=stripbooks',
  },
  {
    title: 'likkutei RAMAD”V',
    author: 'R Moshe David Valle',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 2,
    amazonUrl:
      'https://www.amazon.com/s?k=likkutei%20RAMAD%E2%80%9DV%20R%20Moshe%20David%20Valle&i=stripbooks',
  },
  {
    title: 'The Works of Philo',
    author: 'Charles Duke Philo',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Works%20of%20Philo%20Charles%20Duke%20Philo&i=stripbooks',
  },
  {
    title: 'Gate of Verses',
    author: 'Pinchas Winston',
    subject: 'Kabbalah & Jewish Mysticism',
    series: "Sha'ar Hapesukim - Gate of Verses",
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Gate%20of%20Verses%20Pinchas%20Winston&i=stripbooks',
  },
  {
    title: 'Pardes Rimonim - Pomegranate Orchard',
    author: 'Elizeu Antonio de Souza',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Pardes%20Rimonim%20-%20Pomegranate%20Orchard%20Elizeu%20Antonio%20de%20Souza&i=stripbooks',
  },
  {
    title: 'Art of Torah Cantillation',
    author: 'Marshall Portnoy',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Art%20of%20Torah%20Cantillation%20Marshall%20Portnoy&i=stripbooks',
  },
  {
    title: 'Chanting the Hebrew Bible',
    author: 'Joshua R. Jacobson',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Chanting%20the%20Hebrew%20Bible%20Joshua%20R.%20Jacobson&i=stripbooks',
  },
  {
    title:
      'The Complete Works of Flavius Josephus - Legendary Jewish Historian and His Chronicle of Ancient History',
    author: 'translation by William Whiston',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Complete%20Works%20of%20Flavius%20Josephus%20-%20Legendary%20Jewish%20Historian%20and%20His%20Chronicle%20of%20Ancient%20History%20translation%20by%20William%20Whiston&i=stripbooks',
  },
  {
    title: 'Sefer Ha-Rimon: Rabbi Moshe de León',
    author: 'R Moshe de León',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Ha-Rimon%3A%20Rabbi%20Moshe%20de%20Le%C3%B3n%20R%20Moshe%20de%20Le%C3%B3n&i=stripbooks',
  },
  {
    title: 'Sefer Shemen Zayit Zakh',
    author: 'R Shlomo ben David Molcho',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Shemen%20Zayit%20Zakh%20R%20Shlomo%20ben%20David%20Molcho&i=stripbooks',
  },
  {
    title: 'Sefer Shekel haKodesh: Rabbi Moshe de León',
    author: 'R Moshe de León',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Shekel%20haKodesh%3A%20Rabbi%20Moshe%20de%20Le%C3%B3n%20R%20Moshe%20de%20Le%C3%B3n&i=stripbooks',
  },
  {
    title: 'The Guide for the Perplexed',
    author: 'Moses Maimonides',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Guide%20for%20the%20Perplexed%20Moses%20Maimonides&i=stripbooks',
  },
  {
    title: 'Visual Differential Geometry and Forms',
    author: 'Tristan Needham',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Visual%20Differential%20Geometry%20and%20Forms%20Tristan%20Needham&i=stripbooks',
  },
  {
    title: 'Stories from Ancient Canaan',
    author: 'Michael D. Coogan',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Stories%20from%20Ancient%20Canaan%20Michael%20D.%20Coogan&i=stripbooks',
  },
  {
    title:
      'An Elementary Grammar with Full Syllabary and Progresssive Reading Book, of the Assyrian Language, in the Cuneiform Type',
    author: 'Archibald Henry Sayce',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=An%20Elementary%20Grammar%20with%20Full%20Syllabary%20and%20Progresssive%20Reading%20Book%2C%20of%20the%20Assyrian%20Language%2C%20in%20the%20Cuneiform%20Type%20Archibald%20Henry%20Sayce&i=stripbooks',
  },
  {
    title: 'A Manual of Ugaritic',
    author: 'Pierre Bordreuil',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=A%20Manual%20of%20Ugaritic%20Pierre%20Bordreuil&i=stripbooks',
  },
  {
    title: 'An Akkadian Handbook',
    author: 'Douglas B. Miller',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=An%20Akkadian%20Handbook%20Douglas%20B.%20Miller&i=stripbooks',
  },
  {
    title: 'Ritual and Cult at Ugarit',
    author: 'Dennis Pardee',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ritual%20and%20Cult%20at%20Ugarit%20Dennis%20Pardee&i=stripbooks',
  },
  {
    title: 'Cuneiform: Ancient Scripts',
    author: 'Irving Finkel',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Cuneiform%3A%20Ancient%20Scripts%20Irving%20Finkel&i=stripbooks',
  },
  {
    title: 'Learn to Read Ancient Sumerian',
    author: 'Joshua Aaron Bowen',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Learn%20to%20Read%20Ancient%20Sumerian%20Joshua%20Aaron%20Bowen&i=stripbooks',
  },
  {
    title: 'The Zohar: Pritzker Edition',
    author: 'Daniel C. Matt',
    subject: 'Kabbalah & Jewish Mysticism',
    series: 'The Zohar: Pritzker Edition',
    parts: 2,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Zohar%3A%20Pritzker%20Edition%20Daniel%20C.%20Matt&i=stripbooks',
  },
  {
    title: 'A Guide to the Zohar',
    author: 'Arthur Green',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=A%20Guide%20to%20the%20Zohar%20Arthur%20Green&i=stripbooks',
  },
  {
    title: 'Jewish History - A Trilogy',
    author: 'Rabbi Berel Wein',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Jewish%20History%20-%20A%20Trilogy%20Rabbi%20Berel%20Wein&i=stripbooks',
  },
  {
    title: "The Early Rishonim: A Gemara Student's Guide",
    author: 'Aryeh Leibowitz',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=The%20Early%20Rishonim%3A%20A%20Gemara%20Student's%20Guide%20Aryeh%20Leibowitz&i=stripbooks",
  },
  {
    title: 'The Talmud Of Jerusalem, Tr. By M. Schwab',
    author: 'Talmud Yerushalmi',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Talmud%20Of%20Jerusalem%2C%20Tr.%20By%20M.%20Schwab%20Talmud%20Yerushalmi&i=stripbooks',
  },
  {
    title:
      'Classic Yiddish Stories of S. Y. Abramovitsh, Sholem Aleichem, and I. L. Peretz',
    author: 'Ken Frieden',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Classic%20Yiddish%20Stories%20of%20S.%20Y.%20Abramovitsh%2C%20Sholem%20Aleichem%2C%20and%20I.%20L.%20Peretz%20Ken%20Frieden&i=stripbooks',
  },
  {
    title: 'Yiddish & English',
    author: 'Sol Steinmetz',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Yiddish%20%26%20English%20Sol%20Steinmetz&i=stripbooks',
  },
  {
    title: 'Yiddish Rhyming Dictionary: Yidisher Gramen-Leksikon',
    author: 'Nahum Stutchkoff',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Yiddish%20Rhyming%20Dictionary%3A%20Yidisher%20Gramen-Leksikon%20Nahum%20Stutchkoff&i=stripbooks',
  },
  {
    title: 'College Yiddish',
    author: 'Uriel Weinreich',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=College%20Yiddish%20Uriel%20Weinreich&i=stripbooks',
  },
  {
    title: 'Bacterial and Bacteriophage Genetics',
    author: 'Edward A. Birge',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Bacterial%20and%20Bacteriophage%20Genetics%20Edward%20A.%20Birge&i=stripbooks',
  },
  {
    title: 'Membrane Structural Biology',
    author: 'Mary Luckey',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Membrane%20Structural%20Biology%20Mary%20Luckey&i=stripbooks',
  },
  {
    title: 'Human Evolutionary Genetics',
    author: 'Mark Jobling',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Human%20Evolutionary%20Genetics%20Mark%20Jobling&i=stripbooks',
  },
  {
    title: 'Haggadah for Passover - The No-Nonsense Haggadah',
    author: 'Milah Tovah Press',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Haggadah%20for%20Passover%20-%20The%20No-Nonsense%20Haggadah%20Milah%20Tovah%20Press&i=stripbooks',
  },
  {
    title: 'Physics of the Human Body',
    author: 'Irving P. Herman',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Physics%20of%20the%20Human%20Body%20Irving%20P.%20Herman&i=stripbooks',
  },
  {
    title: 'Sefer HaBriyah',
    author: 'R Nathan of Gaza',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20HaBriyah%20R%20Nathan%20of%20Gaza&i=stripbooks',
  },
  {
    title: 'Sefer Etz Chayim',
    author: 'R Yitzchak Luria Ashkenazi',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 3,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Etz%20Chayim%20R%20Yitzchak%20Luria%20Ashkenazi&i=stripbooks',
  },
  {
    title: "Ma'aseh Talui",
    author: 'R Yochanan ben Zakkai',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Ma'aseh%20Talui%20R%20Yochanan%20ben%20Zakkai&i=stripbooks",
  },
  {
    title: 'Sefer Likkutei Molcho - ספר ליקוטי מלכו',
    author: 'R Shlomo Molcho',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Likkutei%20Molcho%20-%20%D7%A1%D7%A4%D7%A8%20%D7%9C%D7%99%D7%A7%D7%95%D7%98%D7%99%20%D7%9E%D7%9C%D7%9B%D7%95%20R%20Shlomo%20Molcho&i=stripbooks',
  },
  {
    title: "Sefer Derishot Mal'akhim",
    author: 'R Moshe Cordovero',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Sefer%20Derishot%20Mal'akhim%20R%20Moshe%20Cordovero&i=stripbooks",
  },
  {
    title: 'The Order Of Emanation: סדר האצילות',
    author: 'Yirah HaAri',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Order%20Of%20Emanation%3A%20%D7%A1%D7%93%D7%A8%20%D7%94%D7%90%D7%A6%D7%99%D7%9C%D7%95%D7%AA%20Yirah%20HaAri&i=stripbooks',
  },
  {
    title: 'Sefer HaMefo’ar',
    author: 'R Shlomo Molcho',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20HaMefo%E2%80%99ar%20R%20Shlomo%20Molcho&i=stripbooks',
  },
  {
    title: 'Bacterial Genomes',
    author: 'F.J. de Bruijn',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Bacterial%20Genomes%20F.J.%20de%20Bruijn&i=stripbooks',
  },
  {
    title: 'Molecular and Cellular Biology of Viruses',
    author: 'Phoebe Lostroh',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Molecular%20and%20Cellular%20Biology%20of%20Viruses%20Phoebe%20Lostroh&i=stripbooks',
  },
  {
    title: "Moore's Essential Clinical Anatomy",
    author: 'Anne M. R. Agur BSc (OT) MSc PhD FAAA',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Moore's%20Essential%20Clinical%20Anatomy%20Anne%20M.%20R.%20Agur%20BSc%20(OT)%20MSc%20PhD%20FAAA&i=stripbooks",
  },
  {
    title: 'A Textbook of Fluid Mechanics and Hydraulic Machines',
    author: 'Bansal',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=A%20Textbook%20of%20Fluid%20Mechanics%20and%20Hydraulic%20Machines%20Bansal&i=stripbooks',
  },
  {
    title: 'The Fractional Calculus',
    author: 'C. R. Wylie',
    subject: 'Mathematics',
    series: 'Dover Books on Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Fractional%20Calculus%20C.%20R.%20Wylie&i=stripbooks',
  },
  {
    title: "Marks' Standard Handbook for Mechanical Engineers",
    author: 'Paul Stephen Dempsey',
    subject: 'Engineering & Applied Science',
    series: 'MECHANICAL ENGINEERING',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Marks'%20Standard%20Handbook%20for%20Mechanical%20Engineers%20Paul%20Stephen%20Dempsey&i=stripbooks",
  },
  {
    title: 'Gravitation',
    author: 'Charles W. Misner',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Gravitation%20Charles%20W.%20Misner&i=stripbooks',
  },
  {
    title: 'The True Confessions of Charlotte Doyle',
    author: 'Avi',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20True%20Confessions%20of%20Charlotte%20Doyle%20Avi&i=stripbooks',
  },
  {
    title: 'Does It Hurt?',
    author: 'H. D. Carlton',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Does%20It%20Hurt%3F%20H.%20D.%20Carlton&i=stripbooks',
  },
  {
    title: 'Apprentice to the Villain',
    author: 'Hannah Nicole Maehrer',
    subject: 'Literature & Fiction',
    series: 'Assistant and the Villain',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Apprentice%20to%20the%20Villain%20Hannah%20Nicole%20Maehrer&i=stripbooks',
  },
  {
    title: 'The Rising Sea',
    author: 'Ravi Vakil',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Rising%20Sea%20Ravi%20Vakil&i=stripbooks',
  },
  {
    title: 'Physics of Shock Waves and High-Temperature Hydrodynamic Phenomena',
    author: 'Ya. B. Zel’dovich',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Physics%20of%20Shock%20Waves%20and%20High-Temperature%20Hydrodynamic%20Phenomena%20Ya.%20B.%20Zel%E2%80%99dovich&i=stripbooks',
  },
  {
    title: 'Designing Small Weapons',
    author: 'Jose Herrera-Ramirez',
    subject: 'Engineering & Applied Science',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Designing%20Small%20Weapons%20Jose%20Herrera-Ramirez&i=stripbooks',
  },
  {
    title: 'Ballistics',
    author: 'Donald E. Carlucci',
    subject: 'Engineering & Applied Science',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ballistics%20Donald%20E.%20Carlucci&i=stripbooks',
  },
  {
    title: 'Dragonlance Chronicles and Legends and Second Generation',
    author: 'Margaret Weis and Tracy Hickman',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dragonlance%20Chronicles%20Margaret%20Weis&i=stripbooks',
  },
  {
    title: 'Sefer Shimushei Sarim Shel Ma‘alah',
    author: 'Shimushei Sarim',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Shimushei%20Sarim%20Shel%20Ma%E2%80%98alah%20Shimushei%20Sarim&i=stripbooks',
  },
  {
    title: 'Ein Yaakov',
    author: 'Avraham Yaakov Finkel',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Ein%20Yaakov%20Avraham%20Yaakov%20Finkel&i=stripbooks',
  },
  {
    title: 'The Old Testament Pseudepigrapha, Two-Volume Set',
    author: 'James H. Charlesworth',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Old%20Testament%20Pseudepigrapha%2C%20Two-Volume%20Set%20James%20H.%20Charlesworth&i=stripbooks',
  },
  {
    title: 'The Mishnah in English',
    author: 'Tzvee Zahavy',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Mishnah%20in%20English%20Tzvee%20Zahavy&i=stripbooks',
  },
  {
    title: 'Nefesh HaTzimtzum',
    author: 'Avinoam Fraenkel',
    subject: 'Kabbalah & Jewish Mysticism',
    series: 'Nefesh HaTzimtzum',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Nefesh%20HaTzimtzum%20Avinoam%20Fraenkel&i=stripbooks',
  },
  {
    title: 'Nefesh Hachaim',
    author: 'Rabbi Avraham Yaakov Finkel',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Nefesh%20Hachaim%20Rabbi%20Avraham%20Yaakov%20Finkel&i=stripbooks',
  },
  {
    title: 'In eynem: The New Yiddish Textbook',
    author: 'Asya Vaisman Schulman',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=In%20eynem%3A%20The%20New%20Yiddish%20Textbook%20Asya%20Vaisman%20Schulman&i=stripbooks',
  },
  {
    title: "Radak's Commentary to Sefer Bereishis, 2 Volume Set",
    author: 'Yoram Bogacz',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Radak's%20Commentary%20to%20Sefer%20Bereishis%2C%202%20Volume%20Set%20Yoram%20Bogacz&i=stripbooks",
  },
  {
    title: 'The Hebrew Goddess 3rd Enlarged Edition',
    author: 'Raphael Patai',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Hebrew%20Goddess%203rd%20Enlarged%20Edition%20Raphael%20Patai&i=stripbooks',
  },
  {
    title: 'Enuma Elish',
    author: 'Timothy J. Stephany',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Enuma%20Elish%20Timothy%20J.%20Stephany&i=stripbooks',
  },
  {
    title: 'Meditation and Kabbalah',
    author: 'Aryeh Kaplan',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Meditation%20and%20Kabbalah%20Aryeh%20Kaplan&i=stripbooks',
  },
  {
    title: 'The Early History of God',
    author: 'Mark S. Smith',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Early%20History%20of%20God%20Mark%20S.%20Smith&i=stripbooks',
  },
  {
    title: 'Lessons In Basi Legani',
    author: 'Sichos In English',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Lessons%20In%20Basi%20Legani%20Sichos%20In%20English&i=stripbooks',
  },
  {
    title: 'The Torah',
    author: 'Mark Shoulson',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Torah%20Mark%20Shoulson&i=stripbooks',
  },
  {
    title: 'The Magical Books Of Solomon',
    author: 'Aleister Crowley',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Magical%20Books%20Of%20Solomon%20Aleister%20Crowley&i=stripbooks',
  },
  {
    title: 'Pentateuch in Paleo-Hebrew Script',
    author: 'Moshe Ben Amram',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Pentateuch%20in%20Paleo-Hebrew%20Script%20Moshe%20Ben%20Amram&i=stripbooks',
  },
  {
    title: "Lilith's Cave",
    author: 'Howard Schwartz',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Lilith's%20Cave%20Howard%20Schwartz&i=stripbooks",
  },
  {
    title: 'Yiddish Folktales',
    author: 'Beatrice Weinreich',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Yiddish%20Folktales%20Beatrice%20Weinreich&i=stripbooks',
  },
  {
    title: 'Jewish Magic and Superstition: A Study in Folk Religion',
    author: 'Joshua Trachtenberg',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Jewish%20Magic%20and%20Superstition%3A%20A%20Study%20in%20Folk%20Religion%20Joshua%20Trachtenberg&i=stripbooks',
  },
  {
    title: 'The Witches of Escazú',
    author: 'Roots Metals',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Witches%20of%20Escaz%C3%BA%20Roots%20Metals&i=stripbooks',
  },
  {
    title: 'Aramaic Incantation Texts From Nippur:',
    author: 'James Alan Montgomery',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Aramaic%20Incantation%20Texts%20From%20Nippur%3A%20James%20Alan%20Montgomery&i=stripbooks',
  },
  {
    title: 'Learning Biblical Hebrew',
    author: 'Karl V. Kutz',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Learning%20Biblical%20Hebrew%20Karl%20V.%20Kutz&i=stripbooks',
  },
  {
    title: 'Learning Biblical Hebrew Workbook',
    author: 'Karl V. Kutz',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Learning%20Biblical%20Hebrew%20Workbook%20Karl%20V.%20Kutz&i=stripbooks',
  },
  {
    title: 'Practical Electronics for Inventors',
    author: 'Paul Scherz',
    subject: 'Engineering & Applied Science',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Practical%20Electronics%20for%20Inventors%20Paul%20Scherz&i=stripbooks',
  },
  {
    title: 'Deep Learning Architectures: A Mathematical Approach',
    author: 'Gérard Biau',
    subject: 'Mathematics',
    series: 'Springer Series in the Data Sciences',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Deep%20Learning%20Architectures%3A%20A%20Mathematical%20Approach%20G%C3%A9rard%20Biau&i=stripbooks',
  },
  {
    title: 'Sefer Chaye Olam Haba: Life in the World to Come',
    author: 'Jason Bright',
    subject: 'Kabbalah & Jewish Mysticism',
    series: 'The Language of Prophecy: The Collected Works of Abraham Abulafia',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Chaye%20Olam%20Haba%3A%20Life%20in%20the%20World%20to%20Come%20Jason%20Bright&i=stripbooks',
  },
  {
    title: 'Grammar for Gemara & Targum Onkelos',
    author: 'Yitzhak Frank',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Grammar%20for%20Gemara%20%26%20Targum%20Onkelos%20Yitzhak%20Frank&i=stripbooks',
  },
  {
    title: 'The Chaldean Account of Genesis',
    author: 'George Smith',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Chaldean%20Account%20of%20Genesis%20George%20Smith&i=stripbooks',
  },
  {
    title: 'Fundamentals of Chemical Engineering Thermodynamics',
    author: 'David Himmelblau',
    subject: 'Physics',
    series:
      'International Series in the Physical and Chemical Engineering Sciences',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Fundamentals%20of%20Chemical%20Engineering%20Thermodynamics%20David%20Himmelblau&i=stripbooks',
  },
  {
    title: "Maimonides' Principles",
    author: 'Rabbi Aryeh Kaplan',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Maimonides'%20Principles%20Rabbi%20Aryeh%20Kaplan&i=stripbooks",
  },
  {
    title: 'Geometry of Deep Learning',
    author: 'Jong Chul Ye',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Geometry%20of%20Deep%20Learning%20Jong%20Chul%20Ye&i=stripbooks',
  },
  {
    title: 'The Zohar in English',
    author: 'Tzvee Zahavy',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Zohar%20in%20English%20Tzvee%20Zahavy&i=stripbooks',
  },
  {
    title: 'Shaarei Kedushah - Gates of Holiness',
    author: 'Rabbi Chaim Vital',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Shaarei%20Kedushah%20-%20Gates%20of%20Holiness%20Rabbi%20Chaim%20Vital&i=stripbooks',
  },
  {
    title: 'Primeval Evil in Kabbalah',
    author: 'Moshe Idel',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Primeval%20Evil%20in%20Kabbalah%20Moshe%20Idel&i=stripbooks',
  },
  {
    title: 'Middot',
    author: 'Moshe Idel',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl: 'https://www.amazon.com/s?k=Middot%20Moshe%20Idel&i=stripbooks',
  },
  {
    title: 'Gate of Reencarnations. Shaar Ha Gilgulim',
    author: 'Isaac Luria',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Gate%20of%20Reencarnations.%20Shaar%20Ha%20Gilgulim%20Isaac%20Luria&i=stripbooks',
  },
  {
    title: 'The Dead Sea Scrolls Bible',
    author: 'Martin G. Abegg Jr.',
    subject: 'Ancient Languages & Near East',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Dead%20Sea%20Scrolls%20Bible%20Martin%20G.%20Abegg%20Jr.&i=stripbooks',
  },
  {
    title:
      "The Zohar with Hebrew Translation and the Original Aramaic Zohar by Rabbi Shimon Bar Yochai I Translated into Hebrew by the Baal Ha'Sulam Rabbi Yehuda Ashlag",
    author: 'Rabbi Shimon Bar Yochai',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=The%20Holy%20Zohar%20I%2023%20Volumes%20Set%20I%20The%20Zohar%20with%20Hebrew%20Translation%20and%20the%20Original%20Aramaic%20Zohar%20by%20Rabbi%20Shimon%20Bar%20Yochai%20I%20Translated%20into%20Hebrew%20by%20the%20Baal%20Ha'Sulam%20Rabbi%20Yehuda%20Ashlag%20Rabbi%20Shimon%20Bar%20Yochai&i=stripbooks",
  },
  {
    title: 'The Bahir',
    author: 'Aryeh Kaplan',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Bahir%20Aryeh%20Kaplan&i=stripbooks',
  },
  {
    title: 'The Chumash',
    author: 'Nosson Scherman',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Chumash%20Nosson%20Scherman&i=stripbooks',
  },
  {
    title:
      'Siddur Transliterated Linear - Sabbath and Festivals - Seif Edition - Nusach Ashkenaz',
    author: 'Nosson Scherman',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Siddur%20Transliterated%20Linear%20-%20Sabbath%20and%20Festivals%20-%20Seif%20Edition%20-%20Nusach%20Ashkenaz%20Nosson%20Scherman&i=stripbooks',
  },
  {
    title: 'The Magic of the Sword of Moses',
    author: 'Harold Roth',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Magic%20of%20the%20Sword%20of%20Moses%20Harold%20Roth&i=stripbooks',
  },
  {
    title: 'Sefer Habahir',
    author: 'Aryeh Kaplan',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Habahir%20Aryeh%20Kaplan&i=stripbooks',
  },
  {
    title: 'TAILORING',
    author: 'Quarry Books',
    subject: 'Craft & Making',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=TAILORING%20Quarry%20Books&i=stripbooks',
  },
  {
    title: 'Handmade Renaissance Faire Fashion',
    author: 'Maria Anton',
    subject: 'Craft & Making',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Handmade%20Renaissance%20Faire%20Fashion%20Maria%20Anton&i=stripbooks',
  },
  {
    title: 'Sepher Ha-Razim: The Book of Mysteries',
    author: 'Michael A. Morgan',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sepher%20Ha-Razim%3A%20The%20Book%20of%20Mysteries%20Michael%20A.%20Morgan&i=stripbooks',
  },
  {
    title: 'Scholastic Magic',
    author: 'Michael Dov Swartz',
    subject: 'Occult, Hermetic, & Western Magick',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Scholastic%20Magic%20Michael%20Dov%20Swartz&i=stripbooks',
  },
  {
    title: 'Calculating Chance',
    author: 'Sidney A. Morris',
    subject: 'Other',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Calculating%20Chance%20Sidney%20A.%20Morris&i=stripbooks',
  },
  {
    title: 'What Today Withholds',
    author: 'Megan McLaughlin',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=What%20Today%20Withholds%20Megan%20McLaughlin&i=stripbooks',
  },
  {
    title: 'Bureaucracy',
    author: 'James Q. Wilson',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Bureaucracy%20James%20Q.%20Wilson&i=stripbooks',
  },
  {
    title: "The Presidential Appointee's Handbook",
    author: 'G. Edward DeSeve',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=The%20Presidential%20Appointee's%20Handbook%20G.%20Edward%20DeSeve&i=stripbooks",
  },
  {
    title: 'Linear Algebra Done Right',
    author: 'Sheldon Axler',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Linear%20Algebra%20Done%20Right%20Sheldon%20Axler&i=stripbooks',
  },
  {
    title: 'Classical Electrodynamics',
    author: 'John David Jackson',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Classical%20Electrodynamics%20John%20David%20Jackson&i=stripbooks',
  },
  {
    title: 'Modern Quantum Mechanics',
    author: 'J. J. Sakurai',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Modern%20Quantum%20Mechanics%20J.%20J.%20Sakurai&i=stripbooks',
  },
  {
    title: 'Classical Mechanics',
    author: 'Herbert Goldstein',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Classical%20Mechanics%20Herbert%20Goldstein&i=stripbooks',
  },
  {
    title: 'Sefer Yetzirah The Book of Formation',
    author: 'E. Collé',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Yetzirah%20The%20Book%20of%20Formation%20E.%20Coll%C3%A9&i=stripbooks',
  },
  {
    title: 'Tanach',
    author: 'Rabbi Nosson Scherman',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Tanach%20Rabbi%20Nosson%20Scherman&i=stripbooks',
  },
  {
    title: 'Was Yosef on the Spectrum?',
    author: 'Samuel J. Levine',
    subject: 'Other',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Was%20Yosef%20on%20the%20Spectrum%3F%20Samuel%20J.%20Levine&i=stripbooks',
  },
  {
    title: 'The Legend of Zelda™',
    author: 'Piggyback',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Legend%20of%20Zelda%E2%84%A2%20Piggyback&i=stripbooks',
  },
  {
    title: 'Living with PTSD on the Autism Spectrum',
    author: 'Lisa Morgan',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Living%20with%20PTSD%20on%20the%20Autism%20Spectrum%20Lisa%20Morgan&i=stripbooks',
  },
  {
    title: 'Sefer Yetzirah',
    author: 'Akiba ben Joseph',
    subject: 'Kabbalah & Jewish Mysticism',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Sefer%20Yetzirah%20Akiba%20ben%20Joseph&i=stripbooks',
  },
  {
    title: 'Handbook to Biblical Hebrew',
    author: 'N. Clayton Croy',
    subject: 'Kabbalah & Jewish Mysticism',
    series: 'Eerdmans Language Resources (ELR)',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Handbook%20to%20Biblical%20Hebrew%20N.%20Clayton%20Croy&i=stripbooks',
  },
  {
    title: 'The Chief Eunuch of the Ottoman Harem',
    author: 'Jane Hathaway',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Chief%20Eunuch%20of%20the%20Ottoman%20Harem%20Jane%20Hathaway&i=stripbooks',
  },
  {
    title: 'Gender, Imperialism and Global Exchanges',
    author: 'Stephan F. Miescher',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Gender%2C%20Imperialism%20and%20Global%20Exchanges%20Stephan%20F.%20Miescher&i=stripbooks',
  },
  {
    title: 'Continued Fractions',
    author: 'A. Ya. Khinchin',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Continued%20Fractions%20A.%20Ya.%20Khinchin&i=stripbooks',
  },
  {
    title: 'Differential Forms',
    author: 'Henri Cartan',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Differential%20Forms%20Henri%20Cartan&i=stripbooks',
  },
  {
    title:
      'Elementary Theory of Analytic Functions of One or Several Complex Variables',
    author: 'Henri Cartan',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Elementary%20Theory%20of%20Analytic%20Functions%20of%20One%20or%20Several%20Complex%20Variables%20Henri%20Cartan&i=stripbooks',
  },
  {
    title: 'Differential Calculus on Normed Spaces: A Course in Analysis',
    author: 'Henri Cartan',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Differential%20Calculus%20on%20Normed%20Spaces%3A%20A%20Course%20in%20Analysis%20Henri%20Cartan&i=stripbooks',
  },
  {
    title: 'The Transall Saga',
    author: 'Gary Paulsen',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Transall%20Saga%20Gary%20Paulsen&i=stripbooks',
  },
  {
    title: 'Hatchet',
    author: 'Gary Paulsen',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Hatchet%20Gary%20Paulsen&i=stripbooks',
  },
  {
    title: 'Dragons of Deceit',
    author: 'Margaret Weis and Tracy Hickman',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dragons%20of%20Deceit%20Margaret%20Weis&i=stripbooks',
  },
  {
    title: 'Introduction to Electrodynamics',
    author: 'David J. Griffiths',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Introduction%20to%20Electrodynamics%20David%20J.%20Griffiths&i=stripbooks',
  },
  {
    title: 'Principles of Electrodynamics',
    author: 'Melvin Schwartz',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Principles%20of%20Electrodynamics%20Melvin%20Schwartz&i=stripbooks',
  },
  {
    title: 'That Time I Got Reincarnated as a Slime 1',
    author: 'FUSE',
    subject: 'Fantasy & Science Fiction',
    series: 'That Time I Got Reincarnated as a Slime: Issues',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=That%20Time%20I%20Got%20Reincarnated%20as%20a%20Slime%201%20FUSE&i=stripbooks',
  },
  {
    title: 'Dungeons & Dragons Art & Arcana: A Visual History',
    author: 'Michael Witwer',
    subject: 'Fantasy & Science Fiction',
    series: 'Dungeons & Dragons',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dungeons%20%26%20Dragons%20Art%20%26%20Arcana%3A%20A%20Visual%20History%20Michael%20Witwer&i=stripbooks',
  },
  {
    title: "Bertrem's Guide to the Age of Mortals",
    author: 'Nancy Varian Berberick',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Bertrem's%20Guide%20to%20the%20Age%20of%20Mortals%20Nancy%20Varian%20Berberick&i=stripbooks",
  },
  {
    title: 'Age of Mortals',
    author: 'Margaret Weis and Tracy Hickman',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Age%20of%20Mortals%20Margaret%20Weis&i=stripbooks',
  },
  {
    title: 'Neverland',
    author: 'Andrew Kolb',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Neverland%20Andrew%20Kolb&i=stripbooks',
  },
  {
    title: 'Fusion Plasma Physics',
    author: 'Weston M. Stacey',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Fusion%20Plasma%20Physics%20Weston%20M.%20Stacey&i=stripbooks',
  },
  {
    title:
      'Silkworms Bombyx Mori explained. From Silkworm Eggs To Silk. How to make silk at home.',
    author: 'Elliott Lang',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Silkworms%20Bombyx%20Mori%20explained.%20From%20Silkworm%20Eggs%20To%20Silk.%20How%20to%20make%20silk%20at%20home.%20Elliott%20Lang&i=stripbooks',
  },
  {
    title: 'Fear: Trump in the White House',
    author: 'Bob Woodward',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Fear%3A%20Trump%20in%20the%20White%20House%20Bob%20Woodward&i=stripbooks',
  },
  {
    title: 'Elliptic Curves',
    author: 'Lawrence C. Washington',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Elliptic%20Curves%20Lawrence%20C.%20Washington&i=stripbooks',
  },
  {
    title: 'The Tale of the Body Thief',
    author: 'Anne Rice',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Tale%20of%20the%20Body%20Thief%20Anne%20Rice&i=stripbooks',
  },
  {
    title: 'The Axiom of Choice',
    author: 'Thomas J. Jech',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Axiom%20of%20Choice%20Thomas%20J.%20Jech&i=stripbooks',
  },
  {
    title: 'Elliptic Tales',
    author: 'Avner Ash',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Elliptic%20Tales%20Avner%20Ash&i=stripbooks',
  },
  {
    title: 'Principles of Mathematical Analysis',
    author: 'Rudin',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Principles%20of%20Mathematical%20Analysis%20Rudin&i=stripbooks',
  },
  {
    title: 'The Buried Giant',
    author: 'Kazuo Ishiguro',
    subject: 'Literature & Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Buried%20Giant%20Kazuo%20Ishiguro&i=stripbooks',
  },
  {
    title: 'Behave',
    author: 'Robert M. Sapolsky',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Behave%20Robert%20M.%20Sapolsky&i=stripbooks',
  },
  {
    title: 'Data and Goliath',
    author: 'Bruce Schneier',
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Data%20and%20Goliath%20Bruce%20Schneier&i=stripbooks',
  },
  {
    title: 'An Introduction to Mathematical Cryptography',
    author: 'Jeffrey Hoffstein',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=An%20Introduction%20to%20Mathematical%20Cryptography%20Jeffrey%20Hoffstein&i=stripbooks',
  },
  {
    title: 'Rtfm: Red Team Field Manual',
    author: 'Ben Clark',
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Rtfm%3A%20Red%20Team%20Field%20Manual%20Ben%20Clark&i=stripbooks',
  },
  {
    title: 'Blue Team Handbook',
    author: 'Don Murdoch GSE',
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Blue%20Team%20Handbook%20Don%20Murdoch%20GSE&i=stripbooks',
  },
  {
    title: 'Hash Crack: Password Cracking Manual',
    author: 'Joshua Picolet',
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Hash%20Crack%3A%20Password%20Cracking%20Manual%20Joshua%20Picolet&i=stripbooks',
  },
  {
    title: 'Blue Team Field Manual',
    author: 'Alan J White',
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Blue%20Team%20Field%20Manual%20Alan%20J%20White&i=stripbooks',
  },
  {
    title: 'Understanding Cryptography',
    author: 'Bart Preneel',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Understanding%20Cryptography%20Bart%20Preneel&i=stripbooks',
  },
  {
    title: 'Basic IBM Mainframe Assembly Language Programming',
    author: "Kevin C O'Kane",
    subject: 'Cyber Security',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=Basic%20IBM%20Mainframe%20Assembly%20Language%20Programming%20Kevin%20C%20O'Kane&i=stripbooks",
  },
  {
    title: 'The Distracted Mind',
    author: 'Adam Gazzaley',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Distracted%20Mind%20Adam%20Gazzaley&i=stripbooks',
  },
  {
    title: 'Modeling Infectious Diseases in Humans and Animals',
    author: 'Matt J. Keeling',
    subject: 'Biology & Medicine',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Modeling%20Infectious%20Diseases%20in%20Humans%20and%20Animals%20Matt%20J.%20Keeling&i=stripbooks',
  },
  {
    title: "Gödel's Proof",
    author: 'Ernest Nagel',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=G%C3%B6del's%20Proof%20Ernest%20Nagel&i=stripbooks",
  },
  {
    title: 'Category Theory for the Sciences',
    author: 'David I. Spivak',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Category%20Theory%20for%20the%20Sciences%20David%20I.%20Spivak&i=stripbooks',
  },
  {
    title: 'Lie Groups for Pedestrians',
    author: 'Harry J. Lipkin',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Lie%20Groups%20for%20Pedestrians%20Harry%20J.%20Lipkin&i=stripbooks',
  },
  {
    title: 'Profit Over People',
    author: 'Noam Chomsky',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Profit%20Over%20People%20Noam%20Chomsky&i=stripbooks',
  },
  {
    title: 'God Created The Integers',
    author: 'Stephen Hawking',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=God%20Created%20The%20Integers%20Stephen%20Hawking&i=stripbooks',
  },
  {
    title: 'The United States Constitution and Declaration of Independence',
    author: 'National Center for Constitutional Studies',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20United%20States%20Constitution%20and%20Declaration%20of%20Independence%20National%20Center%20for%20Constitutional%20Studies&i=stripbooks',
  },
  {
    title: 'The Killing of Osama Bin Laden',
    author: 'Seymour M. Hersh',
    subject: 'History & Society',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Killing%20of%20Osama%20Bin%20Laden%20Seymour%20M.%20Hersh&i=stripbooks',
  },
  {
    title: 'Quantum Field Theory for the Gifted Amateur',
    author: 'Tom Lancaster',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Quantum%20Field%20Theory%20for%20the%20Gifted%20Amateur%20Tom%20Lancaster&i=stripbooks',
  },
  {
    title: 'All My Friends Are Dead',
    author: 'Jory John',
    subject: 'Other',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=All%20My%20Friends%20Are%20Dead%20Jory%20John&i=stripbooks',
  },
  {
    title: "A Student's Guide to Lagrangians and Hamiltonians",
    author: 'Patrick Hamill',
    subject: 'Physics',
    parts: 1,
    amazonUrl:
      "https://www.amazon.com/s?k=A%20Student's%20Guide%20to%20Lagrangians%20and%20Hamiltonians%20Patrick%20Hamill&i=stripbooks",
  },
  {
    title: 'An Introduction to Mathematical Logic',
    author: 'Richard E. Hodel',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=An%20Introduction%20to%20Mathematical%20Logic%20Richard%20E.%20Hodel&i=stripbooks',
  },
  {
    title: 'Proof Theory: Second Edition',
    author: 'Gaisi Takeuti',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Proof%20Theory%3A%20Second%20Edition%20Gaisi%20Takeuti&i=stripbooks',
  },
  {
    title:
      'Introduction to Tensor Analysis and the Calculus of Moving Surfaces',
    author: 'Pavel Grinfeld',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Introduction%20to%20Tensor%20Analysis%20and%20the%20Calculus%20of%20Moving%20Surfaces%20Pavel%20Grinfeld&i=stripbooks',
  },
  {
    title: 'Dictionary of Veterinary Terms',
    author: 'Jennifer Coates',
    subject: 'Religion & Philosophy',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Dictionary%20of%20Veterinary%20Terms%20Jennifer%20Coates&i=stripbooks',
  },
  {
    title: 'Mathematical Physics',
    author: 'Sadri Hassani',
    subject: 'Mathematics',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=Mathematical%20Physics%20Sadri%20Hassani&i=stripbooks',
  },
  {
    title: 'The Adventure Time Encyclopaedia',
    author: 'Martin Olson',
    subject: 'Fantasy & Science Fiction',
    parts: 1,
    amazonUrl:
      'https://www.amazon.com/s?k=The%20Adventure%20Time%20Encyclopaedia%20Martin%20Olson&i=stripbooks',
  },
];
