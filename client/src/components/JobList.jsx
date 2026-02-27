import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const slugify = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .slice(0, 50);
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/jobs');
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        throw new Error("Invalid data format received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = (jobs || []).filter(job => 
    job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-semibold tracking-wide">Fetching best roles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header & Search Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explore Roles</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Find your next career move</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="Search by title or company..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredJobs.map((job) => (
              <NavLink  to={ `/jobs/${job._id}/${slugify(job.title)}`}
                key={job._id || job.id} 
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-blue-100 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-blue-600 transition-all duration-300" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Info */}
                  <div className="flex items-start gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-xl shadow-inner shrink-0">
                      {job.company?.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {job.employmentType || 'Full-Time'}
                        </span>
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-gray-500 text-xs font-medium italic">📍 {job.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                  </div>

                  {/* Right: Salary & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-tighter">Compensation</p>
                      <p className="text-lg font-black text-gray-900">{job.salary || 'Negotiable'}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/jobs/${job._id}/${slugify(job.title)}`)}
                        className="px-6 py-2.5 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                      >
                        Details
                      </button>
                      <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all transform active:scale-95 text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer snippet */}
                <div className="mt-6 pt-5 border-t border-gray-50">
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobList;