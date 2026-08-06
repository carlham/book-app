import mongoose from "mongoose";
import Book, { type BookDocument } from "./models/Book.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

const books: BookDocument[] = [
  // Classic Literature
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", published_year: 1813, isbn: "9780141439518", description: "A witty exploration of manners, marriage, and morality in Regency England, following Elizabeth Bennet and the proud Mr. Darcy.", availability: true },
  { title: "Moby-Dick", author: "Herman Melville", genre: "Classic", published_year: 1851, isbn: "9781503280786", description: "Captain Ahab's obsessive quest to hunt the white whale that took his leg becomes a meditation on fate, obsession, and nature.", availability: true },
  { title: "War and Peace", author: "Leo Tolstoy", genre: "Classic", published_year: 1869, isbn: "9781400079988", description: "An epic chronicle of Russian society during the Napoleonic Wars, following five aristocratic families.", availability: true },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Classic", published_year: 1866, isbn: "9780143107637", description: "A destitute former student in St. Petersburg plans and commits murder, then wrestles with guilt and redemption.", availability: true },
  { title: "Jane Eyre", author: "Charlotte Bronte", genre: "Classic", published_year: 1847, isbn: "9780141441146", description: "An orphaned governess finds love and independence while confronting dark secrets at Thornfield Hall.", availability: true },
  { title: "Wuthering Heights", author: "Emily Bronte", genre: "Classic", published_year: 1847, isbn: "9780141439556", description: "A tale of obsessive love and revenge across two generations on the Yorkshire moors.", availability: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, isbn: "9780743273565", description: "Jay Gatsby's lavish pursuit of Daisy Buchanan unravels the hollowness of the American Dream in the Jazz Age.", availability: true },
  { title: "Anna Karenina", author: "Leo Tolstoy", genre: "Classic", published_year: 1877, isbn: "9780143035008", description: "A married aristocrat's affair sets off a tragic chain of events against the backdrop of Russian high society.", availability: true },
  { title: "Great Expectations", author: "Charles Dickens", genre: "Classic", published_year: 1861, isbn: "9780141439563", description: "An orphan named Pip rises through society thanks to a mysterious benefactor, only to confront the cost of his ambitions.", availability: true },
  { title: "Don Quixote", author: "Miguel de Cervantes", genre: "Classic", published_year: 1605, isbn: "9780060934347", description: "A minor nobleman loses his mind and sets out as a knight-errant, tilting at windmills in pursuit of chivalric glory.", availability: true },

  // Science Fiction
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction", published_year: 1965, isbn: "9780441172719", description: "On the desert planet Arrakis, Paul Atreides navigates prophecy, politics, and the spice that fuels the galaxy.", availability: true },
  { title: "Foundation", author: "Isaac Asimov", genre: "Science Fiction", published_year: 1951, isbn: "9780553293357", description: "A mathematician predicts the fall of a galactic empire and works to preserve civilization through the coming dark age.", availability: true },
  { title: "Neuromancer", author: "William Gibson", genre: "Science Fiction", published_year: 1984, isbn: "9780441569595", description: "A washed-up hacker is hired for one last job that plunges him into a dangerous cyberspace conspiracy.", availability: true },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", genre: "Science Fiction", published_year: 1969, isbn: "9780441478125", description: "An envoy to a genderless alien world grapples with politics and identity on a planet locked in eternal winter.", availability: true },
  { title: "Ender's Game", author: "Orson Scott Card", genre: "Science Fiction", published_year: 1985, isbn: "9780812550702", description: "A gifted child is trained at a military academy to lead humanity's fleet against an alien threat.", availability: true },
  { title: "Snow Crash", author: "Neal Stephenson", genre: "Science Fiction", published_year: 1992, isbn: "9780553380958", description: "A pizza-delivery hacker uncovers a linguistic virus threatening both the real world and the Metaverse.", availability: true },
  { title: "The Martian", author: "Andy Weir", genre: "Science Fiction", published_year: 2011, isbn: "9780553418026", description: "An astronaut stranded alone on Mars must use ingenuity and science to survive until rescue.", availability: true },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction", published_year: 1932, isbn: "9780060850524", description: "A genetically engineered, pleasure-controlled future society is disrupted by an outsider who craves real feeling.", availability: true },
  { title: "1984", author: "George Orwell", genre: "Science Fiction", published_year: 1949, isbn: "9780451524935", description: "In a totalitarian surveillance state, Winston Smith secretly rebels against the all-seeing Party.", availability: true },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Science Fiction", published_year: 1979, isbn: "9780345391803", description: "Seconds before Earth's demolition, an ordinary man is swept into a comic tour of the galaxy.", availability: true },

  // Fantasy
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, isbn: "9780547928227", description: "A reluctant hobbit joins a company of dwarves on a quest to reclaim treasure guarded by the dragon Smaug.", availability: true },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1954, isbn: "9780547928210", description: "A hobbit and his companions set out to destroy a powerful ring before it falls into the hands of a dark lord.", availability: true },
  { title: "A Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", published_year: 1996, isbn: "9780553103540", description: "Noble houses vie for the Iron Throne of Westeros while an ancient evil stirs beyond the Wall.", availability: true },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, isbn: "9780590353427", description: "An orphaned boy discovers he is a wizard and begins his education at Hogwarts School of Witchcraft and Wizardry.", availability: true },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", published_year: 2007, isbn: "9780756404741", description: "A legendary figure recounts his rise from orphaned street urchin to renowned magician and musician.", availability: true },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", genre: "Fantasy", published_year: 2006, isbn: "9780765311788", description: "A street thief with rare magical abilities joins a heist to overthrow an immortal tyrant.", availability: true },
  { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", genre: "Fantasy", published_year: 1950, isbn: "9780064404990", description: "Four siblings step through a wardrobe into the magical, snow-bound land of Narnia.", availability: true },
  { title: "American Gods", author: "Neil Gaiman", genre: "Fantasy", published_year: 2001, isbn: "9780062059888", description: "An ex-convict is drawn into a brewing war between old gods and new in modern America.", availability: true },
  { title: "The Way of Kings", author: "Brandon Sanderson", genre: "Fantasy", published_year: 2010, isbn: "9780765326355", description: "On a storm-ravaged world, warriors, scholars, and kings are drawn toward an ancient prophesied catastrophe.", availability: true },
  { title: "Circe", author: "Madeline Miller", genre: "Fantasy", published_year: 2018, isbn: "9780316556347", description: "The witch of Greek myth is exiled to a deserted island where she hones her powers and crosses paths with legends.", availability: true },

  // Mystery & Thriller
  { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", genre: "Mystery", published_year: 1902, isbn: "9780141034437", description: "Sherlock Holmes investigates a supposed curse haunting the Baskerville family on the moors.", availability: true },
  { title: "Murder on the Orient Express", author: "Agatha Christie", genre: "Mystery", published_year: 1934, isbn: "9780062693662", description: "Detective Hercule Poirot must solve a murder among the snowbound passengers of a luxury train.", availability: true },
  { title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", published_year: 2012, isbn: "9780307588364", description: "A woman's disappearance on her wedding anniversary exposes the dark undercurrents of her marriage.", availability: true },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "Thriller", published_year: 2005, isbn: "9780307949486", description: "A disgraced journalist and a brilliant hacker investigate a decades-old disappearance in a wealthy Swedish family.", availability: true },
  { title: "The Da Vinci Code", author: "Dan Brown", genre: "Thriller", published_year: 2003, isbn: "9780307474278", description: "A symbologist races to decode a murder victim's cryptic clues tied to a centuries-old religious secret.", availability: true },
  { title: "In Cold Blood", author: "Truman Capote", genre: "True Crime", published_year: 1966, isbn: "9780679745587", description: "A pioneering nonfiction novel reconstructing the brutal 1959 murder of a Kansas farm family.", availability: true },
  { title: "And Then There Were None", author: "Agatha Christie", genre: "Mystery", published_year: 1939, isbn: "9780062073488", description: "Ten strangers lured to an isolated island are killed one by one according to a sinister nursery rhyme.", availability: true },
  { title: "The Silence of the Lambs", author: "Thomas Harris", genre: "Thriller", published_year: 1988, isbn: "9780312924584", description: "A young FBI trainee seeks the help of imprisoned cannibal psychiatrist Hannibal Lecter to catch a serial killer.", availability: true },
  { title: "Big Little Lies", author: "Liane Moriarty", genre: "Mystery", published_year: 2014, isbn: "9780425274866", description: "Secrets among three mothers in a seaside town erupt into violence at a school trivia night.", availability: true },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", published_year: 2019, isbn: "9781250301697", description: "A psychotherapist becomes obsessed with treating a woman who shot her husband and then stopped speaking.", availability: true },

  // Romance
  { title: "Outlander", author: "Diana Gabaldon", genre: "Romance", published_year: 1991, isbn: "9780440212560", description: "A World War II nurse is mysteriously transported to 18th-century Scotland and falls for a Highland warrior.", availability: true },
  { title: "The Notebook", author: "Nicholas Sparks", genre: "Romance", published_year: 1996, isbn: "9780446605236", description: "A man reads the story of a passionate young romance to his wife, who is losing her memory to Alzheimer's.", availability: true },
  { title: "Me Before You", author: "Jojo Moyes", genre: "Romance", published_year: 2012, isbn: "9780670026609", description: "A young woman becomes caregiver to a paralyzed former businessman and changes both their lives.", availability: true },
  { title: "Persuasion", author: "Jane Austen", genre: "Romance", published_year: 1817, isbn: "9780141439686", description: "Years after refusing his proposal, Anne Elliot is given a second chance at love with a now-successful naval officer.", availability: true },

  // Horror
  { title: "Dracula", author: "Bram Stoker", genre: "Horror", published_year: 1897, isbn: "9780141439846", description: "A Transylvanian count's plot to spread his vampiric curse to England is opposed by a small band of hunters.", availability: true },
  { title: "Frankenstein", author: "Mary Shelley", genre: "Horror", published_year: 1818, isbn: "9780141439471", description: "A scientist's creation of a living being from dead tissue leads to tragedy and moral reckoning.", availability: true },
  { title: "The Shining", author: "Stephen King", genre: "Horror", published_year: 1977, isbn: "9780307743657", description: "A family's winter stay as caretakers of an isolated hotel awakens malevolent supernatural forces.", availability: true },
  { title: "It", author: "Stephen King", genre: "Horror", published_year: 1986, isbn: "9781501142970", description: "A group of childhood friends must confront a shape-shifting evil that terrorizes their town every 27 years.", availability: true },
  { title: "House of Leaves", author: "Mark Z. Danielewski", genre: "Horror", published_year: 2000, isbn: "9780375703768", description: "A family's house turns out to be larger on the inside than the outside, unraveling into a labyrinth of dread.", availability: true },

  // Young Adult
  { title: "The Hunger Games", author: "Suzanne Collins", genre: "Young Adult", published_year: 2008, isbn: "9780439023528", description: "In a dystopian nation, a girl volunteers to fight to the death in a televised tournament to save her sister.", availability: true },
  { title: "The Fault in Our Stars", author: "John Green", genre: "Young Adult", published_year: 2012, isbn: "9780525478812", description: "Two teenagers with cancer fall in love while grappling with mortality and meaning.", availability: true },
  { title: "Divergent", author: "Veronica Roth", genre: "Young Adult", published_year: 2011, isbn: "9780062024039", description: "In a faction-divided society, a girl discovers she doesn't fit any single category and hides a dangerous secret.", availability: true },
  { title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", genre: "Young Adult", published_year: 1999, isbn: "9781451696196", description: "A shy freshman navigates friendship, trauma, and first love through letters to an anonymous confidant.", availability: true },
  { title: "Percy Jackson and the Lightning Thief", author: "Rick Riordan", genre: "Young Adult", published_year: 2005, isbn: "9780786838653", description: "A troubled twelve-year-old learns he is a demigod and is thrust into a quest across modern America.", availability: true },

  // Non-fiction / Science
  { title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", published_year: 1988, isbn: "9780553380163", description: "A landmark accessible tour of cosmology, from the Big Bang to black holes and the nature of time.", availability: true },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "History", published_year: 2011, isbn: "9780062316097", description: "A sweeping account of how Homo sapiens came to dominate the planet through myth, cooperation, and revolution.", availability: true },
  { title: "Cosmos", author: "Carl Sagan", genre: "Science", published_year: 1980, isbn: "9780345539434", description: "A poetic journey through astronomy, science history, and humanity's place in the universe.", availability: true },
  { title: "The Selfish Gene", author: "Richard Dawkins", genre: "Science", published_year: 1976, isbn: "9780198788607", description: "A gene-centered view of evolution that reframes organisms as vehicles built by genes for their own propagation.", availability: true },
  { title: "Silent Spring", author: "Rachel Carson", genre: "Science", published_year: 1962, isbn: "9780618249060", description: "A groundbreaking exposé of the environmental damage caused by pesticides that sparked the modern environmental movement.", availability: true },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018, isbn: "9780399590504", description: "A woman raised in a survivalist family with no formal schooling recounts her journey to a Cambridge PhD.", availability: true },
  { title: "The Diary of a Young Girl", author: "Anne Frank", genre: "Memoir", published_year: 1947, isbn: "9780553296983", description: "The diary of a Jewish teenager hiding from the Nazis in occupied Amsterdam during World War II.", availability: true },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", genre: "Philosophy", published_year: 1946, isbn: "9780807014295", description: "A psychiatrist and Holocaust survivor argues that finding purpose is the key to enduring suffering.", availability: true },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Psychology", published_year: 2011, isbn: "9780374533557", description: "A Nobel laureate explains the two systems that drive human thought and the biases that distort our judgment.", availability: true },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", genre: "History", published_year: 1997, isbn: "9780393317558", description: "An exploration of why some civilizations conquered others, rooted in geography, agriculture, and disease.", availability: true },

  // Philosophy / Classics of thought
  { title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", published_year: 180, isbn: "9780140449334", description: "The private reflections of a Roman emperor on stoicism, duty, and the fleeting nature of life.", availability: true },
  { title: "The Republic", author: "Plato", genre: "Philosophy", published_year: -380, isbn: "9780140455113", description: "A Socratic dialogue examining justice, the ideal state, and the nature of the philosopher-king.", availability: true },
  { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", genre: "Philosophy", published_year: 1883, isbn: "9780140441185", description: "A prophetic figure descends from the mountains to proclaim the death of God and the coming of the Übermensch.", availability: true },

  // Literary Fiction
  { title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", genre: "Literary Fiction", published_year: 1967, isbn: "9780060883287", description: "The multigenerational saga of the Buendia family in the mythical town of Macondo, blending magic and history.", availability: true },
  { title: "Beloved", author: "Toni Morrison", genre: "Literary Fiction", published_year: 1987, isbn: "9781400033416", description: "A formerly enslaved woman is haunted, literally, by the trauma of the daughter she killed to save from slavery.", availability: true },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Literary Fiction", published_year: 1951, isbn: "9780316769488", description: "A disaffected teenager wanders New York City after being expelled from prep school, railing against phoniness.", availability: true },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Literary Fiction", published_year: 1960, isbn: "9780061120084", description: "A young girl in the Depression-era South watches her father defend a Black man falsely accused of rape.", availability: true },
  { title: "The Kite Runner", author: "Khaled Hosseini", genre: "Literary Fiction", published_year: 2003, isbn: "9781594631931", description: "A man returns to Taliban-controlled Afghanistan to atone for a childhood betrayal of his closest friend.", availability: true },
  { title: "Life of Pi", author: "Yann Martel", genre: "Literary Fiction", published_year: 2001, isbn: "9780156027328", description: "A boy survives a shipwreck and shares a lifeboat with a Bengal tiger during 227 days lost at sea.", availability: true },
  { title: "The Road", author: "Cormac McCarthy", genre: "Literary Fiction", published_year: 2006, isbn: "9780307387899", description: "A father and son trek across a devastated, post-apocalyptic America in search of survival and hope.", availability: true },
  { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", genre: "Literary Fiction", published_year: 1969, isbn: "9780385333849", description: "A soldier who becomes unstuck in time relives the firebombing of Dresden and encounters aliens who see all moments at once.", availability: true },
  { title: "The Book Thief", author: "Markus Zusak", genre: "Literary Fiction", published_year: 2005, isbn: "9780375842207", description: "Narrated by Death, a young girl in Nazi Germany finds solace in stealing books and sharing them with a hidden Jewish refugee.", availability: true },
  { title: "Norwegian Wood", author: "Haruki Murakami", genre: "Literary Fiction", published_year: 1987, isbn: "9780375704024", description: "A college student in 1960s Tokyo navigates love and loss between two very different women.", availability: true },

  // Poetry
  { title: "Leaves of Grass", author: "Walt Whitman", genre: "Poetry", published_year: 1855, isbn: "9781605501345", description: "A landmark collection celebrating the self, democracy, and the natural world in sprawling free verse.", availability: true },
  { title: "Ariel", author: "Sylvia Plath", genre: "Poetry", published_year: 1965, isbn: "9780061148518", description: "A searing posthumous poetry collection exploring death, rage, and rebirth.", availability: true },

  // Children's
  { title: "Charlotte's Web", author: "E.B. White", genre: "Children's", published_year: 1952, isbn: "9780061124952", description: "A barnyard pig is saved from slaughter by the clever words a spider weaves into her web.", availability: true },
  { title: "Where the Wild Things Are", author: "Maurice Sendak", genre: "Children's", published_year: 1963, isbn: "9780064431781", description: "A mischievous boy sails to an island of monsters and becomes their king before longing for home.", availability: true },
  { title: "Matilda", author: "Roald Dahl", genre: "Children's", published_year: 1988, isbn: "9780142410370", description: "A brilliant, telekinetic girl outwits her neglectful family and a tyrannical headmistress.", availability: true },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB at", MONGO_URI);

  const ops = books.map((book) => ({
    updateOne: {
      filter: { isbn: book.isbn },
      update: { $setOnInsert: book },
      upsert: true,
    },
  }));

  const result = await Book.bulkWrite(ops);
  console.log(`Inserted ${result.upsertedCount} new books (${books.length} total in seed list).`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
