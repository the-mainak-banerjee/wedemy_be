const Course = require("../models/courseModel");
const { User } = require("../models/customerModel");
const { handleSigninWithToken } = require("../utils");

exports.signup = async function (req, res) {
  try {
    const user = await User.create(req.body);
    const token = await handleSigninWithToken(user.id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        email: user.email,
        id: user.id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signin = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  const isPasswordValid = user
    ? user.matchPassword(password, user.password)
    : false;

  if (!user || !isPasswordValid) {
    return res.status(400).json({
      status: "fail",
      message: "Either email or password is not matching",
    });
  }

  const token = handleSigninWithToken(user.id);
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.getAllCourses = async function (req, res) {
  try {
    const allCourses = await Course.find();
    res.status(200).json({
      data: allCourses,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
