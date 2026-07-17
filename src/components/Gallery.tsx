import Image from "next/image";

const shots = [
  { src: "/images/wiping-counter.jpg", alt: "A Southern Glow cleaner wiping a kitchen island to a shine" },
  { src: "/images/clean-kitchen-island.jpg", alt: "A bright, spotless kitchen after a clean" },
  { src: "/images/tidy-bedroom.jpg", alt: "A freshly made bedroom with crisp, tidy linens" },
];

export default function Gallery() {
  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">The work speaks for itself</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Real homes around East Tennessee, left clean, calm, and ready to enjoy.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <div
              key={shot.src}
              className={`relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-warm-lg ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
