const mongoose = require("mongoose");

const purchasedCourseSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

PurchasedCourse = mongoose.model("PurchasedCourse", purchasedCourseSchema);

module.exports = PurchasedCourse;
