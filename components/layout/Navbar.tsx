'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Services' },
  { href: '/booking', label: 'Book' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory-100/95 backdrop-blur-md border-b border-mink-100 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className={`font-accent text-xs tracking-widest-3 uppercase transition-colors duration-300 ${
                scrolled ? 'text-gold-500' : 'text-gold-300'
              }`}
            >
              Luxe
            </span>
            <span
              className={`font-display text-2xl font-light tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-charcoal-900' : 'text-ivory-50'
              }`}
            >
              Interiors
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs tracking-widest uppercase luxury-link transition-colors duration-300 ${
                  scrolled ? 'text-charcoal-700' : 'text-ivory-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={`font-accent text-xs tracking-widest uppercase px-7 py-3 border transition-all duration-300 ${
                scrolled
                  ? 'border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50'
                  : 'border-ivory-200 text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900'
              }`}
            >
              Book Consultation
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? 'text-charcoal-900' : 'text-ivory-50'
            }`}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-charcoal-900 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col leading-none"
              >
                <span className="font-accent text-xs tracking-widest-3 uppercase text-gold-400">
                  Luxe
                </span>
                <span className="font-display text-2xl font-light text-ivory-100">
                  Interiors
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-ivory-200"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl font-light text-ivory-100 italic hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-10 pb-12">
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center font-accent text-xs tracking-widest uppercase px-8 py-4 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
