const Jobs = require("../models/jobsModels");

// @desc    Get all jobs (with optional title search)
// @route   GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const { title } = req.query;
    let query = {};

    if (title) {
      // Use regex for partial, case-insensitive matching
      query.title = { $regex: title, $options: "i" };
    }

    // Sort by newest first using the timestamps from your schema
    const getJobsItems = await Jobs.find(query).sort({ createdAt: -1 });
    res.json(getJobsItems);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
exports.postJobs = async (req, res) => {
  try {
    // Note: Fixed typo 'employementDetails' to 'employmentDetails' to match schema
    const newJobsAdd = new Jobs(req.body); 
    await newJobsAdd.save();
    res.status(201).json({ message: "Job added successfully", data: newJobsAdd });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
exports.getJobsById = async (req, res) => {
  try {
    const findJobs = await Jobs.findById(req.params.id);
    if (!findJobs) return res.status(404).json({ message: "Job not found" });
    res.json(findJobs);
  } catch (error) {
    res.status(500).json({ message: 'Invalid ID format or server error' });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
exports.deleteJobsById = async (req, res) => {
  try {
    const deleteJobs = await Jobs.findByIdAndDelete(req.params.id);
    if (!deleteJobs) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job successfully deleted", data: deleteJobs });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
exports.putJobsById = async (req, res) => {
  try {
    const updatedJobs = await Jobs.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedJobs) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: 'Updated successfully', data: updatedJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};