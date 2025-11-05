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

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
      <SEO />
        <Hero />
        <Services />
        <RequestQuoteForm />
        <SpecialOffer />
        <Reviews />
        <FAQ />
      <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
