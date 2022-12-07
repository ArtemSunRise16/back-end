const Router = require("express");
const { body, param } = require("express-validator");
const { validationResult } = require("express-validator");
const ApiError = require("../error/apiError.js");
const db = require("../../models");

const router = new Router();

module.exports = router.patch(
  `${process.env.API_URL_TASK}/:id`,
  param("id").notEmpty(),
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
      const id = req.params.id;

      const findTask = await db.Tasks.findOne({
        where: {
          name: name,
        },
      });

      if (findTask && findTask.uuid === id && findTask.done === done) {
        return res.status(400).json(ApiError.badRequest("Task already exists"));
      }

      if (findTask && findTask.uuid !== id) {
        return res.status(400).json(ApiError.badRequest("Name already exists"));
      }

      const updateTask = await db.Tasks.update(
        { name, done, createdAt },
        {
          where: {
            uuid: id,
          },
        }
      );

      res.status(200).json({ status: 200, massege: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);