import PropertyDetailsPage from "@/components/owner/containers/Properties/PropertyDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Property Detailed Owner | Ijara Hub Premium Rental Service",
  description: "View detailed information about your property on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Property Details",
    "Detailed Information",
    "Property Management",
    "Ijara Hub Premium Rental Service",
    "Property Owner",
    "Rental Owner",
    "Ijara Hub Property Details",
    "Ijara Hub Property Management",
    "Ijara Hub Owner Property Details",
    "Ijara Hub Owner Property Management",
    "Property Information",
    "Rental Information",
    "Property Insights",
    "Rental Insights",
    "Property Analytics",
    "Rental Analytics",
    "Property Performance",
    "Rental Performance",
    "Property Insights",
    "Rental Insights",
    "Property Analytics",
    "Rental Analytics",
    "Property Performance",
    "Rental Performance",
  ],
};

const PropertyDetail = () => {
  return (
    <div>
      <PropertyDetailsPage />
    </div>
  );
};

export default PropertyDetail;
