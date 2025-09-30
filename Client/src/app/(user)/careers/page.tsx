import CareersPage from "@/components/renter/containers/Career/Career";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career | Ijara Hub Rental Services",
  description: "Explore career opportunities at Ijara Hub Rental Services.",
};

const Careers = () => {
  return (
    <div>
      <CareersPage />
    </div>
  );
};

export default Careers;
