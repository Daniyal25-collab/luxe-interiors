'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const mockPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80', likes: 842 },
  { id: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', likes: 1203 },
  { id: 3, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', likes: 976 },
  { id: 4, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80', likes: 1541 },
  { id: 5, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80', likes: 689 },
  { id: 6, image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&q=80', likes: 2104 },
];

export default function InstagramGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">
            Follow Along
          </p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-charcoal-900 mb-4">
            <span className="italic">@luxe</span>interiors
          </h2>
          <p className="font-body text-sm text-charcoal-600">
            Daily design inspiration from our studio and ongoing projects
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {mockPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative aspect-square overflow-hidden img-zoom"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <div className="text-center">
                  <Instagram size={20} className="text-ivory-50 mx-auto mb-1" />
                  <span className="font-body text-xs text-ivory-200">♥ {post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-sm text-charcoal-700 hover:text-gold-500 transition-colors duration-300 border-b border-mink-200 pb-1"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
