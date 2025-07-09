import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | FileSlap',
  description: 'Terms of Service for FileSlap HTML to PDF conversion API service.',
  robots: 'noindex',
};

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold text-white">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-white/80 mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">1. Acceptance of Terms</h2>
          <p className="text-white/80 mb-4">
            By accessing and using FileSlap (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">2. Description of Service</h2>
          <p className="text-white/80 mb-4">
            FileSlap provides an HTML to PDF conversion API service. The Service allows you to convert HTML content into PDF documents through our REST API.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">3. API Usage and Limits</h2>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• Free tier: 50 pages per month, 5 conversions per day</li>
            <li>• Paid tiers: As specified in your subscription plan</li>
            <li>• Rate limits may apply to prevent abuse</li>
            <li>• We reserve the right to modify limits with reasonable notice</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">4. Acceptable Use</h2>
          <p className="text-white/80 mb-4">You agree not to use the Service to:</p>
          <ul className="text-white/80 mb-4 space-y-2">
            <li>• Violate any applicable laws or regulations</li>
            <li>• Infringe on intellectual property rights</li>
            <li>• Generate content that is illegal, harmful, or offensive</li>
            <li>• Attempt to reverse engineer or compromise the Service</li>
            <li>• Use the Service for spam or mass unsolicited communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">5. Privacy and Data</h2>
          <p className="text-white/80 mb-4">
            We process your HTML content and generated PDFs in-memory only. We do not store, retain, or access your content after processing. 
            See our <Link href="/privacy" className="text-[#1DEE7F] hover:underline">Privacy Policy</Link> for more details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">6. Payment Terms</h2>
          <p className="text-white/80 mb-4">
            Paid plans are billed monthly. You may cancel at any time. Refunds are provided at our discretion. 
            Unused credits do not carry over to the next billing period.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">7. Service Availability</h2>
          <p className="text-white/80 mb-4">
            We strive to maintain high availability but do not guarantee 100% uptime. The Service is provided &quot;as is&quot; without warranties of any kind.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">8. Limitation of Liability</h2>
          <p className="text-white/80 mb-4">
            FileSlap shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">9. Termination</h2>
          <p className="text-white/80 mb-4">
            We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, 
            including breach of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">10. Changes to Terms</h2>
          <p className="text-white/80 mb-4">
            We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1DEE7F] mb-4">11. Contact</h2>
          <p className="text-white/80 mb-4">
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:ghost.exitcodezer0@proton.me" className="text-[#1DEE7F] hover:underline">
              ghost.exitcodezer0@proton.me
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
          href="/privacy"
          className="rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white hover:bg-[#1DEE7F]/10 transition"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
  );
} 