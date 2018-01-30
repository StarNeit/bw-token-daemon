var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    hardCap: { type: String, required: true },
    totalSupply: { type: String, required: true },
});

module.exports = mongoose.model("BwcState", schema);