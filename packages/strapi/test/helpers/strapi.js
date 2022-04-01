'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const Strapi = require('@strapi/strapi');

let instance;

async function setupStrapi() {
    if (!instance) {
        /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
        await Strapi().load();
        instance = strapi; // strapi is global now
        await instance.app
            .use(instance.router.routes()) // populate KOA routes
            .use(instance.router.allowedMethods()); // populate KOA methods

        instance.server = http.createServer(instance.app.callback());
    }
    return instance;
}

async function stopStrapi() {
    const dbSettings = strapi.config.get(
        'database.connections.default.settings',
    );

    // close server to release the db-file
    await strapi.server.close();

    // delete test database after all tests
    if (dbSettings && dbSettings.filename) {
        const tmpDbFile = path.join(__dirname, '..', dbSettings.filename);
        if (fs.existsSync(tmpDbFile)) {
            fs.unlinkSync(tmpDbFile);
        }
    }
}
module.exports = { setupStrapi, stopStrapi };
