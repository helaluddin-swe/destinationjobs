const { GoogleGenerativeAI } = require("@google/generative-ai");
const Analysis = require("../models/ResumeAnalysisModel.js");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. ANALYZE AND SAVE (The "Post" Logic)
exports.resumeAnalysis = async (req, res) => {
  try {
   const { resumeText, jobDescription, jobTitle } = req.body;

    if (!resumeText || !jobDescription || !jobTitle) {
      return res.status(400).json({ error: "Missing required fields (resume, JD, or Title)." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as an expert Technical Recruiter. Compare the following Resume against the Job Description.
      
      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Return a JSON object with:
      1. matchPercentage (Number 0-100)
      2. missingKeywords (Array)
      3. resumeStrengths (Array)
      4. improvementTips (Array)
      
      Return ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Improved JSON parsing
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const aiAnalysis = JSON.parse(cleanJson);

    const newAnalysis = await Analysis.create({
      userId: req.user?.id || "65e8f1234567890abcdef123", // Dummy ID for testing if no auth
      jobTitle,
      resumeText,
      jobDescription,
      ...aiAnalysis
    });

    res.status(201).json(newAnalysis);
  } catch (error) {
    console.error("Detailed Error:", error);
    res.status(500).json({ error: error.message }); // Send actual error message for debugging
  }
};

// 2. GET ALL ANALYSES
exports.getAllAnalysisResume = async (req, res) => {
  try {
    const records = await Analysis.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching records." });
  }
};

// 3. GET SINGLE ANALYSIS BY ID
exports.getAnalysisResumeById = async (req, res) => {
  try {
    const record = await Analysis.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error fetching record." });
  }
};

// 4. DELETE ANALYSIS
exports.delelteAnalysisResumeById = async (req, res) => {
  try {
    const deleted = await Analysis.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found." });

    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting record." });
  }
};

// 5. POST ALREADY ANALYZED DATA (Optional manual save)
exports.postAnalysisResume = async (req, res) => {
  try {
    const newRecord = await Analysis.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: "Invalid data provided." });
  }
};
