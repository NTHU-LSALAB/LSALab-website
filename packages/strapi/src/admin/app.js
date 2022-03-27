'use strict';

const AuthLogo = require('./extensions/logo.png');
const favicon = require('./extensions/favicon.ico');

module.exports = {
    config: {
        auth: {
            logo: AuthLogo,
        },
        head: {
            favicon,
        },
        menu: {
            logo: AuthLogo,
        },
        tutorials: false,
        locales: ['zh-Hans', 'zh'],
    },
    bootstrap() {},
};
