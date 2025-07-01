'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [email,   setEmail]   = useState('');
  const [apiKey,  setApiKey]  = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('https://api.fileslap.com/api/signup', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email })          // email is optional
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiKey(data.apiKey);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 p-6 shadow-sm">
      {apiKey ? (
        <>
          <h2 className="mb-4 text-xl font-semibold text-blue-600">Your API Key</h2>
          <code className="block break-all rounded bg-gray-100 p-4 text-sm">
            {apiKey}
          </code>
          <p className="mt-4 text-sm text-gray-600">
            Store this key securely—you won’t see it again.
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email&nbsp;<span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Generating…' : 'Get my free API key'}
          </button>

          {error && <p className="text-center text-sm text-red-600">{error}</p>}
        </form>
      )}
    </div>
  );
}
