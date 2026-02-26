const Jobs = require("../models/jobsModels");

exports.getJobs= async (req, res) => {
  try {
    const { topic } = req.query;
    let query = {};
    if (topic) {
      query = { topic: { $in: [topic] } };
    }
    const getJobsItems = await Jobs.find(query);
    res.json(getJobsItems);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

exports.postJobs= async (req, res) => {
  try {
    const { question, options, answer, prevExams, explanation1,explanation2,hints, topic } = req.body;
    const newJobsAdd = new Jobs({
      question, options, answer, prevExams,
      explanation1: explanation1 || 'No explanation provided',
      explanation2: explanation2 || 'No explanation provided',
      hints: hints || 'No hints provided',
      topic
    });
    await newJobsAdd.save();
    res.status(201).json({ message: "Item added successfully", data: newJobsAdd });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getJobsById= async (req, res) => {
  try {
    const findJobs = await Jobs.findById(req.params.id);
    if (!findJobs) return res.status(404).json({ message: "Jobs not found" });
    res.json(findJobs);
  } catch (error) {
    res.status(500).json({ message: 'Invalid id format' });
  }
}

exports.deleteJobsById= async (req, res) => {
  try {
    const deleteJobs = await Jobs.findByIdAndDelete(req.params.id);
    if (!deleteJobs) return res.status(404).json({ message: "Jobs not found" });
    res.json({ message: "Question successfully deleted", deleteJobs });
  } catch (error) {
    res.status(500).json({ message: 'Invalid id format' });
  }
}

exports.putJobsById= async (req, res) => {
  try {
    const updatedJobs = await Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(201).json({ message: 'Updated successfully', data: updatedJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}