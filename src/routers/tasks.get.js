const Router = require("express");
const { read, write } = require("../Data/tasksReadWrite.js");
const ApiError = require("../Error/apiError.js");
const { validationResult } = require("express-validator");

const router = new Router();

router.get(`${process.env.API_URL_TASK}s`, async (req, res, next) => {
  try {
    let sortedState = await read();
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

    const currentPage = req.query.page;
    const todosPrePage = req.query.pp;
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
    res.json(ApiError.internal("Error on server"));
  }
});

module.exports = router;
