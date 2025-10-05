import OwnerProfilePage from "@/components/owner/containers/Profile/OwnerProfile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};

const OwnerProfile = () => {
  return (
    <div>
      <OwnerProfilePage />
    </div>
  );
};

export default OwnerProfile;
