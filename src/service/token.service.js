const jwt = require("jsonwebtoken");
const User = require("../../models/user");

require("dotenv").config();

const generateAccessToken = (uuid) => {
  const payload = uuid;
  return jwt.sign({ payload }, process.env.SECRET, { expiresIn: "30d" });
};

const findToken = async (token) => {
  return await User.findOne({
    where: {
      token,
    },
  });
};

module.exports = { generateAccessToken, findToken };
