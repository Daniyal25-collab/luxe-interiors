'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'The Riva Residence',
    category: 'Living Room',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    span: 'lg:col-span-2 lg:row-span-2',
    aspect: 'aspect-[4/3] lg:aspect-auto lg:h-full',
  },
  {
    id: 2,
    title: 'Casa Bianca Suite',
    category: 'Bedroom',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    span: '',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Noir Kitchen',
    category: 'Kitchen',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    span: '',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    title: 'The Edit Studio',
    category: 'Office',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/3]',
  },
];

export default function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-3">
              Selected Work
            </p>
            <h2 className="font-display text-5xl lg:text-6xl font-light text-charcoal-900 leading-none">
              Featured
              <br />
              <span className="italic">Projects</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 font-body text-sm tracking-wider uppercase text-charcoal-700 hover:text-gold-500 transition-colors duration-300 self-start md:self-auto"
          >
            View All Projects
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[320px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className={`group relative overflow-hidden ${project.span}`}
            >
              <div className="absolute inset-0 img-zoom">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-800"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-body text-xs tracking-widest uppercase text-gold-400 mb-1">
                  {project.category} — {project.location}
                </p>
                <h3 className="font-display text-2xl font-light text-ivory-50 italic">
                  {project.title}
                </h3>
              </div>
              {/* Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-ivory-50 flex items-center justify-center translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <ArrowUpRight size={16} className="text-charcoal-900" />
              </div>
              {/* Always visible label */}
              <div className="absolute top-4 left-4">
                <span className="font-accent text-xs tracking-widest uppercase text-ivory-50 bg-charcoal-900/50 backdrop-blur-sm px-3 py-1">
                  {project.category}
                </span>
              </div>

              <Link href={`/portfolio/${project.id}`} className="absolute inset-0 z-10" aria-label={project.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
