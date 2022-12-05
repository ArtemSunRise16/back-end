const Router = require("express");
const { read, write } = require("../Data/tasksReadWrite.js");
const { validationResult } = require("express-validator");
const ApiError = require("../Error/apiError.js");

const router = new Router();

router.delete(`${process.env.API_URL_TASK}/:id`, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const tasks = await read();
    if (!tasks.find((item) => item.uuid === id)) {
      return res.json(ApiError.notFound("id not found"));
    }
    const deletTask = tasks.filter((item) => +item.uuid !== +id);
    write(deletTask);
    res.status(200).json({ status: 204 });
  } catch (error) {
    console.log(error);
    res.json(ApiError.internal("Error on server"));
  }
});

module.exports = router;
