const express = require("express");
const router = express.Router();
const { registerUser, getAllUsers, loginUser } = require("../Controllers/users.controller");
const { celebrate } = require("celebrate");
const { registerSchema, loginSchema } = require("../Schemas/user.schema");

router.get("/", getAllUsers);
router.post("/register", celebrate({ body: registerSchema }), registerUser);
router.post("/login", celebrate({ body: loginSchema }), loginUser);

module.exports = router;
