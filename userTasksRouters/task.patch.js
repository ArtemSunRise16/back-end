import Router from "express";
import UserTaskController from "../userTasksControllers/controller.js";
import { body } from "express-validator";

const router = new Router();

const getCont = new UserTaskController();

router.patch(
  `${process.env.API_URL_TASK}/:id`,
  body("name")
    .isLength({ max: 255 })
    .withMessage({ massege: "title is too long" })
    .notEmpty()
    .withMessage({ massege: "Invalid fields in request" }),
  body("done", "name", "createdAt")
    .notEmpty()
    .withMessage({ massege: "Invalid fields in request" })
    .isBoolean(),
  body("createdAt")
    .notEmpty()
    .withMessage({ massege: "Invalid fields in request" }),
  getCont.patch
);

export default router;
