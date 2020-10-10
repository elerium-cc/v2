const crypto = require("crypto");
const axios = require("axios");
function makeHash(data) {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
};

async function getIdentifier(req) {
    let results = await axios.get("http://ip-api.com/json/" + req.headers["cf-connecting-ip"]);

    return makeHash(results.data.isp + results.data.countryCode);
};

module.exports = { getIdentifier };