const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();

// Submit a vote
router.post("/vote", async (req, res) => {
    const { chairperson, viceChairperson, artsRep, sportsRep } = req.body;
    try {
        const vote = new Vote({ chairperson, viceChairperson, artsRep, sportsRep });
        await vote.save();
        res.status(200).json({ message: "Vote submitted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get results
router.get("/results", async (req, res) => {
    try {
        const votes = await Vote.find();
        const results = {
            chairperson: {},
            viceChairperson: {},
            artsRep: {},
            sportsRep: {},
        };

        votes.forEach((vote) => {
            results.chairperson[vote.chairperson] = (results.chairperson[vote.chairperson] || 0) + 1;
            results.viceChairperson[vote.viceChairperson] = (results.viceChairperson[vote.viceChairperson] || 0) + 1;
            results.artsRep[vote.artsRep] = (results.artsRep[vote.artsRep] || 0) + 1;
            results.sportsRep[vote.sportsRep] = (results.sportsRep[vote.sportsRep] || 0) + 1;
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
