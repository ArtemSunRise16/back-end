import Router from "express";
import read from "../read.js";
import write from "../write.js";

const router = new Router();

router.post(process.env.API_URL_TASK, (req, res) => {
  try {
    // if (!req.body.name || req.body.name.trim() === "") {
    //   return res.status(400).json({ massege: "task not create" });
    // }

    const tasks = read();
    const newTask = {
      ...req.body,
      uuid: Date.now(),
      dateForSort: Date.now(),
    };
    const addTask = [...tasks, newTask];
    write(addTask);
    res.json({ status: 201 });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
