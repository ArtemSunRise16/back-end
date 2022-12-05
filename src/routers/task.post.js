const Router = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");
const db = require("../../models");

const router = new Router();

router.post(
  process.env.API_URL_TASK,
  body("name").isLength({ max: 255 }).withMessage("Title too long").notEmpty(),
  body("done").notEmpty().isBoolean(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const createdAt = new Date();
      const { name, done } = req.body;
      const task = await db.Tasks.create({ name, done, createdAt });

      res.status(201).json({ status: 201, massegee: "Successfully" });
    } catch (error) {
      console.log(error);
      res.json(ApiError.internal("Error on server"));
    }
  }
);

module.exports = router;
