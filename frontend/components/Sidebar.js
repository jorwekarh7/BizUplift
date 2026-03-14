import Link from 'next/link';
import {
  Home,
  CreditCard,
  Building,
  User,
  Zap,
  MessageSquare,
  Search,
  BarChart3,
  TrendingUp,
  FileText,
  Image,
  Camera,
  MapPin,
  Shield,
  Settings
} from 'lucide-react';

const menuItems = [
  { name: 'Manage Plan', icon: CreditCard, href: '/plan' },
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Google My Business', icon: Building, href: '/google-business' },
  { name: 'Business Profile', icon: User, href: '/business-profile' },
  { name: 'One-Click Optimization', icon: Zap, href: '/optimization' },
  { name: 'Reviews', icon: MessageSquare, href: '/reviews' },
  { name: 'Google Audit', icon: Search, href: '/audit' },
  { name: 'Competitor Analysis', icon: TrendingUp, href: '/competitor' },
  { name: 'Keyword Suggestions', icon: BarChart3, href: '/keywords' },
  { name: 'Reports', icon: FileText, href: '/reports' },
  { name: 'Posts', icon: FileText, href: '/posts' },
  { name: 'AI Generated Media', icon: Image, href: '/ai-media' },
  { name: 'Photos and Videos', icon: Camera, href: '/media' },
  { name: 'Local Rank Checker', icon: MapPin, href: '/rank-checker' },
  { name: 'Legal', icon: Shield, href: '/legal' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900/90 backdrop-blur-lg border-r border-slate-700/50 h-screen fixed left-0 top-0 p-4 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">LocalRank AI</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-cyan-400"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}