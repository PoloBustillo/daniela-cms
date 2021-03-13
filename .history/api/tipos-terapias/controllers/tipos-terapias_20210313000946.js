"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOneByName: async (ctx) => {
    // const id = ctx.params.id;
    const { name } = ctx.params;
    const terapia = await strapi
      .query("tipos-terapias")
      .findOne({ Nombre: name });

    return terapia;
  },
};
