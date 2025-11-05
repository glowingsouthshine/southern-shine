import Link from "next/link";

const AREAS = [
  { slug: "oak-ridge", name: "Oak Ridge" },
  { slug: "knoxville", name: "Knoxville" },
  { slug: "sevierville", name: "Sevierville" },
  { slug: "farragut", name: "Farragut" },
  { slug: "maryville", name: "Maryville" },
  { slug: "alcoa", name: "Alcoa" },
  { slug: "powell", name: "Powell" },
  { slug: "lenoir-city", name: "Lenoir City" },
  { slug: "clinton", name: "Clinton" },
];

export const metadata = {
  title: "Service Areas | A Southern Glow",
  description: "House and office cleaning in Oak Ridge, Knoxville, Sevierville and nearby communities.",
};

export default function AreasIndex() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-headline text-4xl font-bold">Service Areas</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Proudly serving East Tennessee with reliable, respectful cleaning services.</p>
      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {AREAS.map((a) => (
          <li key={a.slug} className="rounded-lg border p-5">
            <h2 className="font-semibold">{a.name}</h2>
            <Link href={`/areas/${a.slug}`} className="inline-block mt-2 text-primary underline">Learn more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
