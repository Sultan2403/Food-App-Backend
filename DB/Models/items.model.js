const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      trim: true,
      required: true,
      validate: {
        validator: async function (id) {
          const exists = await mongoose.model("Restaurant").exists({ _id: id });
          return Boolean(exists);
        },
        message: "Restaurant does not exist",
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Item", itemSchema, "items");
