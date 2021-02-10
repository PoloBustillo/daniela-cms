"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const Boom = require("boom");

module.exports = {
  lifecycles: {
    // Called before an entry is created
    async beforeCreate(data) {},
    // Called after an entry is created
    async afterCreate(result) {},
    async beforeUpdate(params, data) {},
  },
};
