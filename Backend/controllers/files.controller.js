const path = require("path");
const urlMagic = require("../utils/urlMagic");
const fileModel = require("../models/file.model");
const fs = require("fs").promises;
module.exports.upload = async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: "file is missing" });
    let url = `${req.query.domain ? `https://${req.query.domain}` : process.env.CDN_URL}${req.filePath}`;
    if (req.query.showUrl) {
        url = urlMagic.showUrl(url);
    };

    if (req.query.fakeUrl) {
        url = urlMagic.fakeUrl(req.query.fakeUrl, url);
    };
    res.json({
        success: true,
        url: url
    });

    fileModel.create({
        fileName: req.file.filename,
        fileAuthor: req.user._id
    });
};

module.exports.deleteFile = async (req, res) => {
    let Path = path.join(global.imagesPath, req.params.file);
    let file = await fileModel.findOne({ fileName: req.params.file });

    try {
        await fs.access(Path);
        await fs.unlink(Path);
        res.json({ success: true, message: "Successfully deleted the file" });
    } catch {
        return res.status(404).json({ success: false, message: "File was not found" });
    };

    if (file) {
        await file.remove();
    };
};

module.exports.getFile = async (req, res) => {
    let file = await fileModel.findOne({ fileName: req.params.file });
    if (file) {
        res.json(file.toObject());
    } else {
        res.status(404).json({ success: false, message: "File does not exist" });
    };
};

module.exports.generateSxcuConfig = async (req, res) => {
    res.set("Content-Disposition", "attachment; filename=config.sxcu");
    res.send(JSON.stringify({
        "Version": "13.2.2",
        "Name": "elerium-v2-js",
        "DestinationType": "ImageUploader, TextUploader, FileUploader",
        "RequestMethod": "POST",
        "RequestURL": "https://elerium.cc/files/upload",
        "Headers": {
            "Authorization": req.query.key
        },
        "Body": "MultipartFormData",
        "FileFormName": "file",
        "URL": "$json:url$"
    }, null, "\t"));
};
