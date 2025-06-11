const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/excavator.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    partners TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    type TEXT,
    description TEXT,
    date TEXT,
    amount REAL,
    category TEXT,
    partner TEXT
  )`);

  // Default users
  const bcrypt = require('bcrypt');
  const hash = bcrypt.hashSync("omer6219", 10);

  db.run(`INSERT OR IGNORE INTO users (username, password, partners)
          VALUES ('pc200', ?, NULL)`, [hash]);

  const partners = JSON.stringify({
    "A": 85000,
    "B": 43000,
    "C": 152000
  });

  db.run(`INSERT OR IGNORE INTO users (username, password, partners)
          VALUES ('pc400', ?, ?)`, [hash, partners]);
});

module.exports = db;
