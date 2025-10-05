import RenterSignupPage from "@/components/auth/RenterSignup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Renter Signup | Ijara Hub Premium Rental Service",
  description:
    "Join Ijara Hub as a renter and explore premium rental options tailored to your needs.",
  keywords: [
    "Ijara Hub",
    "Renter Signup",
    "Premium Rentals",
    "Join Ijara Hub",
    "Explore Rentals",
    "Rental Service",
    "Renter Account",
    "Ijara Hub Renter",
    "Rental Options",
    "Sign Up",
    "Rental Platform",
  ],
};

const RenterSignup = () => {
  return (
    <div>
      <RenterSignupPage />
    </div>
  );
};

export default RenterSignup;
