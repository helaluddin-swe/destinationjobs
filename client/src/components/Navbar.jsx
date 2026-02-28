import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PostJobs from '../pages/recruiter/PostJobs';


const Navbar = ({ isCandidate, setUserRole }) => {
  const navigate = useNavigate();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleMainAction = () => {
    if (isCandidate) {
      // Candidates go to the full page
      navigate('/jobs');
    } else {
      // Recruiters open the modal
      setIsPostModalOpen(true);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">
            DestinationJobs
          </Link>
          
          <div className="hidden md:flex bg-gray-100 p-1 rounded-full ml-6">
            <button 
              onClick={() => setUserRole("candidate")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${isCandidate ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Candidates
            </button>
            <button 
              onClick={() => setUserRole("recruiter")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${!isCandidate ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Recruiters
            </button>
          </div>
        </div>
        
        <ul className="flex items-center gap-8 font-semibold text-gray-700">
          <li 
            onClick={handleMainAction}
            className="hover:text-blue-600 cursor-pointer hidden sm:block transition-all"
          >
            {isCandidate ? "Browse Jobs" : "Post a Job"}
          </li>
          <li className="hover:text-blue-600 cursor-pointer hidden sm:block">Pricing</li>
          <button className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Login</button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up</button>
        </ul>
      </nav>

      {/* --- POST JOBS MODAL --- */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsPostModalOpen(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="p-2">
               {/* Pass a onSuccess prop to close modal after posting */}
              <PostJobs onSuccess={() => setIsPostModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;