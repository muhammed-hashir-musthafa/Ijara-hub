import OwnerSignupPage from "@/components/auth/OwnerSignup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Owner Signup | Ijara Hub Premium Rental Service",
  description:
    "Join Ijara Hub as an owner and start earning from your properties today!",
  keywords: [
    "Ijara Hub",
    "Owner Signup",
    "Premium Rental Service",
    "Property Management",
    "Real Estate",
    "Rental Listings",
    "Landlord Services",
    "Account Access",
    "Rental Management",
    "Secure Login",
    "User Dashboard",
  ],
};

const OwnerSignup = () => {
  return (
    <div>
      <OwnerSignupPage />
    </div>
  );
};

export default OwnerSignup;
