'use strict';

module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        // 'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:node/recommended',
    ],
    env: {
        node: true,
    },
    rules: {
        'node/no-unpublished-require': 'off',
        'require-atomic-updates': 'off',
        'no-process-exit': 'off',
        strict: ['error', 'global'],
        'no-return-await': 'error',
        'object-shorthand': [
            'error',
            'always',
            { avoidExplicitReturnArrows: true },
        ],
        'import/order': 'error',
        'import/no-cycle': 'error',
        'import/no-useless-path-segments': 'error',
        'import/first': 'error',
        'import/extensions': ['error', 'never'],
        'import/newline-after-import': 'error',
        'node/exports-style': ['error', 'module.exports'],
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-callback-literal': 'error',
        'node/handle-callback-err': 'error',
        'one-var': ['error', 'never'],
    },
};
