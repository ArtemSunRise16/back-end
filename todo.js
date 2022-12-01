import express from "express";
import config from "config";
import {} from "dotenv/config";
import routerGet from "./userTasksRouters/tasks.get.js";
import routerPost from "./userTasksRouters/task.post.js";
import routerDelete from "./userTasksRouters/task.delete.js";
import routerPatch from "./userTasksRouters/task.patch.js";

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());
app.use("/user", routerGet);
app.use("/user", routerPost);
app.use("/user", routerDelete);
app.use("/user", routerPatch);

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
