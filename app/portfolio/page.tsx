'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowUpRight } from 'lucide-react';

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Commercial'];

const projects = [
  { id: 1, title: 'The Riva Residence', category: 'Living Room', location: 'New Delhi', budget: '₹18L', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', size: 'large' },
  { id: 2, title: 'Casa Bianca Suite', category: 'Bedroom', location: 'Mumbai', budget: '₹9L', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80', size: 'small' },
  { id: 3, title: 'Noir Kitchen', category: 'Kitchen', location: 'Bangalore', budget: '₹12L', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80', size: 'small' },
  { id: 4, title: 'The Edit Studio', category: 'Office', location: 'Hyderabad', budget: '₹22L', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80', size: 'large' },
  { id: 5, title: 'Velvet Lounge', category: 'Commercial', location: 'Pune', budget: '₹45L', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80', size: 'small' },
  { id: 6, title: 'Marble Manor', category: 'Living Room', location: 'Chennai', budget: '₹25L', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80', size: 'small' },
  { id: 7, title: 'The Loft', category: 'Commercial', location: 'Gurgaon', budget: '₹60L', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=700&q=80', size: 'large' },
  { id: 8, title: 'Zen Bedroom', category: 'Bedroom', location: 'New Delhi', budget: '₹7L', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80', size: 'small' },
];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="pt-40 pb-20 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=60" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 mb-4">Our Work</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-ivory-50 leading-none">
              Portfolio
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-ivory-100 border-b border-mink-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 font-body text-xs tracking-widest uppercase px-6 py-5 border-b-2 transition-all duration-300 ${
                  active === cat
                    ? 'border-gold-500 text-charcoal-900'
                    : 'border-transparent text-mink-400 hover:text-charcoal-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={ref} className="py-20 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid group relative overflow-hidden img-zoom"
                >
                  <div className={project.size === 'large' ? 'aspect-[3/4]' : 'aspect-square'}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="font-body text-xs tracking-widest uppercase text-gold-400 mb-1">{project.category} — {project.location}</p>
                    <h3 className="font-display text-2xl font-light text-ivory-50 italic mb-1">{project.title}</h3>
                    <p className="font-body text-xs text-mink-300">Budget: {project.budget}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 bg-ivory-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={14} className="text-charcoal-900" />
                  </div>
                  <Link href={`/portfolio/${project.id}`} className="absolute inset-0 z-10" aria-label={project.title} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
