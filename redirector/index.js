require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const linkModel = require("./models/link.model");

app.all("/", (req, res) => res.send(""));

app.get("/:paramCode", async (req, res) => {
    let linkDoc = await linkModel.findOne({ paramCode: req.params.paramCode });
    if (!linkDoc) return res.status(404).send("Couldn't find the code");

    res.redirect(linkDoc.link);
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT);
});