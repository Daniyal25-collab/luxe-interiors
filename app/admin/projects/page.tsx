'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';

const CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Commercial', 'Full Home'];

const emptyForm = {
  title: '',
  slug: '',
  category: 'Living Room',
  location: '',
  budget: '',
  timeline: '',
  description: '',
  challenge: '',
  images: [''],
  beforeImage: '',
  afterImage: '',
  featured: false,
  published: true,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ ...emptyForm, ...p, images: p.images?.length ? p.images : [''] });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/projects/${editing._id}` : '/api/projects';
    const body = { ...form, images: form.images.filter(Boolean) };
    if (!body.slug) body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok) {
      setShowForm(false);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchProjects();
  };

  const update = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-light text-ivory-100">Projects</h1>
          <p className="font-body text-sm text-mink-400 mt-1">{projects.length} portfolio entries</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 font-accent text-xs tracking-widest uppercase px-6 py-3 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-300"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p._id} className="bg-charcoal-900 border border-charcoal-700 overflow-hidden group">
              <div className="relative h-48">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="33vw" />
                ) : (
                  <div className="w-full h-full bg-charcoal-800 flex items-center justify-center text-mink-500 text-sm">No image</div>
                )}
                {p.featured && (
                  <div className="absolute top-2 left-2 bg-gold-500 text-ivory-50 font-body text-xs px-2 py-1">Featured</div>
                )}
                {!p.published && (
                  <div className="absolute top-2 right-2 bg-charcoal-900/80 text-mink-400 font-body text-xs px-2 py-1">Draft</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-1">{p.category}</p>
                <h3 className="font-display text-xl font-light text-ivory-100 mb-1">{p.title}</h3>
                <p className="font-body text-xs text-mink-400">{p.location}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex items-center gap-1.5 font-body text-xs px-3 py-2 border border-charcoal-600 text-mink-300 hover:border-gold-400 hover:text-gold-400 transition-all duration-200"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="flex items-center gap-1.5 font-body text-xs px-3 py-2 border border-charcoal-600 text-mink-300 hover:border-red-400 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 flex items-center justify-center px-6">
          <div className="bg-charcoal-800 border border-charcoal-700 p-8 max-w-sm w-full text-center">
            <h3 className="font-display text-2xl font-light text-ivory-100 mb-3">Delete Project?</h3>
            <p className="font-body text-sm text-mink-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-6 py-3 border border-charcoal-600 font-body text-sm text-mink-300 hover:border-mink-400 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="px-6 py-3 bg-red-500 font-body text-sm text-ivory-50 hover:bg-red-400 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/90 overflow-y-auto">
          <div className="min-h-screen px-4 py-12 flex items-start justify-center">
            <div className="bg-charcoal-800 border border-charcoal-700 w-full max-w-3xl">
              <div className="flex items-center justify-between px-8 py-6 border-b border-charcoal-700">
                <h2 className="font-display text-2xl font-light text-ivory-100">
                  {editing ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-mink-400 hover:text-ivory-100 transition-colors"><X size={20} /></button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { k: 'title', l: 'Title', ph: 'The Riva Residence' },
                    { k: 'slug', l: 'Slug (auto)', ph: 'the-riva-residence' },
                    { k: 'location', l: 'Location', ph: 'New Delhi' },
                    { k: 'budget', l: 'Budget', ph: '₹18L' },
                    { k: 'timeline', l: 'Timeline', ph: '8 weeks' },
                  ].map((f) => (
                    <div key={f.k}>
                      <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">{f.l}</label>
                      <input
                        type="text"
                        value={(form as any)[f.k]}
                        onChange={(e) => update(f.k, e.target.value)}
                        placeholder={f.ph}
                        className="w-full bg-charcoal-900 border border-charcoal-700 px-4 py-3 font-body text-sm text-ivory-200 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => update('category', e.target.value)}
                      className="w-full bg-charcoal-900 border border-charcoal-700 px-4 py-3 font-body text-sm text-ivory-200 focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {[
                  { k: 'description', l: 'Description', rows: 3 },
                  { k: 'challenge', l: 'Challenge (Optional)', rows: 2 },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">{f.l}</label>
                    <textarea
                      value={(form as any)[f.k]}
                      onChange={(e) => update(f.k, e.target.value)}
                      rows={f.rows}
                      className="w-full bg-charcoal-900 border border-charcoal-700 px-4 py-3 font-body text-sm text-ivory-200 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>
                ))}

                {/* Images */}
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">Image URLs</label>
                  {form.images.map((img, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={img}
                        placeholder="https://images.unsplash.com/..."
                        onChange={(e) => {
                          const imgs = [...form.images];
                          imgs[i] = e.target.value;
                          update('images', imgs);
                        }}
                        className="flex-1 bg-charcoal-900 border border-charcoal-700 px-4 py-2 font-body text-sm text-ivory-200 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-400 transition-colors"
                      />
                      {form.images.length > 1 && (
                        <button onClick={() => update('images', form.images.filter((_, j) => j !== i))} className="text-mink-400 hover:text-red-400 transition-colors px-2">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => update('images', [...form.images, ''])} className="font-body text-xs text-gold-400 hover:text-gold-300 mt-1">
                    + Add Image
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { k: 'beforeImage', l: 'Before Image URL' },
                    { k: 'afterImage', l: 'After Image URL' },
                  ].map((f) => (
                    <div key={f.k}>
                      <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">{f.l}</label>
                      <input
                        type="text"
                        value={(form as any)[f.k]}
                        onChange={(e) => update(f.k, e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-charcoal-900 border border-charcoal-700 px-4 py-3 font-body text-sm text-ivory-200 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-6">
                  {[
                    { k: 'featured', l: 'Featured' },
                    { k: 'published', l: 'Published' },
                  ].map((toggle) => (
                    <label key={toggle.k} className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => update(toggle.k, !(form as any)[toggle.k])}
                        className={`w-10 h-5 rounded-full transition-colors relative ${(form as any)[toggle.k] ? 'bg-gold-500' : 'bg-charcoal-700'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-ivory-50 rounded-full transition-transform ${(form as any)[toggle.k] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                      <span className="font-body text-sm text-mink-300">{toggle.l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 px-8 py-6 border-t border-charcoal-700">
                <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-charcoal-600 font-body text-sm text-mink-300 hover:border-mink-400 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.location || !form.description}
                  className="flex items-center gap-2 px-8 py-3 bg-gold-500 font-accent text-xs tracking-widest uppercase text-ivory-50 hover:bg-gold-400 transition-all disabled:opacity-50"
                >
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Check size={14} /> Save Project</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
