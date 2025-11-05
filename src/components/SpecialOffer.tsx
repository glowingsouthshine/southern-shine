"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SpecialOffer() {
  return (
    <section className="bg-accent/30 py-10 md:py-12">
      <div className="container text-center">
        <h3 className="font-headline text-2xl md:text-3xl">🍂 Fall Cleaning Special</h3>
        <p className="max-w-2xl mx-auto mt-2 text-muted-foreground">
          Book a Deep Clean this fall and get <span className="font-semibold">15% off</span>. Limited-time offer—perfect
          for fresh, cozy spaces before the holidays.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="#quote">Claim Offer</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#services">See Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
