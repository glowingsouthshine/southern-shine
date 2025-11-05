import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="relative w-full h-[60dvh] min-h-[500px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="absolute inset-0 bg-background/30" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-foreground font-bold leading-tight tracking-tight">
            Experience the Glow of a Truly Clean Home
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/90">
            A Southern Glow offers premium cleaning services with a touch of Tennessee hospitality. Let our kind and respectful team make your home or vehicle shine.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#services">Get a Free Estimate</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}