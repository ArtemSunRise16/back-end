const Router = require("express");
const { body } = require("express-validator");
const { read, write } = require("../Utils/tasksReadWrite.js");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");

const router = new Router();

router.post(
  process.env.API_URL_TASK,
  body("name").isLength({ max: 255 }).withMessage("Title too long").notEmpty(),
  body("done").notEmpty().isBoolean(),
  body("createdAt").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      for (let key in req.body) {
        if (key === "name" || key === "done" || key === "createdAt") {
          continue;
        } else {
          res.json(ApiError.badRequest("invallid fields requests"));
        }
      }

      const tasks = await read();

      if (tasks.find((item) => item.name === req.body.name)) {
        res.json(ApiError.badRequest("name already exists"));
      }

      if (req.body.name.trim() === "") {
        return res.json(ApiError.badRequest("task not create"));
      }

      const newTask = {
        ...req.body,
        uuid: Date.now(),
        dateForSort: Date.now(),
      };

      const addTask = [...tasks, newTask];

      write(addTask);

      res.json({ status: 201 });
    } catch (error) {
      console.log(error);
      res.json(ApiError.internal("Error on server"));
    }
  }
);

module.exports = router;
