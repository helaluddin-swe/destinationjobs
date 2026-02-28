const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Urgent"],
      default: "Active",
    },
    company: {
      name: { type: String, required: true },
      logo: { type: String },
      website: { type: String },
      industry: { type: String },
    },
    location: {
      city: { type: String, required: true },
      state: { type: String },
      type: { 
        type: String, 
        enum: ["Remote", "On-site", "Hybrid"], 
        default: "Remote" 
      },
    },
    compensation: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD" },
      bonus: { type: String },
    },
    employmentDetails: {
      type: { type: String, default: "Full-time" },
      experienceLevel: { type: String },
      department: { type: String },
    },
    techStack: [{ type: String }],
    description: { 
      type: String, 
      required: [true, "Description is required"] 
    },
    responsibilities: [{ type: String }],
    benefits: [{ type: String }],
    applicationProcess: {
      steps: [{ type: String }],
      applyUrl: { type: String },
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Middleware to auto-slugify the title
JobSchema.pre('save', function(next) {
  if (this.title && this.isModified('title')) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
  }
  next();
});

// Full-text search index
JobSchema.index({ title: 'text', description: 'text', 'company.name': 'text' });

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;