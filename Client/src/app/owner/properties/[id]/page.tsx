import PropertyDetailsPage from "@/components/owner/containers/Properties/PropertyDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Property Detailed Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};

const PropertyDetail = () => {
  return (
    <div>
      <PropertyDetailsPage />
    </div>
  );
};

export default PropertyDetail;
