const usersController = require("./users.controller");
const inviteModel = require("../models/invite.model");
const generateString = require("../utils/generateString");

module.exports.redeemInvite = async (req, res) => {
    if (!req.body.code) return res.status(400).json({ success: false, message: "code is missing" });
    let inviteDoc = await inviteModel.findOne({ code: req.body.code });
    if (!inviteDoc || inviteDoc.used) return res.status(400).json({ success: false, message: "Invite code might be used or invaild" });

    await usersController.createUser(req, res, {
        inviter: inviteDoc.createdBy,
        inviteKey: req.body.code
    });

    if (res.statusCode === 200) await inviteDoc.updateOne({ used: true });
};

module.exports.generateInvite = async (req, res) => {
    let inviteDoc = await inviteModel.create({
        code: generateString(18),
        createdBy: req.user._id
    });

    res.json({ success: true, code: inviteDoc.code });
};

module.exports.getInviteInfo = async (req, res) => {
    if (!req.query.code) return res.status(400).json({ success: false, message: "code is missing" });
    let inviteDoc = await inviteModel.findOne({ code: req.query.code });
    if (!inviteDoc) return res.status(400).json({ success: false, message: "Invite code is invaild" });

    res.json(inviteDoc.toObject());
};

