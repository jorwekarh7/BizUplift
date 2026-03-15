'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AuditPage() {
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    try {
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/audit/${locationId}`);
      setAudit(response.data);
    } catch (error) {
      console.error('Error fetching audit:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading audit...</div>;

  if (!audit) return <div className="p-6">No audit data available.</div>;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle size={24} className="text-green-400" />;
    if (score >= 60) return <AlertTriangle size={24} className="text-yellow-400" />;
    return <AlertTriangle size={24} className="text-red-400" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Google Audit</h1>
        <p className="text-slate-400 mt-2">Local SEO audit score and improvement suggestions.</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Overall Score</h2>
            <p className="text-slate-400">Based on your Google Business Profile</p>
          </div>
          <div className="text-right">
            <div className={`text-6xl font-bold ${getScoreColor(audit.score)}`}>
              {audit.score}
            </div>
            <div className="text-slate-400">/100</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(audit.categories).map(([category, score]) => (
            <div key={category} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {getScoreIcon(score)}
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2" />
          Improvement Suggestions
        </h3>
        <ul className="space-y-3">
          {audit.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}