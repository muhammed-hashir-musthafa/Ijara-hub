"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/base/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Separator } from "@/components/base/ui/separator";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Tv,
  Share2,
  Home,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Globe,
  AirVent,
  Coffee,
  BookOpen,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { PropertyStatus } from "@/types/owner";

// Mock property data
const mockProperty = {
  id: "1",
  title: "Luxury Suite - Dubai Marina",
  type: "room" as const,
  category: "luxury",
  location: "Dubai Marina",
  price: 850,
  currency: "AED",
  status: "active" as const,
  description:
    "Experience unparalleled luxury in this stunning suite overlooking Dubai Marina. Features premium amenities, breathtaking views, and world-class service. This exceptional property offers a perfect blend of modern sophistication and traditional Arabian hospitality, making it an ideal choice for discerning guests seeking the ultimate in comfort and elegance.",
  images: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
  ],
  amenities: ["wifi", "parking", "kitchen", "tv", "ac", "coffee"],
  rating: 4.9,
  reviewCount: 127,
  bookings: 24,
  revenue: 18500,
  bedrooms: "2",
  bathrooms: "2",
  area: "1200",
  createdAt: "2024-01-15",
  lastUpdated: "2024-02-15",
  guests: 4,
  owner: {
    id: "owner1",
    name: "Ahmed Al Mansouri",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    properties: 12,
    responseTime: "Within 1 hour",
    joinedYear: "2019",
    verified: true,
    languages: ["English", "Arabic", "French"],
    about:
      "Hospitality professional with over 10 years of experience in luxury property management in Dubai.",
  },
};

export default function PropertyDetailsPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const property = mockProperty;

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    kitchen: Utensils,
    tv: Tv,
    ac: AirVent,
    coffee: Coffee,
  };

  const getStatusColor = (status: PropertyStatus): string => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 shadow-emerald-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200 shadow-gray-100";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 shadow-amber-100";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 shadow-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-up">
          <Link
            href="/owner/properties"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Properties</span>
          </Link>

          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-2 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group"
            >
              <Share2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Share
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Link href={`/owner/properties/${property.id}/edit`}>
                <Edit className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Edit Property
              </Link>
            </Button>
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-6 animate-fade-in-up animation-delay-200">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {property.title}
                </h1>
                <Badge
                  className={`${getStatusColor(
                    property.status
                  )} shadow-lg animate-pulse flex items-center gap-1`}
                >
                  <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                  {property.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{property.location}</span>
                </div>
                <span className="hidden sm:inline w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="capitalize font-medium text-amber-600">
                  {property.category}
                </span>
                <span className="hidden sm:inline w-1 h-1 bg-gray-400 rounded-full"></span>
                <div className="flex items-center gap-1">
                  {property.type === "room" ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    <Car className="h-4 w-4" />
                  )}
                  <span className="capitalize">{property.type}</span>
                </div>
              </div>
            </div>

            <div className="text-left xl:text-right">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {property.currency} {property.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 font-medium mt-1">
                per {property.type === "room" ? "night" : "day"}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              {
                icon: Star,
                label: "Rating",
                value: property.rating,
                suffix: `/5 (${property.reviewCount})`,
                color: "text-amber-600",
              },
              {
                icon: Calendar,
                label: "Total Bookings",
                value: property.bookings,
                suffix: " bookings",
                color: "text-blue-600",
              },
              {
                icon: TrendingUp,
                label: "Total Revenue",
                value: `${
                  property.currency
                } ${property.revenue.toLocaleString()}`,
                suffix: "",
                color: "text-emerald-600",
              },
              {
                icon: Award,
                label: "Occupancy Rate",
                value: "87",
                suffix: "%",
                color: "text-purple-600",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 mb-4 ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-500 font-medium">
                    {stat.label}
                  </div>
                  {stat.suffix && (
                    <div className="text-xs text-gray-400 mt-1">
                      {stat.suffix}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Full-width Photo Gallery */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden animate-fade-in-up animation-delay-400">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Camera className="h-5 w-5 mr-2 text-amber-500" />
                Photo Gallery
                <Badge
                  variant="outline"
                  className="ml-auto bg-amber-50 text-amber-700 border-amber-200"
                >
                  {property.images.length} Photos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative group w-full h-64 sm:h-80 md:h-[500px]">
                <Image
                  src={property.images[selectedImageIndex]}
                  alt={`${property.title} - Image ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover rounded-xl border border-gray-200 group-hover:shadow-2xl transition-all duration-500"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-amber-500 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-20 sm:h-24 object-cover rounded-lg hover:shadow-lg transition-all duration-300"
                      sizes="(max-width: 768px) 25vw, 200px"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-amber-500/20 rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Two-column layout below the gallery */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Description */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p
                      className={`text-gray-700 leading-relaxed ${
                        showFullDescription ? "" : "line-clamp-4"
                      }`}
                    >
                      {property.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0 h-auto font-medium"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                      <ChevronRight
                        className={`h-4 w-4 ml-1 transition-transform ${
                          showFullDescription ? "rotate-90" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                    Amenities & Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {property.amenities.map((amenity) => {
                      const Icon =
                        amenityIcons[amenity as keyof typeof amenityIcons] ||
                        Globe;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 border border-gray-200 hover:border-amber-200 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow group-hover:bg-amber-50">
                            <Icon className="h-4 w-4 text-gray-600 group-hover:text-amber-600 transition-colors" />
                          </div>
                          <span className="text-sm sm:text-base font-medium capitalize text-gray-700 group-hover:text-amber-700 transition-colors">
                            {amenity.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Home className="h-5 w-5 mr-2 text-amber-500" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {property.type === "room" && (
                    <>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                        <span className="text-gray-600 font-medium">
                          Bedrooms
                        </span>
                        <span className="font-bold text-gray-900">
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                        <span className="text-gray-600 font-medium">
                          Bathrooms
                        </span>
                        <span className="font-bold text-gray-900">
                          {property.bathrooms}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                        <span className="text-gray-600 font-medium">Area</span>
                        <span className="font-bold text-gray-900">
                          {property.area} sq ft
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                        <span className="text-gray-600 font-medium">
                          Max Guests
                        </span>
                        <span className="font-bold text-gray-900">
                          {property.guests}
                        </span>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="text-gray-600 font-medium">Created</span>
                    <span className="font-bold text-gray-900">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="text-gray-600 font-medium">
                      Last Updated
                    </span>
                    <span className="font-bold text-gray-900">
                      {new Date(property.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Animations and Line Clamp */}
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
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
