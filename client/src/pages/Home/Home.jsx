import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Navbar from "../../components/Navbar";

const Home = () => {
  const [userRole, setUserRole] = useState("candidate");
  const isCandidate = userRole === "candidate";
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleCtaClick = () => {
    if (isCandidate) {
      navigate("/jobs");
    } else {
      navigate("/post-job");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 transition-colors duration-300">
      
      {/* NAVBAR */}
      <Navbar setUserRole={setUserRole} isCandidate={isCandidate} userRole={userRole}/>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 md:px-10 md:py-24 max-w-6xl mx-auto gap-12">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
            {isCandidate ? "Candidate Portal" : "Recruiter Dashboard"}
          </span>
          
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            {isCandidate 
              ? "Find Your Next Career Destination" 
              : "Hire Your Next Engineering Star"}
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            {isCandidate 
              ? "Explore thousands of jobs from top companies tailored to your skills, passion, and goals." 
              : "Access a pool of 2M+ pre-vetted candidates and streamline your hiring process with AI."}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            {isCandidate ? (
              <>
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  className="px-5 py-4 w-full sm:w-80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                />
                <button 
                  onClick={() => navigate("/jobs")} // Navigate to JobList page
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Search Jobs
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate("/post-job")} // Navigate to PostJobs page
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Post a Job for Free
                </button>
                <button 
                  onClick={() => navigate("/jobs")} // Recruiters can also browse existing jobs
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Browse Talent
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hero Image / Graphic */}
        <div className="relative w-full max-w-[300px] md:max-w-[450px]">
          <div className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <img
            src={isCandidate 
              ? "https://cdn-icons-png.flaticon.com/512/942/942748.png" 
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Hero illustration"
            className="w-full h-auto relative z-10 drop-shadow-2xl"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-10 py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Powerful Features for {isCandidate ? "Candidates" : "Employers"}
          </h3>
          <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
            Everything you need to {isCandidate ? "land your dream job" : "build your dream team"} in one centralized platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getFeatures(isCandidate).map((feature, idx) => (
              <div key={idx} className="p-10 border border-gray-100 bg-gray-50 rounded-2xl hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="bg-blue-600 py-16 px-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
        <button 
          onClick={handleCtaClick}
          className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition shadow-xl"
        >
          {isCandidate ? "Browse Listings" : "Start Hiring Now"}
        </button>
      </section>
    </div>
  );
};

// Helper function for dynamic content
const getFeatures = (isCandidate) => {
  if (isCandidate) {
    return [
      { title: "Smart Matching", desc: "Our algorithm matches your unique profile with the best salary and benefits.", icon: "⚡" },
      { title: "One-Click Apply", desc: "Apply to hundreds of verified listings instantly with your saved profile.", icon: "🖱️" },
      { title: "Growth Insights", desc: "See how you rank against other applicants and get tips to improve.", icon: "📈" }
    ];
  }
  return [
    { title: "Global Talent Pool", desc: "Source developers, designers, and managers from over 150 countries.", icon: "🌍" },
    { title: "Automated Screening", desc: "Let our AI filter the top 5% of candidates based on your tech stack.", icon: "🤖" },
    { title: "Team Collaboration", desc: "Integrated tools for your hiring team to rate and track candidates.", icon: "👥" }
  ];
};

export default Home;