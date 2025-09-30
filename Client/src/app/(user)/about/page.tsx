import About from "@/components/renter/containers/About/About";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Ijara Hub Rental Services",
  description: "Learn more about Ijara Hub Rental Services and our mission.",
};

const AboutPage = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default AboutPage;
