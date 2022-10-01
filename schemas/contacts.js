const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .required(),

  phone: Joi.string()
    .required(),
  
  favorite: Joi.boolean()
});

module.exports = bodySchema;