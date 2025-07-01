/* src/app/page.tsx */
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-4">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="space-y-6 text-center">
        <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
          FileSlap&nbsp;
          <span className="text-blue-600">HTML&nbsp;→&nbsp;PDF</span>&nbsp;API
        </h1>

        <p className="mx-auto max-w-xl text-lg/relaxed text-gray-600">
          Convert any HTML (or URL) to a pixel-perfect PDF with a single HTTP
          request.
          <br />
          Your first <strong>50&nbsp;pages / month</strong>&nbsp;(up to&nbsp;
          <strong>5&nbsp;conversions per day</strong>) are free.
        </p>

        {/* ── Free-key signup ─────────────────────────────── */}
        <SignupForm />

        {/* ── Primary actions ─────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/docs"
            className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Read the Docs
          </Link>

          <Link
            href="/pricing"
            className="inline-block rounded border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
