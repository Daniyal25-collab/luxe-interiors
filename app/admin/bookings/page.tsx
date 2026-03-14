'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Search, Filter } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-mink-400/10 text-mink-300 border-mink-400/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const planLabels: Record<string, string> = { lite: 'Lite', pro: 'Pro', promax: 'Pro Max' };

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<any>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/bookings?${params}`);
    const data = await res.json();
    setBookings(data.bookings || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
    if (selected?._id === id) setSelected((s: any) => ({ ...s, status }));
  };

  const filtered = bookings.filter((b) =>
    !search ||
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase()) ||
    b.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-light text-ivory-100">Bookings</h1>
          <p className="font-body text-sm text-mink-400 mt-1">{total} total bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mink-400" />
          <input
            type="text"
            placeholder="Search by name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-charcoal-900 border border-charcoal-700 pl-9 pr-4 py-3 font-body text-sm text-ivory-200 placeholder:text-mink-500 focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-charcoal-900 border border-charcoal-700 px-4 py-3 font-body text-sm text-ivory-200 focus:outline-none focus:border-gold-400 transition-colors"
        >
          <option value="">All Statuses</option>
          {['pending', 'contacted', 'active', 'completed', 'cancelled'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
          ) : (
            <div className="bg-charcoal-900 border border-charcoal-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-charcoal-700">
                    {['Client', 'Plan', 'Project', 'Status', 'Date'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-mink-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-mink-500">No bookings found</td></tr>
                  ) : (
                    filtered.map((b) => (
                      <tr
                        key={b._id}
                        onClick={() => setSelected(b)}
                        className={`border-b border-charcoal-800 hover:bg-charcoal-800 cursor-pointer transition-colors ${selected?._id === b._id ? 'bg-charcoal-800' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-body text-sm text-ivory-200">{b.name}</p>
                          <p className="font-body text-xs text-mink-500">{b.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-accent text-xs tracking-widest uppercase text-gold-400">
                            {planLabels[b.plan]}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-mink-300">{b.projectType}</td>
                        <td className="px-4 py-3">
                          <span className={`font-body text-xs px-2 py-1 border ${statusColors[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-xs text-mink-400">
                          {format(new Date(b.createdAt), 'MMM d')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-charcoal-900 border border-charcoal-700 p-6 h-fit">
          {!selected ? (
            <div className="text-center py-12 text-mink-500 font-body text-sm">
              Select a booking to view details
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="font-display text-2xl font-light text-ivory-100">{selected.name}</h3>
                <p className="font-body text-xs text-mink-400">{selected.email}</p>
              </div>
              {[
                { l: 'Phone', v: selected.phone },
                { l: 'City', v: selected.city },
                { l: 'Plan', v: planLabels[selected.plan] },
                { l: 'Project', v: selected.projectType },
                { l: 'Budget', v: selected.budget },
                { l: 'Timeline', v: selected.timeline },
                { l: 'Payment', v: selected.paymentStatus },
              ].map((item) => (
                <div key={item.l} className="border-b border-charcoal-700 pb-3">
                  <p className="font-body text-xs tracking-widest uppercase text-mink-500 mb-1">{item.l}</p>
                  <p className="font-body text-sm text-ivory-200">{item.v}</p>
                </div>
              ))}
              {selected.message && (
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-mink-500 mb-1">Message</p>
                  <p className="font-body text-sm text-mink-200 leading-relaxed">{selected.message}</p>
                </div>
              )}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-mink-500 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'contacted', 'active', 'completed', 'cancelled'].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected._id, s)}
                      className={`font-body text-xs px-3 py-1.5 border transition-all duration-200 ${
                        selected.status === s
                          ? 'border-gold-400 text-gold-400 bg-gold-400/10'
                          : 'border-charcoal-600 text-mink-400 hover:border-mink-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
