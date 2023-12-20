const Course = require("../models/courseModel");
const PurchasedCourse = require("../models/purchasedCourseModel");
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

exports.handleCoursePurchase = async function (req, res) {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.status(404).json({
        status: "fail",
        message: "No course found",
      });
    }
    const purchasedCourseData = {
      course: req.params.courseId,
      user: req.user,
    };
    await PurchasedCourse.create(purchasedCourseData);
    res
      .status(200)
      .json({ status: "success", message: "Course purchased successfully" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPurchasedCourse = async function (req, res) {
  try {
    const courses = await PurchasedCourse.find({ user: req.user }).populate(
      "course"
    );
    if (courses && courses.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "User has not enrolled in any course",
      });
    }
    res.status(200).send({
      status: "Success",
      courses: courses,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
