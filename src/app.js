const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

module.exports = app;