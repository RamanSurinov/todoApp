const express = require('express');
const routes = require('./src/routes/index');

require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3010;

app.use('/', routes);

app.listen(port, () => {
    console.log(`server start on ${port}`)
})



