const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')
const { body } = require('express-validator');


// const validationTaskBody = [
//     body('title')
//         .notEmpty(),
// ]


/**
 * @swagger
 * /todo:
 *   get:
 *     summary: get all task
 *     description: get all task 
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Массив тасок
 * 
 */

router.get('/', todoController.getTodo);

/**
 * @swagger
 * /todo:
 *    post:
 *      summary: create task
 *      description: description
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: [] 
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      responses:
 *        200:
 *          description: description
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Закрыть 3-й чек-лист
 *                 description: Название таски
 */

router.post('/', todoController.createTodo);

/**
 * @swagger
 * /todo/{id}:
 *   patch:
 *     summary: Частичное обновление таски
 *     description: Обновляет часть данных таски по его ID. Уникальным идентификатором таски является поле taskCreationDate
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор таски.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 */

router.patch('/:id', todoController.changeTaskField);

/**
 * @swagger
 * /todo/{id}/isComplited:
 *   patch:
 *     summary: Частичное обновление таски
 *     description: Обновляет поле таски title, а так же меняет поле isComplited
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор таски.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 */

router.patch('/:id/isComplited', todoController.changeTaskField);

/**
 * @swagger
 * /todo/{id}:
 *    delete:
 *      summary: Удалить таску
 *      description: удаляет таску по id
 *      tags:
 *        - Todos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Успешное удаление таски
 *        404:
 *          description: Таска с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete('/:id', todoController.deleteTask);

module.exports = router;