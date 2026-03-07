const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');



const { exec } = require('child_process');

// In-memory OTP storage for demo
const otps = {};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit routes for sub-project module previews
app.get('/dashboard-preview', (req, res) => {
    res.sendFile(path.join(__dirname, 'KRG', 'client_dashboard', 'code.html'));
});
app.get('/landing-preview', (req, res) => {
    res.sendFile(path.join(__dirname, 'KRG', 'krg_landing_page', 'code.html'));
});
app.get('/catalog-preview', (req, res) => {
    res.sendFile(path.join(__dirname, 'KRG', 'product_catalog_&_equipment_rental', 'code.html'));
});

app.use(express.static('.')); // Serve static files from current directory

// Database Setup
const dbPath = process.env.NODE_ENV === 'production'
    ? '/data/database.sqlite'
    : './database.sqlite';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log(`Connected to SQLite database at ${dbPath}`);
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            phone TEXT UNIQUE,
            role TEXT DEFAULT 'user'
        )`, (err) => {
            if (!err) {
                // Try to add phone column if it doesn't exist (for existing databases)
                db.run("ALTER TABLE users ADD COLUMN phone TEXT UNIQUE", (err) => {
                    if (err) {
                        // Probably already exists
                    }
                });
            }
        });

        // Rates Table
        db.run(`CREATE TABLE IF NOT EXISTS rates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            unit TEXT,
            price INTEGER
        )`);

        // Rate History Table
        db.run(`CREATE TABLE IF NOT EXISTS rate_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            item_name TEXT,
            old_price INTEGER,
            new_price INTEGER,
            admin_username TEXT
        )`);

        // Bookings/Inquiries Table
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            item_name TEXT,
            price TEXT,
            phone TEXT,
            place TEXT,
            customer_name TEXT
        )`);

        // Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            rateId INTEGER,
            type TEXT,
            name TEXT,
            description TEXT,
            price TEXT,
            unit TEXT,
            image TEXT,
            category TEXT,
            badge_text TEXT,
            badge_color TEXT
        )`);

        // Seed Products if empty
        db.get("SELECT count(*) as count FROM products", (err, row) => {
            if (row && row.count === 0) {
                const initialProducts = [
                    {
                        id: 'p1',
                        rateId: 1,
                        type: 'material',
                        name: 'Quality River Sand',
                        description: 'Premium filtered sand for construction foundations.',
                        price: '₹4,500',
                        unit: '/ Unit',
                        image: 'https://images.unsplash.com/photo-1533044309907-0fa341b59346?q=80&w=800&auto=format&fit=crop',
                        category: 'River Sand',
                        badge_text: 'Best Seller',
                        badge_color: 'bg-green-500'
                    },
                    {
                        id: 'p2',
                        rateId: 5,
                        type: 'material',
                        name: '20mm Blue Metal',
                        description: 'High-grade crushed stone aggregates for concrete.',
                        price: '₹3,200',
                        unit: '/ Unit',
                        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop',
                        category: 'Aggregates',
                        badge_text: '',
                        badge_color: ''
                    },
                    {
                        id: 'p3',
                        rateId: 2,
                        type: 'material',
                        name: 'Premium M-Sand',
                        description: 'High-quality manufactured sand for masonry works.',
                        price: '₹3,800',
                        unit: '/ Unit',
                        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
                        category: 'River Sand',
                        badge_text: 'Eco Friendly',
                        badge_color: 'bg-blue-500'
                    },
                    {
                        id: 'p4',
                        rateId: 3,
                        type: 'material',
                        name: 'Red Bricks',
                        description: 'Standard size burnt clay bricks for walls.',
                        price: '₹8,500',
                        unit: '/ 1000 Pcs',
                        image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=800&auto=format&fit=crop',
                        category: 'Cement',
                        badge_text: '',
                        badge_color: ''
                    }
                ];
                const stmt = db.prepare("INSERT INTO products (id, rateId, type, name, description, price, unit, image, category, badge_text, badge_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                initialProducts.forEach(p => {
                    stmt.run(p.id, p.rateId, p.type, p.name, p.description, p.price, p.unit, p.image, p.category, p.badge_text, p.badge_color);
                });
                stmt.finalize();
                console.log('Products seeded.');
            }
        });

        // Seed Rates if empty
        db.get("SELECT count(*) as count FROM rates", (err, row) => {
            if (row.count === 0) {
                const initialRates = [
                    { name: "River Sand", unit: "Unit (Load)", price: 4500 },
                    { name: "M-Sand", unit: "Unit (Load)", price: 3800 },
                    { name: "Red Bricks (Standard)", unit: "1000 Pcs", price: 8500 },
                    { name: "Red Bricks (Chamber)", unit: "1000 Pcs", price: 9200 },
                    { name: "Blue Metal (20mm)", unit: "Unit", price: 3200 },
                    { name: "Cement (Ramco)", unit: "Bag (50kg)", price: 420 },
                    { name: "Solid Blocks (4-inch)", unit: "Piece", price: 32 },
                    { name: "Solid Blocks (6-inch)", unit: "Piece", price: 42 },
                ];
                const stmt = db.prepare("INSERT INTO rates (name, unit, price) VALUES (?, ?, ?)");
                initialRates.forEach(rate => {
                    stmt.run(rate.name, rate.unit, rate.price);
                });
                stmt.finalize();
                console.log('Rates seeded.');
            }
        });

        // Seed Admin if empty
        db.get("SELECT count(*) as count FROM users WHERE role = 'admin'", (err, row) => {
            if (row && row.count === 0) {
                bcrypt.hash('admin123', 10, (err, hash) => {
                    db.run("INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)", ['admin', hash, '9944748140', 'admin']);
                    console.log('Admin seeded: admin / admin123');
                });
            }
        });

        // Seed Default User if empty
        db.get("SELECT count(*) as count FROM users WHERE username = 'tester'", (err, row) => {
            if (row && row.count === 0) {
                bcrypt.hash('tester123', 10, (err, hash) => {
                    db.run("INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)", ['tester', hash, '9994932660', 'user']);
                    console.log('User seeded: tester / tester123');
                });
            }
        });
    });
}

// Routes

// Register
app.post('/api/register', (req, res) => {
    const { username, password, phone } = req.body;
    if (!username || !password || !phone) return res.status(400).json({ error: 'Missing fields' });

    // Validate Phone Number: Exactly 10 digits
    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Server error' });

        db.run("INSERT INTO users (username, password, phone) VALUES (?, ?, ?)", [username, hash, phone], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    if (err.message.includes('username')) return res.status(400).json({ error: 'Username already exists' });
                    if (err.message.includes('phone')) return res.status(400).json({ error: 'Phone number already registered' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User registered successfully', userId: this.lastID });
        });
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; // username can be username or phone
    db.get("SELECT * FROM users WHERE username = ? OR phone = ?", [username, username], (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.json({
                    message: 'Login successful',
                    username: user.username,
                    phone: user.phone,
                    role: user.role,
                    token: 'dummy-token-' + Date.now()
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    });
});

// Get Rates
app.get('/api/rates', (req, res) => {
    db.all("SELECT * FROM rates", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Update Rates
app.post('/api/rates', (req, res) => {
    // In a real app, use auth tokens. 
    // For this implementation, we check the role provided in the request body (or dummy check)
    const { updates, username, role } = req.body;

    // Server-side role check
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized: Admin role required' });
    }

    if (!Array.isArray(updates)) return res.status(400).json({ error: 'Invalid format' });

    db.serialize(() => {
        const stmt = db.prepare("UPDATE rates SET price = ? WHERE id = ?");
        const histStmt = db.prepare("INSERT INTO rate_history (date, item_name, old_price, new_price, admin_username) VALUES (?, ?, ?, ?, ?)");
        const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const user = username || 'admin';

        updates.forEach(item => {
            db.get("SELECT * FROM rates WHERE id = ?", [item.id], (err, row) => {
                if (row && row.price !== item.price) {
                    histStmt.run(dateStr, row.name, row.price, item.price, user);
                    stmt.run(item.price, item.id);
                }
            });
        });

        setTimeout(() => {
            stmt.finalize();
            histStmt.finalize();
            res.json({ message: 'Rates updated' });
        }, 100);
    });
});

// Get History (Rate Changes)
app.get('/api/history', (req, res) => {
    // Check if user is admin (simplistic check for this setup)
    const role = req.query.role;
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    db.all("SELECT * FROM rate_history ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create Booking
app.post('/api/bookings', (req, res) => {
    const { item_name, price, phone, place, customer_name } = req.body;
    const dateStr = new Date().toLocaleString(); // Date and Time

    console.log(`[ORDER] New order received for: ${item_name} from ${customer_name}`);

    db.run("INSERT INTO bookings (date, item_name, price, phone, place, customer_name) VALUES (?, ?, ?, ?, ?, ?)",
        [dateStr, item_name, price, phone, place, customer_name || 'Guest'],
        function (err) {
            if (err) {
                console.error("[ORDER ERROR] Database Error:", err.message);
                return res.status(500).json({ error: "Order database error", details: err.message });
            }
            console.log(`[ORDER SUCCESS] Order saved with ID: ${this.lastID}`);
            res.json({ message: 'Booking successful', id: this.lastID });
        }
    );
});

// Get Bookings
app.get('/api/bookings', (req, res) => {
    const { role, username } = req.query;

    if (role === 'admin') {
        db.all("SELECT * FROM bookings ORDER BY id DESC", [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        if (!username) {
            return res.status(400).json({ error: 'Username required for tracking' });
        }
        db.all("SELECT * FROM bookings WHERE customer_name = ? ORDER BY id DESC", [username], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
});

// Get Products
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    if (category && category !== 'All') {
        db.all("SELECT * FROM products WHERE category = ?", [category], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        db.all("SELECT * FROM products", [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
});

// Search Products
app.get('/api/products/search', (req, res) => {
    const { q } = req.query;
    if (!q) return res.json([]);
    const query = `%${q}%`;
    db.all("SELECT * FROM products WHERE name LIKE ? OR category LIKE ? OR description LIKE ?", [query, query, query], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create/Update Product
app.post('/api/products', (req, res) => {
    const { product, role } = req.body;
    if (role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    const { id, rateId, type, name, description, price, unit, image, category, badge_text, badge_color } = product;

    db.run(`INSERT OR REPLACE INTO products (id, rateId, type, name, description, price, unit, image, category, badge_text, badge_color) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, rateId, type, name, description, price, unit, image, category, badge_text, badge_color],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product saved', id });
        }
    );
});

