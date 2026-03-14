'use client';

import { Bell, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="h-16 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700/50 fixed top-0 left-64 right-0 z-10 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
          <Bell size={20} className="text-slate-300" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-slate-300">{session?.user?.name || 'Guest'}</span>
          {session && (
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <LogOut size={16} className="text-slate-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
