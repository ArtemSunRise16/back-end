const Router = require("express");
const router = new Router();
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../service/token.service");
const {
  validateAuth,
  error,
} = require("../middleware/validationMiddleWareHandler");
require("dotenv").config();

module.exports = router.post(
  "/login",
  validateAuth,
  error,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(400).json({ status: 404, message: "login is wrong" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ status: 404, message: "Invalid password" });
      }

      const token = generateAccessToken(user.id);

      res.json({ accessToken: token, username: username, userId: user.id });
    } catch (e) {
      res.json("server errors");
    }
  }
);
