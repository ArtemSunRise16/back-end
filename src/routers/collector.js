const Router = require("express");
const router = new Router();

const routerGet = require("./tasks.get.js");
const routerPost = require("./task.post.js");
const routerDelete = require("./task.delete.js");
const routerPatch = require("./task.patch.js");

router.use(routerGet);
router.use(routerPatch);
router.use(routerPost);
router.use(routerDelete);

module.exports = router;
