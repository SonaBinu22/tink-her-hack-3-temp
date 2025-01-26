const express = require("express");
const router = express.Router();

// Example login route
router.post("/login", (req, res) => {
    const { studentId, password } = req.body;
    res.json({ message: `Login attempted by ${studentId}` });
});

module.exports = router;
