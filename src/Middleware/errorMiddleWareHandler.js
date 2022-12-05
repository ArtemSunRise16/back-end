const ApiError = require("../Error/apiError.js");
const { read, write } = require("../Data/tasksReadWrite.js");

const api = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ massege: err.massege });
  }
  return res.status(500).json({ massege: "error server" });
};

const error = (req, res, next) => {
  for (let key in req.body) {
    if (key === "name" || key === "done") {
      continue;
    } else {
      res.json(ApiError.badRequest("invallid fields requests"));
    }
  }

  const tasks = read();

  if (req.method === "PATCH" || req.method === "POST") {
    const findName = tasks.find((item) => item.name === req.body.name);

    if (
      (findName && req.method === "POST") ||
      (findName && findName.done === req.body.done)
    ) {
      return res.json(ApiError.badRequest("name already exists"));
    }
    if (req.body.name.trim() === "") {
      return res.json(ApiError.badRequest("task not create"));
    }
  }
  next();
};

module.exports = api;
module.exports = error;
