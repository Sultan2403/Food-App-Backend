const { Joi } = require("celebrate");
const mongoose = require("mongoose");

// reusable ObjectId validator
const objectId = Joi.string()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Invalid ID",
  });

const itemSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),

  restaurantId: objectId.required(),

  quantity: Joi.number().integer().min(1).required(),

  price: Joi.number().integer().min(1).required()
})
  .strict()
  .required()
  .options({ stripUnknown: true }); // disallow extra fields

module.exports = itemSchema;
