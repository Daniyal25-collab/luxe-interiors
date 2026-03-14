'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=85',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85',
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImages[0]}
          alt="Luxe interior design"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-charcoal-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-24 lg:pb-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-px bg-gold-400" />
            <span className="font-accent text-xs tracking-widest-3 uppercase text-gold-400">
              Interior Design Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-ivory-50 leading-none mb-4"
          >
            Transforming
            <br />
            <span className="italic text-gold-300">Spaces</span> Into
            <br />
            Timeless Designs
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-body text-base text-mink-200 max-w-md leading-relaxed mb-10"
          >
            Award-winning luxury interior design crafted with precision,
            elegance, and a deep understanding of how you live.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/portfolio"
              className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-transparent border border-ivory-200 text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900 transition-all duration-400"
            >
              View Portfolio
            </Link>
            <Link
              href="/booking"
              className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-400"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute right-12 bottom-32 hidden lg:flex flex-col gap-8"
        >
          {[
            { number: '250+', label: 'Projects Completed' },
            { number: '12', label: 'Years Experience' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="font-display text-4xl font-light text-gold-300 italic">
                {stat.number}
              </div>
              <div className="font-body text-xs tracking-wider uppercase text-mink-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-widest uppercase text-mink-300 rotate-90 mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown size={16} className="text-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
