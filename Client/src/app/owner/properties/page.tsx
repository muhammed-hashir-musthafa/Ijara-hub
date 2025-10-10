import PropertiesPage from "@/components/owner/containers/Properties/PropertiesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Property Listing Owner | Ijara Hub Premium Rental Service",
  description: "Manage your properties and rental listings on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Property Listings",
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
    "Property Management",
    "Rental Management",
    "Property Owner",
    "Rental Owner",
    "Ijara Hub Properties",
    "Ijara Hub Rentals",
    "Ijara Hub Property Management",
    "Ijara Hub Rental Management",
    "Ijara Hub Owner Properties",
    "Ijara Hub Owner Rentals",
  ],
};

const Properties = () => {
  return (
    <div>
      <PropertiesPage />
    </div>
  );
};

export default Properties;
