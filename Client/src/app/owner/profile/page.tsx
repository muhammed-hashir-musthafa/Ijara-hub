import OwnerProfilePage from "@/components/owner/containers/Profile/OwnerProfile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile Owner | Ijara Hub Premium Rental Service",
  description: "Manage your profile and account settings on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Profile",
    "Account Settings",
    "Rental Services",
    "Car Rentals",
    "Property Rentals",
    "Luxury Rentals",
    "Room Rentals",
    "Premium Service",
    "Vehicle Hire",
    "Apartment Rentals",
    "Vacation Rentals",
    "Short-term Rentals",
    "Long-term Rentals",
    "Rental Deals",
    "Customer Satisfaction",
    "Owner Profile",
    "Owner Account",
    "Owner Settings",
    "Ijara Hub Owner",
    "Ijara Hub Profile",
    "Ijara Hub Account",
    "Ijara Hub Settings",
    "Ijara Hub Owner Profile",
    "Ijara Hub Owner Account",
    "Ijara Hub Owner Settings",
  ],
};

const OwnerProfile = () => {
  return (
    <div>
      <OwnerProfilePage />
    </div>
  );
};

export default OwnerProfile;
