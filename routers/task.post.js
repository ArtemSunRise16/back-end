import Router from "express";
import UserTaskController from "../Controllers/tasksController.js";

const router = new Router();

const getCont = new UserTaskController();

router.post(process.env.API_URL_TASK, getCont.post);

export default router;
