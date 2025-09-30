"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  Star,
  MapPin,
  Users,
  Heart,
  Share2,
  ChevronRight,
  Sparkles,
  Home,
  Building,
  Bath,
  Bed,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import { RoomCardProps } from "@/types/room";
import Link from "next/link";

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  index,
  viewMode = "grid",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/rooms/${room.id}`} passHref className="w-full">
      <Card
        className={`group overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up ${
          viewMode === "list" ? "flex" : ""
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div
          className={`relative overflow-hidden ${
            viewMode === "list" ? "w-80" : ""
          }`}
        >
          <div className="relative">
            <Image
              width={400}
              height={300}
              src={room.image}
              alt={room.title}
              className={`w-full object-cover group-hover:scale-110 transition-all duration-700 ${
                viewMode === "list" ? "h-48" : "h-56"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Home className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {room.isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
            {room.discount && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg">
                {room.discount}% Off
              </Badge>
            )}
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
              <Building className="h-3 w-3 mr-1" />
              {room.category}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              size="sm"
              variant="ghost"
              className={`bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300 ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 text-white transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent
          className={`p-6 relative flex-1 ${
            viewMode === "list" ? "flex flex-col justify-between" : ""
          }`}
        >
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                  {room.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="font-medium">{room.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm bg-amber-50 px-3 py-1 rounded-full mb-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-700">
                    {room.rating}
                  </span>
                  <span className="text-amber-600">({room.reviews})</span>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center bg-gray-100 rounded-lg p-2">
                <Users className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-600">{room.guests}</span>
              </div>
              <div className="text-center bg-gray-100 rounded-lg p-2">
                <Bed className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-600">{room.bedrooms}</span>
              </div>
              <div className="text-center bg-gray-100 rounded-lg p-2">
                <Bath className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-600">{room.bathrooms}</span>
              </div>
              <div className="text-center bg-gray-100 rounded-lg p-2">
                <Maximize className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-600">{room.size}m²</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-6">
              {room.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-lg text-gray-600"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{room.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                {room.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    AED {room.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                AED {room.price}
              </div>
              <div className="text-xs text-gray-500 font-medium">per night</div>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/btn rounded-xl px-6">
              View Details
              <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RoomCard;
