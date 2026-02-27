const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const jobsRoutes=require("./routes/jobsRoutes.js")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;

// middlewares
app.use(express.json());
app.use(cors({
  origin: "https://helaluddin-swe-destinationjobs.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// connect to MongoDB
connectDB();

// routes placeholder
app.use( jobsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});