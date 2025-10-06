import UserProfilePage from "@/components/renter/containers/Profile/ProfilePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Ijara Hub Premium Rental Service",
  description:
    "Manage your profile and account settings on Ijara Hub, your trusted platform for premium room and car rentals.",
  keywords: [
    "Ijara Hub",
    "Profile",
    "Account Settings",
    "Room Rentals",
    "Car Rentals",
    "User Profile",
    "Manage Profile",
    "Rental Services",
    "Premium Rentals",
    "Ijara Hub Profile",
    "Ijara Hub Account",
    "Ijara Hub Settings",
    "Ijara Hub User",
    "Ijara Hub Rentals",
    "Ijara Hub Room Rentals",
  ],
};

const UserProfile = () => {
  return (
    <div>
      <UserProfilePage />
    </div>
  );
};

export default UserProfile;
