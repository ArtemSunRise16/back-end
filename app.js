const express = require("express");
require("dotenv").config();
const errorHandler = require("./src/middleware/errorMiddleWareHandler.js");
const recursive = require("recursive-readdir-sync");

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(errorHandler);

recursive(`${__dirname}/src/routers`).forEach((file) =>
  app.use("/api", require(file))
);

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
