const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { body } = require('express-validator');

const validationLoginBody = [
    body('email')
        .notEmpty()
        .withMessage('email should not be empty')
        .bail()
        .isEmail()
        .withMessage('incorrect email'),
    body('password')
        .notEmpty()
        .withMessage('password should not be empty')
        .bail()
        .isLength({
            min: 5
        })
        .withMessage('incorrect password'),
];

const validationRegistrationBody = [
    body('email')
        .notEmpty()
        .withMessage('email should not be empty')
        .bail()
        .isEmail()
        .withMessage('incorrect email'),
    body('password')
        .notEmpty()
        .withMessage('password should not be empty')
        .bail()
        .isLength({
            min: 5
        })
        .withMessage('incorrect password'),
    body('name')
        .notEmpty()
        .withMessage('name should not be empty')
        .bail()
        .isAlpha('en-US')
        .withMessage('incorrect name')
        .bail()
        .isLength({
            min: 3,
            max: 20
        })
        .withMessage('incorrect length')
];


/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: login
 *      description: login
 *      tags:
 *        - Auth
 *      requestBody:
 *        $ref: "#/components/requestBodies/User"
 *      responses:
 *        200:
 *          description: successful login
 * components:
 *   requestBodies:
 *     User:
 *       description: login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example4@mail.com
 *                 description: email
 *               password:
 *                 type: string
 *                 example: 123123123
 *                 description: pass
 */

router.post('/login', validationLoginBody, usersController.login);

/**
 * @swagger
 * /auth/registration:
 *    post:
 *      summary: registration
 *      description: registration
 *      tags:
 *        - Auth
 *      requestBody:
 *        $ref: "#/components/requestBodies/User"
 *      responses:
 *        200:
 *          description: successful registration
 * components:
 *   requestBodies:
 *     User:
 *       description: registration.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example4@mail.com
 *                 description: email
 *               password:
 *                 type: string
 *                 example: 123123123
 *                 description: pass
 *               name:
 *                 type: string
 *                 example: asdasd
 *                 description: name
 */

router.post('/registration', validationRegistrationBody, usersController.registration);

module.exports = router; 