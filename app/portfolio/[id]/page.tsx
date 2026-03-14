import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, MapPin, DollarSign, Clock } from 'lucide-react';

// In production this would fetch from DB
const projectData: Record<string, any> = {
  '1': {
    title: 'The Riva Residence',
    category: 'Living Room',
    location: 'New Delhi',
    budget: '₹18,00,000',
    timeline: '8 weeks',
    description:
      'A complete transformation of a 1200 sq ft living space in South Delhi. The brief called for a timeless luxury aesthetic — warm neutrals anchored by natural stone and bespoke joinery. We sourced Italian marble, custom hand-knotted rugs, and a statement chandelier that became the soul of the room.',
    challenge:
      'The existing layout had poor natural light flow. We reconfigured the furniture plan to draw sunlight deep into the space and selected a warm ivory palette to amplify it.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectData[params.id] || projectData['1'];

  return (
    <>
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[80vh] mt-0">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 max-w-7xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mink-300 hover:text-gold-400 transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 mb-2">
            {project.category}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-ivory-50 italic">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta strip */}
      <div className="bg-charcoal-800 border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap gap-8">
          {[
            { icon: <MapPin size={14} />, label: 'Location', value: project.location },
            { icon: <DollarSign size={14} />, label: 'Budget', value: project.budget },
            { icon: <Clock size={14} />, label: 'Timeline', value: project.timeline },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="text-gold-400">{m.icon}</span>
              <div>
                <div className="font-body text-xs tracking-widest uppercase text-mink-400">{m.label}</div>
                <div className="font-body text-sm text-ivory-200">{m.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-4">The Project</h2>
            <p className="font-body text-base text-charcoal-600 leading-relaxed mb-6">{project.description}</p>
            <h3 className="font-display text-2xl font-light italic text-charcoal-900 mb-3">The Challenge</h3>
            <p className="font-body text-base text-charcoal-600 leading-relaxed">{project.challenge}</p>
          </div>
          {/* Sidebar CTA */}
          <div>
            <div className="bg-ivory-200 p-8">
              <p className="font-body text-xs tracking-widest uppercase text-mink-400 mb-2">Love This Style?</p>
              <h3 className="font-display text-2xl font-light text-charcoal-900 mb-4">Start Your Project</h3>
              <p className="font-body text-sm text-charcoal-600 mb-6">Book a consultation and we'll create something extraordinary for your space.</p>
              <Link
                href="/booking"
                className="block text-center font-accent text-xs tracking-widest uppercase px-6 py-4 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {project.images.slice(1).map((img: string, i: number) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden img-zoom">
              <Image src={img} alt={`${project.title} ${i + 2}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="mt-16">
          <h2 className="font-display text-3xl font-light italic text-charcoal-900 mb-8">Before &amp; After</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-mink-400 mb-3">Before</p>
              <div className="relative aspect-[4/3]">
                <Image src={project.beforeImage} alt="Before" fill className="object-cover" sizes="50vw" />
                <div className="absolute top-3 left-3 bg-charcoal-900/70 text-ivory-50 font-body text-xs px-3 py-1">BEFORE</div>
              </div>
            </div>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-mink-400 mb-3">After</p>
              <div className="relative aspect-[4/3]">
                <Image src={project.afterImage} alt="After" fill className="object-cover" sizes="50vw" />
                <div className="absolute top-3 left-3 bg-gold-500/90 text-ivory-50 font-body text-xs px-3 py-1">AFTER</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
