const request = require('supertest');
const app = require('../index');


describe('POST /auth/registration', () => {
    test('should return 201 status code', async () => {

        const user = {
            email: "adminadmin@mail.com",
            password: "admin123123",
            name: "admin"
        };

        const response = await request(app).post('/auth/registration').send(user);

        expect(response.statusCode).toBe(201);
    });

    test('should return 200 status code', async () => {

        const user = {
            email: "adminadmin@mail.com",
            password: "admin123123",
        };

        const response = await request(app).post('/auth/login').send(user);

        expect(response.statusCode).toBe(200);
        expect(response.body)
    });

});

