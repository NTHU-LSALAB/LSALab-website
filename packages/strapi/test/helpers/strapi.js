'use strict';

const _ = require('lodash');
const Strapi = require('@strapi/strapi');

let instance;

const waitForServer = () =>
    new Promise((resolve) => {
        const { host, port } = strapi.config.get('server');
        resolve(strapi.server.listen(port, host));
    });

/**
 * Setups strapi for futher testing
 */
async function setupStrapi() {
    if (!instance) {
        /** the follwing code in copied from `./node_modules/strapi/lib/Strapi.js` */
        await Strapi().load();
        await waitForServer();

        instance = strapi; // strapi is global now
    }
    return instance;
}

async function stopStrapi() {
    if (instance) {
        strapi.db.query('api::journal.journal').deleteMany();

        instance.destroy();
    }
    return instance;
}

const grantPrivilege = async (
    roleID = 1,
    path,
    enabled = true,
    policy = '',
) => {
    const service = strapi.plugin('users-permissions').service('role');

    const role = await service.getRole(roleID);

    _.set(role.permissions, path, { enabled, policy });

    return service.updateRole(roleID, role);
};

/** Updates database `permissions` that role can access an endpoint
 * @see grantPrivilege
 */

const grantPrivileges = async (roleID = 1, values = []) => {
    await Promise.all(values.map((val) => grantPrivilege(roleID, val)));
};

module.exports = { setupStrapi, stopStrapi, grantPrivilege, grantPrivileges };
