const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const jobsRoutes = require("./routes/jobsRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;

// 1. Connect to MongoDB first
connectDB();

// 2. Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://helaluddin-swe-destinationjobs.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 3. Health Check (Useful for monitoring)
app.get("/", (req, res) => {
  res.send("DestinationJobs API is running... 🚀");
});

// 4. Routes
// Using /api prefix is standard practice
app.use( jobsRoutes);

// 5. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 6. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});