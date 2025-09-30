"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Users,
  Fuel,
  Gauge,
  Heart,
  Share2,
  Zap,
  Eye,
  Settings,
  CheckCircle,
  Globe,
} from "lucide-react";
import { carDetailData } from "@/components/renter/containers/Car/CarListing";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import OwnerProfileCard from "../OwnerProfileCard/OwnerProfileCard";

const CarDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "specs", label: "Specifications", icon: Settings },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

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
                    {carDetailData.category}
                  </Badge>
                  <Badge variant="outline">{carDetailData.year}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {carDetailData.brand}{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {carDetailData.model}
                  </span>
                </h1>
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-lg">
                      {carDetailData.rating}
                    </span>
                    <span>({carDetailData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">
                      {carDetailData.location}
                    </span>
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
                images={carDetailData.images}
                title={`${carDetailData.brand} ${carDetailData.model}`}
              />
            </div>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {[
                {
                  icon: Users,
                  label: `${carDetailData.passengers} Seats`,
                  color: "text-blue-500",
                },
                {
                  icon: Fuel,
                  label: carDetailData.fuelType,
                  color: "text-green-500",
                },
                {
                  icon: Gauge,
                  label: carDetailData.transmission,
                  color: "text-purple-500",
                },
                {
                  icon: Zap,
                  label: carDetailData.power,
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
                  {/* Performance */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Gauge className="h-6 w-6 mr-3 text-amber-500" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          {
                            value: carDetailData.acceleration,
                            label: "0-100 km/h",
                            icon: "⚡",
                          },
                          {
                            value: carDetailData.topSpeed,
                            label: "Top Speed",
                            icon: "🏎️",
                          },
                          {
                            value: carDetailData.engine,
                            label: "Engine",
                            icon: "🔧",
                          },
                        ].map((perf, index) => (
                          <div
                            key={index}
                            className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="text-2xl mb-2">{perf.icon}</div>
                            <div className="text-2xl font-bold text-amber-600 mb-1">
                              {perf.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {perf.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Globe className="h-6 w-6 mr-3 text-amber-500" />
                        About this vehicle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {carDetailData.description}
                      </p>

                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                          Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {carDetailData.highlights.map((highlight, index) => (
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

                  {/* Features */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <Settings className="h-6 w-6 mr-3 text-amber-500" />
                        Features & Equipment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {carDetailData.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            {feature.icon ? (
                              <feature.icon className="h-5 w-5 text-amber-500" />
                            ) : (
                              <div className="w-2 h-2 bg-amber-500 rounded-full" />
                            )}
                            <span className="font-medium text-gray-700">
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "specs" && (
                <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Settings className="h-6 w-6 mr-3 text-amber-500" />
                      Technical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(carDetailData.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center py-4 px-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-amber-500"
                          >
                            <span className="font-medium text-gray-700">
                              {key}
                            </span>
                            <span className="font-bold text-gray-900">
                              {value}
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
                  {/* Reviews */}
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-2xl">
                          <Star className="h-6 w-6 fill-amber-400 text-amber-400 mr-3" />
                          <span>
                            {carDetailData.rating} ({carDetailData.reviews}{" "}
                            reviews)
                          </span>
                        </CardTitle>
                        <Button
                          variant="outline"
                          className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl"
                        >
                          View all reviews
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {carDetailData.userReviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                {review.user.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">
                                  {review.user}
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                  <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-gray-500">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <OwnerProfileCard />
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CarDetailPage;
