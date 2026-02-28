import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, ChevronRight, Loader2 } from 'lucide-react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const slugify = (text) => text?.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 50);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Ensure this endpoint matches your backend route
      const { data } = await axios.get('/jobs');
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setJobs([]); 
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // Enhanced filtering to check Title, Company, and Tech Stack
  const filteredJobs = jobs.filter(j => 
    j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.techStack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-gray-500 font-medium tracking-wide">Scanning for new opportunities...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explore Roles</h2>
            <p className="text-gray-400 text-sm font-medium">Found {filteredJobs.length} matches</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search roles, companies, or tech..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl border border-transparent outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-inner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main List */}
      <main className="max-w-6xl mx-auto px-6 mt-10 space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <NavLink 
              to={`/jobs/${job._id}/${slugify(job.title)}`} 
              key={job._id}
              className="group block bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden relative"
            >
              {/* Subtle hover accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Company Logo */}
                <div className="relative">
                  <img 
                    src={job.company?.logo || `https://ui-avatars.com/api/?name=${job.company?.name}`} 
                    alt={job.company?.name} 
                    className="w-16 h-16 rounded-2xl border border-gray-100 object-cover shadow-sm group-hover:scale-110 transition-transform duration-500" 
                  />
                  {job.location?.type === 'Remote' && (
                    <span className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Remote Available" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {job.employmentDetails?.type || 'Full-time'}
                    </span>
                    <span className="text-gray-300 text-xs font-bold">•</span>
                    <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                      <MapPin size={12} className="text-blue-400"/> {job.location?.city}, {job.location?.state}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-wide mb-4">{job.company?.name}</p>
                  
                  {/* Tech Preview */}
                  <div className="flex flex-wrap gap-2">
                    {job.techStack?.slice(0, 4).map(tech => (
                      <span key={tech} className="text-[10px] bg-gray-50 text-gray-500 px-3 py-1.5 rounded-xl font-black border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Compensation */}
                <div className="text-right flex flex-col items-end justify-between self-stretch w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Range</p>
                    <p className="text-xl font-black text-gray-900 leading-none">
                      ${(job.compensation?.min / 1000).toFixed(0)}k — ${(job.compensation?.max / 1000).toFixed(0)}k
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold italic mt-1">{job.compensation?.currency || 'USD'} / Year</p>
                  </div>
                  
                  <button className="w-full md:w-auto bg-gray-900 group-hover:bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-200">
                    View Details <ChevronRight size={16}/>
                  </button>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No roles found matching "{searchTerm}"</h3>
            <p className="text-gray-500 mt-2">Try searching for a different technology or location.</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobList;