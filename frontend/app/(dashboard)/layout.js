import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="ml-64 mt-16 p-6 bg-slate-950 min-h-screen">
        {children}
      </main>
    </>
  );
}