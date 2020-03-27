const request = require('supertest');
const connection = require('./../../src/database/connection');
const app = require('./../../src/app');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAD2",
            email: "contato@apad.br",
            whatsapp: "61000000000",
            city: "Brasília",
            uf: "DF"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    afterAll(async () => {
        await connection.destroy();
    });
});