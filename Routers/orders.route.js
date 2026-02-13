const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const { createNewOrder } = require("../Controllers/orders.controller");
const { orderSchema } = require("../Schemas/orders.schema");
const authMiddleware = require("../Middlewares/user.auth");

router.post(
  "/",
  [authMiddleware, celebrate({ body: orderSchema })],
  createNewOrder,
);

module.exports = router;
