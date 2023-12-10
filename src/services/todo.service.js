const fsPromises = require('node:fs/promises');
const path = require('path');


class TodoService {

    async getAllTodo() {
        try {
            const data = await fsPromises.readFile(
                path.join(__dirname, 'todoFile.json'),
                { encoding: 'utf-8' }
            )
            return JSON.parse(data);
        } catch (err) {
            console.log(err)
        }
    }

    async createTodo(taskBody) {
        try {
            const allTodo = await this.getAllTodo();

            taskBody.id = allTodo.length;
            taskBody.idUser = allTodo.length;
            taskBody.taskCreationDate = Date.now();

            if (taskBody.id === allTodo.id) return false

            allTodo.push(taskBody);

            fsPromises.writeFile(
                path.join(__dirname, 'todoFile.json'),
                JSON.stringify(allTodo),
            );

            return taskBody;

        } catch (err) {
            console.log(err)
        }
    }

    async changeTaskField(reqPath, taskId, newField) {
        try {

            const allTodo = await this.getAllTodo();

            if (allTodo[taskId]) {

                const { title: newTitle } = newField;
                const newIsComplited = reqPath.includes('isComplited');

                newTitle ? allTodo[taskId].title = newTitle : null;
                newIsComplited ? allTodo[taskId].isComplited = !allTodo[taskId].isComplited : null;

                fsPromises.writeFile(
                    path.join(__dirname, 'todoFile.json'),
                    JSON.stringify(allTodo),
                );
                return allTodo[taskId]
            }
            return false
        } catch (err) {
            console.log(err)
        }
    }

    async deleteTask(taskId) {
        try {
            const allTodo = await this.getAllTodo();

            if (allTodo[taskId]) {

                allTodo.splice(taskId, 1)

                fsPromises.writeFile(
                    path.join(__dirname, 'todoFile.json'),
                    JSON.stringify(allTodo),
                );
                return true
            }
            return false
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new TodoService