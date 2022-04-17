'use strict';

module.exports = ({ env }) => ({
    'jwt-secret': env('JWT_SECRET', 'your-test-secret'),
});
