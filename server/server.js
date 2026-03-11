// 1. Load environment variables IMMEDIATELY
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const jobsRoutes = require("./routes/jobsRoutes.js");
const resumeAnalysisRoutes = require("./routes/resumeRoutes.js");

const app = express();

// Use a fallback value if process.env.PORT is missing
const PORT = process.env.PORT 

// 2. Connect to MongoDB
connectDB();

// 3. Middlewares
app.use(express.json());
app.use(cors({
  origin: ["https://helaluddin-swe-destinationjobs.vercel.app","http://localhost:5173"] ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get('/',(req,res)=>{
  res.send("API is running")
})
// 4. Routes
app.use(jobsRoutes);
app.use('/api', resumeAnalysisRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});