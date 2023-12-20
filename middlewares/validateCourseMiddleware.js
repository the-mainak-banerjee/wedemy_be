const z = require("zod");

const courseValidationSchema = z.object({
  title: z.string().min(4, "Course title should contains 4 characters"),
  description: z.string(),
  price: z.number(),
});

exports.validateCourseMiddleware = function (req, res, next) {
  const { title, description, price } = req.body;
  const validationResult = courseValidationSchema.safeParse({
    title,
    description,
    price,
  });

  if (!validationResult.success) {
    return res.status(411).json({ error: validationResult.error.issues });
  }

  next();
};
