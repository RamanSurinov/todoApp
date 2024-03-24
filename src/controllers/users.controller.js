const usersService = require('../services/users.service')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

class Users {


    async login(req, res) {

        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {

            req.loginData = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await usersService.login(req, res);

            if (token) res.status(200).send(token)

        } else {
            res
                .status(400)
                .send({
                    errors: validationErrors.array()
                });
        }
    }

    async registration(req, res) {

        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {
            try {

                const saltRounds = 10;

                req.userBody = {
                    id: uuidv4(),
                    email: req.body.email,
                    name: req.body.name,
                    password: await bcrypt.hash(req.body.password, saltRounds)
                }

                const results = await usersService.registration(req, res)

                if (results) res.status(201).send({ message: "user created" });

            } catch (err) {

                res.status(400).send(err.message);
                return
            }
        } else {
            res
                .status(400)
                .send({
                    errors: validationErrors.array()
                });
        }
    }



}

module.exports = new Users();