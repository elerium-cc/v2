const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileAuthor: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("files", fileSchema);