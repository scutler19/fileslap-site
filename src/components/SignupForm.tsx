/* src/components/SignupForm.tsx */
'use client';

import { useEffect, useState } from 'react';

/* ── simple helpers ────────────────────────────────────────────── */
function setKeyCookie(key: string) {
  // 30 days; parent domain means cookie is valid on both hosts
  document.cookie = [
    `fs_api_key=${encodeURIComponent(key)}`,
    'path=/',
    'domain=.fileslap.com',
    'max-age=2592000',        // 30 × 24 × 60 × 60
    'SameSite=Lax',
    'Secure'
  ].join(';');
}

function getKeyCookie(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)fs_api_key=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function SignupForm() {
  const [email,   setEmail]   = useState('');
  const [apiKey,  setApiKey]  = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [copied,  setCopied]  = useState(false);

  /* ── on first render, pull key from localStorage → cookie fallback ─ */
  useEffect(() => {
    const stored = localStorage.getItem('fs_api_key') || getKeyCookie();
    if (stored) setApiKey(stored);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('https://api.fileslap.com/api/signup', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email: email.trim() || undefined })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { apiKey: key } = (await res.json()) as { apiKey: string };

      localStorage.setItem('fs_api_key', key);
      setKeyCookie(key);
      setApiKey(key);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-[#1DEE7F]/30 bg-[#111217] p-8 shadow-lg">
      {apiKey ? (
        <>
          <h2 className="mb-6 text-2xl font-semibold text-[#1DEE7F]">Your API Key</h2>
          <code className="block break-all rounded-lg bg-[#0D0D11] p-4 text-sm text-[#A5FFCB] border border-[#1DEE7F]/20">{apiKey}</code>

          <button
            onClick={copy}
            className="mt-6 w-full rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] transition hover:brightness-110"
          >
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </button>

          <p className="mt-4 text-sm text-white/60 text-center">
            Store this key securely — you won&apos;t see it again.
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email <span className="text-white/50">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#1DEE7F]/30 bg-[#0D0D11] px-4 py-3 text-white placeholder-white/50 focus:border-[#1DEE7F] focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating…' : 'Get my free API key'}
          </button>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}
        </form>
      )}
    </div>
  );
}
