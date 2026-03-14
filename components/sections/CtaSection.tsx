'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600210491892-03d54730d386?w=1920&q=85"
          alt="Luxury interior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-900/75" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 mb-6">
            Begin Your Journey
          </p>
          <h2 className="font-display text-5xl lg:text-7xl font-light text-ivory-50 leading-none mb-6">
            Ready to Transform
            <br />
            <span className="italic text-gold-300">Your Space?</span>
          </h2>
          <p className="font-body text-base text-mink-200 leading-relaxed mb-12 max-w-lg mx-auto">
            Let's start with a conversation. Book a complimentary discovery call
            and let's explore the possibilities for your home or office.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/booking"
              className="font-accent text-xs tracking-widest uppercase px-10 py-4 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-400"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="font-accent text-xs tracking-widest uppercase px-10 py-4 border border-ivory-200 text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900 transition-all duration-400"
            >
              Explore Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
