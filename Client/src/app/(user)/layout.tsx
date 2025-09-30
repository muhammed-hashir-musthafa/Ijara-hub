import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/renter/ui/header";
import { Footer } from "@/components/renter/ui/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "UAE Rentals - Premium Room & Car Rentals",
  description:
    "Discover luxury room and car rentals across the UAE. Premium service, unmatched quality.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "UAE Rentals",
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
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
