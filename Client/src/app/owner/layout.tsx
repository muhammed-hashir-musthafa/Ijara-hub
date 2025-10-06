import type React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/owner/ui/footer";
import Sidebar from "@/components/owner/ui/sidebar";

export const metadata: Metadata = {
  title: "Owner Portal | Ijara Hub Premium Rental Service",
  description:
    "Manage your properties, bookings, and performance insights on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Owner Portal",
    "Rental Services",
    "Property Management",
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
    "Rental Performance",
    "Rental Insights",
    "Data-Driven Decisions",
    "Business Optimization",
    "Rental Analytics",
    "Performance Tracking",
    "Insightful Reports",
    "Data Visualization",
    "Rental Metrics",
    "Revenue Analysis",
    "Occupancy Rates",
    "Booking Management",
    "Rental Requests",

  ],
};

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-20">
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className="
          flex-1 flex flex-col min-h-screen 
          md:ml-80 
        "
      >
        <main className="flex-1 p-2 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
