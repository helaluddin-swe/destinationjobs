const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  jobTitle: { type: String, required: true },
  resumeText: { type: String },      // Added this
  jobDescription: { type: String },  // Added this
  matchPercentage: { type: Number },
  missingKeywords: [String],
  resumeStrengths: [String],
  improvementTips: [String],
  createdAt: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', AnalysisSchema);
module.exports = Analysis;