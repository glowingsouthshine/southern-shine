"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQS = [
  { q: "How much does a standard clean cost?", a: "Most homes start around $120 and vary with size and add-ons. Use the estimate tool for a quick quote." },
  { q: "Do you offer discounts for regular cleanings?", a: "We sure do — weekly visits save 15%, every-2-weeks saves 10%, and monthly saves 5%. Regulars get the family rate." },
  { q: "Will you really water my plants and give my pets a treat?", a: "Happily, and it's free — just tell us it's okay first. We'll follow any instructions you leave, and we always check about treats since some critters have special diets." },
  { q: "How do I pay?", a: "After the clean, whenever you're happy — card at the door, cash, check, or a secure text-to-pay link. Never a dime upfront." },
  { q: "Do I need to be home?", a: "No. Many clients provide access instructions. We can text before and after each visit." },
  { q: "What areas do you serve?", a: "Oak Ridge, Knoxville, Sevierville and nearby East Tennessee communities. Travel is free within about 20 miles of Oak Ridge; a small trip fee may apply beyond that." },
  { q: "How do you treat my home?", a: "With care and respect, every visit. If something isn't right, tell me and I'll make it right." },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-8">
          <Accordion type="single" collapsible>
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

