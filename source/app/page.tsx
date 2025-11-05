import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import SpecialOffer from "@/components/SpecialOffer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <SpecialOffer />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}