"use client";

import {
  Star,
  MapPin,
  Users,
  Heart,
  Share2,
  Eye,
  Settings,
  CheckCircle,
  Globe,
  Bath,
  Bed,
  Maximize,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";

import { ImageGallery } from "../ImageGallery/ImageGallery";
import OwnerProfileCard from "../OwnerProfileCard/OwnerProfileCard";
import ReviewForm from "../../forms/ReviewForm";
import { getRoomById } from "@/services/roomService";
import { Room } from "@/types/room";
import DetailPageSkeleton from "../DetailPageSkeleton";
import Image from "next/image";

const RoomDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const roomId = params?.id as string;

  const fetchRoom = useCallback(async () => {
    if (!roomId) return;

    try {
      setIsLoading(true);
      const response = await getRoomById(roomId);
      // console.log(response)
      setRoom(response?.data?.room);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(
          error.response?.data?.message || "Failed to load room details."
        );
      } else {
        console.error("Failed to load room details.");
      }
      console.error("Error fetching room:", error);
      setRoom(null);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    setIsVisible(true);
    fetchRoom();
  }, [fetchRoom]);

  if (!room && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Room not found
          </h3>
          <p className="text-gray-500">
            The requested room could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Calculate dynamic rating and review count
  const reviews = Array.isArray(room?.reviews) ? room.reviews : [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum: number, review) => sum + (review?.rating || 0),
          0
        ) / reviews.length
      : 0;
  const reviewCount = reviews.length;

  const displayData = room
    ? {
        title: room?.title,
        location: room?.address?.place,
        category: room?.category,
        guests: room?.capacity,
        bedrooms: room?.rooms?.bedroom,
        bathrooms: room?.rooms?.bathroom,
        size: room?.areaSqft || 0,
        images: room?.images?.length > 0 ? room?.images : [],
        description: room?.description || "No description available",
        amenities:
          room?.amenities?.map((name: string) => ({ name, icon: null })) || [],
        price: room?.pricePerNight,
        rating: Math.round(avgRating * 10) / 10,
        reviews: reviewCount,
      }
    : null;

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (!displayData) {
    return null;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "amenities", label: "Amenities", icon: Settings },
    { id: "reviews", label: "Reviews", icon: Star },
  ];
  // console.log(room, "room")
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    {displayData?.category}
                  </Badge>
                  <Badge variant="outline">Premium Location</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {displayData?.title}
                </h1>
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-lg">
                      {displayData?.rating}
                    </span>
                    <span>({displayData?.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">{displayData?.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-amber-500 hover:bg-orange-300 hover:text-white transition-all duration-300 rounded-xl group px-3 sm:px-4"
                >
                  <Heart className="h-4 w-4 group-hover:fill-current group-hover:text-red-500 transition-all" />
                  <span className="hidden sm:inline ml-2">Save</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-amber-500 hover:text-white hover:bg-orange-300 transition-all duration-300 rounded-xl group px-3 sm:px-4"
                >
                  <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline ml-2">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="animate-fade-in-up">
              <ImageGallery
                images={displayData?.images}
                title={displayData?.title}
              />
            </div>

            {/* Room Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {[
                {
                  icon: Users,
                  label: `${displayData?.guests} Guests`,
                  color: "text-blue-500",
                },
                {
                  icon: Bed,
                  label: `${displayData?.bedrooms} Bedroom`,
                  color: "text-green-500",
                },
                {
                  icon: Bath,
                  label: `${displayData?.bathrooms} Bathroom`,
                  color: "text-purple-500",
                },
                {
                  icon: Maximize,
                  label: `${displayData?.size} sqm`,
                  color: "text-amber-500",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="font-bold text-gray-900">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 animate-fade-in-up">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center flex-shrink-0 space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600 bg-amber-50 rounded-t-xl"
                      : "border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Description */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Globe className="h-6 w-6 mr-3 text-amber-500" />
                        About this place
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {displayData?.description}
                      </p>

                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                          Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "Premium location",
                            "Quality amenities",
                            "Professional service",
                          ].map((highlight: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "amenities" && (
                <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Settings className="h-6 w-6 mr-3 text-amber-500" />
                      Amenities & Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayData?.amenities?.map(
                        (
                          amenity: { name: string; icon: null },
                          index: number
                        ) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="font-medium text-gray-700">
                              {amenity.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Add Review Form */}
                  <ReviewForm
                    propertyId={roomId}
                    propertyType="room"
                    onReviewAdded={fetchRoom}
                  />

                  {/* Reviews */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-2xl">
                          <Star className="h-6 w-6 fill-amber-400 text-amber-400 mr-3" />
                          <span>
                            {displayData?.rating} ({displayData?.reviews}{" "}
                            reviews)
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {room?.reviews && room.reviews.length > 0 ? (
                          room.reviews.map((review) => (
                            <div
                              key={review._id}
                              className="border-b border-gray-200 pb-6 last:border-b-0"
                            >
                              <div className="flex items-start space-x-4">
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                  {review.reviewer.profileImage ? (
                                    <Image
                                      width={40}
                                      height={40}
                                      src={review.reviewer.profileImage}
                                      alt={`${review.reviewer.fname} ${review.reviewer.lname}`}
                                      className="w-10 h-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                                      {review.reviewer.fname.charAt(0)}
                                      {review.reviewer.lname.charAt(0)}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-semibold text-gray-900">
                                      {review.reviewer.fname}{" "}
                                      {review.reviewer.lname}
                                    </span>
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < review.rating
                                              ? "fill-amber-400 text-amber-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-start">
                                    <p className="text-gray-700 flex-1 mr-4">
                                      {review.comment}
                                    </p>
                                    <p className="text-xs text-gray-500 flex-shrink-0">
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              No reviews available yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <OwnerProfileCard 
              ownerId={room?.owner?._id || ""} 
              propertyId={room?._id}
              propertyType="Room"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RoomDetailPage;
