/* src/app/subscribe/page.tsx */
import { Suspense } from 'react';
import SubscribeClient from './SubscribeClient';

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