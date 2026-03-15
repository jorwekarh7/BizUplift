'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Crown, Zap } from 'lucide-react';

export default function PlanPage() {
  const [plans, setPlans] = useState({});
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subscriptions/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const userId = 'user1';
      const response = await axios.get(`http://localhost:5000/api/subscriptions/user/${userId}`);
      setCurrentSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planKey) => {
    try {
      const userId = 'user1';
      await axios.post(`http://localhost:5000/api/subscriptions/user/${userId}/upgrade`, { plan: planKey });
      alert('Subscription upgraded successfully!');
      fetchCurrentSubscription();
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      alert('Failed to upgrade subscription');
    }
  };

  if (loading) return <div className="p-6">Loading plans...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Manage Plan</h1>
        <p className="text-slate-400 mt-2">Choose the plan that fits your business needs.</p>
      </div>

      {currentSubscription && (
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Current Plan</h3>
          <div className="flex items-center space-x-2">
            <Crown size={20} className="text-yellow-400" />
            <span className="text-slate-100 capitalize">{currentSubscription.plan} Plan</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">
              Expires: {new Date(currentSubscription.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className={`bg-slate-800/50 backdrop-blur-lg border rounded-lg p-6 ${
              currentSubscription?.plan === key
                ? 'border-cyan-500 bg-slate-800/70'
                : 'border-slate-700/50'
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-100 capitalize">{plan.name}</h3>
              <div className="text-3xl font-bold text-cyan-400 mt-2">
                ${plan.price}
                <span className="text-lg text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
              <li className="flex items-center space-x-2">
                <Zap size={16} className="text-yellow-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{plan.credits} AI Credits</span>
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade(key)}
              disabled={currentSubscription?.plan === key}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                currentSubscription?.plan === key
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }`}
            >
              {currentSubscription?.plan === key ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}