const express = require("express");
const router = express.Router();
const { addNewUser, getAllUsers } = require("../Controllers/users.controller");
const { celebrate } = require("celebrate");
const userSchema = require("../Schemas/user.schema");

router.get("/", getAllUsers);
router.post("/", celebrate({ body: userSchema }), addNewUser);

module.exports = router;
