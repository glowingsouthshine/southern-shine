import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="w-full bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">Welcome to A Southern Glow</p>
            <h1 className="mt-3 font-headline text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
              Friendly, Professional Cleaning that Makes Life Easier
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/80">
              Kind pros. Real smiles. Gloves and proper protection—without the hazmat vibe. We keep your home or vehicle fresh, sparkling, and worry‑free.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="shadow hover:shadow-md active:shadow-sm">
                <Link href="#services">Get a Free Estimate</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow hover:shadow-md active:shadow-sm">
                <Link href="tel:+18652654105">Call (865) 265-4105</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            {heroImage && (
              <div className="relative overflow-hidden rounded-xl border bg-card shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
