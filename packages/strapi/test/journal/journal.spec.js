'use strict';

const request = require('supertest');
const { setupStrapi, stopStrapi } = require('../helpers/strapi');
const { createJournal } = require('./factory');

/** this code is called once before any test */
beforeAll(async () => {
    await setupStrapi();
});
/** this code is called after all the tests are finished */
afterAll(async () => {
    await stopStrapi();
});

describe('Default Journal methods', () => {
    let journal;

    beforeAll(async () => {
        journal = await createJournal();
    });

    it('should return journal', async () => {
        console.log(journal);

        await request(strapi.server.httpServer) // app server is and instance of Class: http.Server
            .get('/api/journals')
            .set('accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body).toBeDefined();
                console.log(data.body);
                // expect(data.body.type).toBe(journal.type);
                // expect(data.body.title).toBe(journal.title);
                // expect(data.body.link).toBe(journal.link);
                // expect(data.body.deadline).toBe(journal.deadline);
                // expect(data.body.ranking).toBe(journal.ranking);
            })
            .catch(console.error);
    });
});
