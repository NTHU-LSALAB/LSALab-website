'use strict';

module.exports = ({ nexus }) =>
    nexus.objectType({
        name: 'UsersPermissionsPasswordPayload',

        definition(t) {
            t.nonNull.boolean('ok');
        },
    });
