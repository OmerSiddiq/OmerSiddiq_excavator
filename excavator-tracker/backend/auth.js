const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) return res.status(401).send('Invalid credentials');
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

module.exports = router;
