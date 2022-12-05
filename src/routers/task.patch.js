const Router = require("express");
const { body, param } = require("express-validator");
const { read, write } = require("../Data/tasksReadWrite.js");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");

const router = new Router();

router.patch(
  `${process.env.API_URL_TASK}/:id`,
  param("id").notEmpty(),
  body("name").isLength({ max: 255 }).withMessage("Title too long").notEmpty(),
  body("done").notEmpty().isBoolean(),
  body("createdAt").notEmpty(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = read();

      const id = +req.params.id;
      const { name, done, createdAt } = req.body;
      const index = tasks.findIndex((item) => +item.uuid === +id);
      tasks[index] = {
        uuid: id,
        name,
        done,
        createdAt,
        dateForSort: Date.now(),
      };
      write(tasks);
      res.status(200).json({ massege: "good" });
    } catch (error) {
      console.log(error);
      res.json(ApiError.internal("Error on server"));
    }
  }
);

module.exports = router;