// Delete Product
app.delete('/api/products/:id', (req, res) => {
    const { role } = req.query;
    const { id } = req.params;
    if (role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
});

// Helper to normalize phone numbers for OTP
function normalizePhoneForOTP(rawPhone) {
    if (!rawPhone) return null;
    let digits = rawPhone.replace(/\D/g, '');
    if (digits.length === 10) return '+91' + digits;
    if (rawPhone.startsWith('+')) return '+' + digits;
    // Default to adding + if missing
    return '+' + digits;
}

// OTP Generation
app.post('/api/otp/send', (req, res) => {
    const { phone: rawPhone } = req.body;
    if (!rawPhone) return res.status(400).json({ error: 'Phone number required' });

    const phone = normalizePhoneForOTP(rawPhone);
    if (!phone || phone.length < 11) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    otps[phone] = code;

    console.log(`\n==================================================`);
    console.log(`[SENDING REAL SMS VIA TWILIO]`);
    console.log(`TO: ${phone} (Normalized from: ${rawPhone})`);
    console.log(`CODE: [ ${code} ]`);
    console.log(`==================================================\n`);

    // OTP logging only (Twilio removed)
    console.log(`[OTP SENT] To: ${phone}, Code: ${code}`);
    res.json({ message: 'OTP generated (logged to server console)' });
});

// OTP Verification
app.post('/api/otp/verify', (req, res) => {
    const { phone: rawPhone, code } = req.body;
    if (!rawPhone || !code) return res.status(400).json({ error: 'Phone and code required' });

    const phone = normalizePhoneForOTP(rawPhone);
    if (otps[phone] && otps[phone] === code) {
        delete otps[phone]; // Clear after use
        res.json({ message: 'OTP verified successfully' });
    } else {
        console.log(`[VERIFY FAIL] Expected ${otps[phone]} but got ${code} for ${phone}`);
        res.status(400).json({ error: 'Invalid OTP code or expired' });
    }
});

// Admin Stats
app.get('/api/admin/stats', (req, res) => {
    const { role } = req.query;
    // Simple role check
    if (role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    const stats = {};

    db.serialize(() => {
        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.userCount = row.count;

            db.get("SELECT count(*) as count FROM bookings", (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.orderCount = row.count;
                res.json(stats);
            });
        });
    });
});

