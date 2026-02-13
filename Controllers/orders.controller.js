const createNewOrder = async (req, res) => {
  const { items } = req.body;
  const user = req.user;

  const itemsToBuy = items.map((item) => item.id);

  res.send(itemsToBuy);
};

module.exports = { createNewOrder };
