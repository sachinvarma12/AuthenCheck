const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  mediaUrl: String,
  overallScore: Number,
  status: { type: String, default: "completed" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", analysisSchema);
