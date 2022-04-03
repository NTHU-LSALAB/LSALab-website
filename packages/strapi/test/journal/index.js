'use strict';

const request = require('supertest');
const { grantPrivileges } = require('../helpers/strapi');
const { createJournal } = require('./factory');

beforeAll(async () => {
    await grantPrivileges(2, ['api::journal.controllers.journal.find']);
});

describe('Default Journal methods', () => {
    let journal;

    beforeAll(async () => {
        journal = await createJournal();
    });

    it('should return journal', async () => {
        await request(strapi.server.httpServer) // app server is and instance of Class: http.Server
            .get('/api/journals')
            .set('accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(
                ({
                    body: {
                        data: [data],
                    },
                }) => {
                    expect(data).toBeDefined();
                    expect(data.id).toBe(journal.id);
                    expect(data.attributes.type).toBe(journal.type);
                    expect(data.attributes.title).toBe(journal.title);
                    expect(data.attributes.link).toBe(journal.link);
                    expect(data.attributes.deadline).toBe(journal.deadline);
                    expect(data.attributes.ranking).toBe(journal.ranking);
                },
            )
            .catch(console.error);
    });
});
