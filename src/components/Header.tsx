"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Specials", href: "/#specials" },
    { name: "About", href: "/#about" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            A Southern Glow
          </span>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#quote" onClick={() => trackEvent('click_get_quote', { location: 'header' })} className="inline-flex items-center rounded-md border border-primary/35 bg-card/70 px-3 py-2 shadow-btn transition-all duration-150 hover:-translate-y-px hover:bg-accent/60 hover:shadow-btn-lg active:translate-y-[2px] active:shadow-btn-sm">Get a Quote</Link>
            </li>
            <li>
              <a href="tel:+18652654105" onClick={() => trackEvent('click_call', { location: 'header' })} className="inline-flex items-center rounded-md bg-gradient-to-b from-primary to-[hsl(10_75%_45%)] px-3 py-2 text-white shadow-btn transition-all duration-150 hover:-translate-y-px hover:shadow-btn-lg hover:brightness-105 active:translate-y-[2px] active:shadow-btn-sm active:brightness-95">
                Call (865) 265-4105
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
