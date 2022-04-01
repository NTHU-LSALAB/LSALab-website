'use strict';

module.exports = ({ nexus }) =>
    nexus.inputObjectType({
        name: 'UsersPermissionsRegisterInput',

        definition(t) {
            t.nonNull.string('username');
            t.nonNull.string('email');
            t.nonNull.string('password');
        },
    });
