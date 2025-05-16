# User API

This is a simple Node.js API for managing user data, tickets, and related connections.

## Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- SQLite3 (for the database)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   cd <repository-name>
   npm install
   ```

## To Start
   ```bash
   node index.js
   ```

## API Endpoints

### Users
- **POST /users**: Create or update a user.
- **GET /users**: Get all users.
- **GET /users/id?email={email}&phone={phone}**: Get a user ID by email or phone.
- **GET /users/:id**: Get a user by ID.
- **DELETE /users/:id**: Delete a user by ID.
- **GET /verify_email?email={email}&token={token}**: Verify a user's email.

### Tickets
- **POST /tickets**: Create or update a ticket.
- **GET /tickets**: Get all tickets.
- **GET /tickets/:id**: Get a ticket by ID.
- **DELETE /tickets/:id**: Delete a ticket by ID.

### Ticket Types
- **POST /ticket_types**: Create or update a ticket type.
- **GET /ticket_types**: Get all ticket types.
- **GET /ticket_types/:id**: Get a ticket type by ID.
- **DELETE /ticket_types/:id**: Delete a ticket type by ID.

### User-Ticket Connections
- **POST /user_tickets**: Create or update a user-ticket connection.
- **GET /user_tickets**: Get all user-ticket connections.
- **GET /user_tickets/:id**: Get a user-ticket connection by ID.
- **DELETE /user_tickets/:id**: Delete a user-ticket connection by ID.

### Ticket-Type Connections
- **POST /ticket_type_connections**: Create or update a ticket-type connection.
- **GET /ticket_type_connections**: Get all ticket-type connections.
- **GET /ticket_type_connections/:id**: Get a ticket-type connection by ID.
- **DELETE /ticket_type_connections/:id**: Delete a ticket-type connection by ID.

### User Favorite Teams
- **POST /user_favorite_teams**: Create or update favorite teams for a user.
- **GET /user_favorite_teams**: Get all favorite teams for all users.
- **GET /users/:id/favorite_teams**: Get all favorite teams for a specific user.

### User Tickets (Purchases)
- **POST /users/:id/tickets**: Add a ticket purchase for a user.
- **GET /users/:id/tickets**: Get all tickets owned by a specific user.
- **GET /users/:id/purchased_tickets**: Get all tickets purchased by a specific user.

---

**Tip:**  
For full API documentation, visit `/api-docs` after starting the server.