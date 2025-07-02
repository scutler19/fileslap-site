/* src/app/success/page.tsx */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Success() {
  /* ── look for local key (set at signup) ───────────────────────── */
  const [apiKey, setApiKey] = useState<string | null>(null);
  const params               = useSearchParams();           // ?session_id=…

  useEffect(() => {
    setApiKey(localStorage.getItem('fs_api_key'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-green-600">
        Payment&nbsp;successful!
      </h1>

      <div className="max-w-md space-y-4 text-center text-lg text-gray-700">
        <p>
          Thank&nbsp;you for upgrading&nbsp;— your subscription is now active
          (Stripe&nbsp;session&nbsp;ID: <code>{params.get('session_id') ?? '—'}</code>).
        </p>

        {apiKey ? (
          <>
            <p>
              Continue using your existing API&nbsp;key:
            </p>
            <code className="block break-all rounded bg-gray-100 p-3 text-sm text-gray-900">
              {apiKey}
            </code>
          </>
        ) : (
          <p>
            If you haven’t generated an API&nbsp;key yet,&nbsp;
            <Link href="/#get-key" className="text-blue-600 underline">
              get one here
            </Link>.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link
          href="/docs"
          className="rounded bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Read the Docs
        </Link>

        <Link
          href="/pricing"
          className="rounded border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
        >
          View&nbsp;Plans
        </Link>
      </div>
    </main>
  );
}
