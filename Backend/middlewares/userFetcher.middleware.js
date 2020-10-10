const userModel = require("../models/user.model");

module.exports = (type, param, checkSuspended) => async (req, res, next) => {
    if (req.params[param]) {
        try {
            let User = type == "_id" && await userModel.findById(req.params[param]) || await userModel.findOne({ [type]: req.params[param] });
            if (!User) return res.status(400).json({ success: false, message: "User was not found" });
            if (checkSuspended && User.suspended) return res.status(401).json({ success: false, message: `You are suspended for "${User.suspensionReason}"` });
            req.requestedUser = User;
            next(); 
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    } else {
        return res.status(400).json({ success: false, message: "User was not defined" });
    };
};