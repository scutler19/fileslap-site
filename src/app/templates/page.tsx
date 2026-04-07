import type { Metadata } from "next";
import InvoiceTemplateGenerator from "@/components/InvoiceTemplateGenerator";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Invoice Template Generator",
  description:
    "Create professional invoices in seconds with three free templates. Live preview and instant PDF download powered by FileSlap's HTML to PDF API.",
  openGraph: {
    title: "Free Invoice Template Generator | FileSlap",
    description:
      "Modern, minimal, and corporate invoice templates. Download pixel-perfect PDFs powered by FileSlap.",
    url: absoluteUrl("/templates"),
    siteName: "FileSlap",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "FileSlap invoice templates",
      },
    ],
  },
  alternates: {
    canonical: absoluteUrl("/templates"),
  },
};

export default function TemplatesPage() {
  return (
    <main id="main-content" className="min-h-[calc(100vh-120px)]">
      <InvoiceTemplateGenerator />
    </main>
  );
}
