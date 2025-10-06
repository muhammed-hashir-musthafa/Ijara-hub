import HelpPage from "@/components/renter/containers/HelpPage/HelpPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Help | Ijara Hub Premium Rental Service",
  description:
    "Get assistance and support for Ijara Hub rental services. Find FAQs, contact information, and resources to help you with your rental needs.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "Help",
    "Support",
    "FAQs",
    "Contact Information",
    "Resources",
    "Rental Assistance",
    "Customer Service",
    "Rental Support",
    "Ijara Hub Help",
    "Ijara Hub Support",
    "Rental FAQs",
    "Rental Resources",
    "Rental Contact",
  ],
};

const Help = () => {
  return (
    <div>
      <HelpPage />
    </div>
  );
};

export default Help;
