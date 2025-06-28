/* src/app/page.tsx */
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6 text-center">
        FileSlap&nbsp;<span className="text-blue-600">HTML&nbsp;→&nbsp;PDF</span>&nbsp;API
      </h1>

      <p className="mb-10 max-w-xl text-center text-lg text-gray-600">
        Convert HTML to pixel‑perfect PDFs in a single HTTP request.
        <br />
        <strong>50 pages / month free.</strong>
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
