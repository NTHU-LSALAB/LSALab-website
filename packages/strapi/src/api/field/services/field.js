'use strict';

/**
 * field service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::field.field');
