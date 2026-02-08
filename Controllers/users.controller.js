const usersCollection = require("../DB/Models/user.model");
const bcrypt = require("bcryptjs");
const hashRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await usersCollection.find();
    return res.status(200).json({ success: true, message: "Success", users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "An error occured" });
  }
};

const addNewUser = async (req, res) => {
  const { password, ...extras } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, hashRounds);
    const user = await usersCollection.create({
      password: hashedPwd,
      extras,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error(error, error.message);
     if (error.code === 11000) {
      return res
        .status(401)
        .json({ success: false, message: "User already registered" });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

module.exports = { addNewUser, getAllUsers };
