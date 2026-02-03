const restaurantCollection = require("../DB/Models/restaurant.schema");
const mongoose = require("mongoose");

const addNewRestaurant = async (req, res) => {
  try {
    const created = await restaurantCollection.create(req.body);
    res.status(201).json({ success: true, created });
  } catch (err) {
    console.err(err);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantCollection.find();
    res.status(200).json({ success: true, restaurants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

module.exports = { addNewRestaurant, getAllRestaurants };
