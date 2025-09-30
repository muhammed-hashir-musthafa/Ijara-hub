"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  Star,
  Shield,
  Clock,
  ArrowRight,
  MapPin,
  Calendar,
  Trophy,
  Users,
  CheckCircle,
  Award,
  MessageSquare,
  Phone,
  Globe,
  Building,
  Eye,
  Share2,
  Crown,
} from "lucide-react";
import Image from "next/image";

// Enhanced owner data
const ownerData = {
  id: 1,
  name: "Ahmed Al-Mansouri",
  title: "Luxury Property Specialist",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverPhoto:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=300&fit=crop",
  joinedDate: "March 2019",
  location: "Dubai, UAE",
  rating: 4.9,
  reviews: 847,
  responseRate: 98,
  responseTime: "Within 1 hour",
  languages: ["English", "Arabic", "French"],
  verified: true,
  superhost: true,
  properties: 12,
  totalBookings: 2847,
  totalEarnings: "AED 1,250,000",
  satisfactionRate: 96,
  badges: ["Superhost", "Quick Responder", "5-Star Host", "Verified ID"],
  bio: "Passionate about providing exceptional luxury experiences in Dubai. With over 5 years in premium hospitality, I ensure every guest receives personalized service and unforgettable stays.",
  specialties: [
    "Luxury Suites",
    "Premium Cars",
    "Concierge Service",
    "Business Travel",
  ],
  achievements: [
    { icon: Trophy, label: "Top Host 2023", color: "text-yellow-500" },
    { icon: Award, label: "Excellence Award", color: "text-purple-500" },
    { icon: CheckCircle, label: "Verified Host", color: "text-green-500" },
    { icon: Crown, label: "Premium Partner", color: "text-amber-500" },
  ],
  stats: {
    totalProperties: 12,
    activeListings: 10,
    completedBookings: 2847,
    repeatGuests: 45,
  },
  contactInfo: {
    phone: "+971 50 123 4567",
    email: "ahmed@example.com",
    website: "https://luxurydubairentals.com",
  },
};

const OwnerProfileCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [{ id: "overview", label: "Overview", icon: Eye }];

  return (
    <div className="sticky top-24 max-w-md mx-auto">
      <Card
        className={`bg-white/95 backdrop-blur-lg border-0 shadow-2xl overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Cover Photo Header */}
        <div className="relative h-32 overflow-hidden">
          <Image
            width={800}
            height={300}
            src={ownerData.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6 -mt-8 relative z-10">
          {/* Profile Section */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <Image
                width={80}
                height={80}
                src={ownerData.avatar}
                alt={ownerData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
              />
              {ownerData.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white shadow-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {ownerData.name}
                </h3>
                {ownerData.superhost && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Superhost
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{ownerData.title}</p>

              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-900">
                  {ownerData.rating}
                </span>
                <span className="text-gray-500 text-sm">
                  ({ownerData.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{ownerData.location}</span>
                <span className="mx-2">•</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>Joined {ownerData.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
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

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Properties",
                      value: ownerData.properties,
                      icon: Building,
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                    },
                    {
                      label: "Total Bookings",
                      value: ownerData.totalBookings.toLocaleString(),
                      icon: Calendar,
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

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-amber-500" />
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ownerData.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-amber-500 text-amber-600"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-amber-500" />
                    Achievements
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {ownerData.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-300"
                      >
                        <achievement.icon
                          className={`h-4 w-4 ${achievement.color}`}
                        />
                        <span className="text-xs font-medium text-gray-700">
                          {achievement.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-amber-500" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ownerData.languages.map((language, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-amber-500" />
                    About {ownerData.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ownerData.bio}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Actions */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
              <MessageSquare className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Contact {ownerData.name}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-300 group"
              >
                <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Call
              </Button>
              <Button
                variant="outline"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-300 group"
              >
                <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                View Profile
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Verified Host</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Premium Quality</span>
              </div>
            </div>
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