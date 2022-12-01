import express from "express";
import read from "./read.js";
import write from "./write.js";
import config from "config";
import {} from "dotenv/config";
import routerGet from "./user/tasks.get.js";
import routerPost from "./user/task.post.js";
import routerDelete from "./user/task.delete.js";
import routerPatch from "./user/task.patch.js";

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
