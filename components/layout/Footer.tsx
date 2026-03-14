import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-ivory-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-b border-charcoal-700">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-6">
              <span className="font-accent text-xs tracking-widest-3 uppercase text-gold-400">
                Luxe
              </span>
              <span className="font-display text-3xl font-light text-ivory-100">
                Interiors
              </span>
            </div>
            <p className="font-body text-sm text-mink-300 leading-relaxed mb-6 max-w-xs">
              Transforming spaces into timeless designs. Award-winning luxury
              interior design studio.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                className="text-mink-300 hover:text-gold-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                ['/', 'Home'],
                ['/portfolio', 'Portfolio'],
                ['/pricing', 'Services & Pricing'],
                ['/booking', 'Book Consultation'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-mink-300 luxury-link hover:text-ivory-100 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                'Residential Design',
                'Commercial Interiors',
                'Kitchen Design',
                '3D Visualisation',
                'Furniture Curation',
                'AI Room Visualiser',
              ].map((s) => (
                <li
                  key={s}
                  className="font-body text-sm text-mink-300"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-mink-300">
                  142 Design Quarter, New Delhi, India 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+919999000111"
                  className="font-body text-sm text-mink-300 hover:text-ivory-100 transition-colors duration-300"
                >
                  +91 99990 00111
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:hello@luxeinteriors.com"
                  className="font-body text-sm text-mink-300 hover:text-ivory-100 transition-colors duration-300"
                >
                  hello@luxeinteriors.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4">
          <p className="font-body text-xs text-mink-400">
            © {new Date().getFullYear()} Luxe Interiors. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <Link
                key={t}
                href="#"
                className="font-body text-xs text-mink-400 hover:text-gold-400 transition-colors duration-300"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
