const usersCollection = require("../DB/Models/user.model");
const bcrypt = require("bcryptjs");
const hashRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken")


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


const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const existingUser = await usersCollection
      .findOne({ email })
      .select("+password");

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const pwdsMatch = await bcrypt.compare(password, existingUser.password);

    if (!pwdsMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const user = existingUser.toJSON();

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ success: false, message: "An error ossured" });
  }
};

module.exports = { addNewUser, getAllUsers, loginUser };
