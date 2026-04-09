import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site";

const description =
  "HTML to PDF API: A4 and Letter, landscape, custom margins, print backgrounds, optional delay for JS-rendered pages. Simple REST integration and a free tier.";

export const metadata: Metadata = {
  title: "HTML 2 PDF API | A4, Letter, Landscape, Margins & JS Delay",
  description,
  keywords: [
    "HTML to PDF API",
    "A4 HTML to PDF",
    "landscape HTML to PDF",
    "HTML to PDF custom margins",
    "HTML to PDF JavaScript",
    "FileSlap",
  ],
  alternates: { canonical: absoluteUrl("/html-2-pdf") },
  openGraph: {
    title: "HTML 2 PDF | FileSlap",
    description,
    url: absoluteUrl("/html-2-pdf"),
    siteName: "FileSlap",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "FileSlap — HTML to PDF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML 2 PDF | FileSlap",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

const structuredFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is HTML to PDF conversion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HTML to PDF conversion is the process of turning web pages or HTML code into PDF documents, preserving layout, styles, and content for sharing, archiving, or printing.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert HTML to PDF using FileSlap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use FileSlap's API to convert HTML to PDF with a simple POST request. See the code sample on this page or visit our documentation for more details.",
      },
    },
    {
      "@type": "Question",
      name: "Is FileSlap suitable for invoices, reports, and dynamic documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! FileSlap is perfect for generating invoices, reports, resumes, and any web-based document as a PDF.",
      },
    },
  ],
};

export default function Html2PdfLanding() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredFAQ) }}
      />
      <main
        id="main-content"
        className="max-w-3xl mx-auto px-6 py-16 text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          HTML 2 PDF Converter
        </h1>
        <p className="text-lg mb-8 text-white/80">
          Convert HTML to PDF over HTTPS with one POST: optional page size (A4, Letter), landscape,
          per-side margins, and a delay for client-rendered content. Built for invoices, reports, and
          dashboards—not a clunky desktop converter.
        </p>
        <div className="mb-10">
          <Image
            src="/assets/fileslap-logo.png"
            alt="FileSlap HTML 2 PDF"
            width={320}
            height={80}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-4 mb-4">
            <Link
              href="/signup"
              className="rounded-full bg-[#1DEE7F] px-6 py-3 font-semibold text-[#0D0D11] hover:brightness-110 transition"
            >
              Get Free API Key
            </Link>
            <Link
              href="/docs"
              className="rounded-full border border-[#1DEE7F] px-6 py-3 font-semibold text-white hover:bg-[#1DEE7F]/10 transition"
            >
              Read Docs
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Home
            </Link>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          How to Convert HTML to PDF (API Example)
        </h2>
        <pre className="mb-4 rounded-lg bg-[#111217] p-6 text-sm text-[#A5FFCB] overflow-x-auto">
          {`curl -X POST https://api.fileslap.com/api/convert \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_API_KEY" \\
  -d '{"html": "<h1>Hello World</h1>"}' \\
  --output hello.pdf`}
        </pre>
        <p className="mb-8 text-sm text-white/65">
          Optional JSON fields include{" "}
          <code className="text-[#A5FFCB]">format</code>,{" "}
          <code className="text-[#A5FFCB]">landscape</code>, margin sides,{" "}
          <code className="text-[#A5FFCB]">delayMs</code>, and{" "}
          <code className="text-[#A5FFCB]">filename</code>. See{" "}
          <Link href="/docs" className="text-[#1DEE7F] underline">
            API documentation
          </Link>{" "}
          for the full reference and a multi-option cURL example.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Why Choose FileSlap for HTML 2 PDF?
        </h2>
        <ul className="list-none pl-0 mb-8 text-white/90 space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  stroke="#1DEE7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                />
              </svg>
            </span>
            <span>
              <strong>Fast & Reliable:</strong> Most conversions complete in
              under 2 seconds.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="8"
                  rx="2"
                  stroke="#1DEE7F"
                  strokeWidth="2"
                />
                <path
                  stroke="#1DEE7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M7 11V7a5 5 0 0110 0v4"
                />
              </svg>
            </span>
            <span>
              <strong>Secure:</strong> Content is not kept for long-term access; PDFs exist only
              briefly for delivery. See{" "}
              <Link href="/docs/security" className="text-[#1DEE7F] underline">
                Security & Privacy
              </Link>
              .
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  stroke="#1DEE7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255V7a2 2 0 00-2-2h-6.255A2 2 0 0011 3a2 2 0 10-2 2c0 .35.06.687.17 1H5a2 2 0 00-2 2v6.255A2 2 0 003 13a2 2 0 102 2c0-.35-.06-.687-.17-1H19a2 2 0 002-2z"
                />
              </svg>
            </span>
            <span>
              <strong>Easy Integration:</strong> Works with Node.js, Python,
              React, Zapier, Make, n8n, and more.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="2"
                  stroke="#1DEE7F"
                  strokeWidth="2"
                />
                <path
                  stroke="#1DEE7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M8 8h8M8 12h8M8 16h4"
                />
              </svg>
            </span>
            <span>
              <strong>Pixel-Perfect Output:</strong> Preserves your CSS, fonts,
              and layout.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  stroke="#1DEE7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                />
              </svg>
            </span>
            <span>
              <strong>Free Tier:</strong> 50 pages/month at no cost. No credit
              card required.
            </span>
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 mb-8 text-white/90 space-y-2">
          <li>Invoice and receipt generation</li>
          <li>Automated report creation</li>
          <li>Resume and portfolio downloads</li>
          <li>Archiving web pages as PDFs</li>
          <li>Form submissions to PDF</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="mb-12 space-y-6">
          <div>
            <strong>What is HTML to PDF conversion?</strong>
            <p className="text-white/80">
              HTML to PDF conversion is the process of turning web pages or HTML
              code into PDF documents, preserving layout, styles, and content
              for sharing, archiving, or printing.
            </p>
          </div>
          <div>
            <strong>How do I convert HTML to PDF using FileSlap?</strong>
            <p className="text-white/80">
              You can use FileSlap&apos;s API to convert HTML to PDF with a
              simple POST request. See the code sample above or{" "}
              <Link href="/docs" className="text-[#1DEE7F] underline">
                read our documentation
              </Link>{" "}
              for more details.
            </p>
          </div>
          <div>
            <strong>
              Is FileSlap suitable for invoices, reports, and dynamic
              documents?
            </strong>
            <p className="text-white/80">
              Yes! FileSlap is perfect for generating invoices, reports,
              resumes, and any web-based document as a PDF.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Explore More</h2>
          <ul className="list-disc pl-6 text-white/90 space-y-2">
            <li>
              <Link href="/docs" className="text-[#1DEE7F] underline">
                API Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/docs#integration-guides"
                className="text-[#1DEE7F] underline"
              >
                Integration Guides
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-[#1DEE7F] underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/" className="text-[#1DEE7F] underline">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-block rounded-full bg-[#1DEE7F] px-10 py-4 font-bold text-[#0D0D11] text-lg hover:brightness-110 transition"
          >
            Start Converting HTML to PDF Free
          </Link>
        </div>
      </main>
    </>
  );
}
