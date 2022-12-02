import ApiError from "../error/apiError.js";

export default function (err, req, res, next) {
  // if (req.body.name === undefined) {
  //   res.json(ApiError.badRequest("test"));
  // }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ massege: err.massege });
  }
  return res.status(500).json({ massege: "error server" });
}
