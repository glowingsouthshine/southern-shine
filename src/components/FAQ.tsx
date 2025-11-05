"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQS = [
  { q: "How much does a standard clean cost?", a: "Most homes start around $120 and vary with size and add-ons. Use the estimate tool for a quick quote." },
  { q: "Do I need to be home?", a: "No. Many clients provide access instructions. We can text before and after each visit." },
  { q: "What areas do you serve?", a: "Oak Ridge, Knoxville, Sevierville and nearby Tennessee communities." },
  { q: "Are you insured?", a: "Yes, fully insured. We treat every home with care and respect." },
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

