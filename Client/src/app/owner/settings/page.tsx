import SettingsPage from "@/components/owner/containers/Settings/SettingsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings Owner | Ijara Hub Premium Rental Service",
  description: "Manage your settings and preferences on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Settings",
    "Rental Services",
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
    "Owner Settings",
    "Ijara Hub Owner",
    "Ijara Hub Settings",
    "Ijara Hub Owner Settings",
  ],
};

const Settings = () => {
  return (
    <div>
      <SettingsPage />
    </div>
  );
};

export default Settings;
