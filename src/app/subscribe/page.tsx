/* src/app/subscribe/page.tsx */
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Plan = {
  id: string;
  name: string;
  price: number;
  pages: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    pages: '2,000 pages / mo',
    features: [
      '2,000 pages per month',
      'Overage $0.002 / page',
      'Email support',
      'Cancel anytime'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    pages: '12,000 pages / mo',
    features: [
      '12,000 pages per month',
      'Overage $0.002 / page',
      'Priority email support',
      'Cancel anytime'
    ]
  }
];

export default function SubscribePage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'starter';
  
  const [selectedPlan, setSelectedPlan] = useState<string>(planId);
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  // Check for existing API key on load
  useEffect(() => {
    const stored = localStorage.getItem('fs_api_key');
    if (stored) {
      setApiKey(stored);
      setHasExistingKey(true);
    } else {
      // Fallback to cookie
      const m = document.cookie.match(/(?:^|;\s*)fs_api_key=([^;]+)/);
      if (m) {
        const cookieKey = decodeURIComponent(m[1]);
        setApiKey(cookieKey);
        setHasExistingKey(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);
    setLoading(true);

    try {
      let finalApiKey = apiKey;

      // If user doesn't have an API key, generate one first
      if (!hasExistingKey && !apiKey.trim()) {
        const signupRes = await fetch('https://api.fileslap.com/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() })
        });

        if (!signupRes.ok) {
          throw new Error('Failed to generate API key');
        }

        const { apiKey: newKey } = await signupRes.json();
        finalApiKey = newKey;
        
        // Store the new key
        localStorage.setItem('fs_api_key', newKey);
        document.cookie = `fs_api_key=${encodeURIComponent(newKey)}; path=/; max-age=2592000; SameSite=Lax`;
      }

      // Now redirect to Stripe checkout with the API key
      const stripeUrl = `https://api.fileslap.com/api/subscribe/${selectedPlan}?key=${finalApiKey}`;
      window.location.href = stripeUrl;

          } catch {
        // setError('Something went wrong. Please try again.');
        setLoading(false);
      }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Subscribe to {selectedPlanData?.name}</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Complete your subscription to unlock {selectedPlanData?.pages} of PDF conversions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-lg border cursor-pointer transition ${
              selectedPlan === plan.id
                ? 'border-[#1DEE7F] bg-[#0e1912]'
                : 'border-[#1DEE7F]/30 bg-[#111217] hover:border-[#1DEE7F]/50'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#1DEE7F]">{plan.name}</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">${plan.price}</div>
                <div className="text-sm text-white/60">per month</div>
              </div>
            </div>
            
            <div className="text-sm text-white/80 mb-4">{plan.pages}</div>
            
            <ul className="space-y-2 text-sm text-white/60">
              {plan.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-lg border border-[#1DEE7F]/30 bg-[#111217]">
        <h3 className="text-2xl font-semibold text-[#1DEE7F] mb-6">Complete Your Subscription</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-[#1DEE7F]/30 bg-[#0D0D11] px-4 py-3 text-white placeholder-white/50 focus:border-[#1DEE7F] focus:outline-none transition"
            />
            <p className="mt-1 text-sm text-white/60">
              Required for subscription management and support
            </p>
          </div>

          {hasExistingKey ? (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Your existing API key"
                className="w-full rounded-lg border border-[#1DEE7F]/30 bg-[#0D0D11] px-4 py-3 text-white placeholder-white/50 focus:border-[#1DEE7F] focus:outline-none transition"
              />
              <p className="mt-1 text-sm text-white/60">
                We found an existing API key. You can use this one or generate a new one.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/20">
              <p className="text-sm text-white/80">
                No API key found. We&apos;ll generate a new one for you during the subscription process.
              </p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/20">
            <div className="flex justify-between items-center">
              <span className="text-white">Selected Plan:</span>
              <span className="text-[#1DEE7F] font-semibold">{selectedPlanData?.name}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-white">Monthly Price:</span>
              <span className="text-white font-semibold">${selectedPlanData?.price}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full rounded-full bg-[#1DEE7F] px-8 py-4 font-medium text-[#0D0D11] transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Subscribe to ${selectedPlanData?.name} Plan`}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/60 text-center">
          By subscribing, you agree to our{' '}
          <Link href="/terms" className="text-[#1DEE7F] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#1DEE7F] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-[#1DEE7F] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
} 