const express = require("express");
const app = express();

const userRouter = require("./Routers/user.route");
const restaurantRouter = require("./Routers/restaurant.route");

const cors = require("cors");
const connectDB = require("./DB/Connections/db.connect");
const { errors } = require("celebrate");
const orderRouter = require("./Routers/orders.route");
const itemsRouter = require("./Routers/items.route");

const path = require("path");
const isRestaurantOwner = require("./Middlewares/Auth/restaurants.auth");

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
  }),
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/items", isRestaurantOwner, itemsRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/restaurants", restaurantRouter);

app.get("/health", (req, res) => {
  res.send("Server says Heyyyy! :)");
});

app.use(errors());

module.exports = app;
