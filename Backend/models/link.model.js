const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
    paramCode: {
        required: true,
        type: String
    },
    creatorId: mongoose.SchemaTypes.ObjectId,
    link: String
});

module.exports = mongoose.model("links", linkSchema);