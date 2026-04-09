import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FileSlap',
  description: 'Privacy Policy for FileSlap HTML to PDF conversion API service.',
  robots: 'noindex',
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold text-white">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-white/80 mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">1. Information We Collect</h2>
          <p className="text-white/80 mb-4">
            We collect minimal information necessary to provide our service:
          </p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• <strong>Account Information:</strong> Email address for account creation and API key management</li>
            <li>• <strong>Usage Data:</strong> API request logs, conversion counts, and error rates for service optimization</li>
            <li>• <strong>Technical Data:</strong> IP addresses, user agents, and request timestamps for security and rate limiting</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">2. How We Process Your Content</h2>
          <p className="text-white/80 mb-4">
            <strong>Important:</strong> Your HTML is processed to complete the conversion request. PDF files may be
            stored temporarily during processing or delivery. The service is not intended as a long-term document
            storage service—we do not offer a vault or archive for you to fetch old HTML or PDFs from us later.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">3. How We Use Your Information</h2>
          <p className="text-white/80 mb-4">We use the information we collect to:</p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• Provide and maintain the FileSlap service</li>
            <li>• Process your API requests and deliver PDFs</li>
            <li>• Monitor service performance and prevent abuse</li>
            <li>• Send important service updates and notifications</li>
            <li>• Respond to support requests and inquiries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-white/80 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties, except:
          </p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• <strong>Service Providers:</strong> We use trusted third-party services for hosting, analytics, and payment processing</li>
            <li>• <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            <li>• <strong>Business Transfers:</strong> In the event of a merger or acquisition, user information may be transferred</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">5. Data Security</h2>
          <p className="text-white/80 mb-4">
            We use reasonable measures to protect information we handle, including:
          </p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• HTTPS for traffic to our website and API</li>
            <li>• API keys for authenticated access</li>
            <li>• Temporary handling of generated PDFs as described in section 2 and our <Link href="/docs/security" className="text-[#1DEE7F] hover:underline">Security & Privacy</Link> page</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">6. Data Retention</h2>
          <p className="text-white/80 mb-4">
            <strong>Content from conversions:</strong> HTML is processed to complete each request. PDF files may be stored
            temporarily during processing or delivery, then removed on a schedule. See section 2.
          </p>
          <p className="text-white/80 mb-4">
            <strong>Operational logs and usage data:</strong> Operational logs and usage data may be retained to operate the
            service, enforce limits, and fix problems.
          </p>
          <p className="text-white/80 mb-4">
            <strong>Account Data:</strong> We retain account information for as long as your account is active, plus a
            reasonable period for legal and ordinary business purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">7. Your Rights</h2>
          <p className="text-white/80 mb-4">You have the right to:</p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• Access your account information</li>
            <li>• Update or correct your information</li>
            <li>• Delete your account and associated data</li>
            <li>• Export your data in a portable format</li>
            <li>• Opt out of non-essential communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">8. Cookies and Tracking</h2>
          <p className="text-white/80 mb-4">
            We use minimal cookies and tracking technologies:
          </p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• Essential cookies for website functionality</li>
            <li>• Analytics cookies to understand usage patterns (with consent)</li>
            <li>• No tracking cookies for advertising purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">9. International Data Transfers</h2>
          <p className="text-white/80 mb-4">
            Our providers and infrastructure may process data in various countries. If you have questions about where
            data is handled, contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">10. Changes to This Policy</h2>
          <p className="text-white/80 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of significant changes 
            via email or through our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">11. Contact Us</h2>
          <p className="text-white/80 mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
            <a href="mailto:stackdaddy.dev@gmail.com" className="text-[#1DEE7F] hover:underline">
              stackdaddy.dev@gmail.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] hover:brightness-110 transition"
        >
          Back to Home
        </Link>
        <Link
          href="/terms"
          className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white hover:bg-[#1DEE7F]/10 transition"
        >
          Terms of Service
        </Link>
      </div>
    </main>
  );
} 