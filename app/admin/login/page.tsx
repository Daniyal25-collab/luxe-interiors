'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-6">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,...')]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <span className="font-accent text-xs tracking-widest-3 uppercase text-gold-400 block mb-1">
            Luxe
          </span>
          <span className="font-display text-4xl font-light text-ivory-100 block">
            Interiors
          </span>
          <p className="font-body text-xs tracking-widest uppercase text-mink-400 mt-3">
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <div className="bg-charcoal-800 border border-charcoal-700 p-10">
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@luxeinteriors.com"
                required
                className="w-full bg-transparent border-b border-charcoal-600 px-0 py-3 text-ivory-100 font-body text-sm focus:outline-none focus:border-gold-400 transition-colors duration-300 placeholder:text-charcoal-600"
              />
            </div>

            <div>
              <label className="font-body text-xs tracking-widest uppercase text-mink-400 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full bg-transparent border-b border-charcoal-600 px-0 py-3 text-ivory-100 font-body text-sm focus:outline-none focus:border-gold-400 transition-colors duration-300 placeholder:text-charcoal-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-mink-400 hover:text-mink-200 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-xs text-red-400"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-accent text-xs tracking-widest uppercase py-4 bg-gold-500 text-ivory-50 hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-xs text-charcoal-600 mt-6">
          © {new Date().getFullYear()} Luxe Interiors
        </p>
      </motion.div>
    </div>
  );
}
