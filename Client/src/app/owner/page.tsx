import React from "react";
import OwnerDashboard from "@/components/owner/containers/Dashboard/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Owner | Ijara Hub Premium Room & Car Rentals",
  description: "Your rentals performance, bookings, and insights in one place",
  keywords: [""],
};

export default function OwnerDashboardPage() {
  return (
    <div className="w-full">
      <OwnerDashboard />
    </div>
  );
}
