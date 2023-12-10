const todoService = require('../services/todo.service');

class todoController {

    async getTodo(res, req) {
        const result = await todoService.getAllTodo()
        req.send({ data: result })
    }

    async createTodo(req, res) {

        const {
            title
        } = req.body;

        const taskBody = {
            title: title,
            isComplited: false
        }

        const newBody = await todoService.createTodo(taskBody);

        if (newBody) {
            res.status(201).send({
                result: 'task created',
                newBody
            })
        } else {
            res.status(400).send('error')
        }
    }

    async changeTaskField(req, res) {

        const reqPath = req.path;
        const taskId = req.params.id;
        const newField = req.body;

        const result = await todoService.changeTaskField(reqPath, taskId, newField);

        if (result) {
            res.send({
                result
            })
        } else {
            res.status(400).send('error');
        }
    }

    async deleteTask(req, res) {
        const taskId = req.params.id;
        const result = await todoService.deleteTask(taskId)
        if (result) {
            res.send({
                result
            })
        } else {
            res.status(400).send('error');
        }
    }
}

module.exports = new todoController()