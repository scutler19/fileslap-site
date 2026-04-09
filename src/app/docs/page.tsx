/* src/app/docs/page.tsx */
import Link from 'next/link';
import IntegrationGuides from '@/components/IntegrationGuides';
import { Metadata } from 'next';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'API Documentation | FileSlap HTML to PDF',
  description:
    'FileSlap REST API: convert HTML to PDF with optional format (A4, Letter), landscape, per-side margins, delayMs for JS-rendered pages, and filename. Examples in cURL, Node, Python, and JavaScript.',
  keywords: [
    'FileSlap API',
    'HTML to PDF API',
    'A4 HTML to PDF API',
    'landscape PDF API',
    'HTML to PDF margins',
    'HTML to PDF delay',
    'REST API',
    'cURL HTML to PDF',
    'API documentation',
  ],
  openGraph: {
    title: 'FileSlap API Docs | HTML to PDF with layout & delay options',
    description:
      'REST reference for POST /api/convert: html, format, landscape, margins, delayMs, filename. Code examples and OpenAPI spec.',
    url: absoluteUrl('/docs'),
    siteName: 'FileSlap',
    type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'FileSlap API' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileSlap API Docs | HTML to PDF options',
    description: 'Format, landscape, margins, delayMs, and more for HTML-to-PDF conversion.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: absoluteUrl('/docs'),
  },
};

export default function Docs() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 id="quick-start" className="mb-6 text-4xl font-bold text-white scroll-mt-24">
        FileSlap API Quick Start
      </h1>

      <p className="mb-8 text-lg text-white/80">
        Convert HTML to a PDF in a single request. All requests require a valid API key. Only{" "}
        <code className="text-[#A5FFCB]">html</code> is required; everything else is optional.
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-white">cURL</h2>
      <pre className="mb-6 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`curl -X POST https://api.fileslap.com/api/convert \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_API_KEY" \\
  -d '{"html": "<h1>Hello World</h1>"}' \\
  --output hello.pdf`}
      </pre>
      <p className="mb-4 text-sm text-white/70">
        Example with layout, margins, a short post-load wait (for client-rendered content), and a
        suggested filename:
      </p>
      <pre className="mb-8 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`curl -X POST https://api.fileslap.com/api/convert \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_API_KEY" \\
  -d '{
    "html": "<html><body><h1>Report</h1></body></html>",
    "format": "Letter",
    "landscape": true,
    "marginTop": "0.4in",
    "marginRight": "0.4in",
    "marginBottom": "0.4in",
    "marginLeft": "0.4in",
    "delayMs": 500,
    "filename": "monthly-report"
  }' \\
  --output report.pdf`}
      </pre>

      <h2 id="nodejs" className="mb-4 text-2xl font-semibold text-white scroll-mt-24">
        Node.js
      </h2>
      <pre className="mb-8 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`import fetch from "node-fetch";
import fs from "fs";

const res = await fetch("https://api.fileslap.com/api/convert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "YOUR_API_KEY"
  },
  body: JSON.stringify({ html: "<h1>Hello World</h1>" })
});

if (!res.ok) {
  throw new Error(\`HTTP \${res.status}\`);
}

const buffer = await res.arrayBuffer();
fs.writeFileSync("hello.pdf", Buffer.from(buffer));`}
      </pre>

      <h2 id="python" className="mb-4 text-2xl font-semibold text-white scroll-mt-24">
        Python
      </h2>
      <pre className="mb-8 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`import requests

response = requests.post(
    "https://api.fileslap.com/api/convert",
    headers={
        "Content-Type": "application/json",
        "X-API-KEY": "YOUR_API_KEY"
    },
    json={"html": "<h1>Hello World</h1>"}
)

if response.status_code == 200:
    with open("hello.pdf", "wb") as f:
        f.write(response.content)
else:
    print(f"Error: {response.status_code}")`}
      </pre>

      <h2 id="javascript" className="mb-4 text-2xl font-semibold text-white scroll-mt-24">
        JavaScript (Browser)
      </h2>
      <pre className="mb-8 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`const response = await fetch("https://api.fileslap.com/api/convert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "YOUR_API_KEY"
  },
  body: JSON.stringify({ html: "<h1>Hello World</h1>" })
});

