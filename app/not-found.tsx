import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">404</p>
          <h1 className="font-display text-7xl lg:text-9xl font-light text-charcoal-900 leading-none mb-6">
            Lost <span className="italic">in Space</span>
          </h1>
          <p className="font-body text-base text-charcoal-600 mb-10">
            The page you're looking for has been moved, deleted, or perhaps never existed.
            Let's get you back to beautiful spaces.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="font-accent text-xs tracking-widest uppercase px-8 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/portfolio"
              className="font-accent text-xs tracking-widest uppercase px-8 py-4 border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
