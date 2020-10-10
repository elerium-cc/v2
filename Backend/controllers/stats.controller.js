const fs = require("fs").promises;
const userModel = require("../models/user.model");
module.exports.files = async (req, res) => {
    let files = await fs.readdir(process.env.IMAGES_PATH);
    res.json({ success: true, length: files.length });
};

module.exports.users = async (req, res) => {
    let users = await userModel.count({ suspended: { $exists: false } });
    res.json({ success: true, length: users });
};

module.exports.suspendedUsers = async (req, res) => {
    let users = await userModel.count({ suspended: true });
    res.json({ success: true, length: users });
};