import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"

const JobDetails = () => {
  // 1. Extract the ID and Slug from the URL
  const { id, slug } = useParams();
  const navigate = useNavigate();
  
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

 

// ... inside your component
useEffect(() => {
  const fetchJob = async () => {
    setLoading(true);
    try {
      // Axios automatically handles the JSON parsing
      const response = await axios.get(`/api/jobs/${id}`);
      
      // In Axios, the data you want is always under the .data property
      setJobData(response.data); 
    } catch (error) {
      // Axios catches 404, 500, and network errors automatically
      console.error("Error fetching job details:", error.response?.data || error.message);
      setJobData(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchJob();
}, [id]);

  if (loading) return <div className="text-center p-20 text-gray-400">Loading Job Details...</div>;
  if (!jobData) return <div className="text-center p-20">Job not found.</div>;

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 font-sans">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Listings
      </button>

      {/* Hero Card */}
      <div className="bg-white rounded-t-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {jobData.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{jobData.title}</h1>
              <p className="text-xl text-blue-600 font-semibold">{jobData.company}</p>
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg">
            Apply for this Role
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <DetailItem label="Location" value={jobData.location} icon="📍" />
          <DetailItem label="Salary" value={jobData.salary} icon="💰" />
          <DetailItem label="Type" value={jobData.employmentType} icon="💼" />
          <DetailItem label="ID" value={`#${id}`} icon="🆔" />
        </div>
      </div>

      {/* Content Body */}
      <div className="bg-white rounded-b-3xl border-x border-b border-gray-100 p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {jobData.description}
              </p>
            </section>

            {jobData.sections?.map((section, idx) => (
              <section key={idx}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-lg">
                      <span className="text-blue-500">•</span> {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Perks</h3>
              <ul className="space-y-2">
                {jobData.perks?.map((perk, i) => (
                  <li key={i} className="text-blue-800 text-sm flex items-center gap-2">
                    ✅ {perk}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// Helper component for the info grid
const DetailItem = ({ label, value, icon }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-gray-800 font-semibold truncate">{icon} {value}</span>
  </div>
);

export default JobDetails;