const express = require("express");
const recursive = require("recursive-readdir-sync");
require("dotenv").config();
const errorHandler = require("./src/middleware/errorMiddleWareHandler.js");
const db = require("./models");
const cors = require("cors");

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

    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log("Server has been started on PORT", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
