/* src/app/contact/page.tsx */
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | FileSlap',
  description: 'Contact FileSlap for enterprise pricing, technical support, or questions about our HTML to PDF conversion API. Get help with integration and custom requirements.',
  keywords: [
    'contact FileSlap',
    'enterprise pricing',
    'technical support',
    'HTML to PDF support',
    'API support',
    'custom requirements',
    'FileSlap contact'
  ],
  openGraph: {
    title: 'Contact FileSlap | Enterprise Pricing & Support',
    description: 'Contact FileSlap for enterprise pricing, technical support, or questions about our HTML to PDF conversion API.',
    url: 'https://fileslap.com/contact',
    siteName: 'FileSlap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact FileSlap | Enterprise Pricing & Support',
    description: 'Contact FileSlap for enterprise pricing and technical support.',
  },
  alternates: {
    canonical: 'https://fileslap.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Need higher volume pricing or have questions about FileSlap? We&apos;re here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h3 className="text-xl font-semibold text-[#1DEE7F] mb-4">Enterprise Pricing</h3>
          <p className="text-white/80 mb-4">
            For high-volume usage or custom requirements, we offer enterprise pricing plans.
          </p>
          <ul className="text-sm text-white/60 space-y-2">
            <li>• Custom page limits</li>
            <li>• Priority support</li>
            <li>• SLA guarantees</li>
            <li>• Dedicated infrastructure</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h3 className="text-xl font-semibold text-[#1DEE7F] mb-4">Support</h3>
          <p className="text-white/80 mb-4">
            Haven&apos;t generated an API key yet? We&apos;re happy to help.
          </p>
          <ul className="text-sm text-white/60 space-y-2">
            <li>• API integration help</li>
            <li>• Technical documentation</li>
            <li>• Best practices</li>
            <li>• Troubleshooting</li>
          </ul>
        </div>
      </div>

      <div className="text-center p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
        <h3 className="text-2xl font-semibold text-[#1DEE7F] mb-4">Get in Touch</h3>
        <p className="text-white/80 mb-6">
          Send us an email and we&apos;ll get back to you within 24 hours.
        </p>
        <a
          href="mailto:support@fileslap.com"
          className="inline-block rounded-full bg-[#1DEE7F] px-8 py-3 font-medium text-[#0D0D11] hover:brightness-110 transition"
        >
          Email Support
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/pricing"
          className="text-[#1DEE7F] hover:underline"
        >
          ← Back to Pricing
        </Link>
      </div>
    </main>
  );
} 