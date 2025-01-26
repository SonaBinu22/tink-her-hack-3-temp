const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    chairperson: { type: String, required: true },
    viceChairperson: { type: String, required: true },
    artsRep: { type: String, required: true },
    sportsRep: { type: String, required: true },
});

module.exports = mongoose.model("Vote", VoteSchema);
