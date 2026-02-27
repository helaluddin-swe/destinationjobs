import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const [searchTerm, setSearchTerm] = useState('');
  const {id}=useParams()
  const navigate =useNavigate()
   const slugify = (text) => {
        return text
            .toString()
            .trim()
            .replace(/\s+/g, '-') // Replaces spaces with hyphens
            .slice(0, 50)
            .replace(/-+/g, '-'); // Prevents double hyphens
    };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/jobs');
      
      // Safety check: ensure response.data is actually an array
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        throw new Error("Invalid data format received from server.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong while fetching jobs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Safeguard: default to empty array if jobs is somehow null/undefined
  const filteredJobs = (jobs || []).filter(job => 
    job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-20 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Couldn't load jobs</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchJobs}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 3. Main UI
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900">Available Opportunities</h2>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search roles or companies..."
            className="pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg italic">
            {searchTerm ? `No results found for "${searchTerm}"` : "No jobs posted yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id || Math.random()} 
              className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <span className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                    {job.location || 'Remote'}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mt-3 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">{job.company}</p>
                </div>
                <div className="sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                  <p className="text-xl font-black text-gray-900">{job.salary || "Negotiable"}</p>
                  <button className="mt-4 w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transform hover:-translate-y-1 transition-all shadow-lg">
                    Apply Now
                  </button>
                  <button className="mt-4 w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transform hover:-translate-y-1 transition-all shadow-lg" onClick={()=>navigate(`/jobs/${job._id}/${slugify(job.title)}`)}>
                    Details
                  </button>
                </div>
              </div>
              <p className="mt-6 text-gray-500 line-clamp-2 text-sm leading-relaxed border-l-4 border-gray-100 pl-4">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;