const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database");

const app = express();

const PORT = 5000;
const JWT_SECRET = "campusfind_secret_key";

// Middleware
app.use(cors());
app.use(express.json());


// ==============================
// HOME
// ==============================

app.get("/", (req, res) => {
    res.json({
        message: "CampusFind Backend is running!"
    });
});


// ==============================
// REGISTER
// ==============================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUser = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);

        insertUser.run(name, email, hashedPassword);

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==============================
// LOGIN
// ==============================

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==============================
// REPORT LOST ITEM
// ==============================

app.post("/api/items/lost", (req, res) => {
    try {
        const {
            user_id,
            title,
            category,
            description,
            location,
            date,
            contact_name,
            contact_phone
        } = req.body;

        if (
            !user_id ||
            !title ||
            !category ||
            !description ||
            !location ||
            !date ||
            !contact_name ||
            !contact_phone
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const insertItem = db.prepare(`
            INSERT INTO items
            (
                user_id,
                title,
                category,
                description,
                location,
                date,
                type,
                contact_name,
                contact_phone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = insertItem.run(
            user_id,
            title,
            category,
            description,
            location,
            date,
            "lost",
            contact_name,
            contact_phone
        );

        res.status(201).json({
            message: "Lost item reported successfully",
            itemId: result.lastInsertRowid
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==============================
// REPORT FOUND ITEM
// ==============================

app.post("/api/items/found", (req, res) => {
    try {
        const {
            user_id,
            title,
            category,
            description,
            location,
            date,
            contact_name,
            contact_phone
        } = req.body;

        if (
            !user_id ||
            !title ||
            !category ||
            !description ||
            !location ||
            !date ||
            !contact_name ||
            !contact_phone
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const insertItem = db.prepare(`
            INSERT INTO items
            (
                user_id,
                title,
                category,
                description,
                location,
                date,
                type,
                contact_name,
                contact_phone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = insertItem.run(
            user_id,
            title,
            category,
            description,
            location,
            date,
            "found",
            contact_name,
            contact_phone
        );

        res.status(201).json({
            message: "Found item reported successfully",
            itemId: result.lastInsertRowid
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==============================
// GET ALL ITEMS
// ==============================

app.get("/api/items", (req, res) => {
    try {
        const items = db.prepare(`
            SELECT
                items.id,
                items.title,
                items.category,
                items.description,
                items.location,
                items.date,
                items.type,
                items.status,
                items.contact_name,
                items.contact_phone,
                items.created_at,
                users.name AS reporter_name
            FROM items
            JOIN users
            ON items.user_id = users.id
            ORDER BY items.created_at DESC
        `).all();

        res.json(items);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});