const Router = require("express");
const { body, param } = require("express-validator");
const { read, write } = require("../utils/tasksReadWrite.js");
const { validationResult } = require("express-validator");
const ApiError = require("../error/apiError.js");

const router = new Router();

router.patch(
  `${process.env.API_URL_TASK}/:id`,
  param("id").notEmpty(),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("task not empty")
    .isLength({ max: 255 })
    .withMessage("Title too long"),
  body("done").notEmpty().isBoolean(),
  body("createdAt").notEmpty(),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = await read();

      const findTask = tasks.find((item) => item.name === req.body.name);

      if (findTask && findTask.uuid === id && findTask.done === req.body.done) {
        return res.json(ApiError.badRequest("Task is already exists"));
      }

      if (findTask && findTask.uuid !== id) {
        return res.json(ApiError.badRequest("Name already exists"));
      }

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
      res.status(200).json({ message: "good" });
    } catch (error) {
      console.log(error);
      res.json(ApiError.internal("Error on server"));
    }
  }
);

module.exports = router;
