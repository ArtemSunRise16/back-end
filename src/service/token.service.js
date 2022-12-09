const jwt = require("jsonwebtoken");
const User = require("../../models/user");

require("dotenv").config();

const generateAccessToken = (uuid) => {
  const payload = uuid;
  return jwt.sign({ payload }, process.env.SECRET, { expiresIn: "24h" });
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

const findToken = async (token) => {
  return await User.findOne({
    where: {
      token,
    },
  });
};

module.exports = { generateAccessToken, validateAccessToken, findToken };
