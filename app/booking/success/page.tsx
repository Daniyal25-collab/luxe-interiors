'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, Sparkles } from 'lucide-react';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // Could verify session with backend here
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-6 py-40">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg w-full text-center"
          >
            {/* Success icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-24 bg-gold-500 flex items-center justify-center"
              >
                <Check size={36} className="text-ivory-50" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles size={20} className="text-gold-400" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-3">
                Payment Confirmed
              </p>
              <h1 className="font-display text-5xl font-light text-charcoal-900 leading-tight mb-4">
                Your Journey <br />
                <span className="italic text-gold-500">Begins Now</span>
              </h1>
              <p className="font-body text-base text-charcoal-600 leading-relaxed mb-3">
                Thank you for choosing Luxe Interiors. Your payment has been processed
                and your booking is confirmed.
              </p>
              <p className="font-body text-sm text-charcoal-600 mb-10">
                A confirmation email has been sent to you. Our design team will contact
                you within <strong>24 business hours</strong> to schedule your first
                consultation.
              </p>

              {/* Next steps */}
              <div className="bg-ivory-200 border border-mink-100 p-6 text-left mb-10">
                <h3 className="font-body text-xs tracking-widest uppercase text-mink-400 mb-4">
                  What Happens Next
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '01', text: 'Design team reviews your brief and project details' },
                    { step: '02', text: 'You receive a personalised design questionnaire' },
                    { step: '03', text: 'Discovery call scheduled at your convenience' },
                    { step: '04', text: 'Design concept presentation within 2 weeks' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-accent text-xs text-gold-500 flex-shrink-0 pt-0.5">
                        {item.step}
                      </span>
                      <p className="font-body text-sm text-charcoal-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/"
                  className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300"
                >
                  Back to Home
                </Link>
                <Link
                  href="/portfolio"
                  className="font-accent text-xs tracking-widest uppercase px-8 py-4 border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50 transition-all duration-300"
                >
                  Explore Portfolio
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <h1 className="font-display text-4xl font-light text-charcoal-900 mb-4">
              Something went wrong
            </h1>
            <p className="font-body text-sm text-charcoal-600 mb-6">
              We couldn't verify your payment. Please contact us at{' '}
              <a href="mailto:hello@luxeinteriors.com" className="text-gold-500">
                hello@luxeinteriors.com
              </a>
            </p>
            <Link href="/booking" className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-charcoal-900 text-ivory-50">
              Try Again
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
