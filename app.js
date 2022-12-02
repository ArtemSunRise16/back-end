import express from "express";
import config from "config";
import {} from "dotenv/config";
import routerGet from "./src/routers/tasks.get.js";
import routerPost from "./src/routers/task.post.js";
import routerDelete from "./src/routers/task.delete.js";
import routerPatch from "./src/routers/task.patch.js";
import errorHandler from "./src/Middleware/errorMiddleWareHandler.js";
import { error } from "./src/Middleware/errorMiddleWareHandler.js";
import fs from "fs";
import recursive from "recursive-readdir-sync";
import path from "path";

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());
app.use(error);

app.use("/api", routerGet);
app.use("/api", routerPost);
app.use("/api", routerDelete);
app.use("/api", routerPatch);

// fs.readdirSync("./src/routers").forEach((file) => app.use("/api", `/${file}`));
// const __dirname = path.resolve();
// recursive(`${__dirname}/src/routers`).forEach((file) => {
//   app.use((req, res, next) => file(req, res, next));
// });

// recursive(`${__dirname}/routes`)
//     .forEach(file => app.use('/', from (file)));

// Замыкающий
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
