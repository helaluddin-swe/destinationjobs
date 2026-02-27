import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import JobList from './components/JobList';
import PostJobs from './pages/recruiter/PostJobs';
import Home from './pages/Home/Home';
import JobDetails from './components/JobDetails';

const App=()=> {
  

  return (
   
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id/:slug" element={<JobDetails/>} />
        <Route path="/post-job" element={<PostJobs />} />
      </Routes>
    
  );
}
export default App