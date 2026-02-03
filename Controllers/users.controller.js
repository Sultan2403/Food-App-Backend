const usersCollection = require("../DB/Models/user.schema");
const mongoose = require("mongoose");

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
  const { name, email, password } = req.body;

  try {
    const userExists = await usersCollection.findOne({ email: email });

    if (userExists) {
      return res
        .status(403)
        .json({ success: false, message: "User already exists." });
    }
    const created = await usersCollection.create({
      name,
      email,
      password,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully", created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

module.exports = { addNewUser, getAllUsers };
