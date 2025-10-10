import React from "react";
import OwnerDashboard from "@/components/owner/containers/Dashboard/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Owner | Ijara Hub Premium Rental Service",
  description:
    "Manage your properties, bookings, and performance insights on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Dashboard",
    "Rental Services",
    "Car Rentals",
    "Property Rentals",
    "Luxury Rentals",
    "Owner Portal",
    "Owner Dashboard",
    "Ijara Hub Owner",
    "Ijara Hub Dashboard",
    "Ijara Hub Owner Dashboard",
    "Property Management",
    "Rental Management",
    "Property Owner",
    "Rental Owner",
    "Ijara Hub Property Management",
    "Ijara Hub Rental Management",
    "Ijara Hub Owner Property Management",
    "Ijara Hub Owner Rental Management",
  ],
};

export default function OwnerDashboardPage() {
  return (
    <div className="w-full">
      <OwnerDashboard />
    </div>
  );
}
