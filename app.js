const express = require("express");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);

module.exports = app;
