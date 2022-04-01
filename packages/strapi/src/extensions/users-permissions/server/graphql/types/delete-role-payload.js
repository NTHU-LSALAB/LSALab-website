'use strict';

module.exports = ({ nexus }) =>
    nexus.objectType({
        name: 'UsersPermissionsDeleteRolePayload',

        definition(t) {
            t.nonNull.boolean('ok');
        },
    });
