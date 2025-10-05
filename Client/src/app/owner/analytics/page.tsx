import AnalyticsPage from "@/components/owner/containers/Analytics/Analytics";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Analytics Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};


const Analytics = () => {
  return (
    <div>
      <AnalyticsPage />
    </div>
  );
};

export default Analytics;
