import { Star, MapPin } from 'lucide-react';

export default function LocationsTable() {
  // Dummy data
  const locations = [
    { id: 1, name: 'Main Store', address: '123 Main St, City, State', rating: 4.5, reviews: 128, status: 'Active' },
    { id: 2, name: 'Branch Office', address: '456 Oak Ave, City, State', rating: 4.2, reviews: 89, status: 'Active' },
    { id: 3, name: 'Downtown Location', address: '789 Pine St, City, State', rating: 4.7, reviews: 203, status: 'Active' },
    { id: 4, name: 'Suburb Store', address: '321 Elm St, City, State', rating: 3.9, reviews: 67, status: 'Pending' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-100">Business Locations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Reviews</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {locations.map((location) => (
              <tr key={location.id} className="hover:bg-slate-700/20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-slate-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-slate-100">{location.name}</div>
                      <div className="text-sm text-slate-400">{location.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span className="text-sm text-slate-100">{location.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">
                  {location.reviews}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    location.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {location.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}