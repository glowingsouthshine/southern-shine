import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-lg md:order-last">
            {aboutImage && (
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-warm-lg">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">About A Southern Glow</h2>
            <div className="mt-6 space-y-4 text-foreground/80">
              <p>
                A Southern Glow is a family-owned cleaning business built on hard work, honest
                service, and respect for the people we serve. We understand that your home is more
                than just a place—it's where your family lives, rests, and makes memories. That's
                why we care for every home as thoughtfully as we would our own.
              </p>
              <p className="border-l-4 border-primary/50 pl-4 font-headline text-xl text-foreground/90">
                Our goal is simple: to make your home glow like the evening light over the East
                Tennessee mountains.
              </p>
              <p>
                We take pride in showing up, working hard, and paying attention to the details that
                matter. Whether you need routine cleaning, a deep clean, or help preparing for a
                move, you can count on friendly service and a job done with genuine care.
              </p>
              <p>
                When you welcome A Southern Glow into your home, you're trusting a local family
                that values your time, respects your space, and believes good work should speak for
                itself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
