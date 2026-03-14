'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, Upload, Loader2 } from 'lucide-react';

const plans = [
  { id: 'lite', name: 'Lite', price: '₹29,999' },
  { id: 'pro', name: 'Pro', price: '₹79,999' },
  { id: 'promax', name: 'Pro Max', price: '₹2,49,999' },
];

const projectTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office', 'Full Home', 'Commercial'];
const budgetRanges = ['Under ₹5L', '₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹60L', '₹60L+'];
const timelines = ['ASAP', '1–2 months', '3–6 months', '6+ months'];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'pro';

  const [form, setForm] = useState({
    plan: initialPlan,
    projectType: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 bg-gold-500 flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-ivory-50" />
            </div>
            <h2 className="font-display text-4xl font-light italic text-charcoal-900 mb-4">
              Thank You, {form.name.split(' ')[0]}!
            </h2>
            <p className="font-body text-sm text-charcoal-600 leading-relaxed mb-8">
              Your booking request has been received. We'll reach out within 24 hours to confirm your consultation time.
            </p>
            <a
              href="/"
              className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300"
            >
              Back to Home
            </a>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="pt-40 pb-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 mb-4">Begin Your Journey</p>
          <h1 className="font-display text-6xl lg:text-7xl font-light text-ivory-50">
            Book a <span className="italic">Consultation</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-ivory-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Progress */}
          <div className="flex items-center gap-0 mb-16">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 flex items-center justify-center text-xs font-body flex-shrink-0 transition-all duration-300 ${step >= s ? 'bg-charcoal-900 text-ivory-50' : 'bg-mink-100 text-mink-400'}`}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-px transition-all duration-300 ${step > s ? 'bg-charcoal-900' : 'bg-mink-100'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Plan & Project */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-8">Select Your Plan</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => update('plan', p.id)}
                    className={`p-6 text-left border-2 transition-all duration-300 ${form.plan === p.id ? 'border-charcoal-900 bg-charcoal-900 text-ivory-50' : 'border-mink-100 bg-ivory-50 hover:border-mink-300'}`}
                  >
                    <div className={`font-accent text-xs tracking-widest uppercase mb-2 ${form.plan === p.id ? 'text-gold-400' : 'text-gold-500'}`}>{p.name}</div>
                    <div className={`font-display text-2xl font-light ${form.plan === p.id ? 'text-ivory-50' : 'text-charcoal-900'}`}>{p.price}</div>
                  </button>
                ))}
              </div>

              <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-6">Project Details</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <button key={t} onClick={() => update('projectType', t)}
                        className={`font-body text-xs px-4 py-2 border transition-all duration-200 ${form.projectType === t ? 'border-charcoal-900 bg-charcoal-900 text-ivory-50' : 'border-mink-100 text-charcoal-700 hover:border-mink-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((b) => (
                      <button key={b} onClick={() => update('budget', b)}
                        className={`font-body text-xs px-4 py-2 border transition-all duration-200 ${form.budget === b ? 'border-charcoal-900 bg-charcoal-900 text-ivory-50' : 'border-mink-100 text-charcoal-700 hover:border-mink-300'}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">Timeline</label>
                <div className="flex flex-wrap gap-2">
                  {timelines.map((t) => (
                    <button key={t} onClick={() => update('timeline', t)}
                      className={`font-body text-xs px-4 py-2 border transition-all duration-200 ${form.timeline === t ? 'border-charcoal-900 bg-charcoal-900 text-ivory-50' : 'border-mink-100 text-charcoal-700 hover:border-mink-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.plan || !form.projectType || !form.budget || !form.timeline}
                className="font-accent text-xs tracking-widest uppercase px-10 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-8">Your Details</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {[
                  { k: 'name', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma' },
                  { k: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  { k: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 99999 00000' },
                  { k: 'city', label: 'City', type: 'text', placeholder: 'New Delhi' },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      value={(form as any)[f.k]}
                      onChange={(e) => update(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      className="luxury-input"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-10">
                <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">Message (Optional)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us about your vision, existing furniture, style preferences..."
                  rows={4}
                  className="luxury-input resize-none"
                />
              </div>

              {/* Inspiration upload */}
              <div className="mb-10">
                <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">Upload Inspiration Images (Optional)</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-mink-200 hover:border-gold-400 transition-colors duration-300 cursor-pointer">
                  <Upload size={20} className="text-mink-300 mb-2" />
                  <span className="font-body text-sm text-mink-300">Drop files here or click to upload</span>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="font-body text-xs tracking-widest uppercase px-8 py-4 border border-mink-200 text-charcoal-700 hover:border-charcoal-900 transition-all duration-300">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.name || !form.email || !form.phone || !form.city}
                  className="font-accent text-xs tracking-widest uppercase px-10 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-8">Review & Confirm</h2>
              <div className="bg-ivory-50 border border-mink-100 p-8 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { l: 'Plan', v: plans.find(p => p.id === form.plan)?.name },
                    { l: 'Project Type', v: form.projectType },
                    { l: 'Budget', v: form.budget },
                    { l: 'Timeline', v: form.timeline },
                    { l: 'Name', v: form.name },
                    { l: 'Email', v: form.email },
                    { l: 'Phone', v: form.phone },
                    { l: 'City', v: form.city },
                  ].map((item) => (
                    <div key={item.l}>
                      <div className="font-body text-xs tracking-widest uppercase text-mink-400 mb-1">{item.l}</div>
                      <div className="font-body text-sm text-charcoal-900">{item.v || '—'}</div>
                    </div>
                  ))}
                </div>
                {form.message && (
                  <div className="mt-6 pt-6 border-t border-mink-100">
                    <div className="font-body text-xs tracking-widest uppercase text-mink-400 mb-1">Message</div>
                    <div className="font-body text-sm text-charcoal-700">{form.message}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="font-body text-xs tracking-widest uppercase px-8 py-4 border border-mink-200 text-charcoal-700 hover:border-charcoal-900 transition-all duration-300">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="font-accent text-xs tracking-widest uppercase px-10 py-4 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-300 flex items-center gap-3 disabled:opacity-70"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Confirm Booking'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
