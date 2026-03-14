'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'lite',
    name: 'Lite',
    tagline: 'Perfect for single rooms',
    price: '₹29,999',
    period: 'per room',
    features: [
      'Online consultation (60 min)',
      'Basic design concepts & moodboard',
      'Furniture & colour recommendations',
      '1 revision round',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Our most popular plan',
    price: '₹79,999',
    period: 'per room',
    features: [
      'Full room design & layout planning',
      'Detailed 2D floor plan',
      '3D concept visualisation',
      'Curated furniture & material list',
      '3 revision rounds',
      'Vendor coordination support',
      'Priority email & call support',
    ],
    cta: 'Hire Now',
    featured: true,
  },
  {
    id: 'promax',
    name: 'Pro Max',
    tagline: 'Complete home transformation',
    price: '₹2,49,999',
    period: 'full home',
    features: [
      'Complete home interior design',
      'Photorealistic 3D visualisation',
      'Premium material & furniture curation',
      'Site visits (up to 3)',
      'Contractor briefing & coordination',
      'Unlimited revisions',
      'Dedicated project manager',
      'Priority 24/7 support',
    ],
    cta: 'Hire Now',
    featured: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-ivory-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">
            Service Plans
          </p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-charcoal-900 mb-4">
            Investment in <span className="italic">Beauty</span>
          </h2>
          <p className="font-body text-sm text-charcoal-600 max-w-md mx-auto">
            Transparent pricing, extraordinary results. Choose the plan that
            fits your vision and budget.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0 md:gap-px bg-mink-100">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`relative p-8 lg:p-10 ${
                plan.featured
                  ? 'pricing-featured text-ivory-100'
                  : 'bg-ivory-50 text-charcoal-900'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="font-accent text-xs tracking-widest uppercase bg-gold-500 text-ivory-50 px-4 py-1.5">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p
                  className={`font-accent text-xs tracking-widest uppercase mb-2 ${
                    plan.featured ? 'text-gold-400' : 'text-gold-500'
                  }`}
                >
                  {plan.name}
                </p>
                <p
                  className={`font-body text-sm mb-6 ${
                    plan.featured ? 'text-mink-300' : 'text-charcoal-600'
                  }`}
                >
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-4xl font-light">
                    {plan.price}
                  </span>
                </div>
                <p
                  className={`font-body text-xs tracking-wider ${
                    plan.featured ? 'text-mink-400' : 'text-mink-300'
                  }`}
                >
                  {plan.period}
                </p>
              </div>

              <ul className="space-y-3 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-gold-400' : 'text-gold-500'
                      }`}
                    />
                    <span
                      className={`font-body text-sm leading-relaxed ${
                        plan.featured ? 'text-mink-200' : 'text-charcoal-700'
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?plan=${plan.id}`}
                className={`block text-center font-accent text-xs tracking-widest uppercase px-6 py-4 transition-all duration-400 ${
                  plan.featured
                    ? 'bg-gold-500 text-ivory-50 hover:bg-gold-400'
                    : 'border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-body text-xs text-mink-400 mt-8"
        >
          All plans include a complimentary discovery call. Prices exclude material & furniture costs.
        </motion.p>
      </div>
    </section>
  );
}
