const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handleHashPassword = async function (password) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.handleMatchPassword = function (providedPassword, hashedPassword) {
  return bcrypt.compare(providedPassword, hashedPassword);
};

exports.handleSigninWithToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};
