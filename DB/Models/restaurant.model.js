const mongoose = require("mongoose");
const { Schema } = mongoose;

const RESTAURANT_TYPES = [
  "fast_food",
  "fine_dining",
  "cafe",
  "bakery",
  "street_food",
];

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    type: {
      type: [String],
      enum: RESTAURANT_TYPES,
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one restaurant type is required",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurants");
