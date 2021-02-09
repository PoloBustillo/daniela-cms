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
      console.log(data);
      if (data.published_at && !data.Nombre) {
        const terapias = await strapi
          .query("tipos-terapias")
          .findOne({ _id: params._id });

        if (!terapias.areas || terapias.areas.length < 1) {
          const err = new Error("Area no puede quedar vacio");
          const boomError = Boom.boomify(err, {
            statusCode: 422,
          });
          throw boomError;
        }
      } else if (!data.published_at && data.Nombre) {
        if (!data.areas || data.areas.length < 1) {
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
