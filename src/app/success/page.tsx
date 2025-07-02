/* src/app/success/page.tsx */
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center p-8">Loading…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
