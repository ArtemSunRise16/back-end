const { body } = require("express-validator");

module.exports = function config() {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Field not empty")
      .isLength({ max: 2 })
      .withMessage("Title too long"),
    body("done").notEmpty().isBoolean(),
    body("createdAt").trim().notEmpty().withMessage("Field not empty"),
  ];
};
