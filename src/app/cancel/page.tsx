/* src/app/cancel/page.tsx */
'use client';

import Link from 'next/link';

export default function Cancel() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold text-red-600">Checkout canceled</h1>
      <p className="mb-6 text-center text-lg text-gray-700 max-w-md">
        No worries—your card has not been charged.
        You can restart the checkout process whenever you’re ready.
      </p>

      <Link
        href="/pricing"
        className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Back to Pricing
      </Link>
    </main>
  );
}
