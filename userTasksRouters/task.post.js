import Router from "express";
import UserTaskController from "../userTasksControllers/controller.js";

const router = new Router();

const getCont = new UserTaskController();

router.post(process.env.API_URL_TASK, getCont.post);

export default router;
