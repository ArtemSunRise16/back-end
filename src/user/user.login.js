const Router = require("express");
const router = new Router();
const db = require("../../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({
    where: username,
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: 400, message: "Пользователь с таким именем не найден" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    res.status(400).json({ status: 400, message: "Введен неверный пароль" });
  }

  const token = generateAccessToken();
});
