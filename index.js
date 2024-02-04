const express = require('express');
const routes = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerSpec')

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use('/', routes);

module.exports = app;


