const { randomBytes } = require("crypto");

module.exports = len => randomBytes(!len && 4 || len).toString("hex");