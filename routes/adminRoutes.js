const express = require("express");
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
const {
  authenticateUserMiddleware,
} = require("../middlewares/authenticateUserMiddleware");
const adminController = require("../controller/adminController");
const {
  validateCourseMiddleware,
} = require("../middlewares/validateCourseMiddleware");

const router = express.Router();

router.route("/signup").post(validateUserMiddleware, adminController.signup);
router.route("/signin").post(validateUserMiddleware, adminController.signin);
router
  .route("/courses")
  .post(
    authenticateUserMiddleware,
    validateCourseMiddleware,
    adminController.createCourse
  );

module.exports = router;
