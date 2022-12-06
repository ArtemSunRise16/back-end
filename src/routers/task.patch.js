const Router = require("express");
const { body, param } = require("express-validator");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");
const db = require("../../models");

const router = new Router();

router.patch(
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

      // не меняет чекбокс, отслеживание имени и должно идтти в express
      const id = req.params.id;
      const { name, done } = req.body;
      const createdAt = new Date();
      const updateTask = await db.Tasks.update(
        { name, done, createdAt },
        {
          where: {
            uuid: id,
          },
        }
      ).catch((e) => res.json(e.errors));

      res.status(200).json({ status: 200, massege: "Successfully" });
    } catch (error) {
      console.log(error);
      res.json(ApiError.internal("Error on server"));
    }
  }
);

module.exports = router;
