'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Assume locationId from context or params, for now hardcode
      const locationId = 'location1';
      const response = await axios.get(`http://localhost:5000/api/reviews/${locationId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedReview || !replyText) return;

    try {
      await axios.post(`http://localhost:5000/api/reviews/${selectedReview.reviewId}/reply`, {
        replyText,
      });
      setReplyText('');
      setSelectedReview(null);
      fetchReviews(); // Refresh
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  const generateAIReply = async () => {
    if (!selectedReview) return;

    setGeneratingAI(true);
    try {
      const response = await axios.post('http://localhost:5000/api/reviews/generate-ai-reply', {
        reviewText: selectedReview.comment,
        rating: selectedReview.rating,
      });
      setReplyText(response.data.aiReply);
    } catch (error) {
      console.error('Error generating AI reply:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  if (loading) return <div className="p-6">Loading reviews...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Reviews</h1>
        <p className="text-slate-400 mt-2">Manage and respond to customer reviews.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-slate-100">{review.reviewerName}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{review.comment}</p>
                {review.reply && (
                  <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-slate-400 mb-2">Your reply:</p>
                    <p className="text-slate-200">{review.reply.replyText}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedReview(review)}
                className="ml-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              >
                <MessageSquare size={16} className="inline mr-2" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedReview && (
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">
            Reply to {selectedReview.reviewerName}
          </h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={4}
            placeholder="Write your reply..."
          />
          <div className="flex space-x-3 mt-4">
            <button
              onClick={generateAIReply}
              disabled={generatingAI}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Sparkles size={16} className="inline mr-2" />
              {generatingAI ? 'Generating...' : 'Generate AI Reply'}
            </button>
            <button
              onClick={handleReply}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <Send size={16} className="inline mr-2" />
              Send Reply
            </button>
            <button
              onClick={() => setSelectedReview(null)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}