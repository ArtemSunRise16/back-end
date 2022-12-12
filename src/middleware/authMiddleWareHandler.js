const jwt = require("jsonwebtoken");
const { validateAccessToken } = require("../service/token.service");

const authorizationHalper = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .json({ status: 401, message: "User is not authorized" });
    }

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return res
        .status(401)
        .json({ status: 401, message: "User is not authorized" });
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      return res
        .status(401)
        .json({ status: 401, message: "User is not authorized" });
    }

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ status: 401, message: "User is not authorized" });
  }
};

module.exports = { authorizationHalper };
