const mongoose = require("mongoose");
const { Schema } = mongoose;

const ORDER_STATUSES = [
  "pending",
  "confirmed", 
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
        itemId: {
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
          type: Number,
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
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: { type: Date, default: null },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "cancelled"],
    },

    paymentMethod: {
      type: String,
      enum: ["card", "transfer"],
      default: "card"
    },

    paymentReference: {
      type: String,
    },

    paymentAccessCode: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Order", orderSchema, "orders");
