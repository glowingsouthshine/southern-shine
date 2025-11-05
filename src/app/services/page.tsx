import Link from "next/link";
import { services } from "@/lib/data";

export const metadata = {
  title: "Cleaning Services | A Southern Glow",
  description: "Standard, Deep, Move-In/Out cleaning and Car Detailing in Oak Ridge, Knoxville, Sevierville.",
};

export default function ServicesIndex() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-headline text-4xl font-bold">Our Cleaning Services</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Transparent pricing, friendly professionals, and results that make your home or vehicle shine.</p>
      <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <li key={s.name} className="rounded-lg border p-5">
            <div className="flex items-center gap-2">
              <s.icon className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{s.name}</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            <Link href={`/services/${s.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g,'-')}`} className="inline-block mt-4 text-primary underline">Learn more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

