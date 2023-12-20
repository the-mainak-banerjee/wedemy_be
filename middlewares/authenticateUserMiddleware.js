const jwt = require("jsonwebtoken");
const { Admin, User } = require("../models/customerModel");

exports.authenticateUserMiddleware = async function (req, res, next) {
  const isAdmin = req.baseUrl.includes("admin");
  try {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in. Please login to get access.",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const Model = isAdmin ? Admin : User;
    const currentUser = await Model.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        message: "You don't have permission to access this page.",
      });
    }

    req.user = currentUser;
    next();
  } catch (e) {
    res.status(401).json({
      message: "You are not logged in. Please login to get access.",
    });
  }
};
