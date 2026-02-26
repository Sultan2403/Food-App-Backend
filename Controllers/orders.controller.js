const createNewOrder = async (req, res) => {
  const { items } = req.body;
  const user = req.user;

  const itemIDs = items.map((item) => item.id)

};

module.exports = { createNewOrder };
