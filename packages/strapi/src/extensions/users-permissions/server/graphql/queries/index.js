'use strict';

const me = require('./me');

module.exports = ({ nexus }) =>
    nexus.extendType({
        type: 'Query',

        definition(t) {
            t.field('me', me({ nexus }));
        },
    });
