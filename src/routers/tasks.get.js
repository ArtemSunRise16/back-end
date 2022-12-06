const Router = require("express");
const ApiError = require("../Error/apiError.js");
const db = require("../../models/index.js");

const router = new Router();

router.get(`${process.env.API_URL_TASK}s`, async (req, res, next) => {
  try {
    const { pp, page, filterBy, order } = req.query;

    let filtredTasks;
    page || 1;
    let limit = pp || 5;
    let offset = page * limit - limit;

    // if (!filterBy && !order) {
    //   filtredTasks = await db.Tasks.findAndCountAll({ limit, offset });
    //   res.json(filtredTasks);
    // }

    filtredTasks = await db.Tasks.findAndCountAll({
      where: {
        done: filterBy === "done" ? true : filterBy == "undone" ? false : [],
      },
      order: [["createdAt", `${order ? order : []}`]],
      limit,
      offset,
    });

    res.json(filtredTasks);
    // let sortedState = read();

    // if (req.query.order === "asc") {
    //   sortedState.sort((a, b) => a.dateForSort - b.dateForSort);
    // } else if (req.query.order === "desc") {
    //   sortedState.sort((a, b) => b.dateForSort - a.dateForSort);
    // }

    // let filtredTasks = [...sortedState];

    // if (req.query.filterBy === "done") {
    //   filtredTasks = sortedState.filter((item) => item.done === true);
    // } else if (req.query.filterBy === "undone") {
    //   filtredTasks = sortedState.filter((item) => item.done === false);
    // }

    // // Добавить условие на проверку page
    // const currentPage = req.query.page; // current page query - page
    // const todosPrePage = req.query.pp; // всего задачь на странице query - pp
    // const lastTodoIndex = currentPage * todosPrePage;
    // const firstTodoIndex = lastTodoIndex - todosPrePage;
    // const currentTodoPage = filtredTasks.slice(firstTodoIndex, lastTodoIndex);

    // const countAndTasks = {
    //   count: filtredTasks.length,
    //   tasks: currentTodoPage,
    // };

    // res.json(countAndTasks);
  } catch (error) {
    console.log(error);
    res.json(ApiError.internal("Error on server"));
  }
});

module.exports = router;
