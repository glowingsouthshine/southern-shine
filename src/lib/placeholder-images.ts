export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    id: "hero-image",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop",
    description: "Smiling cleaner wearing gloves and light protective gear",
    imageHint: "friendly cleaner smiling, gloves, light protective gear, bright and inviting, not hazmat",
  },
];

