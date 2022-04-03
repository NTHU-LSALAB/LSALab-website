'use strict';

module.exports = ({ nexus }) =>
    nexus.objectType({
        name: 'UsersPermissionsCreateRolePayload',

        definition(t) {
            t.nonNull.boolean('ok');
        },
    });
