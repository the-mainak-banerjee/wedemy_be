const express = require("express");
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
const adminController = require("../controller/adminController");

const router = express.Router();

router.route("/signup").post(validateUserMiddleware, adminController.signup);
router.route("/signin").post(validateUserMiddleware, adminController.signin);

module.exports = router;
