/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         fullPhoneNumber:
 *           type: string
 *         ssn:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         is_verified:
 *           type: boolean
 *         verification_token:
 *           type: string
 *         verification_expires:
 *           type: string
 *           format: date-time
 *         reset_token:
 *           type: string
 *         reset_expires:
 *           type: string
 *           format: date-time
 *         full_name:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         age:
 *           type: integer
 *         auth_type:
 *           type: string
 *           enum: [email, phone, google, apple]
 *         last_login_at:
 *           type: string
 *           format: date-time
 *         failed_login_attempts:
 *           type: integer
 *         is_locked:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         last_opened_at:
 *           type: string
 *           format: date-time
 *         duid:
 *           type: string
 *         google_id:
 *           type: string
 *         requires_phone_verification:
 *           type: boolean
 *         profile_image:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         apple_id:
 *           type: string
 *         apple_email:
 *           type: string
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create or update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserExample'
 *     responses:
 *       200:
 *         description: User created or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 1
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 fullPhoneNumber: "1234567890"
 *                 email: "user1@example.com"
 *                 full_name: "John Doe"
 *                 profile_image: "https://example.com/profile.jpg"
 *                 google_id: "google123"
 *                 auth_type: "email"
 *                 apple_id: null
 *                 apple_email: null
 *                 is_verified: true
 *                 verification_token: null
 *                 verification_expires: null
 *                 reset_token: null
 *                 reset_expires: null
 *                 gender: "male"
 *                 age: 30
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *                 updated_at: "2025-05-09T12:00:00.000Z"
 */
/**
 * @swagger
 * /users/id:
 *   get:
 *     summary: Get user ID by phone number or email
 *     tags: [Users]
 *     parameters:
 *       - name: phone
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "1234567890"
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "user12@example.com"
 *     responses:
 *       200:
 *         description: User ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Missing phone or email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please provide either a phone number or an email."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: 1
 *               fullPhoneNumber: "1234567890"
 *               email: "user1@example.com"
 *               full_name: "John Doe"
 *               profile_image: "https://example.com/profile.jpg"
 *               google_id: "google123"
 *               auth_type: "email"
 *               apple_id: null
 *               apple_email: null
 *               is_verified: true
 *               verification_token: null
 *               verification_expires: null
 *               reset_token: null
 *               reset_expires: null
 *               gender: "male"
 *               age: 30
 *               created_at: "2025-05-09T12:00:00.000Z"
 *               updated_at: "2025-05-09T12:00:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create or update a ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the ticket (optional for new tickets)
 *               ticketdetails:
 *                 type: string
 *                 description: Details about the ticket
 *               ticketeventid:
 *                 type: integer
 *                 description: The event ID associated with the ticket
 *               tickettype:
 *                 type: integer
 *                 description: The type of the ticket
 *           example:
 *             id: 1
 *             ticketdetails: "VIP Ticket"
 *             ticketeventid: 101
 *             tickettype: 2
 *     responses:
 *       200:
 *         description: Ticket created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: ticketdetails, ticketeventid, and tickettype are required."
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the ticket
 *         ticketdetails:
 *           type: string
 *           description: Details about the ticket
 *         ticketeventid:
 *           type: integer
 *           description: The event ID associated with the ticket
 *         tickettype:
 *           type: integer
 *           description: The type of the ticket
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the ticket was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the ticket was last updated
 */
/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ticketdetails:
 *                     type: string
 *                   ticketeventid:
 *                     type: integer
 *                   tickettype:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: 3
 *                 ticketdetails: "Single Ticket"
 *                 ticketeventid: 170
 *                 tickettype: 3
 *                 created_at: "2025-04-09 21:42:53"
 *                 updated_at: "2025-04-09 21:42:53"
 */
/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Ticket data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ticketdetails:
 *                   type: string
 *                 ticketeventid:
 *                   type: integer
 *                 tickettype:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 3
 *               ticketdetails: "Single Ticket"
 *               ticketeventid: 170
 *               tickettype: 3
 *               created_at: "2025-04-09 21:42:53"
 *               updated_at: "2025-04-09 21:42:53"
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket not found"
 */
/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket not found"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TicketType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the ticket type
 *         type:
 *           type: string
 *           description: The name of the ticket type
 */
/**
 * @swagger
 * /ticket_types:
 *   post:
 *     summary: Create or update a ticket type
 *     tags: [Ticket Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the ticket type (optional for new ticket types)
 *               type:
 *                 type: string
 *                 description: The name of the ticket type
 *           example:
 *             id: 1
 *             type: "VIP"
 *     responses:
 *       200:
 *         description: Ticket type created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required field: type is required."
 */
