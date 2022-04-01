'use strict';

module.exports = ({ nexus }) =>
    nexus.objectType({
        name: 'UsersPermissionsUpdateRolePayload',

        definition(t) {
            t.nonNull.boolean('ok');
        },
    });
