/* src/app/signup/page.tsx */
import SignupForm from '@/components/SignupForm';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Free API Key | FileSlap',
  description: 'Get your free FileSlap API key and start converting HTML to PDF instantly. Free tier includes 50 pages per month. No credit card required.',
  keywords: [
    'free API key',
    'HTML to PDF API',
    'FileSlap signup',
    'PDF conversion API',
    'free tier',
    'API registration',
    'developer signup'
  ],
  openGraph: {
    title: 'Get Your Free FileSlap API Key | HTML to PDF Conversion',
    description: 'Get your free FileSlap API key and start converting HTML to PDF instantly. Free tier includes 50 pages per month.',
    url: 'https://fileslap.com/signup',
    siteName: 'FileSlap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Get Your Free FileSlap API Key | HTML to PDF Conversion',
    description: 'Get your free FileSlap API key and start converting HTML to PDF instantly.',
  },
  alternates: {
    canonical: 'https://fileslap.com/signup',
  },
};

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get Your Free API Key</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Start converting HTML to PDF instantly. Your first 50 pages each month are completely free.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/60 mb-4">
          Already have an API key? 
        </p>
        <Link
          href="/docs"
          className="text-[#1DEE7F] hover:underline"
        >
          View the documentation →
        </Link>
      </div>
    </main>
  );
} 