import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security & Privacy | FileSlap',
  description: 'Learn about FileSlap security measures: TLS-only connections, in-memory processing, and automatic PDF purging.',
  openGraph: {
    title: 'Security & Privacy | FileSlap',
    description: 'Learn about FileSlap security measures: TLS-only connections, in-memory processing, and automatic PDF purging.',
    url: 'https://www.fileslap.com/docs/security',
    siteName: 'FileSlap',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fileslap.com/docs/security',
  },
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Security & Privacy</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Your data security and privacy are our top priorities.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">Data Protection</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">TLS-Only</h3>
              <p className="text-sm text-white/60">
                All connections are encrypted with TLS 1.3. No data is transmitted over unsecured connections.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">In-Memory Processing</h3>
              <p className="text-sm text-white/60">
                Your HTML payload is processed entirely in memory. No files are written to disk during conversion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4 text-[#1DEE7F]">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Auto-Purge</h3>
              <p className="text-sm text-white/60">
                Generated PDFs are automatically purged from our servers after 1 hour. No long-term storage.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">Privacy Commitment</h2>
          
          <div className="space-y-4 text-white/80">
            <p>
              We believe in transparency about how we handle your data. FileSlap is designed with privacy-first principles:
            </p>
            
            <ul className="space-y-2 ml-6">
              <li>• <strong>No data retention:</strong> We don&apos;t store your HTML content or generated PDFs beyond the processing time</li>
              <li>• <strong>No tracking:</strong> We don&apos;t track individual user behavior or collect personal information</li>
              <li>• <strong>Minimal logging:</strong> Only essential operational logs are kept for service monitoring</li>
              <li>• <strong>GDPR compliant:</strong> Our data practices align with GDPR requirements</li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-6">API Security</h2>
          
          <div className="space-y-4 text-white/80">
            <p>
              Our API is built with enterprise-grade security:
            </p>
            
            <ul className="space-y-2 ml-6">
              <li>• <strong>API Key authentication:</strong> All requests require a valid API key</li>
              <li>• <strong>Rate limiting:</strong> Built-in protection against abuse</li>
              <li>• <strong>Input validation:</strong> All HTML input is validated and sanitized</li>
              <li>• <strong>Secure infrastructure:</strong> Hosted on secure cloud infrastructure with regular security updates</li>
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