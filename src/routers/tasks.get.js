import Router from "express";
import { getAll } from "../Controllers/tasks.Controller.js";

const router = new Router();

router.get(`${process.env.API_URL_TASK}s`, getAll);

export default router;
