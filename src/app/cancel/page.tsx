/* src/app/cancel/page.tsx */
'use client';

import Link from 'next/link';

export default function Cancel() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold text-red-400">Checkout canceled</h1>
      <p className="mb-6 text-center text-lg text-white/80 max-w-md">
        No worries—your card has not been charged.
        You can restart the checkout process whenever you're ready.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] transition hover:brightness-110"
        >
          Back to Home
        </Link>
        <Link
          href="/pricing"
          className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white transition hover:bg-[#1DEE7F]/10"
        >
          View Pricing
        </Link>
      </div>
    </main>
  );
}