/**
 * @swagger
 * /ticket_types:
 *   get:
 *     summary: Get all ticket types
 *     tags: [Ticket Types]
 *     responses:
 *       200:
 *         description: List of ticket types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketType'
 *             example:
 *               - id: 1
 *                 type: "VIP"
 *               - id: 2
 *                 type: "Regular"
 */
/**
 * @swagger
 * /ticket_types/{id}:
 *   get:
 *     summary: Get a ticket type by ID
 *     tags: [Ticket Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket type data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *             example:
 *               id: 1
 *               type: "VIP"
 *       404:
 *         description: Ticket type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket type not found"
 */
/**
 * @swagger
 * /ticket_types/{id}:
 *   delete:
 *     summary: Delete a ticket type by ID
 *     tags: [Ticket Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Ticket type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket type not found"
 */
/**
 * @swagger
 * /user_tickets:
 *   post:
 *     summary: Create or update a user-ticket connection
 *     tags: [User Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the user-ticket connection (optional for new connections)
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *               ticket_id:
 *                 type: integer
 *                 description: The ID of the ticket
 *           example:
 *             id: 1
 *             user_id: 101
 *             ticket_id: 202
 *     responses:
 *       200:
 *         description: User-ticket connection created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: user_id and ticket_id are required."
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserTicket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the user-ticket connection
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         ticket_id:
 *           type: integer
 *           description: The ID of the ticket
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the connection was created
 */
/**
 * @swagger
 * /user_tickets:
 *   get:
 *     summary: Get all user-ticket connections
 *     tags: [User Tickets]
 *     responses:
 *       200:
 *         description: List of user-ticket connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserTicket'
 *             example:
 *               - id: 1
 *                 user_id: 101
 *                 ticket_id: 202
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *               - id: 2
 *                 user_id: 102
 *                 ticket_id: 203
 *                 created_at: "2025-05-10T14:30:00.000Z"
 */
/**
 * @swagger
 * /user_tickets/{id}:
 *   get:
 *     summary: Get a user-ticket connection by ID
 *     tags: [User Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User-ticket connection data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTicket'
 *             example:
 *               id: 1
 *               user_id: 101
 *               ticket_id: 202
 *               created_at: "2025-05-09T12:00:00.000Z"
 *       404:
 *         description: User-ticket connection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User-ticket connection not found"
 */
/**
 * @swagger
 * /user_tickets/{id}:
 *   delete:
 *     summary: Delete a user-ticket connection by ID
 *     tags: [User Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User-ticket connection deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User-ticket connection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User-ticket connection not found"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TicketTypeConnection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the ticket-type connection
 *         ticket_id:
 *           type: integer
 *           description: The ID of the ticket
 *         ticket_type_id:
 *           type: integer
 *           description: The ID of the ticket type
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the connection was created
 */
/**
 * @swagger
 * /ticket_type_connections:
 *   post:
 *     summary: Create or update a ticket-type connection
 *     tags: [Ticket Type Connections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the ticket-type connection (optional for new connections)
 *               ticket_id:
 *                 type: integer
 *                 description: The ID of the ticket
 *               ticket_type_id:
 *                 type: integer
 *                 description: The ID of the ticket type
 *           example:
 *             id: 1
 *             ticket_id: 101
 *             ticket_type_id: 202
 *     responses:
 *       200:
 *         description: Ticket-type connection created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: ticket_id and ticket_type_id are required."
 */
/**
 * @swagger
 * /ticket_type_connections:
 *   get:
 *     summary: Get all ticket-type connections
 *     tags: [Ticket Type Connections]
 *     responses:
 *       200:
 *         description: List of ticket-type connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketTypeConnection'
 *             example:
 *               - id: 1
 *                 ticket_id: 101
 *                 ticket_type_id: 202
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *               - id: 2
 *                 ticket_id: 102
 *                 ticket_type_id: 203
 *                 created_at: "2025-05-10T14:30:00.000Z"
 */
/**
 * @swagger
 * /ticket_type_connections/{id}:
 *   get:
 *     summary: Get a ticket-type connection by ID
 *     tags: [Ticket Type Connections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket-type connection data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketTypeConnection'
 *             example:
 *               id: 1
 *               ticket_id: 101
 *               ticket_type_id: 202
 *               created_at: "2025-05-09T12:00:00.000Z"
 *       404:
 *         description: Ticket-type connection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket-type connection not found"
 */
