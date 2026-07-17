export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    // Hero image is managed by the owner for Google indexing — do not change without asking.
    id: "hero-image",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop",
    description: "Smiling cleaner wearing gloves and light protective gear",
    imageHint: "friendly cleaner smiling, gloves, light protective gear, bright and inviting, not hazmat",
  },
  {
    id: "about-image",
    imageUrl: "/images/about-care.png",
    description: "Carefully dusting a family's antique china cabinet with a soft cloth",
    imageHint: "gentle detailed cleaning of cherished furniture in a family home",
  },
  {
    id: "counter-image",
    imageUrl: "/images/counter-shine.png",
    description: "Wiping a kitchen counter to a streak-free shine",
    imageHint: "cleaner polishing bright kitchen countertop",
  },
];
