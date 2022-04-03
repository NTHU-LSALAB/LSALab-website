'use strict';

module.exports = ({ nexus }) =>
    nexus.objectType({
        name: 'UsersPermissionsLoginPayload',

        definition(t) {
            t.string('jwt');
            t.nonNull.field('user', { type: 'UsersPermissionsMe' });
        },
    });
