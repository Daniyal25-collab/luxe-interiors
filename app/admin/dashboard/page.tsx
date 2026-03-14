'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Users, Calendar, MessageSquare, FolderOpen, TrendingUp, IndianRupee, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Stats {
  totalVisitors: number;
  todayVisitors: number;
  totalBookings: number;
  pendingBookings: number;
  totalInquiries: number;
  unreadInquiries: number;
  totalProjects: number;
  totalRevenue: number;
}

const statCards = (stats: Stats) => [
  {
    label: 'Total Visitors',
    value: stats.totalVisitors.toLocaleString(),
    sub: `${stats.todayVisitors} today`,
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    label: 'Bookings',
    value: stats.totalBookings.toLocaleString(),
    sub: `${stats.pendingBookings} pending`,
    icon: Calendar,
    color: 'text-gold-400',
    bg: 'bg-gold-400/10',
  },
  {
    label: 'Inquiries',
    value: stats.totalInquiries.toLocaleString(),
    sub: `${stats.unreadInquiries} unread`,
    icon: MessageSquare,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    label: 'Revenue',
    value: `₹${(stats.totalRevenue / 100).toLocaleString('en-IN')}`,
    sub: 'from paid bookings',
    icon: IndianRupee,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-gold-400" />
      </div>
    );
  }

  const { stats, recentBookings, visitorChart } = data;

  // Fill in missing days
  const chartData = visitorChart.map((d: any) => ({
    date: format(new Date(d._id), 'MMM dd'),
    visitors: d.count,
  }));

  const planColors: Record<string, string> = {
    lite: '#9C8878',
    pro: '#C49A3C',
    promax: '#1A1A17',
  };

  return (
    <div className="max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-light text-ivory-100">
          Dashboard
        </h1>
        <p className="font-body text-sm text-mink-400 mt-1">
          {format(new Date(), 'EEEE, MMMM d yyyy')}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards(stats).map((card) => (
          <div key={card.label} className="bg-charcoal-900 border border-charcoal-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${card.bg} flex items-center justify-center`}>
                <card.icon size={18} className={card.color} />
              </div>
            </div>
            <div className="font-display text-3xl font-light text-ivory-100 mb-1">
              {card.value}
            </div>
            <div className="font-body text-xs text-mink-400">{card.label}</div>
            <div className="font-body text-xs text-mink-500 mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visitor Chart */}
        <div className="bg-charcoal-900 border border-charcoal-700 p-6">
          <h3 className="font-body text-sm text-mink-300 tracking-widest uppercase mb-6">
            Visitor Trend (7 Days)
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C49A3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C49A3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A25" />
                <XAxis dataKey="date" tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1A1A17', border: '1px solid #3D3D37', color: '#FAF8F2', fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#C49A3C"
                  strokeWidth={2}
                  fill="url(#visitorGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-mink-500 font-body text-sm">
              No visitor data yet
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-charcoal-900 border border-charcoal-700 p-6">
          <h3 className="font-body text-sm text-mink-300 tracking-widest uppercase mb-6">
            Recent Bookings
          </h3>
          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="font-body text-sm text-mink-500">No bookings yet</p>
            ) : (
              recentBookings.map((b: any) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between py-3 border-b border-charcoal-700 last:border-0"
                >
                  <div>
                    <p className="font-body text-sm text-ivory-200">{b.name}</p>
                    <p className="font-body text-xs text-mink-500">{b.projectType} · {b.city}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-accent text-xs tracking-widest uppercase px-2 py-1"
                      style={{
                        background: planColors[b.plan] + '22',
                        color: planColors[b.plan],
                        border: `1px solid ${planColors[b.plan]}44`,
                      }}
                    >
                      {b.plan}
                    </span>
                    <span
                      className={`font-body text-xs px-2 py-1 ${
                        b.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : b.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-mink-400/10 text-mink-400'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/admin/projects', label: 'Manage Projects', count: stats.totalProjects },
          { href: '/admin/bookings', label: 'View Bookings', count: stats.pendingBookings + ' pending' },
          { href: '/admin/inquiries', label: 'Inquiries', count: stats.unreadInquiries + ' unread' },
          { href: '/portfolio', label: 'View Portfolio', count: '↗ live site', external: true },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="bg-charcoal-900 border border-charcoal-700 p-5 hover:border-gold-500/50 transition-all duration-300 group"
          >
            <div className="font-body text-xs text-mink-400 mb-2">{item.label}</div>
            <div className="font-display text-2xl font-light text-gold-400 group-hover:text-gold-300 transition-colors">
              {item.count}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
