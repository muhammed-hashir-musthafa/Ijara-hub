import PrivacyPage from "@/components/renter/containers/PrivacyPolicies/PrivacyPolicies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Ijara Hub Rental Services",
  description: "Read the privacy policy for using Ijara Hub Rental Services.",
  keywords: [
    "privacy",
    "policy",
    "ijara hub",
    "rental services",
    "data protection",
    "user privacy",
    "information security",
    "privacy policy",
    "data privacy",
    "ijara hub privacy",
    "rental platform privacy",
    "user data",
    "privacy terms",
    "data handling",
    "privacy practices",
    "ijara hub terms",
    "rental service privacy",
    "privacy statement",
  ],
};

const Privacy = () => {
  return (
    <div>
      <PrivacyPage />
    </div>
  );
};

export default Privacy;
