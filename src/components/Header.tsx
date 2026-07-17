"use client";

import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="logo-glow flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="A Southern Glow"
            width={44}
            height={44}
            priority
            className="h-10 w-10 object-contain"
          />
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
              <Link href="/#quote" onClick={() => trackEvent('click_get_quote', { location: 'header' })} className="btn-velvet inline-flex items-center rounded-xl border border-primary/35 bg-card/70 px-3 py-2 transition-all duration-150 hover:bg-accent/60">Get a Quote</Link>
            </li>
            <li>
              <a href="tel:+18652654105" onClick={() => trackEvent('click_call', { location: 'header' })} className="btn-velvet inline-flex items-center rounded-xl bg-gradient-to-b from-primary to-[hsl(10_75%_45%)] px-3 py-2 text-white transition-all duration-150">
                Call (865) 265-4105
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
