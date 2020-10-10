const { Router } = require("express");
const router = new Router();
const shortnerController = require("../controllers/shortner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/shorten", authMiddleware(), shortnerController.shortenLink);

module.exports = router;