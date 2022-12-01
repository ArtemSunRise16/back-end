import read from "../read.js";
import write from "../write.js";
import Router from "express";

const router = new Router();

router.patch(`${process.env.API_URL_TASK}/:id`, (req, res) => {
  try {
    if (
      req.body.name === undefined ||
      req.body.done === undefined ||
      req.body.createdAt === undefined
    ) {
      return res.status(422).json({ massege: "Invalid fields in request" });
    }

    if (req.body.name.trim() === "") {
      return res.status(400).json({ massege: "task not create" });
    }

    const tasks = read();
    if (tasks.find((item) => item.name === req.body.name)) {
      return res.status(400).json({ massege: "task not create" });
    }
    const id = +req.params.id;
    const { name, done, createdAt } = req.body;
    const index = tasks.findIndex((item) => +item.uuid === +id);
    tasks[index] = {
      uuid: id,
      name,
      done,
      createdAt,
      dateForSort: Date.now(),
    };
    write(tasks);
    res.status(200).json({ massege: "good" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
