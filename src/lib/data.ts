import { Bath, Car, Home, Sparkles } from "lucide-react";

export type Service = {
  name: string;
  description: string;
  basePrice: number | null;
  pricePerSqFt?: number | null;
  icon: any;
};

export const services: Service[] = [
  {
    name: "Standard Clean",
    description: "Perfect for routine upkeep and tidy homes.",
    basePrice: 120,
    pricePerSqFt: 0.08,
    icon: Sparkles,
  },
  {
    name: "Deep Clean",
    description: "Thorough top-to-bottom clean for a fresh reset.",
    basePrice: 200,
    pricePerSqFt: 0.12,
    icon: Home,
  },
  {
    name: "Move-In/Out Clean",
    description: "Detailed clean ideal for moving days.",
    basePrice: 250,
    pricePerSqFt: 0.12,
    icon: Bath,
  },
  {
    name: "Car Detailing",
    description: "Interior detailing to make your vehicle shine.",
    basePrice: 90,
    pricePerSqFt: null,
    icon: Car,
  },
];

export const addons = [
  { id: "fridge", name: "Inside Fridge", price: 30 },
  { id: "oven", name: "Inside Oven", price: 30 },
  { id: "windows", name: "Interior Windows (first 10, then $4/ea)", price: 50 },
  { id: "laundry", name: "Laundry (up to 2 loads, started during clean)", price: 25 },
  { id: "plants", name: "Water the Plants", price: 0 },
  { id: "critters", name: "Treats for the Critters (with your okay)", price: 0 },
];

export const frequencies = [
  { id: "one-time", name: "One-Time", discount: 0 },
  { id: "monthly", name: "Monthly", discount: 0.05 },
  { id: "biweekly", name: "Every 2 Weeks", discount: 0.1 },
  { id: "weekly", name: "Weekly", discount: 0.15 },
];

export const carDetailingAddons = [
  { id: "vacuum", name: "Full Vacuum & Wipe-down", price: 30 },
  { id: "shampoo", name: "Carpet/Upholstery Shampoo", price: 60 },
  { id: "leather", name: "Leather Clean & Condition", price: 40 },
];

export const carDetailingBundles = [
  { id: "basic", name: "Basic", services: ["Full Vacuum & Wipe-down"], price: 30 },
  { id: "deluxe", name: "Deluxe", services: ["Full Vacuum & Wipe-down", "Carpet/Upholstery Shampoo"], price: 80 },
  { id: "premium", name: "Premium", services: ["Full Vacuum & Wipe-down", "Carpet/Upholstery Shampoo", "Leather Clean & Condition"], price: 110 },
];

// Real customer reviews only. Add entries here as they come in — or wire this
// to the Google Business Profile feed once it's live.
export const reviews: { name: string; rating: number; review: string }[] = [];

