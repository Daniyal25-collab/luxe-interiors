'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderOpen,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout for login page
  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-charcoal-800 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal-900 border-r border-charcoal-700 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-charcoal-700">
          <Link href="/" target="_blank" className="flex flex-col leading-none">
            <span className="font-accent text-xs tracking-widest uppercase text-gold-400">Luxe</span>
            <span className="font-display text-2xl font-light text-ivory-100">Interiors</span>
          </Link>
          <p className="font-body text-xs text-mink-400 mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`admin-sidebar-link ${pathname === href ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span className="font-body text-sm">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-charcoal-700 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-mink-300 hover:text-red-400 transition-colors duration-300 font-body text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal-900/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-charcoal-900 border-b border-charcoal-700 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-mink-300 hover:text-ivory-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="font-body text-xs text-mink-400 hover:text-gold-400 transition-colors duration-300"
            >
              View Site ↗
            </Link>
            <div className="w-8 h-8 bg-gold-500 flex items-center justify-center">
              <span className="font-body text-xs font-medium text-ivory-50">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
