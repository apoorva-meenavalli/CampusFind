const Database = require("better-sqlite3");

const db = new Database("campusfind.db");

console.log("SQLite database connected successfully!");


// ==============================
// USERS TABLE
// ==============================

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);


// ==============================
// ITEMS TABLE
// ==============================

db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        date TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'active',

        contact_name TEXT,
        contact_phone TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
        REFERENCES users(id)
    )
`);


// ==============================
// ADD CONTACT COLUMNS TO
// EXISTING DATABASE
// ==============================

const columns = db
    .prepare("PRAGMA table_info(items)")
    .all();

const columnNames = columns.map((column) => column.name);

if (!columnNames.includes("contact_name")) {
    db.exec(`
        ALTER TABLE items
        ADD COLUMN contact_name TEXT
    `);
}

if (!columnNames.includes("contact_phone")) {
    db.exec(`
        ALTER TABLE items
        ADD COLUMN contact_phone TEXT
    `);
}


console.log("Users table is ready!");
console.log("Items table is ready!");
console.log("Contact information is ready!");


module.exports = db;