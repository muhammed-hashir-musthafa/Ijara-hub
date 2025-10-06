import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ijara Hub | Ijara Hub Premium Rental Service",
  description:
    "Discover luxury room and car rentals across the UAE. Premium service, unmatched quality.",
  keywords: [
    "Ijara Hub",
    "Ijara Hub",
    "Room Rentals",
    "Car Rentals",
    "Luxury Rentals",
    "Premium Service",
    "UAE Accommodation",
    "Vehicle Hire UAE",
    "Short-term Rentals",
    "Long-term Rentals",
    "Affordable Rentals",
    "Exclusive Rentals",
    "UAE Travel",
    "Rental Deals UAE",
    "Ijara Hub Services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
