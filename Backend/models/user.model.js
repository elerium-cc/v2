const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    key: {
        required: true,
        type: String
    },
    invites: {
        default: 0,
        type: Number
    },
    suspended: Boolean,
    suspensionReason: String,
    discordId: String,
    identifier: String,
    invitedBy: mongoose.SchemaTypes.ObjectId,
    redeemedKey: String
});


module.exports = mongoose.model("users", userSchema);