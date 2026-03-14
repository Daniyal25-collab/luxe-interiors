'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85"
                alt="Priya Sharma — Interior Designer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating award badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-6 bottom-16 bg-charcoal-900 text-ivory-50 p-6 max-w-[160px]"
            >
              <div className="font-display text-4xl font-light italic text-gold-400 mb-1">12+</div>
              <div className="font-body text-xs tracking-widest uppercase text-mink-300">
                Years of Design Excellence
              </div>
            </motion.div>
            {/* Gold accent line */}
            <div className="absolute -left-4 top-12 w-px h-32 bg-gradient-to-b from-gold-500 to-transparent" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">
              About the Designer
            </p>
            <h2 className="font-display text-5xl lg:text-6xl font-light text-charcoal-900 leading-tight mb-6">
              Where Art Meets
              <br />
              <span className="italic">Architecture</span>
            </h2>
            <p className="font-body text-base text-charcoal-600 leading-relaxed mb-5">
              I'm <strong className="font-medium text-charcoal-900">Priya Sharma</strong>, a
              New Delhi-based interior designer with over a decade of creating
              spaces that marry function with extraordinary beauty. My approach
              blends classical elegance with contemporary sensibility.
            </p>
            <p className="font-body text-sm text-charcoal-600 leading-relaxed mb-10">
              From intimate residences to landmark commercial projects, every
              space I design tells a story — your story. I believe that
              exceptional interiors are born from deep listening, meticulous
              craftsmanship, and an unwavering eye for detail.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-6 mb-10 border-t border-mink-100 pt-8">
              {[
                { n: '250+', l: 'Projects' },
                { n: '18', l: 'Awards' },
                { n: '98%', l: 'Satisfaction' },
              ].map((a) => (
                <div key={a.l}>
                  <div className="font-display text-3xl font-light italic text-charcoal-900 mb-1">
                    {a.n}
                  </div>
                  <div className="font-body text-xs tracking-widest uppercase text-mink-400">
                    {a.l}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center gap-3 font-accent text-xs tracking-widest uppercase px-8 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-400"
            >
              Work With Me
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
