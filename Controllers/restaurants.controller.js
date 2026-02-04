const restaurantCollection = require("../DB/Models/restaurant.schema");
const mongoose = require("mongoose");

const addNewRestaurant = async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await restaurantCollection.findOne({ email: email });

    if (existing)
      return res
        .status(403)
        .json({ success: false, message: "Restaurant exists already" });
    const created = await restaurantCollection.create(req.body);
    res.status(201).json({ success: true, created });
  } catch (err) {
    console.error(err);
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
