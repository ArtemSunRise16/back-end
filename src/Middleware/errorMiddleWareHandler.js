const ApiError = require("../Error/apiError.js");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ massege: err.massege });
  }
  return res.status(500).json({ massege: "error server" });
};
