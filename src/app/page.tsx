/* src/app/page.tsx */
import CodeSnippets from "@/components/CodeSnippets";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HtmlToPdfDemo from "@/components/HtmlToPdfDemo";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import NewsletterSignup from "@/components/NewsletterSignup";
import IntegrationGuides from "@/components/IntegrationGuides";
import Image from "next/image";
import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "HTML to PDF API | Convert Web Pages to PDF Instantly",
  description:
    "Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month. Simple, reliable, and secure.",
  keywords: [
    "HTML to PDF",
    "PDF conversion API",
    "web to PDF",
    "document conversion",
    "PDF generation",
    "HTML PDF converter",
    "web page to PDF",
    "PDF API service",
    "document API",
    "FileSlap",
  ],
  openGraph: {
    title: "FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly",
    description:
      "Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.",
    url: absoluteUrl("/"),
    siteName: "FileSlap",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "FileSlap - HTML to PDF Conversion API",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly",
    description:
      "Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FileSlap",
  url: SITE_URL,
  description: "Convert HTML to PDF with our lightning-fast API",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <main
        id="main-content"
        className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center text-center px-6 py-12 sm:py-20"
      >
        <section className="mb-8 sm:mb-12">
          <Image
            src="/assets/fileslap-logo.png"
            alt="FileSlap - HTML to PDF Conversion API"
            width={520}
            height={130}
            priority
            unoptimized
            className="mx-auto drop-shadow-lg w-64 sm:w-auto"
          />
        </section>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6 sm:mb-8">
          Convert&nbsp;
          <span className="text-[#1DEE7F]">HTML</span>
          <br className="sm:hidden" />
          &nbsp;directly&nbsp;to&nbsp;PDF.
        </h1>

        <p className="max-w-3xl text-base sm:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 sm:mb-12 leading-relaxed">
          One lightweight API that turns web pages&nbsp;→&nbsp;pixel-perfect PDFs&nbsp;
          in&nbsp;seconds. Your first&nbsp;50&nbsp;pages each month are&nbsp;free.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="/signup"
            className="rounded-full bg-[#1DEE7F] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#0D0D11] hover:brightness-110 transition duration-200 shadow-lg hover:shadow-xl"
            aria-label="Get your free API key"
          >
            Get API Key
          </a>
          <a
            href="/docs"
            className="rounded-full border-2 border-[#1DEE7F] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:bg-[#1DEE7F]/10 transition duration-200"
            aria-label="Read the API documentation"
          >
            Read Docs
          </a>
          <a
            href="/html-2-pdf"
            className="rounded-full border-2 border-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:bg-white/10 transition duration-200"
            aria-label="HTML 2 PDF Converter"
          >
            HTML 2 PDF Converter
          </a>
        </div>
      </main>
      <a
        href="/signup"
        className="fixed bottom-4 right-4 z-40 sm:hidden rounded-full bg-[#1DEE7F] px-6 py-4 font-semibold text-[#0D0D11] shadow-lg hover:brightness-110 transition text-base"
        style={{ boxShadow: "0 4px 24px 0 #1DEE7F33" }}
        aria-label="Get your free API key"
      >
        Get API Key
      </a>
      <Features />
      <UseCases />
      <HtmlToPdfDemo />
      <CodeSnippets />
      <Pricing />
      <FAQ />
      <NewsletterSignup />
      <IntegrationGuides />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is FileSlap?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FileSlap is a fast, secure API for converting HTML to PDF. It is designed for developers who need reliable, scalable PDF generation in their apps.",
                },
              },
              {
                "@type": "Question",
                name: "How many free conversions do I get?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You get 50 free pages per month with the Free plan. No credit card required.",
                },
              },
              {
                "@type": "Question",
                name: "Is my HTML or PDF data stored?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. FileSlap processes all conversions in-memory and does not retain your HTML or generated PDFs.",
                },
              },
              {
                "@type": "Question",
                name: "How fast is the API?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most conversions complete in under 2 seconds. Performance may vary based on HTML complexity.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use FileSlap for invoices, reports, or resumes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! FileSlap is perfect for generating invoices, reports, resumes, and any other web-based documents as PDFs.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
