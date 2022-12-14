const { authorizationHalper } = require("../middleware/authMiddleWareHandler");
const Router = require("express");
const ApiError = require("../error/apiError.js");
const Tasks = require("../../models/tasks");
const {
  validate,
  error,
} = require("../middleware/validationMiddleWareHandler.js");

const User = require("../../models/user.js");

const router = new Router();

module.exports = router.post(
  process.env.API_URL_TASK,
  authorizationHalper,
  validate,
  error,
  async (req, res) => {
    try {
      const id = req.body.usId;
      const { name, done, createdAt } = req.body;

      const findName = await User.findOne({
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

      if (findName) {
        return res.status(400).json(ApiError.badRequest("Name already exist"));
      }

      await Tasks.create({
        name,
        done,
        createdAt,
        userId: id,
      });

      res.status(201).json({ status: 201, massegee: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
