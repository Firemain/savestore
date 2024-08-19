const sql = require('better-sqlite3');
const db = sql('bobs.db');

const dummyBobs = [
  {
    title: 'Yellow Heart Molleton',
    slug: 'molleton-jaune-coeur',
    image: '/images/molletonJaune.jpg',
    description: 'Un design unique avec un coeur en molleton jaune, parfait pour les amoureux de la mode et du confort.',
    price: 18.00,
    priceIdStripe : "price_1PeD0wGy1c7jfSbyQFWCJ8fJ"
  },
  {
    title: 'Black Marguerite ',
    slug: 'marguerite-noire',
    image: '/images/margueriteNoire.jpg',
    description: 'Style élégant avec des motifs de marguerite noire, idéal pour une touche florale discrète.',
    price: 15.00,
    priceIdStripe : "price_1PeJHcGy1c7jfSbyWe9csNk6"
  },
  {
    title: 'Petit Coeur Menthe',
    slug: 'petit-coeur-menthe',
    image: '/images/heartMenthe.jpg',
    description: 'Fraîcheur et originalité avec ce petit coeur couleur menthe, un must-have de votre garde-robe.',
    price: 14.00,
    priceIdStripe : "price_1PeJIFGy1c7jfSbyzmF1wizu"
  },
  {
    title: 'Petit Coeur Violet',
    slug: 'petit-coeur-violet',
    image: '/images/heartPurple.jpg',
    description: 'Violet vibrant pour un style audacieux et captivant, parfait pour se démarquer.',
    price: 14.00,
    priceIdStripe : "price_1PeJIlGy1c7jfSbymvd71Izb"
  },
  {
    title: 'Fleurs des Champs',
    slug: 'fleurs-des-champs',
    image: '/images/flowersBeige.jpg',
    description: 'Évoque les champs de fleurs en été, idéal pour un look léger et joyeux.',
    price: 16.00,
    priceIdStripe : "price_1PeJJMGy1c7jfSbyBl4sx3wv"
  },
  {
    title: 'Petites Fleurs Marrons et Bleues',
    slug: 'petites-fleurs-marrons-et-bleues',
    image: '/images/brownBlueBob.jpg',
    description: 'Combinaison charmante de marron et bleu pour un style unique et mémorable.',
    price: 15.00,
    priceIdStripe : "price_1PeJJmGy1c7jfSbyfyuIXJJi"
  },
  {
    title: 'Petits coeurs amoureux',
    slug: 'petits-coeurs-amoureux',
    image: '/images/heartLove.jpg',
    description: 'Ensemble de petits coeurs témoignant de l\'amour et de la tendresse, parfait pour les romantiques.',
    price: 13.00,
    priceIdStripe : "price_1PeJKXGy1c7jfSbymWvo59tw"
  },
  {
    title: 'Marguerites violettes',
    slug: 'marguerites-violettes',
    image: '/images/margueritePurple.jpg',
    description: 'Des marguerites violettes pour un style délicat et printanier, idéal pour les amoureux de la nature.',
    price: 15.00,
    priceIdStripe : "price_1PeJKyGy1c7jfSby8FrJIPk8t"
  },
  {
    title: 'Cottelé rayé',
    slug: 'cottele-raye',
    image: '/images/cotteleRayures.jpg',
    description: 'Un style rayé classique et intemporel, parfait pour un look décontracté et élégant.',
    price: 13.00,
    priceIdStripe : "price_1PeJLOGy1c7jfSby26MG6WGM"
  }
];

