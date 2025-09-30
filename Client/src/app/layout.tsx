import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "UAE Rentals - Premium Room & Car Rentals",
  description:
    "Discover luxury room and car rentals across the UAE. Premium service, unmatched quality.",
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
