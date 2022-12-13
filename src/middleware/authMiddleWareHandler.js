const jwt = require("jsonwebtoken");
const { validateAccessToken } = require("../service/token.service");

const authorizationHalper = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .json({ status: 401, message: "not faund headers authorization" });
    }

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ status: 401, message: "not found token" });
    }

    const userData = jwt.verify(accessToken, process.env.SECRET);

    if (!userData) {
      return res
        .status(401)
        .json({ status: 401, message: "re-login to account" });
    }

    const dec = jwt.decode(accessToken);
    const usId = dec.payload;

    req.body.usId = usId;

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ status: 401, message: "User is not authorized" });
  }
};

module.exports = { authorizationHalper };
