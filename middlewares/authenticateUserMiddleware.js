const jwt = require("jsonwebtoken");
const { Admin } = require("../models/customerModel");

exports.authenticateUserMiddleware = async function (req, res, next) {
  // const isAdmin = req.baseUrl.includes("admin");
  try {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        message: "You are not logged in. Please login to get access.",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await Admin.findById(decoded.id);

    req.user = currentUser;
    next();
  } catch (e) {
    res.status(401).json({
      message: "You are not logged in. Please login to get access.",
    });
  }
};
