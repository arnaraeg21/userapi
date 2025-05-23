const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 3171;

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

// Create or update user
app.post("/users", (req, res) => {
  const {
    id,
    fullPhoneNumber,
    email,
    full_name,
    profile_image,
    google_id,
    auth_type,
    apple_id,
    apple_email,
    is_verified,
    verification_token,
    verification_expires,
  } = req.body;

  // Build dynamic update clause based on provided fields
  const updateFields = [];
  const values = [];
  const params = [];

  // Add all fields to values array for INSERT
  values.push(
    id,
    fullPhoneNumber,
    email,
    full_name,
    profile_image,
    google_id,
    auth_type,
    apple_id,
    apple_email,
    is_verified,
    verification_token,
    verification_expires
  );

  // Only add fields to update clause if they are provided (not undefined)
  if (fullPhoneNumber !== undefined) {
    updateFields.push("fullPhoneNumber = excluded.fullPhoneNumber");
    params.push(fullPhoneNumber);
  }
  if (email !== undefined) {
    updateFields.push("email = excluded.email");
    params.push(email);
  }
  if (full_name !== undefined) {
    updateFields.push("full_name = excluded.full_name");
    params.push(full_name);
  }
  if (profile_image !== undefined) {
    updateFields.push("profile_image = excluded.profile_image");
    params.push(profile_image);
  }
  if (google_id !== undefined) {
    updateFields.push("google_id = excluded.google_id");
    params.push(google_id);
  }
  if (auth_type !== undefined) {
    updateFields.push("auth_type = excluded.auth_type");
    params.push(auth_type);
  }
  if (apple_id !== undefined) {
    updateFields.push("apple_id = excluded.apple_id");
    params.push(apple_id);
  }
  if (apple_email !== undefined) {
    updateFields.push("apple_email = excluded.apple_email");
    params.push(apple_email);
  }
  if (is_verified !== undefined) {
    updateFields.push("is_verified = excluded.is_verified");
    params.push(is_verified);
  }
  if (verification_token !== undefined) {
    updateFields.push("verification_token = excluded.verification_token");
    params.push(verification_token);
  }
  if (verification_expires !== undefined) {
    updateFields.push("verification_expires = excluded.verification_expires");
    params.push(verification_expires);
  }

  const updateClause =
    updateFields.length > 0
      ? `ON CONFLICT(id) DO UPDATE SET ${updateFields.join(", ")}`
      : "ON CONFLICT(id) DO NOTHING";

  const stmt = db.prepare(`
    INSERT INTO users (id, fullPhoneNumber, email, full_name, profile_image, google_id, auth_type, apple_id, apple_email, is_verified, verification_token, verification_expires)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ${updateClause}
  `);

  stmt.run(values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// GET all users
app.get("/users", (req, res) => {
  console.log("Fetching all users...");
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET user ID by phone number or email
app.get("/users/id", (req, res) => {
  const { phone, email } = req.query;
  console.log("Phone:", phone, "Email:", email);

  if (!phone && !email) {
    return res
      .status(400)
      .json({ error: "Please provide either a phone number or an email." });
  }
  const query = `
    SELECT id
    FROM users
    WHERE (fullPhoneNumber = ? OR email = ?)
  `;
  db.get(query, [phone || null, email || null], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  console.log("Fetching user by ID...");
  const { id } = req.params;
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row)
      return res
        .status(404)
        .json({ error: "User with this id {id} not found" });
    res.json(row);
  });
});

// DELETE user by ID (and cascade delete related tickets and connections)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ success: true });
  });
});

// Create or update ticket
app.post("/tickets", (req, res) => {
  const { id, ticketdetails, ticketeventid, tickettype } = req.body;

    // Validate required fields
  if (!ticketdetails || !ticketeventid || !tickettype) {
    return res.status(400).json({
      error: "Missing required fields: ticketdetails, ticketeventid, and tickettype are required.",
    });
  }

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
app.get("/tickets", (req, res) => {
  db.all(`SELECT * FROM tickets`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket by ID
app.get("/tickets/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM tickets WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Ticket not found" });
    res.json(row);
  });
});

// DELETE ticket by ID
app.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tickets WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Ticket not found" });
    res.json({ success: true });
  });
});

// Create or update ticket type
app.post("/ticket_types", (req, res) => {
  const { id, type } = req.body;

  // Validate required fields
  if (!type) {
    return res.status(400).json({
      error: "Missing required field: type is required.",
    });
  }

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
app.get("/ticket_types", (req, res) => {
  db.all(`SELECT * FROM ticket_types`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket type by ID
app.get("/ticket_types/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM ticket_types WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Ticket type not found" });
    res.json(row);
  });
});

// DELETE ticket type by ID
app.delete("/ticket_types/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ticket_types WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Ticket type not found" });
    res.json({ success: true });
  });
});

