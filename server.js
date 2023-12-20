const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DATABSE_URL).then(function () {
  console.log("Connected to Database");
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`listening on ${port}`);
});
