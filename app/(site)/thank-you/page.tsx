'use client';

import { useEffect } from 'react';

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof (window as { gtag?: (a: string, b: string, c: object) => void }).gtag === 'function') {
      const params = new URLSearchParams(window.location.search);
      (window as { gtag?: (a: string, b: string, c: object) => void }).gtag!('event', 'purchase', {
        currency: 'USD',
        transaction_id: params.get('order_id') || 'unknown',
        value: params.get('amount') || 0,
        items: [{ item_id: params.get('product_id') || 'unknown', item_name: params.get('product_name') || 'Custom Order' }],
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--ksf-cream)]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-[var(--ksf-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--ksf-green)] mb-4 font-serif">Thank You for Your Order!</h1>
          <p className="text-lg text-[var(--ksf-dark)] mb-6">
            We&apos;ve received your order and are excited to start crafting your custom piece. You&apos;ll receive an email confirmation shortly.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-[var(--ksf-brown)]/20">
            <h2 className="text-xl font-semibold text-[var(--ksf-green)] mb-4 font-serif">What&apos;s Next?</h2>
            <ul className="text-left space-y-3 text-[var(--ksf-dark)]">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[var(--ksf-green)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span>We&apos;ll review your order and begin crafting within 1-2 business days</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[var(--ksf-green)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span>You&apos;ll receive updates via email</span>
              </li>
            </ul>
          </div>
          <div className="bg-[var(--ksf-cream)] rounded-lg p-6 border border-[var(--ksf-brown)]/20">
            <h2 className="text-xl font-semibold text-[var(--ksf-green)] mb-4 font-serif">Questions?</h2>
            <a href="mailto:kingstreetfarms@gmail.com" className="text-[var(--ksf-green)] hover:text-[var(--ksf-brown)]">
              kingstreetfarms@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
