/* src/app/pricing/page.tsx */
import Link from 'next/link';

const API_BASE = 'https://api.fileslap.com'; // <— live API host

const plans = [
  { name: 'Free',    price: '$0',  pages: '50 pages / mo',     highlight: false },
  { name: 'Starter', price: '$9',  pages: '2 000 pages / mo',  highlight: true  },
  { name: 'Pro',     price: '$29', pages: '12 000 pages / mo', highlight: false },
];

export default function Pricing() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-center text-4xl font-bold">Pricing</h1>
      <p className="mb-12 text-center text-gray-600">
        Simple, usage-based plans. Upgrade or cancel anytime.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded border p-6 text-center ${
              p.highlight ? 'border-blue-600 shadow-lg' : 'border-gray-200'
            }`}
          >
            <h2
              className={`mb-4 text-2xl font-semibold ${
                p.highlight ? 'text-blue-600' : ''
              }`}
            >
              {p.name}
            </h2>

            <p className="mb-2 text-4xl font-bold">{p.price}</p>
            <p className="mb-6 text-gray-600">{p.pages}</p>

            {p.name !== 'Free' ? (
              <Link
                href={`${API_BASE}/api/subscribe/${p.name.toLowerCase()}?key=YOUR_API_KEY`}
                className="inline-block rounded bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
              >
                Subscribe
              </Link>
            ) : (
              <span className="inline-block rounded border border-blue-600 px-5 py-3 text-blue-600">
                Included
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-500">
        Overage: $0.002 per page beyond your plan&apos;s quota.
      </p>
    </main>
  );
}
