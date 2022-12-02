import Router from "express";
import { body } from "express-validator";
import UserTaskController from "../Controllers/tasksController.js";

const router = new Router();

const getCont = new UserTaskController();

router.post(process.env.API_URL_TASK, body("name").notEmpty(), getCont.post);

export default router;
