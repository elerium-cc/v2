const userModel = require("../models/user.model");

module.exports = (middlewareConfig) => {
    let admin = false;
    if (middlewareConfig && middlewareConfig.admin) {
        admin = true;
    };

    return async (req, res, next) => {
        if (req.headers["authorization"]) {
            let authorization = req.headers["authorization"];
            let query = {
                name: "key",
                value: authorization
            };

            if (authorization.split("_")[0] == "discordid" && req.headers["bot-auth"] === process.env.BOT_API_KEY) {
                query.name = "discordId";
                query.value = authorization.split("_")[1];
            };

            let user = await userModel.findOne({ [query.name]: [query.value] });
            if (user) {
                if (!user.discordId) return res.status(400).json({ success: false, message: "You are not linked to your discord" });
                if (admin && !user.isAdmin) {
                    return res.status(401).json({ success: false, message: "You are not a admin" });
                };
                if (user.suspended) return res.status(401).json({ success: false, message: `You are suspended for "${user.suspensionReason}"` });
                req.user = user;
                next();
            } else {
                res.status(401).json({ success: false, message: "Unauthorized" });
            };
        } else {
            res.status(400).json({ success: false, message: "Authorization header is missing" });
        };
    };
};