const sizesAndStocks = [
  { bob_id: 1, size: '54-56', stock: 2 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 1, size: '56-58', stock: 1 },
  { bob_id: 1, size: '58-60', stock: 3 },
  { bob_id: 2, size: '54-56', stock: 2 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 2, size: '56-58', stock: 1 },
  { bob_id: 2, size: '58-60', stock: 3 },
  { bob_id: 3, size: '54-56', stock: 0 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 3, size: '56-58', stock: 0 },
  { bob_id: 3, size: '58-60', stock: 0 },
  { bob_id: 4, size: '54-56', stock: 0 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 4, size: '56-58', stock: 0 },
  { bob_id: 4, size: '58-60', stock: 0 },{ bob_id: 3, size: 54, stock: 0 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 5, size: '56-58', stock: 0 },
  { bob_id: 5, size: '58-60', stock: 0 },
  { bob_id: 5, size: '54-56', stock: 0 }, // Assuming bob_id 1 corresponds to the first bob
  { bob_id: 6, size: '56-58', stock: 0 },
  { bob_id: 6, size: '58-60', stock: 0 },
  { bob_id: 6, size: '54-56',  stock: 0 },
];

// Create the bobs table if it does not exist
db.prepare(`
   CREATE TABLE IF NOT EXISTS bobs (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       description TEXT NOT NULL,
       price REAL NOT NULL,
       priceIdStripe TEXT NOT NULL
    )
`).run();

// Create the 'bob_sizes' table if it does not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS bob_sizes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bob_id INTEGER,
      size TEXT NOT NULL,
      stock INTEGER,
      FOREIGN KEY(bob_id) REFERENCES bobs(id)
  )
`).run();

// Create 'orders' table
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_name TEXT NOT NULL,
      buyer_email TEXT NOT NULL,
      total_price REAL NOT NULL,
      order_date DATE NOT NULL,
      delivery_address TEXT NOT NULL,
      status TEXT NOT NULL
  )
`).run();

// Create 'order_items' table
db.prepare(`
  CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      bob_id INTEGER,
      quantity INTEGER,
      FOREIGN KEY(order_id) REFERENCES orders(id),
      FOREIGN KEY(bob_id) REFERENCES bobs(id)
  )
`).run();

//Create 'users' table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
  );
`);

// Create 'sessions' table
db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

// Function to initialize data in the database
function initData() {
  const insert = db.prepare(`
      INSERT INTO bobs (slug, title, image, description, price, priceIdStripe) VALUES (@slug, @title, @image, @description, @price, @priceIdStripe)
   `);

  // Loop through each bob and insert into the database
  for (const bob of dummyBobs) {
    insert.run(bob);
  }
}

// Function to insert sizes data
function initSizes() {
  const insert = db.prepare(`
      INSERT INTO bob_sizes (bob_id, size, stock) VALUES (@bob_id, @size, @stock)
  `);

  // Loop through each size and stock entry and insert into the database
  sizesAndStocks.forEach(sizeStock => {
    insert.run(sizeStock);
  });
}


// Call the function to initialize the data
initData();
initSizes();

db.prepare(`
  INSERT INTO users (username, password)
  VALUES (?, ?)
`).run('fiflafouf', 'a6f96cd67af0ba5d8e85cda62f4288a504cce78b9089c54ed8374b73d0e492d127002c31ca8e403457e7fb1dc7eec9d630702ffa35d5c761f2859ec40d61d825:eab5792cfbfe65f32c8392b59b94fd96');



// Insérer une commande
const insertOrder = db.prepare('INSERT INTO orders (buyer_name, buyer_email, total_price, status, order_date, delivery_address) VALUES (?, ?, ?, ?, ?, ?)');
const orderId = insertOrder.run('John Doe', 'john.doe@example.com', 33.00, 'Preparing', '2023-09-01', '123 Fake St, Faketown, FK').lastInsertRowid;

// Lier les produits à la commande
const insertOrderItem = db.prepare('INSERT INTO order_items (order_id, bob_id, quantity) VALUES (?, ?, ?)');
insertOrderItem.run(orderId, 1, 2); // 2 unités du premier bob
insertOrderItem.run(orderId, 2, 1); // 1 unité du deuxième bob

// Insérer l'utilisateur
