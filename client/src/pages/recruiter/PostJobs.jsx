import React, { useState } from 'react';
import axios from "axios";
import { Plus, X, Briefcase, DollarSign, MapPin, Building2, Link, ListChecks, Heart, Send, Sparkles } from 'lucide-react';

const INITIAL_STATE = {
  title: '',
  status: 'Active',
  company: { name: '', logo: '', website: '', industry: '' },
  location: { city: '', state: '', type: 'Remote' },
  compensation: { min: '', max: '', currency: 'USD', bonus: '' },
  employmentDetails: { type: 'Full-time', experienceLevel: '', department: '' },
  techStack: [],
  description: '',
  responsibilities: [],
  benefits: [],
  applicationProcess: { steps: [], applyUrl: '' }
};

const PostJobs = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle nested object updates (up to 3 levels)
  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addItem = (field) => setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  
  const removeItem = (field, index) => setFormData(prev => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index)
  }));

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const payload = {
        ...formData,
        compensation: {
          ...formData.compensation,
          min: Number(formData.compensation.min) || 0,
          max: Number(formData.compensation.max) || 0
        },
        postedAt: new Date().toISOString()
      };

      // Replace with your actual API endpoint
      await axios.post('/jobs', payload);
      
      setMessage({ text: 'Job Published Successfully! 🚀', type: 'success' });
      setFormData(INITIAL_STATE); // Reset form on success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to post job. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-12 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gray-900 p-8 md:p-12 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
              Post an Opportunity <Sparkles className="text-yellow-400" />
            </h2>
            <p className="text-gray-400 font-medium mt-3 text-lg">Broadcast your opening to the world's best talent.</p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Briefcase size={120} />
          </div>
        </div>

        <div className="p-8 md:p-12">
          {message.text && (
            <div className={`mb-10 p-5 rounded-2xl flex items-center gap-3 animate-bounce ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-bold">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-16">
            
            {/* Section 1: Company Identity */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 size={20}/></div>
                <h3 className="text-xl font-bold text-gray-800">Company Identity</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Job Title" name="title" value={formData.title} onChange={handleNestedChange} placeholder="e.g. Senior Product Designer" required />
                <InputGroup label="Company Name" name="company.name" value={formData.company.name} onChange={handleNestedChange} placeholder="e.g. Acme Corp" required />
                <InputGroup label="Logo URL" name="company.logo" value={formData.company.logo} onChange={handleNestedChange} placeholder="https://logo.com/img.png" />
                <InputGroup label="Apply Link" name="applicationProcess.applyUrl" value={formData.applicationProcess.applyUrl} onChange={handleNestedChange} placeholder="https://careers.company.com/job-1" required />
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Section 2: Logistics & Pay */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign size={20}/></div>
                <h3 className="text-xl font-bold text-gray-800">Logistics & Compensation</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InputGroup label="Location Type" name="location.type" value={formData.location.type} onChange={handleNestedChange} type="select" options={['Remote', 'On-site', 'Hybrid']} />
                <InputGroup label="City" name="location.city" value={formData.location.city} onChange={handleNestedChange} placeholder="e.g. New York" />
                <InputGroup label="Min Salary" name="compensation.min" value={formData.compensation.min} onChange={handleNestedChange} type="number" placeholder="0" />
                <InputGroup label="Max Salary" name="compensation.max" value={formData.compensation.max} onChange={handleNestedChange} type="number" placeholder="0" />
                <InputGroup label="Experience" name="employmentDetails.experienceLevel" value={formData.employmentDetails.experienceLevel} onChange={handleNestedChange} placeholder="e.g. 3-5 Years" />
                <InputGroup label="Employment Type" name="employmentDetails.type" value={formData.employmentDetails.type} onChange={handleNestedChange} type="select" options={['Full-time', 'Contract', 'Part-time', 'Freelance']} />
              </div>
            </section>

            {/* Section 3: Dynamic Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <ArrayInput label="Tech Stack" field="techStack" items={formData.techStack} onAdd={addItem} onRemove={removeItem} onChange={handleArrayChange} icon={<Sparkles size={14}/>} />
              <ArrayInput label="Responsibilities" field="responsibilities" items={formData.responsibilities} onAdd={addItem} onRemove={removeItem} onChange={handleArrayChange} icon={<ListChecks size={14}/>} />
            </div>

            <ArrayInput label="Employee Benefits" field="benefits" items={formData.benefits} onAdd={addItem} onRemove={removeItem} onChange={handleArrayChange} icon={<Heart size={14}/>} />

            {/* Description */}
            <section className="space-y-4">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Detailed Description
              </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleNestedChange} 
                rows="6"
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none text-gray-700 leading-relaxed"
                placeholder="What makes this role unique? Describe the team, the mission, and the impact..."
              />
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:bg-gray-200 disabled:shadow-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? 'Processing...' : (
                  <>Publish Job Position <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-Components
const InputGroup = ({ label, type = "text", options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    {type === "select" ? (
      <select {...props} className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all appearance-none font-medium text-gray-700 cursor-pointer">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    ) : (
      <input type={type} {...props} className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-300" />
    )}
  </div>
);

const ArrayInput = ({ label, field, items, onAdd, onRemove, onChange, icon }) => (
  <div className="bg-gray-50/50 p-8 rounded-3xl border-2 border-gray-50 space-y-4">
    <div className="flex justify-between items-center">
      <h4 className="flex items-center gap-2 text-sm font-black text-gray-600 uppercase tracking-tight">
        {icon} {label}
      </h4>
      <button 
        type="button" 
        onClick={() => onAdd(field)} 
        className="flex items-center gap-1 px-3 py-1.5 bg-white text-blue-600 text-xs font-bold rounded-lg border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
      >
        <Plus size={14} /> Add
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 group animate-in fade-in slide-in-from-left-2">
          <input 
            value={item} 
            onChange={(e) => onChange(field, idx, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}...`}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-400 outline-none text-sm transition-all shadow-sm group-hover:border-gray-300" 
          />
          <button 
            type="button" 
            onClick={() => onRemove(field, idx)} 
            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium italic">No items added to {label} yet.</p>
        </div>
      )}
    </div>
  </div>
);

export default PostJobs;