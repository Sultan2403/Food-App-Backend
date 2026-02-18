const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const itemSchema = require("../Schemas/items.schema");
const createNewItem = require("../Controllers/items.controller");
const {
  uploadSingleImage,
} = require("../Middlewares/Media/multer.middleware");

router.post(
  "/",
  [uploadSingleImage, celebrate({ body: itemSchema })],
  createNewItem,
);

module.exports = router;
