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

module.exports = router;
