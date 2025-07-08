/* src/app/page.tsx */
import CodeSnippets from "@/components/CodeSnippets";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HtmlToPdfDemo from "@/components/HtmlToPdfDemo";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'HTML to PDF API | Convert Web Pages to PDF Instantly',
  description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month. Simple, reliable, and secure.',
  keywords: [
    'HTML to PDF',
    'PDF conversion API',
    'web to PDF',
    'document conversion',
    'PDF generation',
    'HTML PDF converter',
    'web page to PDF',
    'PDF API service',
    'document API',
    'FileSlap'
  ],
  openGraph: {
    title: 'FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly',
    description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.',
    url: 'https://fileslap.com',
    siteName: 'FileSlap',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FileSlap - HTML to PDF Conversion API',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly',
    description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://fileslap.com',
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Home Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FileSlap",
            "url": "https://fileslap.com",
            "description": "Convert HTML to PDF with our lightning-fast API",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://fileslap.com/docs",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PriceSpecification",
            "name": "FileSlap Pricing",
            "description": "HTML to PDF conversion pricing",
            "price": "0",
            "priceCurrency": "USD",
            "validFrom": "2024-01-01",
            "valueAddedTaxIncluded": false,
            "eligibleTransactionVolume": {
              "@type": "PriceSpecification",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      
      <main className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center text-center px-6 py-16">
        {/* ── Hero ───────────────────────────────────────── */}
        <section className="mb-8">
          <Image
            src="/assets/fileslap-logo.png"
            alt="FileSlap - HTML to PDF Conversion API"
            width={520}
            height={130}
            priority
            className="mx-auto drop-shadow-lg"
          />
        </section>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6">
          Convert&nbsp;
          <span className="text-[#1DEE7F]">HTML</span>
          &nbsp;directly&nbsp;to&nbsp;PDF.
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 leading-relaxed">
          One lightweight API that turns web pages&nbsp;→&nbsp;pixel-perfect PDFs&nbsp;
          in&nbsp;seconds. Your first&nbsp;50&nbsp;pages each month are&nbsp;free.
        </p>

        {/* ── Call-to-Action Buttons ───────────────────── */}
        <section className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <a
            href="/signup"
            className="rounded-full bg-[#1DEE7F] px-10 py-4 text-lg font-semibold text-[#0D0D11] hover:brightness-110 transition duration-200 shadow-lg hover:shadow-xl"
            aria-label="Get your free API key"
          >
            Get API Key
          </a>
          <a
            href="/docs"
            className="rounded-full border-2 border-[#1DEE7F] px-10 py-4 text-lg font-semibold text-white hover:bg-[#1DEE7F]/10 transition duration-200"
            aria-label="Read the API documentation"
          >
            Read Docs
          </a>
        </section>
      </main>
      <HtmlToPdfDemo />
      <CodeSnippets />
      <Features />
      <Pricing />
    </>
  );
}
