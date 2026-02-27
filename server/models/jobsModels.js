const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      index: true, // Makes searching by title faster
    },
    company: { 
      type: String, // Changed from array to String
      required: [true, "Company name is required"],
      trim: true 
    },
    location: {
      type: String, // Changed to String for easier filtering
      required: [true, "Location is required"],
      default: "Remote",
      trim: true,
    },
    salary: { 
      type: String, 
      trim: true 
    },
    description: { 
      type: String, 
      required: [true, "Description is required"],
      trim: true 
    },
    // Useful additions for a real app:
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time"
    },
    isApplied: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt
);

// This helps with "Search" functionality across title and description
JobSchema.index({ title: 'text', description: 'text' });

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;