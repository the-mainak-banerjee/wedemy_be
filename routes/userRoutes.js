const express = require("express");
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
const userController = require("../controller/userController");
const {
  authenticateUserMiddleware,
} = require("../middlewares/authenticateUserMiddleware");

const router = express.Router();

router.route("/signup").post(validateUserMiddleware, userController.signup);
router.route("/signin").post(validateUserMiddleware, userController.signin);
router
  .route("/courses")
  .get(authenticateUserMiddleware, userController.getAllCourses);

router
  .route("/courses/:courseId")
  .post(authenticateUserMiddleware, userController.handleCoursePurchase);

router
  .route("/purchasedCourses")
  .get(authenticateUserMiddleware, userController.getPurchasedCourse);

module.exports = router;
