import Router from "express";
import { deleteTask } from "../Controllers/tasks.Controller.js";

const router = new Router();

router.delete(`${process.env.API_URL_TASK}/:id`, deleteTask);

export default router;
