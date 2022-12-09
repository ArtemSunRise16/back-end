const express = require("express");
const recursive = require("recursive-readdir-sync");
require("dotenv").config();
const errorHandler = require("./src/middleware/errorMiddleWareHandler.js");
const db = require("./models");
const cors = require("cors");
const reg = require("./src/user/user.register.js");
const log = require("./src/user/user.login.js");
const del = require("./src/user/user.delete.js");

const start = async () => {
  try {
    const app = express();
    const PORT = 8000;

    await db.sequelize.authenticate();

    app.use(express.json());
    app.use(cors());

    recursive(`${__dirname}/src/routers`).forEach((file) =>
      app.use("/api", require(file))
    );
    app.use("/user", reg);
    app.use("/user", log);
    app.use("/user", del);

    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log("Server has been started on PORT", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
