import Router from "express";
import { body } from "express-validator";
import { createTask } from "../Controllers/tasks.Controller.js";

const router = new Router();

router.post(
  process.env.API_URL_TASK,
  body("name").isLength({ max: 255 }).withMessage("Title too long").notEmpty(),
  body("done").notEmpty(),
  body("createdAt").notEmpty(),
  createTask
);

export default router;
