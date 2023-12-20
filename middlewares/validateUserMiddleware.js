const z = require("zod");

const userValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

exports.validateUserMiddleware = function (req, res, next) {
  const { email, password } = req.body;
  const validationResult = userValidationSchema.safeParse({ email, password });

  if (!validationResult.success) {
    return res.status(411).json({ message: "Invalid format of credentials" });
  }

  next();
};
