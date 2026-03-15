'use client';

import { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';

export default function OptimizationPage() {
  const [formData, setFormData] = useState({
    location: '',
    primaryCategory: '',
    additionalCategories: '',
    businessDescription: '',
    services: '',
    bookingUrl: '',
  });
  const [generating, setGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    setGenerating(true);
    // Mock AI generation
    setTimeout(() => {
      setFormData({
        ...formData,
        businessDescription: 'A premier local business offering exceptional services with a focus on customer satisfaction and quality. We pride ourselves on delivering outstanding results and building lasting relationships with our community.',
      });
      setGenerating(false);
    }, 2000);
  };

  const handleOptimize = () => {
    alert('Optimization suggestions applied! Check your Google Business Profile.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">One-Click Optimization</h1>
        <p className="text-slate-400 mt-2">Optimize your business listing with AI-powered suggestions.</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
          <Zap size={20} className="mr-2" />
          Business Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select location</option>
              <option value="main">Main Store</option>
              <option value="branch">Branch Office</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Primary Category</label>
            <input
              type="text"
              value={formData.primaryCategory}
              onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
              placeholder="e.g., Restaurant"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Additional Categories</label>
            <input
              type="text"
              value={formData.additionalCategories}
              onChange={(e) => setFormData({ ...formData, additionalCategories: e.target.value })}
              placeholder="e.g., Italian Restaurant, Pizza Place"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Business Description</label>
            <textarea
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={4}
              placeholder="Describe your business..."
            />
            <button
              onClick={handleGenerateDescription}
              disabled={generating}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Sparkles size={16} />
              <span>{generating ? 'Generating...' : 'Generate AI Description'}</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Services</label>
            <input
              type="text"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="e.g., Dining, Takeout, Delivery"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Booking URL</label>
            <input
              type="url"
              value={formData.bookingUrl}
              onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleOptimize}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Zap size={20} />
            <span>Apply Optimization</span>
          </button>
        </div>
      </div>
    </div>
  );
}