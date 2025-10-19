"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Users, Filter, Search, Award, Building } from "lucide-react";
import { RoomQueryParams } from "@/types/room";

interface RoomsFiltersProps {
  onFiltersChange: (filters: RoomQueryParams) => void;
}

const RoomsFilters: React.FC<RoomsFiltersProps> = ({ onFiltersChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories: string[];
    if (checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(updatedCategories);
    onFiltersChange({ category: updatedCategories[0] });
  };

  const categories = [
    "Luxury",
    "Business",
    "Family",
    "Budget",
    "Romantic",
    "Penthouse",
  ];
  const amenities = [
    "WiFi",
    "Kitchen",
    "Pool",
    "Gym",
    "Parking",
    "Air Conditioning",
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <Filter className="h-5 w-5 mr-2 text-amber-500" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search locations, amenities..."
            className="pl-10 border-2 border-gray-200 focus:border-amber-500 rounded-xl transition-all duration-300"
          />
        </div>

        {/* Property Type */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Building className="h-4 w-4 mr-2 text-amber-500" />
            Property Type
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                  onChange={(e) =>
                    handleCategoryChange(category, e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2 text-amber-500" />
            Guests
          </h3>
          <select className="w-full px-4 py-2 border-2 border-gray-200 focus:border-amber-500 rounded-xl transition-all duration-300 bg-white">
            <option>Any number of guests</option>
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4+ guests</option>
          </select>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Award className="h-4 w-4 mr-2 text-amber-500" />
            Amenities
          </h3>
          <div className="space-y-2">
            {amenities.map((amenity: string) => (
              <label
                key={amenity}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl py-3 transform hover:scale-105 transition-all duration-300">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomsFilters;
