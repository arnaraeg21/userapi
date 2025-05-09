// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User API for Stubb',
    version: '1.0.0',
    description: 'API documentation for the User API.',
  },
  servers: [
    {
      url: 'http://gosar.is:3171',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./swaggerRoutes.js'], // Path to the API routes (adjust if different)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
