"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/base/ui/button";
import {
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
import { getRooms } from "@/services/roomService";
import { Room, RoomQueryParams } from "@/types/room";

const RoomsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<RoomQueryParams>({});
  const [totalRooms, setTotalRooms] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRooms = useCallback(
    async (params: RoomQueryParams = {}) => {
      try {
        setIsLoading(true);
        const response = await getRooms({
          ...params,
          page: currentPage,
          limit: 8,
        });
        setRooms(response?.data?.rooms || []);
        // console.log(response)
        setTotalRooms(response?.data?.pagination?.totalItems || 0);
      } catch (error: unknown) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
        setTotalRooms(0);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    setIsVisible(true);
    fetchRooms(filters);
  }, [fetchRooms, filters]);

  const handleFiltersChange = (newFilters: RoomQueryParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

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
            <RoomsFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl border-0 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {isLoading
                      ? "Loading..."
                      : `${totalRooms} Properties Available`}
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
            {isLoading ? (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : rooms?.length === 0 ? (
              <div className="text-center py-16">
                <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No rooms found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {rooms?.map((room, index) => {
                  const reviews = Array.isArray(room?.reviews) ? room.reviews : [];
                  const avgRating = reviews.length > 0 
                    ? reviews.reduce((sum: number, review) => sum + (review?.rating || 0), 0) / reviews.length 
                    : 0;
                  
                  return (
                    <RoomCard
                      key={room?._id}
                      room={{
                        id: room?._id as unknown as string & number,
                        title: room?.title,
                        location: room?.address?.place || "Dubai",
                        price: room?.pricePerNight,
                        rating: Math.round(avgRating * 10) / 10,
                        reviews: reviews.length,
                        image: room?.images?.[0] || "/placeholder-room.jpg",
                        images: room?.images,
                        amenities: room?.amenities,
                        guests: room?.capacity,
                        bedrooms: room?.rooms?.bedroom,
                        bathrooms: room?.rooms?.bathroom,
                        category: room?.category,
                        size: room?.areaSqft || 0,
                      }}
                      index={index}
                      viewMode={viewMode}
                    />
                  );
                })}
              </div>
            )}

            {/* Load More */}
            {rooms?.length < totalRooms && (
              <div className="text-center mt-16">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl"
                >
                  {isLoading ? "Loading..." : "Load More Properties"}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
