const { Router } = require("express");
const router = new Router();
const statsController = require("../controllers/stats.controller");

router.get("/users", statsController.users);
router.get("/users/suspended", statsController.suspendedUsers);
router.get("/files", statsController.files);

module.exports = router;