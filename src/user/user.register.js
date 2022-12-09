const Router = require("express");
const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");

const ApiError = require("../error/apiError.js");

const router = new Router();

module.exports = router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const candidate = await User.findOne({
      where: {
        username,
      },
    });

    if (candidate) {
      return res.status(400).json({
        status: 400,
        messegee: "User with the same username already exists",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 6);

    await User.create({ username, password: hashPassword }); // регистрация пользователя

    res.status(201).json({ status: 201, messegee: "Account created" });
  } catch (error) {
    res.status(500).json(ApiError.internal("Error on server"));
  }
});
