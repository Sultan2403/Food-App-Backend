const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const { createNewOrder } = require("../Controllers/orders.controller");
const { orderSchema } = require("../Schemas/orders.schema");
const userAuthMiddleware = require("../Middlewares/Auth/user.auth");

router.post(
  "/",
  [userAuthMiddleware, celebrate({ body: orderSchema })],
  createNewOrder,
);

module.exports = router;
