const fsPromises = require('node:fs/promises');
const path = require('path');


class TodoService {


    async #getAllTodo() {
        try {
            const data = await fsPromises.readFile(
                path.join(__dirname, 'todoFile.json'),
                { encoding: 'utf-8' }
            )

            const parsingData = JSON.parse(data)

            return parsingData

        } catch (err) {
            console.log(err)
        }

    }

    async getAllTodoByUserId(id) {
        try {

            const parsingData = await this.#getAllTodo()

            const filtredByUserIdData = parsingData.filter(task => task.userId.id === id)

            return filtredByUserIdData

        } catch (err) {
            console.log(err)
        }
    }

    async createTodo(taskBody) {
        try {
            const allTodo = await this.#getAllTodo();

            taskBody.taskCreationDate = Date.now();

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

    async changeTaskField(reqPath, taskId, newField, id) {
        try {

            const allTodo = await this.#getAllTodo();

            const findTask = allTodo.findIndex((item) => {

                return Number(taskId) === item.taskCreationDate

            })

            if (allTodo[findTask]) {

                const { title: newTitle } = newField;
                const newIsComplited = reqPath.includes('isComplited');

                newTitle ? allTodo[findTask].title = newTitle : null; // говнокод
                newIsComplited ? allTodo[findTask].isComplited = !allTodo[findTask].isComplited : null;// говнокод

                fsPromises.writeFile(
                    path.join(__dirname, 'todoFile.json'),
                    JSON.stringify(allTodo),
                );

                return allTodo[findTask]
            }

            return false

        } catch (err) {
            console.log(err)
        }
    }

    async deleteTask(taskId) {
        try {
            const allTodo = await this.#getAllTodo();
            const findTask = allTodo.findIndex(item => Number(taskId) === item.taskCreationDate)

            if (allTodo[findTask]) {

                allTodo.splice(findTask, 1)

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