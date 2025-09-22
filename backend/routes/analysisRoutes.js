const express = require("express");
const Analysis = require("../models/Analysis");
const router = express.Router();

// Save new analysis result
router.post("/", async (req, res) => {
  try {
    const newAnalysis = await Analysis.create(req.body);
    res.json(newAnalysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to save analysis" });
  }
});

// Fetch all analyses
router.get("/", async (req, res) => {
  try {
    const data = await Analysis.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analysis results" });
  }
});

module.exports = router;
