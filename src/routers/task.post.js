import Router from "express";
import { body } from "express-validator";
import { read, write } from "../Data/tasksReadWrite.js";
import { validationResult } from "express-validator";
import ApiError from "../Error/apiError.js";

const router = new Router();

router.post(
  process.env.API_URL_TASK,
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

export default router;
