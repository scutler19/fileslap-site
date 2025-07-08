/* src/app/success/SuccessClient.tsx */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/* utility to retrieve key from localStorage or cookie */
function getStoredKey(): string | null {
  const ls = localStorage.getItem('fs_api_key');
  if (ls) return ls;
  const m = document.cookie.match(/(?:^|;\s*)fs_api_key=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function SuccessClient() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setApiKey(getStoredKey());
  }, []);

  const copy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-[#1DEE7F]">Payment successful!</h1>

      {apiKey ? (
        <>
          <p className="text-lg text-white/80 text-center">
            Your subscription is now active. Keep using your key:
          </p>

          <code className="block max-w-full break-all rounded-lg bg-[#0D0D11] p-4 text-sm text-[#A5FFCB] border border-[#1DEE7F]/20">
            {apiKey}
          </code>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={copy}
              className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] transition hover:brightness-110"
            >
              {copied ? 'Copied!' : 'Copy key'}
            </button>

            {/* Manage subscription link */}
            <Link
              href={`https://api.fileslap.com/api/billing?key=${apiKey}`}
              className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white transition hover:bg-[#1DEE7F]/10"
            >
              Manage subscription
            </Link>
          </div>
        </>
      ) : (
        <p className="max-w-md text-center text-lg text-white/80">
          Haven't generated an API key yet?{' '}
          <Link href="/signup" className="text-[#1DEE7F] underline">
            Get one here
          </Link>.
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <Link
          href="/docs"
          className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] transition hover:brightness-110"
        >
          Read the Docs
        </Link>
        <Link
          href="/pricing"
          className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white transition hover:bg-[#1DEE7F]/10"
        >
          View Plans
        </Link>
      </div>
    </main>
  );
}
