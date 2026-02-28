import React, { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_URL
  ? "https://helaluddin-swe-destinationjobs-3yzu.vercel.app" 
  : ""; // Empty string uses the Proxy in development
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { MapPin, DollarSign, Briefcase, Calendar, CheckCircle2, ChevronLeft, Globe } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/jobs/${id}`);
        setJob(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center p-20 animate-pulse">Loading Position...</div>;
  if (!job) return <div className="text-center p-20">Job not found.</div>;

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1 text-gray-500 hover:text-blue-600 font-bold transition-colors">
        <ChevronLeft size={20}/> Back to Board
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-8 md:p-12 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-6">
              <img src={job.company.logo} alt={job.company.name} className="w-20 h-20 rounded-2xl shadow-sm" />
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">{job.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-xl text-blue-600 font-bold">{job.company.name}</p>
                  <a href={job.company.website} target="_blank" rel="noreferrer"><Globe size={18} className="text-gray-400 hover:text-blue-600"/></a>
                </div>
              </div>
            </div>
            <a href={job.applicationProcess.applyUrl} target="_blank" rel="noreferrer" className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:scale-105 transition-transform text-center">
              Apply Now
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 p-6 bg-gray-50 rounded-2xl">
            <InfoItem icon={<MapPin/>} label="Location" val={`${job.location.city}, ${job.location.state}`} sub={job.location.type} />
            <InfoItem icon={<DollarSign/>} label="Salary (USD)" val={`$${job.compensation.min/1000}k - $${job.compensation.max/1000}k`} sub={job.compensation.bonus} />
            <InfoItem icon={<Briefcase/>} label="Level" val={job.employmentDetails.experienceLevel} sub={job.employmentDetails.type} />
            <InfoItem icon={<Calendar/>} label="Posted" val={new Date(job.postedAt).toLocaleDateString()} sub={job.employmentDetails.department} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Role</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{job.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {job.techStack.map(t => <span key={t} className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 border">{t}</span>)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 text-lg">
                    <span className="shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">{i+1}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
              <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2"><CheckCircle2/> Benefits</h3>
              <ul className="space-y-4">
                {job.benefits.map((b, i) => <li key={i} className="text-green-800 font-medium text-sm flex gap-2"><span>•</span> {b}</li>)}
              </ul>
            </div>
            
            <div className="p-8 bg-gray-900 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-6">Hiring Process</h3>
              {job.applicationProcess.steps.map((s, i) => (
                <div key={i} className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-blue-400">{i+1}</div>
                  <span className="font-medium text-gray-300">{s}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, val, sub }) => (
  <div className="flex gap-3">
    <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600 h-fit border border-gray-100">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="font-bold text-gray-900 leading-tight">{val}</p>
      <p className="text-xs text-gray-500 italic">{sub}</p>
    </div>
  </div>
);

export default JobDetails;