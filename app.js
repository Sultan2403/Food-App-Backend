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

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELET"].includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Bad request" });
    }
  }
  next();
});

app.use(express.json());

app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);

app.get("/health", (req, res) => {
  res.send("Server says Heyyyy! :)");
});

app.use(errors());

module.exports = app;
