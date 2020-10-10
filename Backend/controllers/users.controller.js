const userModel = require("../models/user.model");
const generateString = require("../utils/generateString");
const inviteModel = require("../models/invite.model");

module.exports.createUser = async (req, res, options) => {
    if (!req.body.username) return res.status(400).json({ success: false, message: "Username body is missing" });
    let searchedUser = await userModel.findOne({ username: req.body.username });
    if (searchedUser) return res.status(400).json({ success: false, message: "User already exists" });
    let userDocData = {
        key: generateString(18),
        username: req.body.username
    };

    if (options.inviter) userDocData.invitedBy = options.inviter;
    if (options.inviteKey) userDocData.redeemedKey = options.inviteKey;

    let user = await userModel.create(userDocData);

    res.json({ success: true, key: user.key, configLink: `${process.env.BACKEND_URL}/files/config/sxcu?key=${user.key}` });
};

module.exports.createInvite = async (req, res) => {
    if (req.user.invites <= 0) return res.status(400).json({ success: false, message: "You do not have enough invites" });
    let inviteDoc = await inviteModel.create({
        code: generateString(18),
        createdBy: req.user._id
    });

    res.json({ success: true, code: inviteDoc.code });
    await req.user.updateOne({ $inc: { invites: -1 } });
};


module.exports.addInvite = async (req, res) => {
    let amounts = req.query.amount ? req.query.amount : 1;
    await req.requestedUser.updateOne({ $inc: { invites: amounts } });
    res.json({ success: true, message: `Successfully added ${amounts} invites to the user` });
};

module.exports.getRequester = async (req, res) => {
    res.json(req.user.toObject());
};

module.exports.getUser = async (req, res) => {
    res.json(req.requestedUser.toObject());
};

module.exports.suspendUser = async (req, res) => {
    if (req.requestedUser._id == req.user.id) return res.status(400).json({ success: false, message: "You can not suspend yourself" });
    if (req.requestedUser.suspended) return res.status(400).json({ success: false, message: "User is already suspended" });

    await req.requestedUser.updateOne({ suspended: true, suspensionReason: req.query.reason || "No reason" } );
    res.json({ success: true, message: "User has been suspended" });
};

module.exports.unSuspendUser = async (req, res) => {
    if (!req.requestedUser.suspended) return res.status(400).json({ success: false, message: "User is not suspended" });
    await req.requestedUser.updateOne({ $unset: { suspended: "", suspensionReason: "" } });
    res.json({ success: true, message: "User has been unsuspended" });
};

module.exports.linkDiscord = async (req, res) => {
    if (req.requestedUser.discordId) return res.status(400).json({ success: false, message: "You are already linked" });
    await req.requestedUser.updateOne({ discordId: req.body.discordId });
    res.json({ success: true, message: "Done!" });
};