if (!response.ok) {
  throw new Error(\`HTTP \${response.status}\`);
}

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "hello.pdf";
a.click();
window.URL.revokeObjectURL(url);`}
      </pre>

      <div className="mt-12 p-6 rounded-lg bg-[#111217] border border-[#1DEE7F]/30">
        <h3 className="mb-4 text-xl font-semibold text-[#1DEE7F]">API Reference</h3>
        
        <div className="space-y-4 text-sm text-white/80">
          <div>
            <strong className="text-white">Endpoint:</strong> POST https://api.fileslap.com/api/convert
          </div>
          <div>
            <strong className="text-white">Required Headers:</strong>
            <ul className="mt-2 ml-4 space-y-1">
              <li>• Content-Type: application/json</li>
              <li>• X-API-KEY: Your API key</li>
            </ul>
          </div>
          <div>
            <strong className="text-white">Request body (JSON)</strong>
            <p className="mt-2 text-white/70">
              All fields below are optional except <code className="text-[#A5FFCB]">html</code>.
              Invalid values return <code className="text-[#A5FFCB]">400</code> with a short error
              message.
            </p>
            <ul className="mt-3 ml-4 space-y-2 list-none">
              <li>
                • <code className="text-[#A5FFCB]">html</code> (string, required) — HTML document to
                render.
              </li>
              <li>
                • <code className="text-[#A5FFCB]">format</code> (string, optional) — Paper size name
                understood by the renderer (for example <code className="text-[#A5FFCB]">A4</code>,{" "}
                <code className="text-[#A5FFCB]">Letter</code>). Default when omitted is{" "}
                <code className="text-[#A5FFCB]">A4</code>.
              </li>
              <li>
                • <code className="text-[#A5FFCB]">landscape</code> (boolean, optional) — When{" "}
                <code className="text-[#A5FFCB]">true</code>, renders in landscape orientation.
              </li>
              <li>
                • <code className="text-[#A5FFCB]">marginTop</code>,{" "}
                <code className="text-[#A5FFCB]">marginRight</code>,{" "}
                <code className="text-[#A5FFCB]">marginBottom</code>,{" "}
                <code className="text-[#A5FFCB]">marginLeft</code> (number or string, optional) —
                Per-side margin. Numbers are interpreted as pixels; strings can include units (for
                example <code className="text-[#A5FFCB]">&quot;0.5in&quot;</code>). If you omit margins,
                the service uses its default margin preset.
              </li>
              <li>
                • <code className="text-[#A5FFCB]">delayMs</code> (number, optional) — Milliseconds to
                wait after load before generating the PDF (useful for JS-rendered content). Capped at
                10&nbsp;000.
              </li>
              <li>
                • <code className="text-[#A5FFCB]">filename</code> (string, optional) — Base name for
                the generated file; non-alphanumeric characters are stripped server-side.
              </li>
            </ul>
            <p className="mt-3 text-white/65">
              Background colors and images are included in the PDF using print-style rendering. There
              is no separate request flag for backgrounds.
            </p>
          </div>
          <div>
            <strong className="text-white">Response:</strong> PDF file (<code className="text-[#A5FFCB]">application/pdf</code>)
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-lg bg-[#111217] border border-[#1DEE7F]/30">
        <h3 className="mb-3 text-xl font-semibold text-[#1DEE7F]">Common use cases</h3>
        <ul className="text-sm text-white/80 space-y-2 ml-4 list-none">
          <li>
            • <strong className="text-white">Invoices and receipts</strong> — Fixed margins and A4 or
            Letter for print-ready customer PDFs.
          </li>
          <li>
            • <strong className="text-white">Reports</strong> — Landscape tables and explicit margins
            for dense data.
          </li>
          <li>
            • <strong className="text-white">Dashboards</strong> — A short <code className="text-[#A5FFCB]">delayMs</code> so charts and client-rendered widgets finish before capture.
          </li>
          <li>
            • <strong className="text-white">Print-ready documents</strong> — Format, orientation, and
            margins aligned with how the document will be printed or archived.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/pricing"
          className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] hover:brightness-110 transition"
        >
          View Pricing
        </Link>
        <Link
          href="mailto:stackdaddy.dev@gmail.com"
          className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white hover:bg-[#1DEE7F]/10 transition"
        >
          Contact Support
        </Link>
      </div>

      <div className="mt-12 p-6 rounded-lg bg-[#111217] border border-[#1DEE7F]/30">
        <h3 className="mb-4 text-xl font-semibold text-[#1DEE7F]">Developer Tools</h3>
        
        <div className="space-y-4 text-sm text-white/80">
          <div>
            <strong className="text-white">OpenAPI Specification:</strong>
            <div className="mt-2">
              <a
                href="/api/openapi.json"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DEE7F] hover:underline"
              >
                View OpenAPI Spec →
              </a>
            </div>
          </div>
          <div>
            <strong className="text-white">Postman Collection:</strong>
            <div className="mt-2">
              <a
                href="/api/fileslap-api.postman_collection.json"
                download
                className="text-[#1DEE7F] hover:underline"
              >
                Download Postman Collection →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <IntegrationGuides />
    </main>
  );
}
