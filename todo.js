import express from "express";
import config from "config";
import {} from "dotenv/config";
import routerGet from "./src/routers/tasks.get.js";
import routerPost from "./src/routers/task.post.js";
import routerDelete from "./src/routers/task.delete.js";
import routerPatch from "./src/routers/task.patch.js";
import errorHandler from "./src/Middleware/errorMiddleWareHandler.js";
import ApiError from "./src/Error/apiError.js";
import read from "./src/Data/dataRead.js";

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());
app.use((req, res, next) => {
  const tasks = read();

  if (req.method === "PATCH" || req.method === "POST") {
    const findName = tasks.find((item) => item.name === req.body.name);

    if (
      (findName && req.method === "POST") ||
      (findName && findName.done === req.body.done)
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
