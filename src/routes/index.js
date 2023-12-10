const express = require('express');
const router = express.Router();

const todoRouters = require('./todo.routes');

router.use('/todo', todoRouters);

module.exports = router;