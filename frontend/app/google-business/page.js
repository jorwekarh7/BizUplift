export default function GoogleBusinessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Google My Business</h1>
        <p className="text-slate-400 mt-2">Connect and manage your Google Business accounts.</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-12 text-center">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Connect Your Google Account</h2>
        <p className="text-slate-400 mb-6">Link your Google Business Profile to start optimizing your local presence.</p>
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          Connect Google Account
        </button>
      </div>
    </div>
  );
}