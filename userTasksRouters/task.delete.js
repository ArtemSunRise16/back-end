import Router from "express";
import UserTaskController from "../userTasksControllers/controller.js";

const router = new Router();

const getCont = new UserTaskController();

router.delete(`${process.env.API_URL_TASK}/:id`, getCont.delete);

export default router;
