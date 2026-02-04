const { Joi } = require("celebrate");

const orderSchema = Joi.object({
  buyer: Joi.string().required(),
}).required().options({ stripUnknown: true });
