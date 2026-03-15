'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';

export default function AuditScoreWidget() {
  const [audit, setAudit] = useState(null);

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
    }
  };

  if (!audit) return <div>Loading audit...</div>;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Audit Score</h3>
        <TrendingUp size={20} className="text-slate-400" />
      </div>
      <div className={`text-3xl font-bold ${getScoreColor(audit.score)}`}>
        {audit.score}/100
      </div>
      <p className="text-sm text-slate-400 mt-2">
        {audit.suggestions[0]}
      </p>
    </div>
  );
}