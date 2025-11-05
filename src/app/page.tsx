import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import SpecialOffer from "@/components/SpecialOffer";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import SEO from "@/components/SEO";
import FAQ from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
      <SEO />
        <Hero />
        <Services />
        <section id="quote" className="py-16 sm:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Card className="shadow-lg border-primary/30">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <RequestQuoteForm />
              </CardContent>
            </Card>
          </div>
        </section>
        <SpecialOffer />
        <Reviews />
        <FAQ />
        <section id="contact" className="py-16 sm:py-24 bg-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Card className="shadow-lg border-primary/30">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
