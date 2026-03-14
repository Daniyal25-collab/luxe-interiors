import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/sections/PricingSection';
import type { Metadata } from 'next';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Transparent pricing for luxury interior design services. Choose from Lite, Pro, or Pro Max plans.',
};

const faqs = [
  { q: 'How does the process work?', a: 'We start with a discovery call to understand your vision, space, and budget. Then we move through concept development, design presentation, revisions, and final handover.' },
  { q: 'What is included in the 3D visualisation?', a: 'Our 3D visualisations are photorealistic renders of your space showing furniture placement, materials, lighting, and finishes — so you can see exactly what your space will look like before work begins.' },
  { q: 'Do prices include furniture and materials?', a: 'Design fees are separate from procurement. We provide a detailed specification list and can manage procurement on your behalf (with a sourcing fee of 12%).' },
  { q: 'How long does a project take?', a: 'A single room typically takes 4–8 weeks from brief to handover. Full home projects range from 3 to 6 months depending on scope.' },
  { q: 'Can I pay in instalments?', a: 'Yes — we typically split payments into 3 milestones: 40% on signing, 40% on design approval, and 20% on project completion.' },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="pt-40 pb-20 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-500 mb-4">Services & Pricing</p>
          <h1 className="font-display text-6xl lg:text-8xl font-light text-charcoal-900 leading-none">
            Our <span className="italic">Plans</span>
          </h1>
        </div>
      </section>

      <PricingSection />

      {/* What's included comparison */}
      <section className="py-24 bg-ivory-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-light text-charcoal-900 mb-3">
              Plan <span className="italic">Comparison</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-mink-100">
                  <th className="py-4 px-4 text-left font-body text-xs tracking-widest uppercase text-mink-400">Feature</th>
                  {['Lite', 'Pro', 'Pro Max'].map((p) => (
                    <th key={p} className="py-4 px-4 text-center font-accent text-xs tracking-widest uppercase text-gold-500">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Consultation', true, true, true],
                  ['Moodboard', true, true, true],
                  ['2D Floor Plan', false, true, true],
                  ['3D Visualisation', false, true, true],
                  ['Photorealistic Renders', false, false, true],
                  ['Furniture Curation', false, true, true],
                  ['Material Selection', false, true, true],
                  ['Site Visits', false, false, true],
                  ['Contractor Coordination', false, false, true],
                  ['Revisions', '1', '3', 'Unlimited'],
                ].map(([feature, lite, pro, promax]) => (
                  <tr key={String(feature)} className="border-b border-mink-50 hover:bg-ivory-100 transition-colors">
                    <td className="py-4 px-4 font-body text-sm text-charcoal-700">{feature}</td>
                    {[lite, pro, promax].map((val, i) => (
                      <td key={i} className="py-4 px-4 text-center">
                        {typeof val === 'boolean' ? (
                          val ? <Check size={16} className="text-gold-500 mx-auto" /> : <span className="text-mink-200">—</span>
                        ) : (
                          <span className="font-body text-sm text-charcoal-700">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-ivory-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-light text-charcoal-900 mb-3">
              Frequently Asked <span className="italic">Questions</span>
            </h2>
          </div>
          <div className="divide-y divide-mink-100">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6 cursor-pointer">
                <summary className="flex justify-between items-center list-none">
                  <h3 className="font-body text-base font-medium text-charcoal-900 pr-4">{faq.q}</h3>
                  <span className="text-gold-500 text-xl transition-transform duration-300 group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="font-body text-sm text-charcoal-600 leading-relaxed mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
