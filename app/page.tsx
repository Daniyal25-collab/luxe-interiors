import HeroSection from '@/components/sections/HeroSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import InstagramGallery from '@/components/sections/InstagramGallery';
import CtaSection from '@/components/sections/CtaSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarqueeStrip from '@/components/sections/MarqueeStrip';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <FeaturedProjects />
        <AboutSection />
        <TestimonialsSection />
        <PricingSection />
        <InstagramGallery />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
