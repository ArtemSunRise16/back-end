const express = require("express");
require("dotenv").config();
const collector = require("./src/routers/collector.js");
const errorHandler = require("./src/Middleware/errorMiddleWareHandler.js");
const error = require("./src/Middleware/errorMiddleWareHandler.js");
const db = require("./models");

const start = async () => {
  try {
    const app = express();
    const PORT = 8000;

    await db.sequelize.authenticate();

    app.use(express.json());
    app.use(error);
    app.use("/api", collector);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("Server has been started on PORT", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
