import AddPropertyPage from "@/components/owner/containers/Properties/AddProperty";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Property Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};

const AddProperty = () => {
  return (
    <div>
      <AddPropertyPage />
    </div>
  );
};

export default AddProperty;
