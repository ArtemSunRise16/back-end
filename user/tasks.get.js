import Router from "express";
import read from "../read.js";
const router = new Router();

router.get(`${process.env.API_URL_TASK}s`, (req, res) => {
  try {
    let sortedState = read();

    if (req.query.order === "asc") {
      sortedState.sort((a, b) => a.dateForSort - b.dateForSort);
    } else if (req.query.order === "desc") {
      sortedState.sort((a, b) => b.dateForSort - a.dateForSort);
    }

    let filtredTasks = [...sortedState];

    if (req.query.filterBy === "done") {
      filtredTasks = sortedState.filter((item) => item.done === true);
    } else if (req.query.filterBy === "undone") {
      filtredTasks = sortedState.filter((item) => item.done === false);
    }

    // Добавить условие на проверку page
    const currentPage = req.query.page; // current page query - page
    const todosPrePage = req.query.pp; // всего задачь на странице query - pp
    const lastTodoIndex = currentPage * todosPrePage;
    const firstTodoIndex = lastTodoIndex - todosPrePage;
    const currentTodoPage = filtredTasks.slice(firstTodoIndex, lastTodoIndex);

    const countAndTasks = {
      count: filtredTasks.length,
      tasks: currentTodoPage,
    };

    res.json(countAndTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
