export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    id: "hero-image",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop",
    description: "Clean, bright living room interior",
    imageHint: "cozy, bright, clean home interior, inviting",
  },
];

