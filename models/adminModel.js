const mongoose = require("mongoose");
const { hashPassword } = require("../utils");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please tell us your email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
});

adminSchema.pre("save", async function (next) {
  const protectedPassword = await hashPassword(this.password);
  this.password = protectedPassword;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
