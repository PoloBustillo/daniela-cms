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
    async beforeUpdate(params, data) {
      const terapias = await strapi
        .query("tipos-terapias")
        .findOne({ _id: params._id });

      //publicar por primera vez
      if (data.published_at && !data.Nombre) {
        if (!terapias.area) {
          const err = new Error("Area no puede quedar vacio");
          const boomError = Boom.boomify(err, {
            statusCode: 422,
          });
          throw boomError;
        }
      }

      //ya esta publicado y guardara nuevos cambios
      if (data.Nombre && terapias.published_at) {
        if (!data.area) {
          const err = new Error("Area no puede quedar vacio");
          const boomError = Boom.boomify(err, {
            statusCode: 422,
          });
          throw boomError;
        }
      }
    },
  },
};
