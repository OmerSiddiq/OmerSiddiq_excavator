const express = require('express');
const db = require('./db');
const { verifyToken } = require('./middleware');
const router = express.Router();

router.use(verifyToken);

router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions WHERE user = ?', [req.user.username], (err, rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { type, description, date, amount, category, partner } = req.body;
  db.run(`INSERT INTO transactions (user, type, description, date, amount, category, partner)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [req.user.username, type, description, date, amount, category, partner || null], err => {
    if (err) res.status(500).send("Error saving transaction");
    else res.sendStatus(201);
  });
});

router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM transactions WHERE id = ? AND user = ?`,
         [req.params.id, req.user.username], err => {
    if (err) res.status(500).send("Error deleting");
    else res.sendStatus(200);
  });
});

module.exports = router;
