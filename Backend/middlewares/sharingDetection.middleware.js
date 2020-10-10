const axios = require("axios");
const keySharing = require("../utils/keySharing");

module.exports = async (req, res, next) => {
    let hash = process.env.NODE_ENV !== "development" && await keySharing.getIdentifier(req) || "development";
    if (!req.user.identifier) {
        req.user.identifier = hash;
        await req.user.save();
    } else if (req.user.identifier !== hash) {
        axios.post(process.env.WEBHOOK_URL, {
            content: "retard has attempted to key share username: " + req.user.username 
        });
        return res.json({ success: false });
    };

    next();
};