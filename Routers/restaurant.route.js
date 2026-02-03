const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const { restaurantSchema } = require("../Schemas/restaurant.schema");
const {
  addNewRestaurant,
  getAllRestaurants,
} = require("../Controllers/restaurants.controller");

router.get("/", getAllRestaurants);
router.post("/", celebrate({ body: restaurantSchema }), addNewRestaurant);

module.exports = router;
