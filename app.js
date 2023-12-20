const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app;
