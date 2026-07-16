export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    id: "hero-image",
    imageUrl: "/images/hero-team.png",
    description: "Two friendly A Southern Glow cleaners sharing a laugh in a warm East Tennessee kitchen",
    imageHint: "friendly cleaners smiling, warm wood kitchen, bright and inviting",
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
