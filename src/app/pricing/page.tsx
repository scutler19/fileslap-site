import Pricing from "@/components/Pricing";
import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site";

const description =
  "FileSlap pricing: 50 free pages/month, Starter ($9) with 2,000 pages, Pro ($29) with 12,000 pages. Simple overage rates for HTML-to-PDF API.";

export const metadata: Metadata = {
  title: "Pricing",
  description,
  alternates: { canonical: absoluteUrl("/pricing") },
  openGraph: {
    title: "Pricing | FileSlap",
    description,
    url: absoluteUrl("/pricing"),
    siteName: "FileSlap",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "FileSlap — HTML to PDF API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | FileSlap",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PricingPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-4 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Pricing</h1>
        <p className="mt-4 text-lg text-white/80">
          Start free, then scale with predictable monthly limits and overages.
        </p>
      </div>
      <Pricing />
    </main>
  );
}
