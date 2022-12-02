import Router from "express";
import { body, param } from "express-validator";
import { read, write } from "../Data/tasksReadWrite.js";
import { validationResult } from "express-validator";

import ApiError from "../Error/apiError.js";

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

export default router;
