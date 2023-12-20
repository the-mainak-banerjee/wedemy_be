const mongoose = require("mongoose");
const { handleHashPassword, handleMatchPassword } = require("../utils");

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
  const protectedPassword = await handleHashPassword(this.password);
  this.password = protectedPassword;
  next();
});

adminSchema.methods.matchPassword = function (
  providedPassword,
  hashedPassword
) {
  return handleMatchPassword(providedPassword, hashedPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
