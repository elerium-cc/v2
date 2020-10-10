const { Router } = require("express");
const router = new Router();
const multer = require("multer");
const generateString = require("../utils/generateString");
const authMiddleware = require("../middlewares/auth.middleware");
const schemaVaildation = require("../middlewares/schemaValidation.middleware");
const fileSchema = require("../schemas/file.schema");
const filesController = require("../controllers/files.controller");
const keySharingMiddleware = require("../middlewares/sharingDetection.middleware");
const path = require("path");
const unallowedExtensions = [
    ".exe",
    ".msi",
    ".bat",
    ".vbs",
    ".js"
];

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, global.imagesPath);
    },
    filename: (req, file, cb) => {
        let fileName = `${generateString()}${path.extname(file.originalname)}`;
        let url = `/${fileName}`;
        req.filePath = url;
        cb(null, fileName);
    }
});

const multerUpload = multer({ 
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        cb(null, file.mimetype.includes("htm") || unallowedExtensions.includes(path.extname(file.originalname)) ? false : true); 
    }
});

router.get("/joeheaders", (req, res) => {
    res.json(req.headers);
});

router.post("/upload", authMiddleware(), keySharingMiddleware, schemaVaildation("query", fileSchema), multerUpload.single("file"), filesController.upload);
router.delete("/:file/delete", authMiddleware({ admin: true }), filesController.deleteFile);
router.get("/:file", authMiddleware({ admin: true }), filesController.getFile);
router.get("/config/sxcu", filesController.generateSxcuConfig);
module.exports = router;