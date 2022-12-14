const Router = require("express");
const { param } = require("express-validator");
const ApiError = require("../error/apiError.js");
const Tasks = require("../../models/tasks");
const { authorizationHalper } = require("../middleware/authMiddleWareHandler");

const {
  validate,
  error,
} = require("../middleware/validationMiddleWareHandler.js");

const User = require("../../models/user.js");

const router = new Router();

module.exports = router.patch(
  `${process.env.API_URL_TASK}/:id`,
  authorizationHalper,
  param("id").notEmpty(),
  validate,
  error,
  async (req, res) => {
    try {
      const id = req.body.usId;
      const { name, done, createdAt } = req.body;
      const taskId = req.params.id;

      const findTask = await User.findOne({
        include: [
          {
            association: "Tasks",
            where: {
              name: name,
              userId: id,
            },
          },
        ],
      });

      if (!findTask) {
        await Tasks.update(
          { name, done, createdAt },
          {
            where: {
              uuid: taskId,
              userId: id,
            },
          }
        );
        return res.status(200).json({ status: 200, massege: "Successfully" });
      }

      let findTasks = { ...findTask.Tasks["0"].dataValues };

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
            userId: id,
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
