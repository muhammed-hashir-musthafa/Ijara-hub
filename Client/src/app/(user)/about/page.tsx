import About from "@/components/renter/containers/About/About";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ijara Hub Rental Services",
  description: "Learn more about Ijara Hub Rental Services and our mission.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "About Us",
    "Car Rental",
    "Vehicle Leasing",
    "Transportation Solutions",
    "Customer Service",
    "Affordable Rentals",
    "Reliable Vehicles",
    "Rental Fleet",
    "Long-term Rentals",
    "Short-term Rentals",
    "Rental Policies",
    "Sustainable Transportation",
  ],
};

const AboutPage = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default AboutPage;
