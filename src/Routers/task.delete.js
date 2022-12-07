const Router = require("express");
const { validationResult } = require("express-validator");
const db = require("../../models/index.js");
const ApiError = require("../Error/apiError.js");

const router = new Router();

module.exports = router.delete(
  `${process.env.API_URL_TASK}/:id`,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const uuid = req.params.id;
      const deletTasks = await db.Tasks.destroy({
        where: {
          uuid,
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
