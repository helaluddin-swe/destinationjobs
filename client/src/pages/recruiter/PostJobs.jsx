import React, { useState } from 'react';
import axios from "axios";

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Axios handles the 'Content-Type' and JSON.stringify automatically
      const response = await axios.post('/jobs', formData);

      if (response.status === 201 || response.status === 200) {
        setMessage({ text: 'Job posted successfully! 🎉', type: 'success' });
        setFormData({ title: '', company: '', location: '', salary: '', description: '' });
      }
    } catch (error) {
      // Axios puts error details in error.response
      const errorMsg = error.response?.data?.message || 'Failed to post job. Please try again.';
      setMessage({ text: errorMsg, type: 'error' });
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a New Job Listing</h2>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="e.g. Senior React Developer" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input name="company" value={formData.company} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="e.g. TechCorp" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input name="location" value={formData.location} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="e.g. Remote / New York" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
            <input name="salary" value={formData.salary} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="e.g. $100k - $120k" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="5"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            placeholder="Describe the role and requirements..."></textarea>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transform active:scale-95 transition-all shadow-lg disabled:bg-gray-400 disabled:transform-none">
          {loading ? 'Posting...' : 'Post Job Opening'}
        </button>
      </form>
    </div>
  );
};

export default PostJobs;