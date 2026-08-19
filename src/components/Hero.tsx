import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { UserCheck, HeartHandshake, MapPin } from "lucide-react";

const trustBadges = [
  { icon: UserCheck, label: "Free, No-Obligation Estimates" },
  { icon: HeartHandshake, label: "100% Happiness Guarantee" },
  { icon: MapPin, label: "Locally Owned — East TN" },
];

const sparkles = [
  { size: 6, top: "2rem", left: "3%", delay: "0.4s" },
  { size: 8, top: "4rem", left: "22%", delay: "0s" },
  { size: 5, top: "12rem", left: "8%", delay: "1.1s" },
  { size: 7, top: "18rem", left: "30%", delay: "0.7s" },
  { size: 6, bottom: "6rem", left: "5%", delay: "1.8s" },
  { size: 9, bottom: "2rem", left: "26%", delay: "1.3s" },
  { size: 5, top: "45%", left: "14%", delay: "2.4s" },
  { size: 10, top: "5rem", right: "5%", delay: "0.2s" },
  { size: 8, top: "10rem", right: "10%", delay: "0.6s" },
  { size: 12, top: "16rem", right: "12%", delay: "2.2s" },
  { size: 7, bottom: "10rem", right: "15%", delay: "2.5s" },
  { size: 6, bottom: "13rem", right: "30%", delay: "1.5s" },
  { size: 5, top: "50%", right: "4%", delay: "2.8s" },
  { size: 6, top: "1rem", right: "35%", delay: "1.9s" },
  { size: 5, bottom: "1rem", right: "45%", delay: "0.9s" },
];

/* A scattered field of small twinkling sparkles around the hero */
function Sparkles() {
  return (
    <>
      {sparkles.map((s, i) => (
        <svg
          key={i}
          aria-hidden
          width={s.size}
          height={s.size}
          viewBox="0 0 12 12"
          fill="none"
          className="pointer-events-none absolute text-primary"
          style={{
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            animation: `gold-glow 3s ease-in-out ${s.delay} infinite`,
          }}
        >
          <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" fill="currentColor" />
        </svg>
      ))}
    </>
  );
}

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
  return (
    <section className="relative w-full overflow-hidden">
      {/* Sunset sky wash behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--sunset-gold)/0.22)_0%,hsl(var(--sunset-rose)/0.14)_45%,transparent_85%)]"
      />
      <RollingHills />
      <Sparkles />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-gradient">
              Locally owned · Oak Ridge, TN
            </p>
            <h1 className="mt-3 font-headline text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
              Honest work, and a home you&rsquo;ll love coming back to.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-foreground/80">
              Careful, reliable cleaning for homes and offices around East Tennessee &mdash; fair
              prices and friendly service, no gimmicks.
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
          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            {/* The logo casts a warm bloom that dissolves gradually into the page — no visible edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[70%] -z-10 bg-[radial-gradient(closest-side,hsl(var(--sunset-gold)/0.30),hsl(var(--sunset-coral)/0.16)_35%,hsl(var(--sunset-coral)/0.06)_60%,transparent_100%)] blur-3xl"
            />
            <Logo className="relative w-full max-w-md drop-shadow-[0_0_70px_hsl(var(--sunset-gold)/0.35)]" />
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
