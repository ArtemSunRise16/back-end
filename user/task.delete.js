import Router from "express";
import read from "../read.js";
import write from "../write.js";

const router = new Router();

router.delete(`${process.env.API_URL_TASK}/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const tasks = read();
    const deletTask = tasks.filter((item) => +item.uuid !== +id);
    write(deletTask);
    res.json({ status: 204 });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
