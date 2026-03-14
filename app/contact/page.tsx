'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, MessageCircle, Check, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">Get In Touch</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-charcoal-900 leading-none">
              Let's <span className="italic">Talk</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-10">
                {[
                  { icon: <MapPin size={20} />, label: 'Studio', value: '142 Design Quarter\nNew Delhi, 110001\nIndia' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+91 99990 00111' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'hello@luxeinteriors.com' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5">
                    <div className="w-10 h-10 border border-gold-400 flex items-center justify-center flex-shrink-0 text-gold-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase text-mink-400 mb-1">{item.label}</p>
                      <p className="font-body text-sm text-charcoal-700 whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919999000111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 bg-[#25D366] text-white w-full hover:bg-[#1ea952] transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                  <span className="font-body text-sm font-medium">Chat on WhatsApp</span>
                </a>

                {/* Hours */}
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-mink-400 mb-3">Studio Hours</p>
                  <div className="space-y-1 font-body text-sm text-charcoal-700">
                    <div className="flex justify-between"><span>Mon – Fri</span><span>10:00 – 19:00</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>11:00 – 17:00</span></div>
                    <div className="flex justify-between text-mink-300"><span>Sunday</span><span>Closed</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-14 h-14 bg-gold-500 flex items-center justify-center mb-6">
                    <Check size={24} className="text-ivory-50" />
                  </div>
                  <h3 className="font-display text-3xl font-light italic text-charcoal-900 mb-3">Message Received</h3>
                  <p className="font-body text-sm text-charcoal-600">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      { k: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                      { k: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                      { k: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 00000 00000' },
                      { k: 'subject', label: 'Subject', type: 'text', placeholder: 'Project enquiry' },
                    ].map((f) => (
                      <div key={f.k}>
                        <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          value={(form as any)[f.k]}
                          onChange={(e) => update(f.k, e.target.value)}
                          placeholder={f.placeholder}
                          required={f.k !== 'phone'}
                          className="luxury-input"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      required
                      placeholder="Tell us about your project or enquiry..."
                      className="luxury-input resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-accent text-xs tracking-widest uppercase px-10 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300 flex items-center gap-3 disabled:opacity-70"
                  >
                    {submitting ? <><Loader2 size={16} className="animate-spin" />Sending...</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map embed */}
          <div className="mt-20 h-96 bg-mink-100 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112194.53040960072!2d77.06889944!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luxe Interiors location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
