export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint?: string;
};

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    id: "about-image",
    imageUrl: "/images/dusting-hutch.jpg",
    description: "A Southern Glow cleaner carefully dusting an antique china cabinet",
    imageHint: "gentle detailed cleaning of cherished furniture in a family home",
  },
];
