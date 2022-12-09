const { body, validationResult } = require("express-validator");

const validator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field not empty")
    .isLength({ max: 255 })
    .withMessage("Title too long"),
  body("done").notEmpty().isBoolean(),
];

function error(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  validator,
  error,
};
