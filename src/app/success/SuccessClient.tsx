'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessClient() {
  const params     = useSearchParams();
  const sessionId  = params.get('session_id');          // optional

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold text-green-600">
        Payment successful!
      </h1>

      {sessionId && (
        <p className="mb-2 text-sm text-gray-500">
          Session&nbsp;ID:&nbsp;{sessionId}
        </p>
      )}

      <p className="mb-6 max-w-md text-center text-lg text-gray-700">
        Thank you for subscribing to FileSlap.<br />
        You can start converting HTML to PDFs right away.
      </p>

      <div className="flex gap-4">
        <Link
          href="/docs"
          className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Read the Docs
        </Link>
        <Link
          href="/pricing"
          className="rounded border border-blue-600 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
        >
          View Pricing
        </Link>
      </div>
    </main>
  );
}
