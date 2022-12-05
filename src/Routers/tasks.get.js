const Router = require("express");
const { read, write } = require("../Utils/tasksReadWrite.js");
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

    if (req.query.filterBy === "done") {
      sortedState.filter((item) => item.done === true);
    } else if (req.query.filterBy === "undone") {
      sortedState.filter((item) => item.done === false);
    }

    const count = sortedState.length;

    const currentPage = req.query.page;
    const todosPrePage = req.query.pp;
    const lastTodoIndex = currentPage * todosPrePage;
    const firstTodoIndex = lastTodoIndex - todosPrePage;
    sortedState = sortedState.slice(firstTodoIndex, lastTodoIndex);

    const countAndTasks = {
      count,
      tasks: sortedState,
    };

    res.json(countAndTasks);
  } catch (error) {
    console.log(error);
    res.json(ApiError.internal("Error on server"));
  }
});

module.exports = router;
