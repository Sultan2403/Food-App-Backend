const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const itemSchema = require("../Schemas/items.schema");
const createNewItem = require("../Controllers/items.controller");
const { uploadSingleImage } = require("../Middlewares/Multer/multer.middleware");

router.post("/", [celebrate({ body: itemSchema }), uploadSingleImage], createNewItem);

module.exports = router;
