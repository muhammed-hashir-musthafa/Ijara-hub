import React from "react";
import { Badge } from "@/components/base/ui/badge";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { Sparkles } from "lucide-react";
import MessagingContainer from "@/components/base/containers/Messaging/MessagingContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat-Owner | Ijara Hub Premium Rental Service",
  description: "Owner's chat page for Ijara Hub Premium Rental Service",
  keywords: [
    "Ijara Hub",
    "Owner Chat",
    "Messaging",
    "Rental Service",
    "Conversations",
    "Premium Rentals",
    "Property Management",
    "Owner Communication",
    "Ijara Hub Owner",
    "Real Estate Chat",
    "Tenant Interaction",
    "Rental Inquiries",
    "Property Owner Tools",
    "Ijara Hub Messaging",
    "Owner Support",
    "Rental Property Chat",
    "Ijara Hub Features",
    "Owner Dashboard",
    "Real Estate Management",
    "Ijara Hub Services",
    "Owner Tenant Communication",
    "Real-time Chat",
    "Property Rental Service",
    "Ijara Hub Platform",
    "Owner Messaging System",
    "Rental Property Management",
    "Ijara Hub Experience",
    "Owner Interaction",
    "Premium Rental Communication",
    "Ijara Hub Solutions",
    "Owner Engagement",
    "Rental Service Features",
  ],
};

const MessagePage = () => {
  return (
    <RouteGuard allowedRoles={["renter", "owner", "admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-gray-600 mt-2">
                Stay connected with your conversations
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              Chat
            </Badge>
          </div>

          {/* Client-side Messaging Component */}
          <MessagingContainer />
        </div>
      </div>
    </RouteGuard>
  );
};

export default MessagePage;
