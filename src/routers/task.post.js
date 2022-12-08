const Router = require("express");
const { validationResult } = require("express-validator");
const ApiError = require("../error/apiError.js");
const db = require("../../models");
const validation = require("../middleware/validationMiddleWareHandler.js");

const router = new Router();

module.exports = router.post(
  process.env.API_URL_TASK,
  validation(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, done, createdAt } = req.body;

      const findName = await db.Tasks.findOne({
        where: {
          name: name,
        },
      });

      if (findName) {
        return res.status(400).json(ApiError.badRequest("Name already exist"));
      }

      await db.Tasks.create({ name, done, createdAt });

      res.status(201).json({ status: 201, massegee: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
