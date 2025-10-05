import ContactPage from "@/components/renter/containers/Contact/Contact";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Ijara Hub Rental Services",
  description:
    "Get in touch with Ijara Hub Rental Services for any inquiries or support.",
  keywords: [
    "Contact",
    "Ijara Hub",
    "Rental Services",
    "Support",
    "Inquiries",
    "Customer Service",
    "Assistance",
    "Help",
    "Feedback",
    "Communication",
    "Rental Support",
    "Contact Us",
    "Ijara Hub Contact",
  ],
};
const Contact = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default Contact;
