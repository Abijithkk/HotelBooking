const express = require("express");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const myHotelRoutes = require("./routes/my-hotels");
const hotelRoutes = require("./routes/hotels");
const bookingRoutes = require("./routes/my-bookings");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../mainproject/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../mainproject/dist/index.html"));
});

app.listen(7989, () => {
  console.log("server running on localhost:7000");
});
