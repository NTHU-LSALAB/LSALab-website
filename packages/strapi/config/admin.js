'use strict';

module.exports = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'b616b5ceeecfbab5d145d99a5a6ff1b5'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
});
