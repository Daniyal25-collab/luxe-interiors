'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Mehta',
    project: 'Full Home Redesign — Gurgaon',
    review:
      'Priya transformed our 4BHK into something from a luxury magazine. Every detail was considered, every material chosen with absolute care. We are beyond thrilled with the result.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 2,
    name: 'Neha & Rohan Kapoor',
    project: 'Master Bedroom — South Delhi',
    review:
      'We walked into our new bedroom and cried — it was that beautiful. The 3D visualisations prepared us perfectly, but the real thing exceeded every expectation.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b4f7?w=100&q=80',
  },
  {
    id: 3,
    name: 'Vikram Nair',
    project: 'Corporate Office — Bangalore',
    review:
      'Our new office has completely transformed team morale and client impressions. Priya understood our brand deeply and translated it into a physical space with remarkable precision.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 mb-4">
            Client Stories
          </p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-ivory-100 mb-16">
            What They <span className="italic text-gold-300">Say</span>
          </h2>
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-display text-2xl lg:text-3xl font-light italic text-ivory-200 leading-relaxed max-w-3xl mx-auto mb-10">
            "{t.review}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-500/30">
              <Image
                src={t.photo}
                alt={t.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-body text-sm font-medium text-ivory-100">{t.name}</div>
              <div className="font-body text-xs text-mink-400">{t.project}</div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-12 h-12 border border-charcoal-600 text-mink-300 hover:border-gold-400 hover:text-gold-400 transition-all duration-300 flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-8 h-1 bg-gold-400'
                    : 'w-2 h-1 bg-charcoal-600 hover:bg-mink-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 border border-charcoal-600 text-mink-300 hover:border-gold-400 hover:text-gold-400 transition-all duration-300 flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
