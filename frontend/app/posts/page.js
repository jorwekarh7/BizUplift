'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', media: '' });
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiTopic, setAiTopic] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/posts/${locationId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content) return;

    try {
      const locationId = 'location1';
      await axios.post(`http://localhost:5000/api/posts/${locationId}`, newPost);
      setNewPost({ content: '', media: '' });
      setShowCreateForm(false);
      fetchPosts(); // Refresh
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const generateAIPost = async () => {
    if (!aiTopic) return;

    setGeneratingAI(true);
    try {
      const response = await axios.post('http://localhost:5000/api/posts/generate-ai-post', {
        topic: aiTopic,
        tone: 'engaging',
      });
      setNewPost({ ...newPost, content: response.data.aiPost });
      setAiTopic('');
    } catch (error) {
      console.error('Error generating AI post:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  if (loading) return <div className="p-6">Loading posts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Google Posts Manager</h1>
          <p className="text-slate-400 mt-2">Create and manage your Google Business posts.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Post</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Create New Post</h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">AI Post Generator</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Enter topic (e.g., 'new menu items')"
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={generateAIPost}
                  disabled={generatingAI || !aiTopic}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <Sparkles size={16} />
                  <span>{generatingAI ? 'Generating...' : 'Generate'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Post Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={4}
                placeholder="Write your post content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Media URL (optional)</label>
              <input
                type="url"
                value={newPost.media}
                onChange={(e) => setNewPost({ ...newPost, media: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCreatePost}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              Create Post
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-slate-100 mb-2">{post.content}</p>
                {post.media && (
                  <div className="mb-2">
                    <ImageIcon size={16} className="inline mr-2 text-slate-400" />
                    <span className="text-sm text-slate-400">Media attached</span>
                  </div>
                )}
                <p className="text-sm text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}