const usersService = require('../services/users.service')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


class Users {

    async login(req, res) {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        }

        const token = await usersService.login(loginData);

        if (token) {
            res.send(token)
        } else {
            res
                .status(400)
                .json({ message: "error" });
        }
    }

    async registration(req, res) {

        const saltRounds = 10;

        const userBody = {
            id: uuidv4(),
            email: req.body.email,
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, 10)
        }

        const results = await usersService.registration(userBody)

        if (results) {
            res
                .status(201)
                .json({ message: "user created" });
        } else {
            res
                .status(400)
                .json({ message: "The user's email address already exists" });
        }
    }





}

module.exports = new Users();