const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./stubbUsers.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullPhoneNumber TEXT,
    ssn TEXT,
    email TEXT UNIQUE,
    password TEXT,
    is_verified INTEGER DEFAULT 0,
    verification_token TEXT,
    verification_expires DATETIME,
    reset_token TEXT,
    reset_expires DATETIME,
    full_name TEXT,
    gender TEXT CHECK(gender IN ('male', 'female', 'other')),
    age INTEGER,
    auth_type TEXT CHECK(auth_type IN ('email', 'phone', 'google', 'apple')) DEFAULT 'phone',
    last_login_at DATETIME,
    failed_login_attempts INTEGER DEFAULT 0,
    is_locked INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_opened_at DATETIME,
    duid TEXT,
    google_id TEXT,
    requires_phone_verification INTEGER DEFAULT 1,
    profile_image TEXT,
    date_of_birth DATE,
    apple_id TEXT,
    apple_email TEXT UNIQUE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS user_interests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    selected INTEGER DEFAULT 1,
    notifications_enabled INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, team_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS notification_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    device_id TEXT NOT NULL,
    push_token TEXT NOT NULL,
    platform TEXT CHECK(platform IN ('android', 'ios', 'web')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    device_model TEXT,
    device_version TEXT,
    app_version TEXT,
    UNIQUE(user_id, device_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticketdetails TEXT,
    ticketeventid INTEGER NOT NULL,
    tickettype INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tickettype) REFERENCES ticket_types(id) ON DELETE CASCADE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS ticket_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS user_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ticket_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, ticket_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS ticket_type_connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    ticket_type_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY(ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS user_favorite_teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, team_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE
  )`);
});

module.exports = db;
