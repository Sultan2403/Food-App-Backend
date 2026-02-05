const restaurantCollection = require("../DB/Models/restaurant.model");
const hashRounds = Number(process.env.HASHING_ROUNDS);

const addNewRestaurant = async (req, res) => {
  const { email, password, ...extras } = req.body;
  try {
    const existing = await restaurantCollection.findOne({ email: email });

    if (existing) {
      return res
        .status(403)
        .json({ success: false, message: "Restaurant exists already" });
    }

    const hashedPwd = await bcrypt.hash(password, hashRounds );
    const finalData = { password: hashedPwd, email, ...extras };
    await restaurantCollection.create(finalData);

    res
      .status(201)
      .json({ success: true, message: "Restaurant created successfully" });
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
