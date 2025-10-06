import TermsPage from "@/components/renter/containers/TermsAndConditions/TermsAndConditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Ijara Hub Premium Rental Service",
  description: "Read the terms and conditions for using Ijara Hub services.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "Terms and Conditions",
    "Ijara Hub",
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
