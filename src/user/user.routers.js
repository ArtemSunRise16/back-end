const Router = require("express");
const db = require("../../models/index.js");
const bcrypt = require("bcryptjs");

const ApiError = require("../error/apiError.js");

const router = new Router();

module.exports = router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const candidate = await db.User.findOne({
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

    await db.User.create({ username, password: hashPassword }); // регистрация пользователя

    res.status(201).json({ status: 201, messegee: "Successfully" });
  } catch (error) {
    res.status(500).json(ApiError.internal("Error on server"));
  }
});
