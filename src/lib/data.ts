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
  { id: "windows", name: "Interior Windows", price: 50 },
  { id: "laundry", name: "Laundry (per load)", price: 25 },
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

export const reviews = [
  { name: "Emily R.", rating: 5, review: "They made my home sparkle! Friendly and professional." },
  { name: "John D.", rating: 5, review: "Reliable service and great communication. Highly recommend." },
  { name: "Sofia K.", rating: 4, review: "Deep clean was fantastic. Will book again." },
];

