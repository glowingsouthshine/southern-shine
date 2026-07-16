import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Smartphone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pay Your Invoice | A Southern Glow",
  description:
    "Easy, secure ways to pay for your cleaning — card, cash, or check. No surprises, ever.",
};

const payLink = process.env.NEXT_PUBLIC_PAY_LINK;

const methods = [
  {
    icon: CreditCard,
    title: "Card",
    text: "Tap or chip right at your door, or use the secure online link we text with your invoice.",
  },
  {
    icon: Banknote,
    title: "Cash or Check",
    text: "Old-fashioned works just fine. Checks payable to A Southern Glow.",
  },
  {
    icon: Smartphone,
    title: "Text-to-Pay",
    text: "Not home? We'll text you a secure payment link when the shine is done.",
  },
];

export default function PayPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-gradient">
              Cha-ching, the friendly kind
            </p>
            <h1 className="mt-2 font-headline text-4xl sm:text-5xl font-bold">Pay Your Invoice</h1>
            <p className="mt-4 text-lg text-foreground/80">
              You pay after the work is done and you're happy with it — never before.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {methods.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="shadow-warm border-primary/15">
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-[hsl(10_75%_45%)] shadow-btn">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg pt-2">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground/75">{text}</CardContent>
              </Card>
            ))}
          </div>

          {payLink ? (
            <div className="mt-10 text-center">
              <Button asChild size="lg">
                <a href={payLink} target="_blank" rel="noopener noreferrer">
                  Pay Securely Online
                </a>
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Payments are processed securely — we never see or store your card details.
              </p>
            </div>
          ) : (
            <Card className="mt-10 shadow-warm border-primary/15">
              <CardContent className="pt-6 text-center text-foreground/80">
                Your invoice includes a secure payment link — check your text messages or email.
                Questions? Call{" "}
                <a href="tel:+18652654105" className="font-semibold text-primary hover:underline">
                  (865) 265-4105
                </a>{" "}
                and we'll sort it out together.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
