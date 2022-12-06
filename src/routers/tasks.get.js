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

    if (!filterBy) {
      filtredTasks = await db.Tasks.findAndCountAll({
        order: order ? [["createdAt", `${order}`]] : [],
        limit,
        offset,
      });
      return res.json(filtredTasks);
    }

    filtredTasks = await db.Tasks.findAndCountAll({
      where: {
        done: (filterBy === "done" && true) || (filterBy == "undone" && false),
      },
      order: order ? [["createdAt", `${order}`]] : [],
      limit,
      offset,
    });

    res.json(filtredTasks);
  } catch (error) {
    console.log(error);
    res.json(ApiError.internal("Error on server"));
  }
});

module.exports = router;
