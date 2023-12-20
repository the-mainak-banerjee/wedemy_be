const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A course must have a title"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A course must have a description"],
  },
  price: {
    type: Number,
    required: [true, "A course must have a price"],
  },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
