'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Download, Coins } from 'lucide-react';

export default function AIMediaPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [credits, setCredits] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchImages();
    fetchCredits();
  }, []);

  const fetchImages = async () => {
    try {
      const userId = 'user1'; // Mock user ID
      const response = await axios.get(`http://localhost:5000/api/ai-images?userId=${userId}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCredits = async () => {
    try {
      const userId = 'user1';
      const response = await axios.get(`http://localhost:5000/api/ai-images/credits/${userId}`);
      setCredits(response.data.totalCredits);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const generateImage = async () => {
    if (!prompt) return;

    setGenerating(true);
    try {
      const userId = 'user1';
      const response = await axios.post('http://localhost:5000/api/ai-images/generate', {
        prompt,
        category,
        userId,
      });
      setImages([response.data, ...images]);
      setPrompt('');
      setCategory('');
      fetchCredits(); // Refresh credits
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Check your credits.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="p-6">Loading AI media...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">AI Generated Media</h1>
          <p className="text-slate-400 mt-2">Create promotional images with AI.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg px-4 py-2">
          <Coins size={20} className="text-yellow-400" />
          <span className="text-slate-100 font-medium">{credits} Credits</span>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Generate New Image</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
              placeholder="Describe the image you want to generate..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category (optional)</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., promotional, social media"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            onClick={generateImage}
            disabled={generating || !prompt || credits <= 0}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Sparkles size={20} />
            <span>{generating ? 'Generating...' : 'Generate Image (1 Credit)'}</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Generated Images</h3>
        {images.length === 0 ? (
          <p className="text-slate-400">No images generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-slate-300 mb-2 line-clamp-2">{image.prompt}</p>
                  {image.category && (
                    <span className="inline-block px-2 py-1 text-xs bg-cyan-600 text-white rounded">
                      {image.category}
                    </span>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-slate-400">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}