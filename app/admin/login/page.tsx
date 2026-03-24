'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/cms/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid username or password');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ksf-cream)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[var(--ksf-green)]/20">
          <h1 className="text-2xl font-bold text-center text-[var(--ksf-green)] font-serif mb-2">Admin Login</h1>
          <p className="text-[var(--ksf-dark)]/70 text-sm text-center mb-6">Sign in to manage your shop</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1.5 text-sm font-medium text-[var(--ksf-dark)]">Username</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[var(--ksf-green)]" />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-[var(--ksf-dark)]">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[var(--ksf-green)]" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-[var(--ksf-green)] hover:bg-[var(--ksf-brown)] text-white font-bold rounded-lg disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <Link href="/" className="block mt-6 text-center text-sm text-[var(--ksf-green)] hover:underline">← Back to shop</Link>
        </div>
      </div>
    </div>
  );
}
