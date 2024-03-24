const fsPromises = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersService {

    async getAllUsers() {
        try {
            const allUsers = await fsPromises.readFile(
                path.join(__dirname, 'usersFile.json'),
                { encoding: 'utf-8' }
            )
            return JSON.parse(allUsers);
        } catch (err) {
            console.log(err);
        }
    }

    async findOneUser(email) {

    }


    async login(req, res) {
        try {
            const allUsers = await this.getAllUsers();

            console.log(req.loginData)

            const existingUser = allUsers.find(user => user.email === req.loginData.email);

            if (!existingUser) {
                res.status(400).json({ message: "Неверный email или пароль" });
                return
            }

            const isPasswordValid = await bcrypt.compare(
                req.loginData.password,
                existingUser.password
            );

            if (!isPasswordValid) {
                res.status(400).json({ message: "Неверный email или пароль" });
                return
            }

            const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            })

            return token;

        } catch (err) {

            console.log(err);

        }
    }

    async registration(req, res) {
        try {
            const allUsers = await this.getAllUsers();

            const existingUser = allUsers.find(user => user.email === req.userBody.email);

            console.log(existingUser)

            if (existingUser) {
                res.status(400).json({ message: "Неверный email или пароль" });
                return
            }

            allUsers.push(req.userBody);

            await fsPromises.writeFile(
                path.join(__dirname, 'usersFile.json'),
                JSON.stringify(allUsers)
            );

            return true

        } catch (err) {

            console.log(err)

        }
    }










}


module.exports = new UsersService