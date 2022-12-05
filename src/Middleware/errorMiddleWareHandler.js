const ApiError = require("../Error/apiError.js");
const { read, write } = require("../Utils/tasksReadWrite.js");

const api = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ massege: err.massege });
  }
  return res.status(500).json({ massege: "error server" });
};

module.exports = api;
