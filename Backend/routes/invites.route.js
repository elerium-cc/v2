const { Router } = require("express");
const router = new Router();
const invitesController = require("../controllers/invites.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/redeem", invitesController.redeemInvite);
router.get("/info", authMiddleware({ admin: true }), invitesController.getInviteInfo);
router.post("/generate", authMiddleware({ admin: true }), invitesController.generateInvite);

module.exports = router;