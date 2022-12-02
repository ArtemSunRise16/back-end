import express from "express";
import config from "config";
import {} from "dotenv/config";
import collector from "./src/routers/collector.js";
import errorHandler from "./src/Middleware/errorMiddleWareHandler.js";
import { error } from "./src/Middleware/errorMiddleWareHandler.js";

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());
app.use(error);
app.use("/api", collector);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
