const mongoose = require("mongoose");
const inviteSchema = new mongoose.Schema({
    code: {
        required: true,
        type: String
    },
    used: {
        type: Boolean,
        default: false
    },
    createdBy: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId
    }
});

module.exports = mongoose.model("invites", inviteSchema);