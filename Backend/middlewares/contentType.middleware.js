module.exports = contentType => {
    return (req, res, next) => {
        if (req.headers["content-type"] && req.headers["content-type"].startsWith(contentType)) {
            if (req.body) {
                next();
            } else {
                return res.status(400).json({ success: false, message: "Body is missing" });
            };
        } else {
            return res.status(400).json({ success: false, message: "Invaild Content-Type" });
        };
    };
};