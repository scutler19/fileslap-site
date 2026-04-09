import { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security & Privacy | FileSlap',
  description:
    'How FileSlap handles HTTPS, temporary files during conversion, logging, and API access. Plain-language overview.',
  openGraph: {
    title: 'Security & Privacy | FileSlap',
    description:
      'HTTPS, temporary PDF handling, and what may be logged. Written for developers integrating the API.',
    url: absoluteUrl('/docs/security'),
    siteName: 'FileSlap',
    type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'FileSlap' }],
  },
  alternates: {
    canonical: absoluteUrl('/docs/security'),
  },
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Security & Privacy</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Plain-language expectations for the conversion API.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">How we handle requests and files</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">HTTPS</h3>
              <p className="text-sm text-white/60">
                The public API and site are served over HTTPS. If your HTML includes sensitive data, protect it in
                transit and in your own systems.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Temporary PDF files</h3>
              <p className="text-sm text-white/60">
                Your HTML is processed to complete the conversion request. PDF files may be stored temporarily
                during processing or delivery, then removed on a schedule. Timing can vary.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Not long-term storage</h3>
              <p className="text-sm text-white/60">
                FileSlap is not intended as a long-term document storage service. Do not rely on us to archive HTML
                or PDFs for later retrieval.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">Privacy</h2>

          <div className="space-y-4 text-white/80">
            <ul className="space-y-3 ml-6 list-none">
              <li>
                • Your HTML is processed to complete the conversion request. We do not use your content for purposes unrelated to providing the service.
              </li>
              <li>
                • PDF files may be stored temporarily during processing or delivery. We do not position the product as
                a place to keep documents indefinitely.
              </li>
              <li>
                • Operational logs and usage data may be retained (for example to run the service, troubleshoot,
                meter usage, and enforce limits). If you need detail for your own policies, contact us.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">API access and input</h2>

          <div className="space-y-4 text-white/80">
            <ul className="space-y-2 ml-6 list-none">
              <li>• Requests use API key authentication.</li>
              <li>• Rate limiting may apply.</li>
              <li>
                • JSON fields are checked for basic validity (types and limits). That is not the same as reviewing or
                sanitizing your HTML—you decide what you send, and you are responsible for it.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/docs"
          className="text-[#1DEE7F] hover:underline"
        >
          ← Back to Documentation
        </Link>
      </div>
    </main>
  );
}
