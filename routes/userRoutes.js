const express = require("express");
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/signup").post(validateUserMiddleware, userController.signup);
router.route("/signin").post(validateUserMiddleware, userController.signin);

module.exports = router;
