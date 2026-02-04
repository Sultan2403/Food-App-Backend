const { Joi } = require("celebrate");

const RESTAURANT_TYPES = [
  "fast_food",
  "fine_dining",
  "cafe",
  "bakery",
  "street_food",
];

const restaurantSchema = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().lowercase().required(),

  address: Joi.string().trim().required(),

  password: Joi.string().min(8).required(),

  type: Joi.array()
    .items(Joi.string().valid(...RESTAURANT_TYPES))
    .min(1)
    .required(),
})
  .required()
  .options({ stripUnknown: true });

module.exports = { restaurantSchema };
