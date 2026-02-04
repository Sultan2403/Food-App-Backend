const mongoose = require("mongoose");
const { Schema } = mongoose;

const ORDER_STATUSES = [
  "pending", // created, not yet confirmed
  "confirmed", // accepted / locked
  "preparing",
  "ready",
  "picked_up",
  "delivered",
  "cancelled",
];

const orderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number, // snapshot at order time
          required: true,
          min: 0,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending",
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Order", orderSchema, "orders");
