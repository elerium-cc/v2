module.exports = (req, res, next) => {
    if (req.headers["bot-auth"] && req.headers["bot-auth"] == process.env.BOT_API_KEY) {
        next();
    } else {
        res.status(401).json({ success: false, message: "You are not a bot" });
    };
};