/**
 * @swagger
 * /users/{id}/tickets:
 *   get:
 *     summary: Get all tickets owned by a specific user
 *     tags: [Users, Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of tickets owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *             example:
 *               - id: 1
 *                 ticketdetails: "VIP Ticket"
 *                 ticketeventid: 101
 *                 tickettype: 2
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *                 updated_at: "2025-05-09T12:00:00.000Z"
 *               - id: 2
 *                 ticketdetails: "Regular Ticket"
 *                 ticketeventid: 102
 *                 tickettype: 1
 *                 created_at: "2025-05-10T14:30:00.000Z"
 *                 updated_at: "2025-05-10T14:30:00.000Z"
 *       404:
 *         description: User not found or no tickets found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tickets found for the user"
 */
/**
 * @swagger
 * /ticket_type_connections/{id}:
 *   delete:
 *     summary: Delete a ticket-type connection by ID
 *     tags: [Ticket Type Connections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the ticket-type connection to delete
 *     responses:
 *       200:
 *         description: Ticket-type connection deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Ticket-type connection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ticket-type connection not found"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserFavoriteTeam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the user-favorite team connection
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         team_id:
 *           type: integer
 *           description: The ID of the team
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the connection was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the connection was last updated
 */
/**
 * @swagger
 * /user_favorite_teams:
 *   post:
 *     summary: Create or update favorite teams for a user
 *     tags: [User Favorite Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *               team_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of team IDs to set as favorites
 *           example:
 *             user_id: 1
 *             team_ids: [101, 102, 103]
 *     responses:
 *       200:
 *         description: Favorite teams updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user_id and team_ids array are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete old teams"
 *                 details:
 *                   type: string
 *                   example: "Error details here"
 */
/**
 * @swagger
 * /user_favorite_teams:
 *   get:
 *     summary: Get all favorite teams for all users
 *     tags: [User Favorite Teams]
 *     responses:
 *       200:
 *         description: List of all favorite teams for all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserFavoriteTeam'
 *             example:
 *               - id: 1
 *                 user_id: 1
 *                 team_id: 101
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *                 updated_at: "2025-05-09T12:00:00.000Z"
 *               - id: 2
 *                 user_id: 2
 *                 team_id: 102
 *                 created_at: "2025-05-10T14:30:00.000Z"
 *                 updated_at: "2025-05-10T14:30:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch favorite teams"
 */
/**
 * @swagger
 * /users/{id}/favorite_teams:
 *   get:
 *     summary: Get all favorite teams for a specific user
 *     tags: [User Favorite Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of favorite teams for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   team_id:
 *                     type: integer
 *                     description: The ID of the favorite team
 *             example:
 *               - team_id: 101
 *               - team_id: 102
 *       404:
 *         description: No favorite teams found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No favorite teams found for the user"
 */
/**
 * @swagger
 * /users/{id}/tickets:
 *   post:
 *     summary: Add a ticket purchase for a user
 *     tags: [Users, Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: The ID of the ticket to be added
 *           example:
 *             ticket_id: 101
 *     responses:
 *       200:
 *         description: Ticket added to the user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ticket added to user."
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ticket_id is required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add ticket to user."
 */
/**
 * @swagger
 * /users/{id}/purchased_tickets:
 *   get:
 *     summary: Get all tickets purchased by a specific user
 *     tags: [Users, Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of tickets purchased by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *             example:
 *               - id: 1
 *                 ticketdetails: "VIP Ticket"
 *                 ticketeventid: 101
 *                 tickettype: 2
 *                 created_at: "2025-05-09T12:00:00.000Z"
 *                 updated_at: "2025-05-09T12:00:00.000Z"
 *               - id: 2
 *                 ticketdetails: "Regular Ticket"
 *                 ticketeventid: 102
 *                 tickettype: 1
 *                 created_at: "2025-05-10T14:30:00.000Z"
 *                 updated_at: "2025-05-10T14:30:00.000Z"
 *       404:
 *         description: No tickets found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tickets found for the user"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch tickets"
 */
/**
 * @swagger
 * /verify_email:
 *   get:
 *     summary: Verify a user's email address
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *         description: The email address of the user to verify
 *       - name: token
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "verification_token_123"
 *         description: The verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Email verified successfully."
 *       400:
 *         description: Missing or invalid email or token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and token are required"
 *       404:
 *         description: Missing or invalid email or token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to verify email"
 */