/* src/app/signup/page.tsx */
import SignupForm from '@/components/SignupForm';
import Link from 'next/link';

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