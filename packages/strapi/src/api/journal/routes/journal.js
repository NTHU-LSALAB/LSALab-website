'use strict';

/**
 * journal router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::journal.journal');
