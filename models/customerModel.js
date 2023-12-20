const mongoose = require("mongoose");
const { handleHashPassword, handleMatchPassword } = require("../utils");

const customerSchema = mongoose.Schema({
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

customerSchema.pre("save", async function (next) {
  const protectedPassword = await handleHashPassword(this.password);
  this.password = protectedPassword;
  next();
});

customerSchema.methods.matchPassword = function (
  providedPassword,
  hashedPassword
) {
  return handleMatchPassword(providedPassword, hashedPassword);
};

exports.Admin = mongoose.model("Admin", customerSchema);
exports.User = mongoose.model("User", customerSchema);
