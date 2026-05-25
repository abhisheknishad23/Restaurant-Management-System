require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const eventRoutes = require("./routes/eventRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth",authRoutes);
//app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/events",eventRoutes);

app.use("/api/menu", menuRoutes);
// console.log("Menu Route Loaded");
app.use("/api/subscribe",subscribeRoutes);
app.use("/api/reviews",reviewRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));