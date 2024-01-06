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


    async login(loginData) {
        try {
            const allUsers = await this.getAllUsers();

            const existingUser = allUsers.find(user => user.email === loginData.email);

            if (!existingUser) {
                return false;
                //   return res.status(401).json({ message: "Неверный email или пароль" });
            }

            const isPasswordValid = await bcrypt.compare(
                loginData.password,
                existingUser.password
            );

            if (!isPasswordValid) {
                return false
                //res.status(401).json({ message: "Неверный email или пароль" });
            }

            const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            })

            return token;

        } catch (err) {

            console.log(err);

        }
    }

    async registration(userBody) {
        try {
            const allUsers = await this.getAllUsers();

            const existingUser = allUsers.find(user => user.email === userBody.email);

            if (existingUser) {
                return false
            }

            allUsers.push(userBody);

            const result = await fsPromises.writeFile(
                path.join(__dirname, 'usersFile.json'),
                JSON.stringify(allUsers)
            );

            console.log(result)

            return true;

        } catch (err) {

            console.log(err);

        }
    }










}


module.exports = new UsersService