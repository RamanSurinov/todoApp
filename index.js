const express = require('express');
const routes = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerSpec')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use('/', routes);

app.listen(port, () => {
    console.log(`server start on ${port}`)
})



