'use strict';

/**
 *  journal controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::journal.journal');
