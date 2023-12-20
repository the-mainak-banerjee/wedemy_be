const Course = require("../models/courseModel");
const { Admin } = require("../models/customerModel");
const { handleSigninWithToken } = require("../utils");

exports.signup = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    const token = handleSigninWithToken(admin.id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        email: admin.email,
        id: admin.id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");
  const isPasswordValid = admin
    ? await admin.matchPassword(password, admin.password)
    : false;

  if (!admin || !isPasswordValid) {
    return res.status(400).json({
      status: "fail",
      message: "Either email or password is not matching",
    });
  }

  const token = handleSigninWithToken(admin.id);
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.createCourse = async (req, res) => {
  try {
    const courseData = { ...req.body, instructor: req.user.id };
    const course = await Course.create(courseData);
    res
      .status(200)
      .json({ message: "Course created successfully", courseId: course.id });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const user = req.user;
    const allCourses = await Course.find({
      instructor: { $eq: user.id },
    }).select("title description price");

    if (allCourses && allCourses.length === 0) {
      return res
        .status(404)
        .json({ message: "User does not have any courses" });
    }
    res.status(200).json({ status: "success", courses: allCourses });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
