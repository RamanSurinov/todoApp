const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')

router.get('/', todoController.getTodo);

router.post('/', todoController.createTodo);

router.patch('/:id', todoController.changeTaskField);

router.patch('/:id/isComplited', todoController.changeTaskField);

router.delete('/:id', todoController.deleteTask);

module.exports = router;