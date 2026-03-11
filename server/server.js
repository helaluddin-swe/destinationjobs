// 1. Load environment variables IMMEDIATELY
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const jobsRoutes = require("./routes/jobsRoutes.js");
const resumeAnalysisRoutes = require("./routes/resumeRoutes.js");

const app = express();

// Use a fallback value if process.env.PORT is missing (Default to 5000)
const PORT = process.env.PORT || 5000;

// 2. Connect to MongoDB
connectDB();

// 3. Middlewares
app.use(express.json());
// Recommended: add urlencoded for form-data handling
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["https://jobspace-client.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send("API is running 🚀");
});

// 4. Routes
// It's best practice to prefix all API routes to avoid conflicts with frontend paths
app.use('/api/jobs', jobsRoutes); 
app.use('/api/resumes', resumeAnalysisRoutes);

// 5. Global Error Handler (Crucial for a "workable" production app)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});