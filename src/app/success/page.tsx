/* src/app/success/page.tsx */
'use client';

import Link from 'next/link';

export default function Success() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold text-green-600">Payment successful!</h1>
      <p className="mb-6 text-center text-lg text-gray-700 max-w-md">
        Thank you for subscribing to FileSlap. You can now start converting HTML
        to PDFs right away.
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
