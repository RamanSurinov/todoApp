const express = require('express');
const router = express.Router();
const authenticateToken = require('../helpers/authenticate');

const usersRoutes = require('./users.routes');
const todoRouters = require('./todo.routes');

router.use('/auth', usersRoutes);
router.use('/todo', authenticateToken, todoRouters);

module.exports = router;