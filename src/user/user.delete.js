const Router = require("express");
const router = new Router();
const User = require("../../models/user");
const ApiError = require("../error/apiError");

module.exports = router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletUser = await User.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json({ status: 200, message: "User deleted" });
  } catch (error) {
    res.status(500).json(ApiError.internal("Error on server"));
  }
});
