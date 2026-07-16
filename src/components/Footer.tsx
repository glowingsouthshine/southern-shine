"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-foreground/70">(c) {new Date().getFullYear()} A Southern Glow. All rights reserved.</p>
          <p className="text-xs text-foreground/60 mt-1">100% Happiness Guarantee - if you are not thrilled, we will come back and make it right.</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/services" className="text-foreground/80 hover:text-primary">Services</Link>
          <Link href="/areas" className="text-foreground/80 hover:text-primary">Service Areas</Link>
          <Link href="/quote" className="text-foreground/80 hover:text-primary">Free Quote</Link>
          <Link href="/pay" className="text-foreground/80 hover:text-primary">Pay Invoice</Link>
          <Link href="/#reviews" className="text-foreground/80 hover:text-primary">Reviews</Link>
          <Link href="/#contact" className="text-foreground/80 hover:text-primary">Contact</Link>
          <Link href="/#quote" onClick={() => trackEvent('click_get_quote', { location: 'footer' })} className="inline-flex items-center rounded-md border border-primary/35 bg-card/70 px-3 py-1.5 shadow-btn transition-all duration-150 hover:-translate-y-px hover:bg-accent/60 hover:shadow-btn-lg active:translate-y-[2px] active:shadow-btn-sm">Get a Quote</Link>
        </nav>
      </div>
    </footer>
  );
}
