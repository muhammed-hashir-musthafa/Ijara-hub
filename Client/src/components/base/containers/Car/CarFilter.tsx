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
import { Fuel, Filter, Search, Award, Car } from "lucide-react";
import { CarFilters } from "@/types/car";

interface CarsFiltersProps {
  onFiltersChange: (filters: CarFilters) => void;
}

const CarsFilters: React.FC<CarsFiltersProps> = ({ onFiltersChange }) => {
  //   const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories: string[];
    if (checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(updatedCategories);
    onFiltersChange({ categories: updatedCategories }); // pass other filters as needed
  };

  const brands = [
    "Lamborghini",
    "Mercedes-Benz",
    "BMW",
    "Tesla",
    "Porsche",
    "Toyota",
  ];
  const categories = [
    "Sports",
    "Luxury",
    "SUV",
    "Convertible",
    "Economy",
    "Electric",
  ];
  const fuelTypes = ["Petrol", "Electric", "Hybrid"];

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
            placeholder="Search by model, brand..."
            className="pl-10 border-2 border-gray-200 focus:border-amber-500 rounded-xl transition-all duration-300"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Car className="h-4 w-4 mr-2 text-amber-500" />
            Category
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

        {/* Brands */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Award className="h-4 w-4 mr-2 text-amber-500" />
            Brand
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Fuel className="h-4 w-4 mr-2 text-amber-500" />
            Fuel Type
          </h3>
          <div className="space-y-2">
            {fuelTypes.map((fuel) => (
              <label
                key={fuel}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                  {fuel}
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
export default CarsFilters;
