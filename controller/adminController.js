const Admin = require("../models/adminModel");
const { signinWithToken } = require("../utils");

exports.signup = async (req, res) => {
  try {
    const user = await Admin.create(req.body);
    console.log(
      "🚀 ~ file: adminController.js:7 ~ exports.signup= ~ user:",
      user
    );
    const token = signinWithToken(user.id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
