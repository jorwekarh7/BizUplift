'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image as ImageIcon, Video, Filter } from 'lucide-react';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, image, video

  useEffect(() => {
    fetchMedia();
  }, [filter]);

  const fetchMedia = async () => {
    try {
      const locationId = 'location1';
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await axios.get(`http://localhost:5000/api/media/${locationId}`, { params });
      setMedia(response.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading media...</div>;

  const filteredMedia = media.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Photos and Videos</h1>
          <p className="text-slate-400 mt-2">Manage your Google Business media library.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-slate-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Media</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
          </select>
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-100 mb-2">No media found</h3>
          <p className="text-slate-400">No {filter === 'all' ? '' : filter + ' '}media items available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg overflow-hidden">
              <div className="aspect-square bg-slate-700/50 flex items-center justify-center">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt="Business media"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Video size={48} />
                    <span className="text-sm mt-2">Video</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'image'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.type === 'image' ? (
                      <ImageIcon size={12} className="mr-1" />
                    ) : (
                      <Video size={12} className="mr-1" />
                    )}
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors">
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}