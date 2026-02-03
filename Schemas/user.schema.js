const { Joi } = require("celebrate");

const name = Joi.string()
  .trim()
  .min(3)
  .max(100)
  .pattern(/^[\p{L}\p{M}'\.\-\s]+$/u)
  .required()
  .messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.pattern.base": "Name contains invalid characters",
  });

const email = Joi.string()
  .trim()
  .lowercase()
  .email()
  .required()
  .messages({ "string.email": "Email must be a valid email address" });

const password = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 128 characters",
    "string.pattern.base":
      "Password must include upper, lower, number and special character",
  });

const userSchema = Joi.object({
  name: name,
  email: email,
  password: password,
}).options({ stripUnknown: true });

module.exports =  userSchema ;
