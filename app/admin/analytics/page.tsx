'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { format, subDays } from 'date-fns';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-gold-400" />
      </div>
    );
  }

  const { stats, visitorChart } = data;

  const chartData = visitorChart.map((d: any) => ({
    date: format(new Date(d._id), 'MMM dd'),
    visitors: d.count,
  }));

  const deviceData = [
    { name: 'Desktop', value: 54, color: '#C49A3C' },
    { name: 'Mobile', value: 38, color: '#B8A898' },
    { name: 'Tablet', value: 8, color: '#3D3D37' },
  ];

  const pageData = [
    { page: 'Home', views: 1240 },
    { page: 'Portfolio', views: 890 },
    { page: 'Pricing', views: 530 },
    { page: 'Booking', views: 420 },
    { page: 'Contact', views: 280 },
  ];

  return (
    <div className="max-w-7xl space-y-8">
      <div>
        <h1 className="font-display text-4xl font-light text-ivory-100">Analytics</h1>
        <p className="font-body text-sm text-mink-400 mt-1">Visitor insights & performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: 'Total Visitors', v: stats.totalVisitors.toLocaleString(), c: 'text-gold-400' },
          { l: "Today's Visitors", v: stats.todayVisitors.toLocaleString(), c: 'text-blue-400' },
          { l: 'Total Bookings', v: stats.totalBookings.toLocaleString(), c: 'text-emerald-400' },
          { l: 'Total Leads', v: stats.totalInquiries.toLocaleString(), c: 'text-purple-400' },
        ].map((s) => (
          <div key={s.l} className="bg-charcoal-900 border border-charcoal-700 p-6">
            <div className={`font-display text-4xl font-light mb-1 ${s.c}`}>{s.v}</div>
            <div className="font-body text-xs tracking-widest uppercase text-mink-400">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visitor Area Chart */}
        <div className="lg:col-span-2 bg-charcoal-900 border border-charcoal-700 p-6">
          <h3 className="font-body text-sm text-mink-300 tracking-widest uppercase mb-6">Visitors (Last 7 Days)</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C49A3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C49A3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A25" />
                <XAxis dataKey="date" tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1A1A17', border: '1px solid #3D3D37', color: '#FAF8F2', fontSize: 12 }} />
                <Area type="monotone" dataKey="visitors" stroke="#C49A3C" strokeWidth={2} fill="url(#grad1)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-mink-500 font-body text-sm">
              No visitor data yet. Data will appear after real visitors arrive.
            </div>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-charcoal-900 border border-charcoal-700 p-6">
          <h3 className="font-body text-sm text-mink-300 tracking-widest uppercase mb-6">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {deviceData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1A1A17', border: '1px solid #3D3D37', color: '#FAF8F2', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="font-body text-xs text-mink-300">{d.name}</span>
                </div>
                <span className="font-body text-xs text-mink-400">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-charcoal-900 border border-charcoal-700 p-6">
        <h3 className="font-body text-sm text-mink-300 tracking-widest uppercase mb-6">Top Pages</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={pageData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A25" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="page" tick={{ fill: '#9C8878', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
            <Tooltip contentStyle={{ background: '#1A1A17', border: '1px solid #3D3D37', color: '#FAF8F2', fontSize: 12 }} />
            <Bar dataKey="views" fill="#C49A3C" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
