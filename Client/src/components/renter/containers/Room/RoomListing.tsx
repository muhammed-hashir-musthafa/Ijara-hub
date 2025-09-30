"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/base/ui/button";
import {
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Utensils,
  Dumbbell,
  Grid,
  List,
  Shield,
  Clock,
  ArrowRight,
  Trophy,
  Building,
} from "lucide-react";
import RoomsFilters from "../../../base/containers/Room/RoomFilter";
import RoomCard from "../../../base/containers/Room/RoomCard";

// Mock data
const mockRooms = [
  {
    id: 1,
    title: "Luxury Suite - Burj Khalifa View",
    location: "Downtown Dubai",
    price: 850,
    originalPrice: 1000,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    ],
    amenities: ["WiFi", "Air Conditioning", "Room Service", "City View"],
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: "Luxury",
    isNew: true,
    discount: 15,
    size: 65,
  },
  {
    id: 2,
    title: "Premium Penthouse",
    location: "Dubai Marina",
    price: 1200,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    ],
    amenities: ["WiFi", "Kitchen", "Balcony", "Pool Access"],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    category: "Penthouse",
    size: 120,
  },
  {
    id: 3,
    title: "Business Executive Suite",
    location: "DIFC",
    price: 650,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    ],
    amenities: ["WiFi", "Business Center", "Concierge", "Gym Access"],
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    category: "Business",
    size: 55,
  },
  {
    id: 4,
    title: "Family Villa with Pool",
    location: "Jumeirah",
    price: 950,
    rating: 4.6,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    amenities: ["WiFi", "Kitchen", "Pool Access", "Parking"],
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    category: "Family",
    size: 180,
  },
];

// Room Detail Data
export const roomDetailData = {
  id: 1,
  title: "Luxury Suite - Burj Khalifa View",
  location: "Downtown Dubai",
  price: 850,
  originalPrice: 1000,
  rating: 4.9,
  reviews: 127,
  images: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&h=600&fit=crop",
  ],
  category: "Luxury",
  guests: 2,
  bedrooms: 1,
  bathrooms: 1,
  size: 65,
  description:
    "Experience unparalleled luxury in this stunning suite with breathtaking views of the iconic Burj Khalifa. Located in the heart of Downtown Dubai, this elegantly appointed accommodation offers the perfect blend of comfort and sophistication for the discerning traveler.",
  amenities: [
    { name: "WiFi", icon: Wifi },
    { name: "Air Conditioning", icon: AirVent },
    { name: "Room Service", icon: Utensils },
    { name: "Smart TV", icon: Tv },
    { name: "Coffee Machine", icon: Coffee },
    { name: "Gym Access", icon: Dumbbell },
  ],
  highlights: [
    "Panoramic Burj Khalifa views",
    "Premium location in Downtown Dubai",
    "24/7 concierge service",
    "Access to hotel facilities",
    "Walking distance to Dubai Mall",
  ],
  host: {
    id: 1,
    name: "Emirates Luxury Hotels",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    reviews: 1250,
    verified: true,
    superhost: true,
    joinedDate: "2018",
    responseRate: 95,
    responseTime: "Within an hour",
    properties: 24,
    location: "Dubai, UAE",
    languages: ["English", "Arabic", "French"],
    bio: "Luxury hospitality expert with over 15 years of experience in premium accommodations across Dubai. Passionate about creating unforgettable experiences for guests.",
  },
  userReviews: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely stunning views and impeccable service. The suite was even more beautiful than the photos. Highly recommend!",
    },
    {
      id: 2,
      user: "Ahmed K.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Perfect location and amazing amenities. The staff went above and beyond to make our stay memorable.",
    },
  ],
};

const RoomsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [rooms] = useState(mockRooms);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 py-16 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-amber-500 mr-3" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Premium Stays
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Luxury Room{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Rentals
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional accommodations in the heart of Dubai and the
              UAE
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">Verified Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Instant Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-gray-600">Premium Hosts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <RoomsFilters onFiltersChange={() => {}} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl border-0 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {rooms.length} Properties Available
                  </h2>
                  <p className="text-sm text-gray-600">
                    Find your perfect stay
                  </p>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 bg-white transition-all duration-300"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                      : "border-2 border-gray-300 hover:border-amber-500"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                      : "border-2 border-gray-300 hover:border-amber-500"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results */}
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {rooms.map((room, index) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-16">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl"
              >
                Load More Properties
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
