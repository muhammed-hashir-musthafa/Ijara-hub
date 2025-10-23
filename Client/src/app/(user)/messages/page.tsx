import { RouteGuard } from "@/components/auth/RouteGuard";
import MessagingContainer from "@/components/renter/containers/Message/MessagingContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat-Renter | Ijara Hub Premium Rental Service",
  description: "Renter's chat page for Ijara Hub Premium Rental Service",
  keywords: [
    "Ijara Hub",
    "Renter Chat",
    "Messaging",
    "Rental Service",
    "Conversations",
    "Premium Rentals",
    "Property Management",
    "Renter Communication",
    "Ijara Hub Renter",
    "Real Estate Chat",
    "Owner Interaction",
    "Rental Inquiries",
    "Renter Tools",
    "Ijara Hub Messaging",
    "Renter Support",
    "Rental Property Chat",
    "Ijara Hub Features",
    "Renter Dashboard",
    "Real Estate Management",
    "Ijara Hub Services",
    "Renter Owner Communication",
    "Real-time Chat",
    "Property Rental Service",
    "Ijara Hub Platform",
    "Renter Messaging System",
    "Rental Property Management",
    "Ijara Hub Experience",
    "Renter Interaction",
    "Premium Rental Communication",
    "Ijara Hub Solutions",
    "Renter Engagement",
    "Rental Service Features",
  ],
};

const MessagePage = () => {
  return (
    <RouteGuard allowedRoles={["renter"]}>
      <MessagingContainer />
    </RouteGuard>
  );
};

export default MessagePage;