import Router from "express";
import UserTaskController from "../userTasksControllers/controller.js";

const router = new Router();

const getCont = new UserTaskController();

router.get(`${process.env.API_URL_TASK}s`, getCont.get);

export default router;
