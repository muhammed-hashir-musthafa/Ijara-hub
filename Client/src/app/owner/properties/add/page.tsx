import AddPropertyPage from "@/components/owner/containers/Properties/AddProperty";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Property Owner | Ijara Hub Premium Rental Service",
  description: "Add your property to Ijara Hub and start earning from your rentals.",
  keywords: [
    "Ijara Hub",
    "Add Property",
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
    "Property Listing",
    "Rental Management",
    "Property Owner",
    "Rental Owner",
    "Ijara Hub Add Property",
    "Ijara Hub Rental Management",
    "Ijara Hub Property Owner",
    "Ijara Hub Rental Owner",
  ],  
};

const AddProperty = () => {
  return (
    <div>
      <AddPropertyPage />
    </div>
  );
};

export default AddProperty;
