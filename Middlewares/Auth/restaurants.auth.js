const restaurantCollection = require("../../DB/Models/restaurant.model");

const isRestaurantOwner = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const restaurant = await restaurantCollection.findOne({ owner });

    if (!restaurant) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "An error occured" });
  }
};

module.exports = isRestaurantOwner;
