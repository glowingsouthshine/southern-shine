import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Southern Glow | Professional Cleaning Services in Tennessee",
  description: "Experience premium housekeeping and cleaning services in Tennessee. From deep cleaning to car detailing, we bring Southern hospitality and shine to every home and vehicle. Get your free estimate today!",
  keywords: "cleaning services Tennessee, housekeeping Alcoa, deep cleaning, move-in cleaning, car detailing, professional cleaners Tennessee, home cleaning services",
  authors: [{ name: "A Southern Glow" }],
  openGraph: {
    title: "A Southern Glow | Professional Cleaning Services",
    description: "Premium cleaning services with Tennessee hospitality. Deep cleaning, move-in/out services, and car detailing.",
    url: "https://asouthernglow.com",
    siteName: "A Southern Glow",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}