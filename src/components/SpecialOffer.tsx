"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/* Season-aware so the promo never goes stale */
function currentSpecial() {
  const month = new Date().getMonth(); // 0 = Jan
  if (month >= 2 && month <= 4)
    return {
      name: "Spring Refresh Special",
      copy: "Book a Deep Clean this spring and get 15% off. Shake off the winter dust and let the sunshine in.",
    };
  if (month >= 5 && month <= 7)
    return {
      name: "Summer Shine Special",
      copy: "Book a Deep Clean this summer and get 15% off. More porch evenings, less scrubbing.",
    };
  if (month >= 8 && month <= 10)
    return {
      name: "Fall Cleaning Special",
      copy: "Book a Deep Clean this fall and get 15% off. Fresh, cozy spaces before the holidays.",
    };
  return {
    name: "Holiday Sparkle Special",
    copy: "Book a Deep Clean this winter and get 15% off. Company-ready before the doorbell rings.",
  };
}

export default function SpecialOffer() {
  const special = currentSpecial();
  useEffect(() => {
    trackEvent("view_promotion", { promotion_name: special.name });
  }, [special.name]);
  return (
    <section id="specials" className="bg-accent/30 py-10 md:py-12">
      <div className="container text-center">
        <h3 className="font-headline text-2xl md:text-3xl">{special.name}</h3>
        <p className="max-w-2xl mx-auto mt-2 text-muted-foreground">
          {special.copy.split("15% off").map((part, i) =>
            i === 0 ? (
              <span key={i}>
                {part}
                <span className="font-semibold">15% off</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="#quote" onClick={() => trackEvent("select_promotion", { promotion_name: special.name })}>
              Claim Offer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#services" onClick={() => trackEvent("click_services_from_promo", { promotion_name: special.name })}>
              See Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
