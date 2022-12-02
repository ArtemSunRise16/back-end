import ApiError from "../Error/apiError.js";
import { read, write } from "../Data/tasksReadWrite.js";

export default function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ massege: err.massege });
  }
  return res.status(500).json({ massege: "error server" });
}

export const error = (req, res, next) => {
  for (let key in req.body) {
    if (key === "name" || key === "done" || key === "createdAt") {
      continue;
    } else {
      res.json(ApiError.badRequest("invallid fields requests"));
    }
  }

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
};
