'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, MessageSquare, Camera, Video } from 'lucide-react';

export default function CompetitorPage() {
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading competitors...</div>;

  // Prepare data for charts
  const ratingData = competitors.map(comp => ({
    name: comp.competitorName,
    rating: comp.rating,
  }));

  const reviewData = competitors.map(comp => ({
    name: comp.competitorName,
    reviews: comp.reviewCount,
  }));

  const mediaData = competitors.map(comp => ({
    name: comp.competitorName,
    photos: comp.photosCount,
    videos: comp.videosCount,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Competitor Analysis</h1>
        <p className="text-slate-400 mt-2">Compare your performance with nearby competitors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Average Ratings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="rating" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Review Counts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="reviews" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Competitor Details</h3>
        <div className="space-y-4">
          {competitors.map((comp) => (
            <div key={comp.id} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-slate-100 mb-3">{comp.competitorName}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-slate-300">{comp.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} className="text-blue-400" />
                  <span className="text-slate-300">{comp.reviewCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera size={16} className="text-green-400" />
                  <span className="text-slate-300">{comp.photosCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video size={16} className="text-purple-400" />
                  <span className="text-slate-300">{comp.videosCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}