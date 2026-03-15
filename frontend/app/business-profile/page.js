export default function BusinessProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Business Profile</h1>
        <p className="text-slate-400 mt-2">View and manage your business profile information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Profile Picture</h3>
          <div className="w-32 h-32 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
            <span className="text-slate-400">No Image</span>
          </div>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
            Upload Image
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Account Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400">Account Name</label>
              <p className="text-slate-100">Business Name</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400">Email</label>
              <p className="text-slate-100">business@example.com</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400">Connection Status</label>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}