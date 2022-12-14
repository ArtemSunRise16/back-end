const { body, validationResult } = require("express-validator");

const validate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field not empty")
    .isLength({ max: 255 })
    .withMessage("Title too long"),
  body("done").notEmpty().isBoolean(),
  body("createdAt").trim().notEmpty().withMessage("Field not empty"),
];

const validateAuth = [
  body("username")
    .isEmail()
    .bail()
    .withMessage("Username must be email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Field not empty")
    .isLength({ max: 30 })
    .withMessage("Username can be maximum 30 characters"),
  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Field not empty")
    .isLength({ min: 5 })
    .withMessage("Password can be minimum 5 characters"),
];

function error(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors
      .array([{ onlyFirstError: true }])
      .forEach((error) => res.status(400).json({ message: error.msg }));
  }
  next();
}

module.exports = { validate, error, validateAuth };
