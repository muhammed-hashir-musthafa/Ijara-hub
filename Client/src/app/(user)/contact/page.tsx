import ContactPage from "@/components/renter/containers/Contact/Contact";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ijara Hub Rental Services",
  description: "Get in touch with Ijara Hub Rental Services for any inquiries or support.",
};
const Contact = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default Contact;
