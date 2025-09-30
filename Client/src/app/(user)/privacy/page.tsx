import PrivacyPage from "@/components/renter/containers/PrivacyPolicies/PrivacyPolicies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Ijara Hub Rental Services",
  description: "Read the privacy policy for using Ijara Hub Rental Services.",
};

const Privacy = () => {
  return (
    <div>
      <PrivacyPage />
    </div>
  );
};

export default Privacy;
