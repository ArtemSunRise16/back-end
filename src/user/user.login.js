const Router = require("express");
const router = new Router();
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (uuid) => {
  const payload = uuid;
  return jwt.sign({ payload }, process.env.SECRET, { expiresIn: "24h" });
};

module.exports = router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ status: 400, message: "Invalid login" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    res.status(400).json({ status: 400, message: "Invalid password" });
  }

  const token = generateAccessToken(user.userId);

  return res.json({ token });
});
