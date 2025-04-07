const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3171;

app.use(bodyParser.json());

// Create or update user
app.post('/users', (req, res) => {
  const { id, email, name, age, phone } = req.body;
  const stmt = db.prepare(`
    INSERT INTO users (id, email, name, age, phone)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      email=excluded.email,
      name=excluded.name,
      age=excluded.age,
      phone=excluded.phone
  `);
  stmt.run(id, email, name, age, phone, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
