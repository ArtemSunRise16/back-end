import Router from "express";
import { read, write } from "../Data/tasksReadWrite.js";
import { validationResult } from "express-validator";

import ApiError from "../Error/apiError.js";

const router = new Router();

router.delete(`${process.env.API_URL_TASK}/:id`, (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const tasks = read();
    if (tasks.find((item) => item.uuid !== id)) {
      return res.json(ApiError.notFound("id not found"));
    }
    const deletTask = tasks.filter((item) => +item.uuid !== +id);
    write(deletTask);
    res.status(200).json({ status: 204 });
  } catch (error) {
    console.log(error);
    res.json(ApiError.internal("Error on server"));
  }
});

export default router;
