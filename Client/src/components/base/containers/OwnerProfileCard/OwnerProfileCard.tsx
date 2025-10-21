"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  Star,
  MapPin,
  Calendar,
  Trophy,
  CheckCircle,
  Award,
  Building,
  Eye,
  Loader2,
  MessageSquare,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { getOwnerProfile } from "@/services/userService";
import { OwnerProfile } from "@/types/owner";
import Image from "next/image";

interface OwnerProfileCardProps {
  ownerId: string;
}

const OwnerProfileCard = ({ ownerId }: OwnerProfileCardProps) => {
  const [owner, setOwner] = useState<OwnerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      try {
        const response = await getOwnerProfile(ownerId);
        // console.log("Owner profile fetched:", response);
        setOwner(response?.data?.owner);
      } catch (error) {
        console.error("Failed to fetch owner profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProfile();
    setIsVisible(true);
  }, [ownerId]);

  if (loading) {
    return (
      <div className="sticky top-24 max-w-md mx-auto">
        <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-6 flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="sticky top-24 max-w-md mx-auto">
        <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Owner profile not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [{ id: "overview", label: "Overview", icon: Eye }];

  return (
    <div className="sticky top-24 max-w-md mx-auto">
      <Card
        className={`bg-white/95 backdrop-blur-lg border-0 shadow-2xl overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative h-32 overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <CardContent className="p-6 -mt-8 relative z-10">
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                {owner.profileImage ? (
                  <Image
                    width={80}
                    height={80}
                    src={owner.profileImage}
                    alt={`${owner.fname} ${owner.lname}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {owner.fname?.[0]}
                    {owner.lname?.[0]}
                  </span>
                )}
              </div>
              {owner.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white shadow-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {owner.fname} {owner.lname}
                </h3>
                {owner.companyDetails?.isCompanyVerified && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {owner.companyDetails?.companyName || "Property Owner"}
              </p>

              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-900">
                  {owner.stats.averageRating || 0}
                </span>
                <span className="text-gray-500 text-sm">
                  ({owner.stats.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                <span>
                  {owner.address?.city || "UAE"},{" "}
                  {owner.address?.emirate || "UAE"}
                </span>
                <span className="mx-2">•</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  Since{" "}
                  {owner.companyDetails?.since ||
                    new Date(owner.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="min-h-96">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Properties",
                      value: owner.stats.totalProperties,
                      icon: Building,
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                    },
                    {
                      label: "Reviews",
                      value: owner.stats.reviewCount,
                      icon: Star,
                      color: "text-green-600",
                      bg: "bg-green-50",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`${stat.bg} p-4 rounded-xl text-center hover:shadow-md transition-all duration-300`}
                    >
                      <stat.icon
                        className={`h-6 w-6 ${stat.color} mx-auto mb-2`}
                      />
                      <div className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {owner.companyDetails?.bio && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-500" />
                      About
                    </h4>
                    <p className="text-sm text-gray-600">
                      {owner.companyDetails.bio}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📧 {owner.email}</p>
                    <p>📞 {owner.phone}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <MessageSquare className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Contact {owner.fname}
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-300 group"
                      onClick={() => window.open(`tel:${owner.phone}`, "_self")}
                    >
                      <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-300 group"
                      onClick={() =>
                        window.open(`mailto:${owner.email}`, "_self")
                      }
                    >
                      <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OwnerProfileCard;
