import Router from "express";
import { body } from "express-validator";
import UserTaskController from "../Controllers/tasksController.js";

const router = new Router();

const getCont = new UserTaskController();

router.patch(
  `${process.env.API_URL_TASK}/:id`,
  body("name").isLength({ max: 255 }).withMessage("Title too long"),
  getCont.patch
);

export default router;
