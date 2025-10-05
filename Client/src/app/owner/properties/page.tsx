import PropertiesPage from "@/components/owner/containers/Properties/PropertiesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Property Listing Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};

const Properties = () => {
  return (
    <div>
      <PropertiesPage />
    </div>
  );
};

export default Properties;
