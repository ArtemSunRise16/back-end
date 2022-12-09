const Router = require("express");
const ApiError = require("../error/apiError.js");
const Tasks = require("../../models/tasks.js");
const {
  validator,
  error,
} = require("../middleware/validationMiddleWareHandler.js");

const router = new Router();

module.exports = router.post(
  process.env.API_URL_TASK,
  validator,
  error,
  async (req, res, next) => {
    try {
      const { name, done } = req.body;

      const findName = await Tasks.findOne({
        where: {
          name: name,
        },
      });

      if (findName) {
        return res.status(400).json(ApiError.badRequest("Name already exist"));
      }

      const createdAt = new Date();

      await Tasks.create({ name, done, createdAt });

      res.status(201).json({ status: 201, massegee: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
