import SettingsPage from "@/components/owner/containers/Settings/SettingsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};

const Settings = () => {
  return (
    <div>
      <SettingsPage />
    </div>
  );
};

export default Settings;
