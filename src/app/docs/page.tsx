/* src/app/docs/page.tsx */
'use client';

import Link from 'next/link';

export default function Docs() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">FileSlap API Quick Start</h1>

      <p className="mb-8 text-gray-700">
        Convert HTML to a PDF in a single request.
      </p>

      <h2 className="mb-2 text-2xl font-semibold">cURL</h2>
      <pre className="mb-8 rounded bg-gray-800 p-4 text-sm text-gray-100 overflow-x-auto">
{`curl -X POST https://api.fileslap.com/api/convert \
  -H "X-API-KEY: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"html\":\"<h1>Hello PDF</h1>\"}" \
  -o hello.pdf`}
      </pre>

      <h2 className="mb-2 text-2xl font-semibold">Node example</h2>
      <pre className="mb-8 rounded bg-gray-800 p-4 text-sm text-gray-100 overflow-x-auto">
{`import fetch from 'node-fetch';
import fs from 'fs';
import { pipeline } from 'stream/promises';

const res = await fetch('https://api.fileslap.com/api/convert', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'YOUR_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ html: '<h1>Hello PDF</h1>' }),
});
await pipeline(res.body, fs.createWriteStream('hello.pdf'));`}
      </pre>

      <p className="text-gray-600">
        Need more examples?&nbsp;
        <Link href="/pricing" className="text-blue-600 underline">
          View pricing
        </Link>{' '}
        or&nbsp;
        <Link
          href="mailto:support@fileslap.com"
          className="text-blue-600 underline"
        >
          contact us
        </Link>
        .
      </p>
    </main>
  );
}