// Create or update user-ticket connection
app.post("/user_tickets", (req, res) => {
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
app.get("/user_tickets", (req, res) => {
  db.all(`SELECT * FROM user_tickets`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET user-ticket connection by ID
app.get("/user_tickets/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM user_tickets WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row)
      return res
        .status(404)
        .json({ error: "User-ticket connection not found" });
    res.json(row);
  });
});

// DELETE user-ticket connection by ID
app.delete("/user_tickets/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user_tickets WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res
        .status(404)
        .json({ error: "User-ticket connection not found" });
    res.json({ success: true });
  });
});

// Create or update ticket-type connection
app.post("/ticket_type_connections", (req, res) => {
  const { id, ticket_id, ticket_type_id } = req.body;

    // Validate required fields
    if (!ticket_id || !ticket_type_id) {
      return res.status(400).json({
        error: "Missing required fields: ticket_id and ticket_type_id are required.",
      });
    }

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
app.get("/ticket_type_connections", (req, res) => {
  db.all(`SELECT * FROM ticket_type_connections`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET ticket-type connection by ID
app.get("/ticket_type_connections/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    `SELECT * FROM ticket_type_connections WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row)
        return res
          .status(404)
          .json({ error: "Ticket-type connection not found" });
      res.json(row);
    }
  );
});

// GET all tickets owned by a specific user
app.get("/users/:id/tickets", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT tickets.*
    FROM tickets
    INNER JOIN user_tickets ON tickets.id = user_tickets.ticket_id
    WHERE user_tickets.user_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No tickets found for the user" });
    }
    res.json(rows);
  });
});

// DELETE ticket-type connection by ID
app.delete("/ticket_type_connections/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ticket_type_connections WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res
        .status(404)
        .json({ error: "Ticket-type connection not found" });
    res.json({ success: true });
  });
});

// Create or update favorite team for a user
app.post("/user_favorite_teams", (req, res) => {
  const { user_id, team_ids } = req.body;
  // Check if all parameters are in request body
  if (!user_id || !Array.isArray(team_ids)) {
    return res
      .status(400)
      .json({ error: "user_id and team_ids array are required" });
  }
  // Convert array into string for sql query
  const placeholders = team_ids.map(() => "?").join(",");
  const deleteQuery = `
    DELETE FROM user_favorite_teams
    WHERE user_id = ?
    AND team_id NOT IN (${placeholders})
  `;
  const insertQuery = `
    INSERT OR IGNORE INTO user_favorite_teams (user_id, team_id)
    VALUES (?, ?)
  `;

  db.serialize(() => {
    // Start transaction, enables rollback on error
    db.run("BEGIN TRANSACTION");

    // DELETE teams from table not in input array
    db.run(deleteQuery, [user_id, ...team_ids], function (err) {
      if (err) {
        console.error("Delete failed:", err.message);
        db.run("ROLLBACK");
        return res
          .status(500)
          .json({ error: "Failed to delete old teams", details: err.message });
      }

      // INSERT teams into table from input array not already in the table
      const stmt = db.prepare(insertQuery);
      let hasInsertError = false;

      for (const team_id of team_ids) {
        stmt.run(user_id, team_id, (err) => {
          if (err) {
            hasInsertError = true;
            console.error(
              "Insert failed for team_id",
              team_id,
              ":",
              err.message
            );
            db.run("ROLLBACK");
            return res
              .status(500)
              .json({ error: "Failed to insert team", details: err.message });
          }
        });
      }

      stmt.finalize((err) => {
        if (hasInsertError) return;

        if (err) {
          console.error("Finalize failed:", err.message);
          db.run("ROLLBACK");
          return res
            .status(500)
            .json({ error: "Failed to finalize insert", details: err.message });
        }
        // Commit the transaction into database if successfull
        db.run("COMMIT", (err) => {
          if (err) {
            console.error("Commit failed:", err.message);
            return res.status(500).json({
              error: "Transaction commit failed",
              details: err.message,
            });
          }

          return res.json({ success: true });
        });
      });
    });
  });
});

// GET all favorite teams for all users
app.get("/user_favorite_teams", (req, res) => {
  db.all(`SELECT * FROM user_favorite_teams`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all favorite teams for a specific user
app.get("/users/:id/favorite_teams", (req, res) => {
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
app.post("/users/:id/tickets", (req, res) => {
  const { id } = req.params; // user_id
  const { ticket_id } = req.body;

  const stmt = db.prepare(`
    INSERT INTO user_tickets (user_id, ticket_id)
    VALUES (?, ?)
    ON CONFLICT(user_id, ticket_id) DO NOTHING
  `);
  stmt.run(id, ticket_id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Ticket added to user." });
  });
});

// GET: Get all tickets purchased by a specific user
app.get("/users/:id/purchased_tickets", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT tickets.*
    FROM tickets
    INNER JOIN user_tickets ON tickets.id = user_tickets.ticket_id
    WHERE user_tickets.user_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No tickets found for the user" });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// GET: Verify user email
app.get("/verify_email", (req, res) => {
  console.log("Verifying email...");
  const { email, token } = req.query; // Changed from req.body to req.query

  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required" });
  }

  const query = `UPDATE users SET is_verified = 1 WHERE email = ? AND verification_token = ?`;
  db.run(query, [email, token], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: "Invalid email or token" });
    }
    res.json({ success: true, message: "Email verified successfully." });
  });
});
