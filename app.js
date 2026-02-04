const express = require("express");
const app = express();

const userRouter = require("./Routers/user.route");
const restaurantRouter = require("./Routers/restaurant.route");

const cors = require("cors");
const connectDB = require("./DB/Connections/db.connect");
const { errors } = require("celebrate");


connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json()); // Parse first

app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);

app.get("/health", (req, res) => {
  res.send("Server says Heyyyy! :)");
});

app.use(errors());

module.exports = app;
