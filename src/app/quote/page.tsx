import RequestQuoteForm from "@/components/RequestQuoteForm";

export const metadata = {
  title: "Get a Quote | A Southern Glow",
  description: "Request a free estimate for house, office cleaning, or car detailing in East Tennessee.",
};

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-2xl">
      <h1 className="font-headline text-4xl font-bold">Get a Free Quote</h1>
      <p className="mt-3 text-muted-foreground">Tell us a bit about your home or vehicle and preferred date. We’ll confirm quickly during business hours.</p>
      <div className="mt-8">
        <RequestQuoteForm />
      </div>
    </div>
  );
}

