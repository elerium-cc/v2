const { Router } = require("express");
const contentType = require("../middlewares/contentType.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const userSchema = require("../schemas/user.schema");
const usersController = require("../controllers/users.controller");
const userFetcher = require("../middlewares/userFetcher.middleware");
const botAuthentication = require("../middlewares/botAuth.middleware");
const router = new Router();

router.post("/create", authMiddleware({ admin: true }), schemaValidation("body", userSchema), usersController.createUser);

router.get("/@me", authMiddleware(), usersController.getRequester);
router.post("/@me/invites/create", authMiddleware(), usersController.createInvite);

router.get("/:id", authMiddleware({ admin: true }), userFetcher("_id", "id"), usersController.getUser);
router.post("/:id/suspend", authMiddleware({ admin: true }), userFetcher("_id", "id"), usersController.suspendUser);
router.post("/:id/unsuspend", authMiddleware({ admin: true }), userFetcher("_id", "id"), usersController.unSuspendUser);
router.post("/:id/invites/add", authMiddleware({ admin: true }), userFetcher("_id", "id"), usersController.addInvite);

router.get("/username/:username", authMiddleware({ admin: true }), userFetcher("username", "username"), usersController.getUser);
router.post("/username/:username/suspend", authMiddleware({ admin: true }), userFetcher("username", "username"), usersController.suspendUser);
router.post("/username/:username/unsuspend", authMiddleware({ admin: true }), userFetcher("username", "username"), usersController.unSuspendUser);
router.post("/username/:username/invites/add", authMiddleware({ admin: true }), userFetcher("username", "username"), usersController.addInvite);
router.get("/discord/:discordId", authMiddleware({ admin: true }), userFetcher("discordId", "discordId"), usersController.getUser);

router.post("/key/:key/link", botAuthentication, userFetcher("key", "key", true), usersController.linkDiscord);
router.get("/key/:key", authMiddleware({ admin: true }), userFetcher("key", "key"), usersController.getUser);
router.get("/key/redeemed/:key", authMiddleware({ admin: true }), userFetcher("redeemedKey", "key"), usersController.getUser);

module.exports = router;