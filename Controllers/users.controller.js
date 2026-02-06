const usersCollection = require("../DB/Models/user.model");
const bcrypt = require("bcryptjs");
const hashRounds = 10

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
  const { email, password, ...extras } = req.body;

  try {
    const userExists = await usersCollection.findOne({ email });

    if (userExists) {
      return res
        .status(403)
        .json({ success: false, message: "User already exists." });
    }

    const hashedPwd = await bcrypt.hash(password, hashRounds);
    await usersCollection.create({
      email,
      password: hashedPwd,
      extras,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

module.exports = { addNewUser, getAllUsers };
