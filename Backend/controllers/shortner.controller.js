const linkModel = require("../models/link.model");
const generateString = require("../utils/generateString");

module.exports.shortenLink = async (req, res) => {
    if (!req.body || !req.body.link) return res.status(400).json({ success: false, message: "link body is missing" });

    let linkDoc = await linkModel.create({
        paramCode: generateString(),
        creatorId: req.user._id,
        link: req.body.link
    });


    res.json({ success: true, link: `${process.env.REDIRECTOR_URL}/${linkDoc.paramCode}` });
};