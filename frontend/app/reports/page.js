'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Globe, Phone, MapPin, Calendar, Eye } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/reports/${locationId}`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading reports...</div>;

  // Prepare data for charts
  const trendData = reports.map(report => ({
    date: new Date(report.date).toLocaleDateString(),
    websiteClicks: report.websiteClicks,
    callClicks: report.callClicks,
    directionsRequests: report.directionsRequests,
    bookings: report.bookings,
    impressions: report.impressions,
  }));

  // Device breakdown (mock data since not in schema)
  const deviceData = [
    { name: 'Mobile', value: 65, color: '#06B6D4' },
    { name: 'Desktop', value: 30, color: '#10B981' },
    { name: 'Tablet', value: 5, color: '#F59E0B' },
  ];

  // Calculate totals
  const totals = reports.reduce((acc, report) => ({
    websiteClicks: acc.websiteClicks + report.websiteClicks,
    callClicks: acc.callClicks + report.callClicks,
    directionsRequests: acc.directionsRequests + report.directionsRequests,
    bookings: acc.bookings + report.bookings,
    impressions: acc.impressions + report.impressions,
  }), { websiteClicks: 0, callClicks: 0, directionsRequests: 0, bookings: 0, impressions: 0 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Performance Reports</h1>
        <p className="text-slate-400 mt-2">Track your business performance metrics over time.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Website Clicks</p>
              <p className="text-2xl font-bold text-cyan-400">{totals.websiteClicks}</p>
            </div>
            <Globe size={24} className="text-cyan-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Call Clicks</p>
              <p className="text-2xl font-bold text-green-400">{totals.callClicks}</p>
            </div>
            <Phone size={24} className="text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Directions</p>
              <p className="text-2xl font-bold text-yellow-400">{totals.directionsRequests}</p>
            </div>
            <MapPin size={24} className="text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Bookings</p>
              <p className="text-2xl font-bold text-purple-400">{totals.bookings}</p>
            </div>
            <Calendar size={24} className="text-purple-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Impressions</p>
              <p className="text-2xl font-bold text-red-400">{totals.impressions.toLocaleString()}</p>
            </div>
            <Eye size={24} className="text-red-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="websiteClicks" stroke="#06B6D4" strokeWidth={2} />
              <Line type="monotone" dataKey="callClicks" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="directionsRequests" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="bookings" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {deviceData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-slate-300">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-100">Detailed Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Website Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Call Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Directions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-slate-700/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.websiteClicks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.callClicks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.directionsRequests}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.bookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.impressions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}