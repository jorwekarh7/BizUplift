import MetricCard from '@/components/dashboard/MetricCard';
import LocationsTable from '@/components/dashboard/LocationsTable';
import AuditScoreWidget from '@/components/dashboard/AuditScoreWidget';
import CompetitorSnapshot from '@/components/dashboard/CompetitorSnapshot';
import { Building, MapPin, MessageSquare, Star } from 'lucide-react';

export default function Dashboard() {
  // Dummy data
  const metrics = [
    { title: 'Total Business Accounts', value: '12', icon: Building, color: 'cyan' },
    { title: 'Total Locations', value: '45', icon: MapPin, color: 'green' },
    { title: 'Total Reviews', value: '1,234', icon: MessageSquare, color: 'yellow' },
    { title: 'Average Rating', value: '4.2', icon: Star, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back! Here's an overview of your Google Business performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <CompetitorSnapshot />
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <AuditScoreWidget />
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Recent Reviews</h2>
        <p className="text-slate-400">Recent reviews coming soon...</p>
      </div>

      <LocationsTable />
    </div>
  );
}
