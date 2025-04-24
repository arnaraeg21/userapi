/**
 * @swagger
 * tags:
 *   - name: Users
 *   - name: User Interests
 *   - name: Notification Devices
 *   - name: Tickets
 *   - name: Ticket Types
 *   - name: User Tickets
 *   - name: Ticket Type Connections
 *   - name: User Favorite Teams
 */

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
 *     UserInterest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         team_id:
 *           type: integer
 *         selected:
 *           type: boolean
 *         notifications_enabled:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     NotificationDevice:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         device_id:
 *           type: string
 *         push_token:
 *           type: string
 *         platform:
 *           type: string
 *           enum: [android, ios, web]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         device_model:
 *           type: string
 *         device_version:
 *           type: string
 *         app_version:
 *           type: string
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         ticketdetails:
 *           type: string
 *         ticketeventid:
 *           type: integer
 *         tickettype:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     TicketType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         type:
 *           type: string
 *     UserTicket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         ticket_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *     TicketTypeConnection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         ticket_id:
 *           type: integer
 *         ticket_type_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *     UserFavoriteTeam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         team_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
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
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *
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
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 */

/**
 * @swagger
 * /user_interests:
 *   get:
 *     summary: Get all user interests
 *     tags: [User Interests]
 *     responses:
 *       200:
 *         description: List of user interests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserInterest'
 *   post:
 *     summary: Create a new user interest
 *     tags: [User Interests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInterest'
 *     responses:
 *       201:
 *         description: User interest created
 *
 * /user_interests/{id}:
 *   get:
 *     summary: Get a user interest by ID
 *     tags: [User Interests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User interest data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInterest'
 *   put:
 *     summary: Update a user interest
 *     tags: [User Interests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInterest'
 *     responses:
 *       200:
 *         description: User interest updated
 *   delete:
 *     summary: Delete a user interest
 *     tags: [User Interests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User interest deleted
 */

/**
 * @swagger
 * /notification_devices:
 *   get:
 *     summary: Get all notification devices
 *     tags: [Notification Devices]
 *     responses:
 *       200:
 *         description: List of notification devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotificationDevice'
 *   post:
 *     summary: Create a new notification device
 *     tags: [Notification Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationDevice'
 *     responses:
 *       201:
 *         description: Notification device created
 *
 * /notification_devices/{id}:
 *   get:
 *     summary: Get a notification device by ID
 *     tags: [Notification Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification device data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationDevice'
 *   put:
 *     summary: Update a notification device
 *     tags: [Notification Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationDevice'
 *     responses:
 *       200:
 *         description: Notification device updated
 *   delete:
 *     summary: Delete a notification device
 *     tags: [Notification Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Notification device deleted
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
 *                 $ref: '#/components/schemas/Ticket'
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created
 *
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
 *     responses:
 *       200:
 *         description: Ticket data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket updated
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ticket deleted
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
 *   post:
 *     summary: Create a new ticket type
 *     tags: [Ticket Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketType'
 *     responses:
 *       201:
 *         description: Ticket type created
 *
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
 *     responses:
 *       200:
 *         description: Ticket type data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *   put:
 *     summary: Update a ticket type
 *     tags: [Ticket Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketType'
 *     responses:
 *       200:
 *         description: Ticket type updated
 *   delete:
 *     summary: Delete a ticket type
 *     tags: [Ticket Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ticket type deleted
 */

/**
 * @swagger
 * /user_tickets:
 *   get:
 *     summary: Get all user tickets
 *     tags: [User Tickets]
 *     responses:
 *       200:
 *         description: List of user tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserTicket'
 *   post:
 *     summary: Create a new user ticket
 *     tags: [User Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTicket'
 *     responses:
 *       201:
 *         description: User ticket created
 *
 * /user_tickets/{id}:
 *   get:
 *     summary: Get a user ticket by ID
 *     tags: [User Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User ticket data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTicket'
 *   put:
 *     summary: Update a user ticket
 *     tags: [User Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTicket'
 *     responses:
 *       200:
 *         description: User ticket updated
 *   delete:
 *     summary: Delete a user ticket
 *     tags: [User Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User ticket deleted
 */

/**
 * @swagger
 * /ticket_type_connections:
 *   get:
 *     summary: Get all ticket type connections
 *     tags: [Ticket Type Connections]
 *     responses:
 *       200:
 *         description: List of ticket type connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketTypeConnection'
 *   post:
 *     summary: Create a new ticket type connection
 *     tags: [Ticket Type Connections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketTypeConnection'
 *     responses:
 *       201:
 *         description: Ticket type connection created
 *
 * /ticket_type_connections/{id}:
 *   get:
 *     summary: Get a ticket type connection by ID
 *     tags: [Ticket Type Connections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket type connection data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketTypeConnection'
 *   put:
 *     summary: Update a ticket type connection
 *     tags: [Ticket Type Connections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketTypeConnection'
 *     responses:
 *       200:
 *         description: Ticket type connection updated
 *   delete:
 *     summary: Delete a ticket type connection
 *     tags: [Ticket Type Connections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ticket type connection deleted
 */

/**
 * @swagger
 * /user_favorite_teams:
 *   get:
 *     summary: Get all user favorite teams
 *     tags: [User Favorite Teams]
 *     responses:
 *       200:
 *         description: List of user favorite teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserFavoriteTeam'
 *   post:
 *     summary: Create a new user favorite team
 *     tags: [User Favorite Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserFavoriteTeam'
 *     responses:
 *       201:
 *         description: User favorite team created
 *
 * /user_favorite_teams/{id}:
 *   get:
 *     summary: Get a user favorite team by ID
 *     tags: [User Favorite Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User favorite team data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFavoriteTeam'
 *   put:
 *     summary: Update a user favorite team
 *     tags: [User Favorite Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserFavoriteTeam'
 *     responses:
 *       200:
 *         description: User favorite team updated
 *   delete:
 *     summary: Delete a user favorite team
 *     tags: [User Favorite Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User favorite team deleted
 */
