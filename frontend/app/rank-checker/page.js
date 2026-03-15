'use client';

import { useState } from 'react';
import { Search, MapPin, TrendingUp } from 'lucide-react';

export default function RankCheckerPage() {
  const [formData, setFormData] = useState({
    businessLocation: '',
    keyword: '',
    searchRadius: '5',
  });
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleCheckRank = async () => {
    setChecking(true);
    // Mock rank checking
    setTimeout(() => {
      setResult({
        position: Math.floor(Math.random() * 20) + 1,
        totalResults: 50,
        searchQuery: formData.keyword,
        location: formData.businessLocation,
      });
      setChecking(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Local Rank Checker</h1>
        <p className="text-slate-400 mt-2">Check your business ranking in local search results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
            <Search size={20} className="mr-2" />
            Rank Check Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Business Location</label>
              <input
                type="text"
                value={formData.businessLocation}
                onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                placeholder="e.g., New York, NY"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Keyword</label>
              <input
                type="text"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                placeholder="e.g., restaurant near me"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Search Radius (km)</label>
              <select
                value={formData.searchRadius}
                onChange={(e) => setFormData({ ...formData, searchRadius: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="1">1 km</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
              </select>
            </div>

            <button
              onClick={handleCheckRank}
              disabled={checking || !formData.businessLocation || !formData.keyword}
              className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Search size={20} />
              <span>{checking ? 'Checking Rank...' : 'Check Local Rank'}</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Rank Results
          </h3>

          {result ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-cyan-400 mb-2">#{result.position}</div>
                <p className="text-slate-400">Your ranking position</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-100">{result.totalResults}</div>
                  <p className="text-sm text-slate-400">Total Results</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-100">{formData.searchRadius}km</div>
                  <p className="text-sm text-slate-400">Search Radius</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-medium text-slate-100 mb-2">Search Details</h4>
                <div className="space-y-1 text-sm text-slate-300">
                  <p><span className="text-slate-400">Query:</span> {result.searchQuery}</p>
                  <p><span className="text-slate-400">Location:</span> {result.location}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                result.position <= 3 ? 'bg-green-900/50 border border-green-700' :
                result.position <= 10 ? 'bg-yellow-900/50 border border-yellow-700' :
                'bg-red-900/50 border border-red-700'
              }`}>
                <h4 className="font-medium text-slate-100 mb-2">Ranking Status</h4>
                <p className="text-sm text-slate-300">
                  {result.position <= 3 ? 'Excellent! You appear in the top 3 results.' :
                   result.position <= 10 ? 'Good! You appear in the top 10 results.' :
                   'Consider optimizing your local SEO to improve your ranking.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <MapPin size={48} className="mx-auto mb-4 opacity-50" />
              <p>Enter search parameters and check your local ranking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}