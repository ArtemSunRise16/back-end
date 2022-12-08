const Router = require("express");
const ApiError = require("../error/apiError.js");
const db = require("../../models/index.js");
const { validationResult, query } = require("express-validator");
const constants = require("../constants/constants.js");

const router = new Router();

module.exports = router.get(
  `${process.env.API_URL_TASK}s`,
  query("filterBy").trim(),
  query("order").trim(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { pp, page, filterBy, order } = req.query;

      let filtredTasks;
      page || 1;
      let limit = pp || 5;
      let offset = page * limit - limit;

      filtredTasks = await db.Tasks.findAndCountAll({
        where: {
          done:
            (filterBy === constants.done && true) ||
            (filterBy === constants.undone && false) ||
            (filterBy === "" && [false, true]),
        },
        order: order ? [["createdAt", order]] : [],
        limit,
        offset,
      });

      res.json(filtredTasks);
    } catch (error) {
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
