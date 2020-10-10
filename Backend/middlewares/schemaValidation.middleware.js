module.exports = (reqObjectName, schema) => async (req, res, next) => { // im sorry aztup if i "skidded your code" it was way too gamer
    try {
        await schema.validateAsync(req[reqObjectName]);
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: err.message.replace(/"/gi, "") });
    };
};