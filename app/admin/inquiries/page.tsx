'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Mail, MailOpen } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/contact');
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    fetchInquiries();
  };

  const selectInquiry = (inq: any) => {
    setSelected(inq);
    if (!inq.read) markRead(inq._id);
  };

  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="font-display text-4xl font-light text-ivory-100">Inquiries</h1>
        <p className="font-body text-sm text-mink-400 mt-1">
          {inquiries.filter((i) => !i.read).length} unread messages
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-charcoal-900 border border-charcoal-700 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={20} className="animate-spin text-gold-400" /></div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center font-body text-sm text-mink-500">No inquiries yet</div>
          ) : (
            <div className="divide-y divide-charcoal-800">
              {inquiries.map((inq) => (
                <div
                  key={inq._id}
                  onClick={() => selectInquiry(inq)}
                  className={`p-4 cursor-pointer hover:bg-charcoal-800 transition-colors flex gap-4 ${selected?._id === inq._id ? 'bg-charcoal-800' : ''}`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {inq.read ? (
                      <MailOpen size={16} className="text-mink-500" />
                    ) : (
                      <Mail size={16} className="text-gold-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-body text-sm truncate ${inq.read ? 'text-mink-300' : 'text-ivory-100 font-medium'}`}>
                        {inq.name}
                      </p>
                      <p className="font-body text-xs text-mink-500 flex-shrink-0">
                        {format(new Date(inq.createdAt), 'MMM d')}
                      </p>
                    </div>
                    <p className="font-body text-xs text-mink-400 truncate">{inq.subject || 'No subject'}</p>
                    <p className="font-body text-xs text-mink-500 truncate mt-0.5">{inq.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-charcoal-900 border border-charcoal-700 p-6 h-fit">
          {!selected ? (
            <div className="text-center py-16 text-mink-500 font-body text-sm">
              Select a message to read
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="font-display text-2xl font-light text-ivory-100">{selected.name}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a href={`mailto:${selected.email}`} className="font-body text-xs text-gold-400 hover:text-gold-300 transition-colors">
                    {selected.email}
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="font-body text-xs text-mink-400 hover:text-mink-200 transition-colors">
                      {selected.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="border-t border-charcoal-700 pt-5">
                <p className="font-body text-xs tracking-widest uppercase text-mink-500 mb-1">Subject</p>
                <p className="font-body text-sm text-ivory-200">{selected.subject || '—'}</p>
              </div>

              <div>
                <p className="font-body text-xs tracking-widest uppercase text-mink-500 mb-2">Message</p>
                <p className="font-body text-sm text-mink-200 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div className="border-t border-charcoal-700 pt-5">
                <p className="font-body text-xs text-mink-500">
                  Received {format(new Date(selected.createdAt), 'MMMM d, yyyy — h:mm a')}
                </p>
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your inquiry'}`}
                className="block text-center font-accent text-xs tracking-widest uppercase px-6 py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
              >
                Reply by Email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
