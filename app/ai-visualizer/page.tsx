'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Upload, Sparkles, Loader2, X } from 'lucide-react';

const styles = [
  { id: 'modern', label: 'Modern', desc: 'Clean lines, neutral palette' },
  { id: 'minimal', label: 'Minimal', desc: 'Less is more, zen clarity' },
  { id: 'luxury', label: 'Luxury', desc: 'Opulent, gold accents, velvet' },
  { id: 'scandinavian', label: 'Scandinavian', desc: 'Warm wood, hygge, cozy' },
];

export default function AIVisualizerPage() {
  const [selectedStyle, setSelectedStyle] = useState('luxury');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('style', selectedStyle);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('/api/ai-visualizer', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setResult(data.suggestion);
      } else {
        setError(data.error || 'Generation failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Format markdown-ish result
  const formatResult = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="font-display text-xl font-light text-charcoal-900 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
      }
      if (line.match(/^\d+\. \*\*/)) {
        const cleaned = line.replace(/^\d+\. \*\*/, '').replace(/\*\*/, '');
        return <h3 key={i} className="font-display text-xl font-light text-charcoal-900 mt-6 mb-2">{cleaned}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="font-body text-sm text-charcoal-600 leading-relaxed ml-4">{line.slice(2)}</li>;
      }
      if (line.trim()) {
        return <p key={i} className="font-body text-sm text-charcoal-600 leading-relaxed mb-2">{line}</p>;
      }
      return null;
    });

  return (
    <>
      <Navbar />
      <section className="pt-40 pb-20 bg-charcoal-900 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={20} className="text-gold-400" />
            <p className="font-accent text-xs tracking-widest-3 uppercase text-gold-400">AI Powered</p>
          </div>
          <h1 className="font-display text-6xl lg:text-7xl font-light text-ivory-50 leading-none">
            Room <span className="italic text-gold-300">Visualizer</span>
          </h1>
          <p className="font-body text-sm text-mink-300 mt-4 max-w-lg">
            Upload your room photo and choose a design style. Our AI will generate a detailed interior design proposal tailored to your space.
          </p>
        </div>
      </section>

      <section className="py-20 bg-ivory-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input */}
            <div className="space-y-8">
              {/* Upload */}
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">
                  Room Photo (Optional)
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                  className="relative border-2 border-dashed border-mink-200 hover:border-gold-400 transition-colors duration-300 cursor-pointer"
                >
                  {preview ? (
                    <div className="relative h-56">
                      <Image src={preview} alt="Room" fill className="object-cover" sizes="50vw" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null); }}
                        className="absolute top-2 right-2 w-8 h-8 bg-charcoal-900/80 text-ivory-50 flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center gap-3 text-mink-300">
                      <Upload size={24} />
                      <p className="font-body text-sm">Drop image or click to upload</p>
                      <p className="font-body text-xs text-mink-400">JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>

              {/* Style picker */}
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-3">
                  Design Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className={`p-4 text-left border-2 transition-all duration-300 ${selectedStyle === s.id ? 'border-charcoal-900 bg-charcoal-900 text-ivory-50' : 'border-mink-100 bg-ivory-50 hover:border-mink-300'}`}
                    >
                      <div className={`font-accent text-xs tracking-widest uppercase mb-1 ${selectedStyle === s.id ? 'text-gold-400' : 'text-gold-500'}`}>{s.label}</div>
                      <div className={`font-body text-xs ${selectedStyle === s.id ? 'text-mink-300' : 'text-mink-400'}`}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 font-accent text-xs tracking-widest uppercase py-5 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-300 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" />Generating Design...</>
                ) : (
                  <><Sparkles size={16} />Generate Design Proposal</>
                )}
              </button>
            </div>

            {/* Result */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-4 border border-dashed border-mink-200 p-12">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-2 border-gold-400 rounded-full animate-ping opacity-30" />
                      <div className="absolute inset-2 border border-gold-400 rounded-full animate-spin" />
                      <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-400" />
                    </div>
                    <p className="font-body text-sm text-charcoal-600">Crafting your design proposal...</p>
                  </motion.div>
                )}

                {error && !loading && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="border border-red-400/30 bg-red-500/5 p-6">
                    <p className="font-body text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {result && !loading && (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="bg-ivory-50 border border-mink-100 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles size={14} className="text-gold-500" />
                      <span className="font-accent text-xs tracking-widest uppercase text-gold-500">
                        AI Design Proposal — {styles.find(s => s.id === selectedStyle)?.label} Style
                      </span>
                    </div>
                    <div className="prose-sm">{formatResult(result)}</div>
                    <div className="mt-8 pt-6 border-t border-mink-100">
                      <p className="font-body text-xs text-mink-400 mb-3">Ready to bring this to life?</p>
                      <a href="/booking" className="inline-block font-accent text-xs tracking-widest uppercase px-6 py-3 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all duration-300">
                        Book Consultation
                      </a>
                    </div>
                  </motion.div>
                )}

                {!loading && !result && !error && (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="h-full min-h-[400px] border border-dashed border-mink-200 flex flex-col items-center justify-center gap-4 p-12 text-center">
                    <Sparkles size={32} className="text-mink-200" />
                    <p className="font-display text-2xl font-light italic text-mink-300">Your design awaits</p>
                    <p className="font-body text-xs text-mink-400 max-w-xs">
                      Select a style and click generate to receive a personalised luxury interior design proposal.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
