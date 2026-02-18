const itemsCollection = require("../DB/Models/items.model");

const createNewItem = async (req, res) => {
  try {
    const itemInfo = req.body;
    const imageUrl = req.file?.filename || null;
    const item = await itemsCollection.create({ ...itemInfo, imageUrl });

    res
      .status(201)
      .json({ success: true, item, message: "Item created successfully" });
  } catch (error) {
    console.error("Item creation error:", error);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occured" });
  }
};

module.exports = createNewItem;
