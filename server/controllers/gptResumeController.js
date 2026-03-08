const OpenAI = require("openai");
const Analysis = require("../models/ResumeAnalysisModel.js");

// Initialize OpenAI with your key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

// 1. ANALYZE AND SAVE (The "Post" Logic)
exports.resumeAnalysis = async (req, res) => {
  try {
    const { resumeText, jobDescription, jobTitle } = req.body;

    if (!resumeText || !jobDescription || !jobTitle) {
      return res.status(400).json({ error: "Missing required fields (resume, JD, or Title)." });
    }

    // OpenAI Chat Completion request
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "gpt-4-turbo" / "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "Act as an expert Technical Recruiter. You only respond with valid JSON."
        },
        {
          role: "user",
          content: `Compare the following Resume against the Job Description.
          
          Resume: ${resumeText}
          Job Description: ${jobDescription}

          Return a JSON object with:
          1. matchPercentage (Number 0-100)
          2. missingKeywords (Array)
          3. resumeStrengths (Array)
          4. improvementTips (Array)
          
          Return ONLY the JSON.`
        }
      ],
      response_format: { type: "json_object" } // Forces OpenAI to return valid JSON
    });

    // Extract text from OpenAI response
    const text = response.choices[0].message.content;
    const aiAnalysis = JSON.parse(text);

    // Save to Database
    const newAnalysis = await Analysis.create({
      userId: req.user?.id || "65e8f1234567890abcdef123", 
      jobTitle,
      resumeText,
      jobDescription,
      ...aiAnalysis
    });

    res.status(201).json(newAnalysis);
  } catch (error) {
    console.error("OpenAI Analysis Error:", error);
    res.status(500).json({ error: error.message });
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

// 5. POST ALREADY ANALYZED DATA
exports.postAnalysisResume = async (req, res) => {
  try {
    const newRecord = await Analysis.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: "Invalid data provided." });
  }
};