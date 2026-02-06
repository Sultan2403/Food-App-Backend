const mongoose = require("mongoose");
const { Joi } = require("celebrate");

const mongooseId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "Mongoose ObjectId validation");

const orderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        itemId: mongooseId.required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
})
  .required()
  .options({ stripUnknown: true });

module.exports = orderSchema;
