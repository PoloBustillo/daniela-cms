"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (ctx) => {
    // const id = ctx.params.id;
    const { id } = ctx.params;
    return id;
  },
};
