const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3171;

app.use(bodyParser.json());

// Create or update user
app.post('/users', (req, res) => {
  const { id, fullPhoneNumber, ssn, email, password, full_name, gender, age } = req.body;
  const stmt = db.prepare(`
    INSERT INTO users (id, fullPhoneNumber, ssn, email, password, full_name, gender, age)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      fullPhoneNumber=excluded.fullPhoneNumber,
      ssn=excluded.ssn,
      email=excluded.email,
      password=excluded.password,
      full_name=excluded.full_name,
      gender=excluded.gender,
      age=excluded.age
  `);
  stmt.run(id, fullPhoneNumber, ssn, email, password, full_name, gender, age, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// GET all users
app.get('/users', (req, res) => {
  console.log('Fetching all users...');
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET user ID by phone number or email
app.get('/users/id', (req, res) => {
  const { phone, email } = req.query;
  console.log('Phone:', phone, 'Email:', email);

  if (!phone && !email) {
    return res.status(400).json({ error: 'Please provide either a phone number or an email.' });
  }
  const query = `
    SELECT id
    FROM users
    WHERE (fullPhoneNumber = ? OR email = ?)
  `;
  db.get(query, [phone || null, email || null], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  console.log('Fetching user by ID...');
  const { id } = req.params;
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User with this id {id} not found' });
    res.json(row);
  });
});

// DELETE user by ID (and cascade delete related tickets and connections)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true });
  });
});

// Create or update ticket
app.post('/tickets', (req, res) => {
  const { id, ticketdetails, ticketeventid, tickettype } = req.body;
  const stmt = db.prepare(`
    INSERT INTO tickets (id, ticketdetails, ticketeventid, tickettype)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      ticketdetails=excluded.ticketdetails,
      ticketeventid=excluded.ticketeventid,
      tickettype=excluded.tickettype
  `);
  stmt.run(id, ticketdetails, ticketeventid, tickettype, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// GET all tickets
app.get('/tickets', (req, res) => {
  db.all(`SELECT * FROM tickets`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket by ID
app.get('/tickets/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM tickets WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Ticket not found' });
    res.json(row);
  });
});

// DELETE ticket by ID
app.delete('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tickets WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ success: true });
  });
});

// Create or update ticket type
app.post('/ticket_types', (req, res) => {
  const { id, type } = req.body;
  const stmt = db.prepare(`
    INSERT INTO ticket_types (id, type)
    VALUES (?, ?)
    ON CONFLICT(id) DO UPDATE SET
      type=excluded.type
  `);
  stmt.run(id, type, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// GET all ticket types
app.get('/ticket_types', (req, res) => {
  db.all(`SELECT * FROM ticket_types`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket type by ID
app.get('/ticket_types/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM ticket_types WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Ticket type not found' });
    res.json(row);
  });
});

// DELETE ticket type by ID
app.delete('/ticket_types/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ticket_types WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Ticket type not found' });
    res.json({ success: true });
  });
});

// Create or update user-ticket connection
app.post('/user_tickets', (req, res) => {
  const { id, user_id, ticket_id } = req.body;
  const stmt = db.prepare(`
    INSERT INTO user_tickets (id, user_id, ticket_id)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      user_id=excluded.user_id,
      ticket_id=excluded.ticket_id
  `);
  stmt.run(id, user_id, ticket_id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// GET all user-ticket connections
app.get('/user_tickets', (req, res) => {
  db.all(`SELECT * FROM user_tickets`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET user-ticket connection by ID
app.get('/user_tickets/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM user_tickets WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User-ticket connection not found' });
    res.json(row);
  });
});

// DELETE user-ticket connection by ID
app.delete('/user_tickets/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user_tickets WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User-ticket connection not found' });
    res.json({ success: true });
  });
});

// Create or update ticket-type connection
app.post('/ticket_type_connections', (req, res) => {
  const { id, ticket_id, ticket_type_id } = req.body;
  const stmt = db.prepare(`
    INSERT INTO ticket_type_connections (id, ticket_id, ticket_type_id)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      ticket_id=excluded.ticket_id,
      ticket_type_id=excluded.ticket_type_id
  `);
  stmt.run(id, ticket_id, ticket_type_id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// GET all ticket-type connections
app.get('/ticket_type_connections', (req, res) => {
  db.all(`SELECT * FROM ticket_type_connections`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket-type connection by ID
app.get('/ticket_type_connections/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM ticket_type_connections WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Ticket-type connection not found' });
    res.json(row);
  });
});

// GET all tickets owned by a specific user
app.get('/users/:id/tickets', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT tickets.*
    FROM tickets
    INNER JOIN user_tickets ON tickets.id = user_tickets.ticket_id
    WHERE user_tickets.user_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// DELETE ticket-type connection by ID
app.delete('/ticket_type_connections/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ticket_type_connections WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Ticket-type connection not found' });
    res.json({ success: true });
  });
});

// Create or update favorite team for a user
app.post('/user_favorite_teams', (req, res) => {
  const { id, user_id, team_id } = req.body;
  const stmt = db.prepare(`
    INSERT INTO user_favorite_teams (id, user_id, team_id)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      user_id=excluded.user_id,
      team_id=excluded.team_id
  `);
  stmt.run(id, user_id, team_id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// GET all favorite teams for all users
app.get('/user_favorite_teams', (req, res) => {
  db.all(`SELECT * FROM user_favorite_teams`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all favorite teams for a specific user
app.get('/users/:id/favorite_teams', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT team_id FROM user_favorite_teams WHERE user_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// POST: Add a ticket purchase for a user
app.post('/users/:id/tickets', (req, res) => {
  const { id } = req.params; // user_id
  const { ticket_id } = req.body;

  const stmt = db.prepare(`
    INSERT INTO user_tickets (user_id, ticket_id)
    VALUES (?, ?)
    ON CONFLICT(user_id, ticket_id) DO NOTHING
  `);
  stmt.run(id, ticket_id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Ticket added to user.' });
  });
});

// GET: Get all tickets purchased by a specific user
app.get('/users/:id/purchased_tickets', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT tickets.*
    FROM tickets
    INNER JOIN user_tickets ON tickets.id = user_tickets.ticket_id
    WHERE user_tickets.user_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
