const Router = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");
const db = require("../../models");

const router = new Router();

module.exports = router.post(
  process.env.API_URL_TASK,
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field not empty")
    .isLength({ max: 255 })
    .withMessage("Title too long"),
  body("done").notEmpty().isBoolean(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, done, createdAt } = req.body;

      const findName = await db.Tasks.findOne({
        where: {
          name: name,
        },
      });

      if (findName) {
        return res.status(400).json(ApiError.badRequest("Name already exist"));
      }

      const task = await db.Tasks.create({ name, done, createdAt }).catch((e) =>
        res.json(e.errors)
      );

      res.status(201).json({ status: 201, massegee: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
