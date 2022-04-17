'use strict';
const crypto = require('crypto');

module.exports = ({ env }) => ({
    apiToken: {
        salt: env('API_TOKEN_SALT', crypto.randomBytes(16).toString('base64')),
    },
});
