/* src/app/success/SuccessClient.tsx */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/* helper: look for the key */
function fetchKey(): string | null {
  const ls = localStorage.getItem('fs_api_key');
  if (ls) return ls;

  const m = document.cookie.match(/(?:^|;\s*)fs_api_key=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function SuccessClient() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setApiKey(fetchKey());
  }, []);

  async function copy() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-green-600">Payment&nbsp;successful!</h1>

      {apiKey ? (
        <>
          <p className="text-lg text-gray-700 text-center">
            Your subscription is active — keep using your API&nbsp;key:
          </p>

          <code className="block max-w-full break-all rounded bg-gray-100 p-4 text-sm text-gray-900">
            {apiKey}
          </code>

          <button
            onClick={copy}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            {copied ? 'Copied!' : 'Copy key'}
          </button>
        </>
      ) : (
        <p className="max-w-md text-center text-lg text-gray-700">
          Haven’t generated an API&nbsp;key yet?&nbsp;
          <Link href="/#get-key" className="text-blue-600 underline">
            Get one here
          </Link>.
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4 pt-4">
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
