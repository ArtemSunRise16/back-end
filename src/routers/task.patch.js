import Router from "express";
import { body } from "express-validator";
import { update } from "../Controllers/tasks.Controller.js";

const router = new Router();

router.patch(
  `${process.env.API_URL_TASK}/:id`,
  body("name").isLength({ max: 255 }).withMessage("Title too long").notEmpty(),
  body("done").notEmpty(),
  body("createdAt").notEmpty(),
  update
);

export default router;
