import express from "express";
import config from "config";
import {} from "dotenv/config";
import routerGet from "./routers/tasks.get.js";
import routerPost from "./routers/task.post.js";
import routerDelete from "./routers/task.delete.js";
import routerPatch from "./routers/task.patch.js";
import errorHandler from "./middleware/middleWareHandler.js";
import ApiError from "./error/apiError.js";
import read from "./read.js";

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());
app.use((req, res, next) => {
  const tasks = read();

  if (req.method === "PATCH" || req.method === "POST") {
    if (
      tasks.find((item) => item.name === req.body.name) &&
      tasks.find((item) => item.done === req.body.done)
    ) {
      return res.json(ApiError.badRequest("name already exists"));
    }
    if (req.body.name.trim() === "") {
      return res.json(ApiError.badRequest("task not create"));
    }
  }
  next();
});
app.use("/api", routerGet);
app.use("/api", routerPost);
app.use("/api", routerDelete);
app.use("/api", routerPatch);

// Замыкающий
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
