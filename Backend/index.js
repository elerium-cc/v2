require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    global.imagesPath = path.join(__dirname, process.env.IMAGES_PATH);
    app.use(morgan("dev"));
} else {
    global.imagesPath = process.env.IMAGES_PATH;
};

app.use("/files/", require("./routes/files.route"));
app.use("/users/", require("./routes/users.route"));
app.use("/shortner/", require("./routes/shortner.route"));
app.use("/stats/", require("./routes/stats.route"));
app.use("/invites", require("./routes/invites.route"));

app.get("/", (req, res) => {
    res.send("Poggers!");
});
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT);
});