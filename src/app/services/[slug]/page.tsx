import { Metadata } from "next";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

type Params = { slug: string };

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

export function generateStaticParams() {
  return services.map(s => ({ slug: slugOf(s.name) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find(s => slugOf(s.name) === slug);
  if (!svc) return {};
  return {
    title: `${svc.name} | A Southern Glow`,
    description: svc.description,
  };
}

export default function ServicePage({ params }: any) {
  const svc = services.find(s => slugOf(s.name) === params.slug);
  if (!svc) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.description,
    areaServed: ["Oak Ridge", "Knoxville", "Sevierville", "Tennessee"],
    provider: { "@type": "LocalBusiness", name: "A Southern Glow", telephone: "+1-865-265-4105" },
    offers: svc.basePrice ? { "@type": "Offer", priceCurrency: "USD", price: svc.basePrice } : undefined,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
      <h1 className="font-headline text-4xl font-bold">{svc.name}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{svc.description}</p>
      <div className="mt-8 prose prose-neutral dark:prose-invert">
        <h2>What’s included</h2>
        <ul>
          <li>Friendly, respectful professionals</li>
          <li>Detailed checklist tailored to your home</li>
          <li>Flexible scheduling and reminders</li>
        </ul>
        <h2>Get an instant estimate</h2>
        <p>Use the estimator on the home page to pick add-ons and see your price before booking.</p>
      </div>
      <a href="/#quote" className="mt-8 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white">Request a Quote</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
