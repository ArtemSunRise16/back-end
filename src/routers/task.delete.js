const Router = require("express");
const Tasks = require("../../models/tasks");
const User = require("../../models/user");
const ApiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");

const router = new Router();

module.exports = router.delete(
  `${process.env.API_URL_TASK}/:id`,
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const accessToken = authorization.split(" ")[1];
      const dec = jwt.decode(accessToken);
      const id = dec.payload;

      const uuid = req.params.id;

      const deletTasks = await Tasks.destroy({
        where: {
          uuid,
          userId: id,
        },
      });

      if (!deletTasks) {
        return res.json(ApiError.notFound("Not found"));
      }

      res.status(200).json({ status: 204, massege: "Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiError.internal("Error on server"));
    }
  }
);
