const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "Uploads"),
  filename: (req, file, callback) => {
    const uniqueSuffix = uuidv4(); // Generates a rand string
    const fileExtension = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}-${fileExtension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Image type not allowed"), false);
    } else {
      return callback(null, true);
    }
  },
});

const uploadSingleImage = upload.single("imageCover");
const uploadMultipleImages = upload.array("image", 3);

module.exports = { uploadSingleImage, uploadMultipleImages };