// Admin: Get All Users
app.get('/api/admin/users', (req, res) => {
    const { role } = req.query;
    if (role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    db.all("SELECT id, username, phone, role FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Admin: Add User
app.post('/api/admin/users', (req, res) => {
    const { username, password, phone, role: newRole, adminRole } = req.body;

    if (adminRole !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    if (!username || !password || !phone) return res.status(400).json({ error: 'Missing fields' });

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Server error' });

        db.run("INSERT INTO users (username, password, phone, role) VALUES (?, ?, ?, ?)",
            [username, hash, phone, newRole || 'user'],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        if (err.message.includes('username')) return res.status(400).json({ error: 'Username already exists' });
                        if (err.message.includes('phone')) return res.status(400).json({ error: 'Phone number already registered' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'User created successfully', id: this.lastID });
            }
        );
    });
});

// Admin: Sync to GitHub
app.post('/api/admin/sync', (req, res) => {
    const { role } = req.body;
    if (role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    console.log('[ADMIN] Starting GitHub Sync/Push...');

    // Improved command: 
    // 1. Pull latest changes
    // 2. Add all files
    // 3. Commit only if there are changes (|| echo handles no changes)
    // 4. Push to main
    const cmd = 'git pull origin main && git add . && (git commit -m "Admin UI Sync Update" || echo "no changes to commit") && git push origin main';

    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error('[GIT ERROR]', stderr || err.message);
            return res.status(500).json({ error: 'Git Sync Failed', details: stderr || err.message });
        }
        console.log('[GIT SUCCESS]', stdout);
        res.json({ message: 'GitHub Sync Successful!', output: stdout });
    });
});

// Catch-all route for SPA - serves index.html for unknown paths
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // Automatically open browser in local development
    if (process.env.NODE_ENV !== 'production') {
        try {
            const open = require('open');
            await open(`http://localhost:${PORT}`);
        } catch (err) {
            console.log("Could not open browser automatically.");
        }
    }
});
