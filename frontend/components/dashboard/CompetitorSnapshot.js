'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

export default function CompetitorSnapshot() {
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    fetchCompetitors();
  }, []);

  const fetchCompetitors = async () => {
    try {
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/competitor/${locationId}`);
      setCompetitors(response.data);
    } catch (error) {
      console.error('Error fetching competitors:', error);
    }
  };

  if (competitors.length === 0) return <div>Loading competitors...</div>;

  // Prepare data for mini chart
  const chartData = competitors.slice(0, 3).map(comp => ({
    name: comp.competitorName.split(' ')[1] || comp.competitorName, // Short name
    rating: comp.rating,
  }));

  const avgRating = competitors.reduce((sum, comp) => sum + comp.rating, 0) / competitors.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Competitor Snapshot</h3>
        <Users size={20} className="text-slate-400" />
      </div>
      <div className="text-2xl font-bold text-cyan-400 mb-2">
        {avgRating.toFixed(1)}
      </div>
      <p className="text-sm text-slate-400 mb-4">Average competitor rating</p>
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Bar dataKey="rating" fill="#06B6D4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}