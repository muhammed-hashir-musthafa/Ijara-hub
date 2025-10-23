import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/renter/ui/header";
import { Footer } from "@/components/renter/ui/footer";

export const metadata: Metadata = {
  title: "Ijara Hub | Ijara Hub Premium Rental Service",
  description:
    "Discover luxury room and car rentals across the UAE. Premium service, unmatched quality.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "Ijara Hub",
    "Car Rentals",
    "Property Rentals",
    "Luxury Rentals",
    "Room Rentals",
    "Premium Service",
    "Vehicle Hire",
    "Apartment Rentals",
    "Vacation Rentals",
    "Short-term Rentals",
    "Long-term Rentals",
    "Rental Deals",
    "Customer Satisfaction",
  ],
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
