"use client";

import { trackEvent } from "@/lib/analytics";

export default function CallNow() {
  return (
    <a
      href="tel:+18652654105"
      onClick={() => trackEvent('click_call', { location: 'floating' })}
      className="fixed bottom-4 right-4 z-50 md:hidden inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:bg-primary/90"
      aria-label="Call now"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.13a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" />
      </svg>
      Call Now
    </a>
  );
}
