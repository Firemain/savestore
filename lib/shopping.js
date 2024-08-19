import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

export const db = sql('bobs.db');

export async function getBobs() {
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM bobs').all();
}

export async function getOrders() {
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM orders').all();
}

export function getBob(slug) {
    return db.prepare('SELECT * FROM bobs WHERE slug = ?').get(slug);
}

export async function saveBob(bob) {
    bob.slug = slugify(bob.title, { lower: true });
    bob.description = xss(bob.description);  // Sanitizing the description to prevent XSS attacks.

    const extension = bob.image.name.split(".").pop();
    const fileName = `${bob.slug}.${extension}`;

    const stream = fs.createWriteStream(`assets/${fileName}`);
    const bufferedImage = await bob.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed.');
        }
    });

    bob.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO bobs 
        (title, description, price, image, slug)
        VALUES (
            @title,
            @description,
            @price,
            @image,
            @slug
        )
    `).run(bob);
}

export async function getSizesForBob(bobId) {
    return db.prepare('SELECT * FROM bob_sizes WHERE bob_id = ?').all(bobId);
}

export async function getStockForSize(bobId, size) {
    return db.prepare('SELECT stock FROM bob_sizes WHERE bob_id = ? AND size = ?').get(bobId, size);
}

export function getSizesAndStockBySlug(slug) {
    const query = db.prepare(`
        SELECT bs.size, bs.stock
        FROM bobs b
        JOIN bob_sizes bs ON b.id = bs.bob_id
        WHERE b.slug = ?
    `);
    return query.all(slug);
}

export function getStripePriceId(productId) {
    const query = db.prepare('SELECT priceIdStripe FROM bobs WHERE id = ?');
    const result = query.get(productId);
    if (result) {
        return result.priceIdStripe;
    } else {
        throw new Error(`No Stripe price ID found for product ID: ${productId}`);
    }
}

// This should be added to your lib/shopping.js
export async function saveBobWithSizes(bobData, sizes) {
    const { title, description, price, priceIdStripe, image } = bobData;
    const bob = {
        title,
        description,
        price,
        priceIdStripe,
        image: image.name // Adjust based on how you handle file uploads
    };

    // Assume bob.id is returned after saving bob
    const bobId = saveBob(bob);

    sizes.forEach(size => {
        const { size: sizeName, stock } = size;
        db.prepare(`
            INSERT INTO bob_sizes (bob_id, size, stock)
            VALUES (?, ?, ?)
        `).run(bobId, sizeName, stock);
    });
}

export const updateSize = (sizeId, bobId, size, stock) => {
    db.prepare(`
        UPDATE bob_sizes SET size = ?, stock = ? WHERE id = ? AND bob_id = ?
    `).run(size, stock, sizeId, bobId);
};

export const addSizeToBob = (bobId, size, stock) => {
    db.prepare(`
        INSERT INTO bob_sizes (bob_id, size, stock) VALUES (?, ?, ?)
    `).run(bobId, size, stock);
};


export const updateOrAddSize = (bobId, size, stock) => {
    // First, try to find the size
    const findSize = db.prepare(`
        SELECT id FROM bob_sizes WHERE bob_id = ? AND size = ?
    `);
    const sizeEntry = findSize.get(bobId, size);

    if (sizeEntry) {
        // If the size exists, update it
        const update = db.prepare(`
            UPDATE bob_sizes SET stock = ? WHERE id = ?
        `);
        update.run(stock, sizeEntry.id);
    } else {
        // If the size does not exist, insert it
        const insert = db.prepare(`
            INSERT INTO bob_sizes (bob_id, size, stock) VALUES (?, ?, ?)
        `);
        insert.run(bobId, size, stock);
    }
};

export const deleteSizeOfBob = (bobId, size) => {
    const stmt = db.prepare(`
        DELETE FROM bob_sizes
        WHERE bob_id = ? AND size = ?
    `);
    const result = stmt.run(bobId, size);
    if (result.changes) {
        console.log(`Size ${size} for bob ID ${bobId} deleted successfully.`);
    } else {
        console.log(`No size found with bob ID ${bobId} and size ${size} to delete.`);
    }
};



// Function to update stock
export const updateStock = (items) => {
    const update = db.prepare(`
      UPDATE bob_sizes SET stock = stock - ? WHERE bob_id = ? AND size = ?
    `);
  
    items.forEach(item => {
      // Réduit la quantité de moitié avant de l'envoyer à la base de données
      const halfQuantity = item.quantity / 2; // Utilisez Math.floor pour éviter les décimales
      update.run(halfQuantity, item.id, item.size);
    });
};


export const getUser = (username) => {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export async function checkStock(cartItems) {
    let isStockAvailable = true;
    let outOfStockItems = [];

    for (const item of cartItems) {
        const { id, size, quantity } = item;
        const stockItem = db.prepare('SELECT stock FROM bob_sizes WHERE bob_id = ? AND size = ?').get(id, size);
        if (!stockItem || stockItem.stock < quantity) {
            isStockAvailable = false;
            outOfStockItems.push(item);
        }
    }

    return { isStockAvailable, outOfStockItems };
}

