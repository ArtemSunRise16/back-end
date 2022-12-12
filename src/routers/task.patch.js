const Router = require("express");
const jwt = require("jsonwebtoken");
const { param } = require("express-validator");
const ApiError = require("../error/apiError.js");
const Tasks = require("../../models/tasks");
const {
  validate,
  error,
} = require("../middleware/validationMiddleWareHandler.js");
const User = require("../../models/user.js");

const router = new Router();

module.exports = router.patch(
  `${process.env.API_URL_TASK}/:id`,
  param("id").notEmpty(),
  validate,
  error,
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const accessToken = authorization.split(" ")[1];
      const dec = jwt.decode(accessToken);
      const id = dec.payload;

      const { name, done, createdAt } = req.body;
      const taskId = req.params.id;

      const user = await User.findOne({
        where: {
          id: id,
        },
      });

      const findTask = await User.findOne({
        include: [
          {
            association: "Tasks",
            where: {
              userId: user.id,
            },
          },
        ],
      });

      const findTasks = findTask.Tasks.dataValues;

      if (findTasks && findTasks.uuid === taskId && findTasks.done === done) {
        return res.status(400).json(ApiError.badRequest("Task already exists"));
      }

      if (findTasks && findTasks.uuid !== taskId) {
        return res.status(400).json(ApiError.badRequest("Name already exists"));
      }

      await Tasks.update(
        { name, done, createdAt },
        {
          where: {
            uuid: taskId,
            userId: user.id,
          },
        }
      );

      res.status(200).json({ status: 200, massege: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
