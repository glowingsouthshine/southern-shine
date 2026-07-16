import { Clock, Receipt, RotateCcw } from "lucide-react";

const promises = [
  {
    icon: Clock,
    sound: "Knock, knock.",
    title: "On time, every time",
    text: "We show up when we say we will — and we'll text you when we're on the way.",
  },
  {
    icon: Receipt,
    sound: "Cha-ching? Nope.",
    title: "Honest, upfront pricing",
    text: "The estimate you see is the price you pay. No upsells at the door, no surprise fees.",
  },
  {
    icon: RotateCcw,
    sound: "Squeak. Squeak.",
    title: "The re-shine guarantee",
    text: "If anything's not shining, tell us within 24 hours and we'll come back and re-clean it free.",
  },
];

export default function Promises() {
  return (
    <section id="promise" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-gradient">
            Our word is our bond
          </p>
          <h2 className="mt-2 font-headline text-3xl sm:text-4xl font-bold">
            The Southern Glow Promise
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {promises.map(({ icon: Icon, sound, title, text }) => (
            <div
              key={title}
              className="group rounded-xl border border-primary/15 bg-card/90 p-6 shadow-warm transition-all duration-200 hover:-translate-y-1 hover:shadow-warm-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-[hsl(10_75%_45%)] shadow-btn">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="mt-4 text-xs font-semibold italic text-muted-foreground">{sound}</p>
              <h3 className="mt-1 font-headline text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
