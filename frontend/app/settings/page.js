'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Bell, MessageSquare, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    password: '',
    whatsappNotifications: false,
    autoReviewReplies: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const userId = 'user1'; // Mock user ID
      const response = await axios.get(`http://localhost:5000/api/settings/${userId}`);
      setSettings({ ...settings, ...response.data });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = 'user1';
      await axios.put(`http://localhost:5000/api/settings/${userId}`, settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
            <User size={20} className="mr-2" />
            Profile Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={settings.name || ''}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
            <Lock size={20} className="mr-2" />
            Change Password
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
              <input
                type="password"
                value={settings.password || ''}
                onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
            <Bell size={20} className="mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="whatsapp"
                checked={settings.whatsappNotifications}
                onChange={(e) => setSettings({ ...settings, whatsappNotifications: e.target.checked })}
                className="mr-3"
              />
              <label htmlFor="whatsapp" className="text-slate-300 flex items-center">
                <MessageSquare size={16} className="mr-2" />
                WhatsApp Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoReplies"
                checked={settings.autoReviewReplies}
                onChange={(e) => setSettings({ ...settings, autoReviewReplies: e.target.checked })}
                className="mr-3"
              />
              <label htmlFor="autoReplies" className="text-slate-300">
                Auto-generate review replies
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}