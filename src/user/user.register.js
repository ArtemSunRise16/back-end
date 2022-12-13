const Router = require("express");
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../service/token.service");
const ApiError = require("../error/apiError.js");
const {
  validateAuth,
  error,
} = require("../middleware/validationMiddleWareHandler");

const router = new Router();

module.exports = router.post(
  "/register",
  validateAuth,
  error,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const newUser = await User.findOne({
        where: {
          username,
        },
      });

      if (newUser) {
        return res.status(400).json({
          status: 400,
          message: "User with the same username already exists",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 6);

      const user = await User.create({ username, password: hashPassword }); // регистрация пользователя

      const token = generateAccessToken(user.id);

      res.json({ accessToken: token, username: user.username });
    } catch (error) {
      res.status(500).json("server errors");
    }
  }
);
