'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Eye, MousePointer } from 'lucide-react';

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/keywords/${locationId}`);
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading keywords...</div>;

  // Prepare data for charts
  const impressionsData = keywords.slice(0, 10).map(kw => ({
    keyword: kw.keyword.length > 15 ? kw.keyword.substring(0, 15) + '...' : kw.keyword,
    impressions: kw.impressions,
  }));

  const clicksData = keywords.slice(0, 10).map(kw => ({
    keyword: kw.keyword.length > 15 ? kw.keyword.substring(0, 15) + '...' : kw.keyword,
    clicks: kw.clicks,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Keyword Insights</h1>
        <p className="text-slate-400 mt-2">Discover how users find your business online.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
            <Eye size={20} className="mr-2" />
            Top Keywords by Impressions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impressionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="keyword" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="impressions" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
            <MousePointer size={20} className="mr-2" />
            Top Keywords by Clicks
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clicksData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="keyword" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="clicks" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-100">Keyword Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Impressions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {keywords.map((kw, index) => (
                <tr key={index} className="hover:bg-slate-700/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">
                    {kw.keyword}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {kw.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {kw.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {((kw.clicks / kw.impressions) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}