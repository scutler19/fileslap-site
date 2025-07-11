/* src/app/docs/page.tsx */
import Link from 'next/link';
import IntegrationGuides from '@/components/IntegrationGuides';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation | FileSlap',
  description: 'Complete FileSlap API documentation. Learn how to convert HTML to PDF with our REST API. Code examples in cURL, Node.js, Python, and JavaScript.',
  keywords: [
    'FileSlap API',
    'HTML to PDF API',
    'API documentation',
    'PDF conversion API',
    'REST API',
    'API examples',
    'cURL examples',
    'Node.js API',
    'Python API',
    'JavaScript API'
  ],
  openGraph: {
    title: 'FileSlap API Documentation | HTML to PDF Conversion',
    description: 'Complete FileSlap API documentation. Learn how to convert HTML to PDF with our REST API. Code examples in cURL, Node.js, Python, and JavaScript.',
    url: 'https://fileslap.com/docs',
    siteName: 'FileSlap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FileSlap API Documentation | HTML to PDF Conversion',
    description: 'Complete FileSlap API documentation with code examples.',
  },
  alternates: {
    canonical: 'https://fileslap.com/docs',
  },
};

export default function Docs() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-4xl font-bold text-white">FileSlap API Quick Start</h1>

      <p className="mb-8 text-lg text-white/80">
        Convert HTML to a PDF in a single request. All requests require a valid API key.
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-white">cURL</h2>
      <pre className="mb-8 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
{`curl -X POST https://api.fileslap.com/api/convert \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_API_KEY" \\
  -d '{"html": "<h1>Hello World</h1>"}' \\
  --output hello.pdf`}
      </pre>

      <h2 className="mb-4 text-2xl font-semibold text-white">Node.js</h2>
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

      <h2 className="mb-4 text-2xl font-semibold text-white">Python</h2>
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

      <h2 className="mb-4 text-2xl font-semibold text-white">JavaScript (Browser)</h2>
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
            <strong className="text-white">Request Body:</strong>
            <pre className="mt-2 p-3 bg-[#0D0D11] rounded text-[#A5FFCB]">
{`{
  "html": "<h1>Your HTML content</h1>"
}`}
            </pre>
          </div>
          <div>
            <strong className="text-white">Response:</strong> PDF file (application/pdf)
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/#pricing"
          className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] hover:brightness-110 transition"
        >
          View Pricing
        </Link>
        <Link
          href="mailto:ghost.exitcodezer0@proton.me"
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
