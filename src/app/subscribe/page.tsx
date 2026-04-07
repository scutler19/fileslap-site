/* src/app/subscribe/page.tsx */
import { Suspense } from 'react';
import type { Metadata } from 'next';
import SubscribeClient from './SubscribeClient';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Subscribe',
  description:
    'Subscribe to FileSlap Starter or Pro for higher HTML-to-PDF volume. Manage billing from your account.',
  alternates: { canonical: absoluteUrl('/subscribe') },
  robots: { index: false, follow: false },
};

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Loading subscription options...
          </p>
        </div>
      </main>
    }>
      <SubscribeClient />
    </Suspense>
  );
} 