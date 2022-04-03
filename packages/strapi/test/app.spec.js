'use strict';

const { setupStrapi, stopStrapi } = require('./helpers/strapi');

jest.setTimeout(15000);

/** this code is called once before any test */
beforeAll(async () => {
    await setupStrapi();
});
/** this code is called after all the tests are finished */
afterAll(async () => {
    await stopStrapi();
});

it('strapi is defined', () => {
    expect(strapi).toBeDefined();
});

require('./journal');
