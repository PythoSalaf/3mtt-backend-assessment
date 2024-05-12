const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URS)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this is the  api route

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ${process.env.PORT}`);
});
