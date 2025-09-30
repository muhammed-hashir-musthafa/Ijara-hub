import TermsPage from "@/components/renter/containers/TermsAndConditions/TermsAndConditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | Ijara Hub Rental Services",
  description: "Read the terms and conditions for using UAE Rentals services.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "Terms and Conditions",
    "UAE Rentals",
    "Car Rental Terms",
    "Property Rental Terms",
    "Service Agreement",
    "User Responsibilities",
    "Liability",
    "Privacy Policy",
    "Cancellation Policy",
    "Payment Terms",
    "Rental Agreement",
    "Customer Rights",
    "Ijara Hub Terms",
  ], 
};
const Terms = () => {
  return (
    <div>
      <TermsPage />
    </div>
  );
};

export default Terms;
