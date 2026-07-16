import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { UserCheck, HeartHandshake, MapPin } from "lucide-react";

const trustBadges = [
  { icon: UserCheck, label: "Pay After You're Happy" },
  { icon: HeartHandshake, label: "100% Happiness Guarantee" },
  { icon: MapPin, label: "Locally Owned — East TN" },
];

/* Layered rolling-hill silhouettes fading into the valley haze */
function RollingHills() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block h-28 w-full sm:h-40">
        <path
          d="M0,140 C240,60 420,110 720,90 C1020,70 1200,120 1440,80 L1440,220 L0,220 Z"
          fill="hsl(var(--hill-far) / 0.22)"
        />
        <path
          d="M0,180 C280,110 560,160 840,135 C1120,110 1300,165 1440,140 L1440,220 L0,220 Z"
          fill="hsl(var(--hill-near) / 0.28)"
        />
        <path
          d="M0,205 C360,160 720,200 1080,180 C1260,170 1380,190 1440,185 L1440,220 L0,220 Z"
          fill="hsl(var(--dusk) / 0.30)"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="relative w-full overflow-hidden">
      {/* Sunset sky wash behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--sunset-gold)/0.22)_0%,hsl(var(--sunset-rose)/0.14)_45%,transparent_85%)]"
      />
      <RollingHills />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-gradient">
              Swish. Sparkle. Shine.
            </p>
            <h1 className="mt-3 font-headline text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
              Friendly, Professional Cleaning that Makes Life Easier
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/80">
              Kind pros. Real smiles. Gloves and proper protection—without the hazmat vibe. We keep
              your home or vehicle fresh, sparkling, and worry‑free.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="#services">Get a Free Estimate</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="tel:+18652654105">Call (865) 265-4105</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            {heroImage && (
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-warm-lg">
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

        {/* Trust strip — the promises up front */}
        <div className="relative z-10 mt-14 grid grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-4">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border border-primary/15 bg-card/85 px-4 py-3 shadow-warm backdrop-blur-sm"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground/90">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
