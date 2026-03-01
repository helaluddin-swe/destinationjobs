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

JobSchema.pre('save', function(next) {
  if (this.title && this.isModified('title')) {
    // Better slugify: removes special characters, handles multiple spaces
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with -
      .replace(/^-+|-+$/g, ''); // Trim - from ends
      
    // Add a short random ID to the slug to ensure uniqueness
    const shortId = Math.random().toString(36).substring(2, 7);
    this.slug = `${this.slug}-${shortId}`;
  }
  next();
});

// Add a Virtual for "Salary Range" string
JobSchema.virtual('salaryRange').get(function() {
  return `${this.compensation.currency} ${this.compensation.min.toLocaleString()} - ${this.compensation.max.toLocaleString()}`;
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;