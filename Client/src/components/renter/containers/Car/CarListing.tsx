"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/base/ui/button";
import {
  Grid,
  List,
  Shield,
  Clock,
  Car,
  ArrowRight,
  Trophy,
} from "lucide-react";
import CarsFilters from "@/components/base/containers/Car/CarFilter";
import CarCard from "@/components/base/containers/Car/CarCard";
import { CarFilters, Car as CarType, CarQueryParams } from "@/types/car";
import { getCars } from "@/services/carService";

export const CarsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [cars, setCars] = useState<CarType[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<CarQueryParams>({});
  const [totalCars, setTotalCars] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCars = useCallback(
    async (params: CarQueryParams = {}) => {
      try {
        setIsLoading(true);
        const response = await getCars({
          ...params,
          page: currentPage,
          limit: 8,
        });
        setCars(response?.data?.cars || []);
        setTotalCars(response?.data?.pagination?.totalItems || 0);
      } catch (error: unknown) {
        console.error("Error fetching cars:", error);
        setCars([]);
        setTotalCars(0);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    setIsVisible(true);
    fetchCars(filters);
  }, [fetchCars, filters]);

  const handleFiltersChange = (newFilters: CarFilters) => {
    const queryParams: CarQueryParams = {
      category: newFilters?.categories?.[0],
      brand: newFilters?.brands?.[0],
      fuelType: newFilters?.fuelTypes?.[0],
      minPrice: newFilters?.priceRange?.[0],
      maxPrice: newFilters?.priceRange?.[1],
    };
    setFilters(queryParams);
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
              <Car className="h-8 w-8 text-amber-500 mr-3" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Premium Fleet
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Luxury Car{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Rentals
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Drive the extraordinary with our curated collection of premium
              vehicles in the UAE
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-gray-600">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <CarsFilters onFiltersChange={handleFiltersChange} />
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
                      : `${totalCars} Vehicles Available`}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Find your perfect ride
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
                  className={`rounded-xl transition-all duration-300 hidden md:inline-flex ${
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
            ) : cars?.length === 0 ? (
              <div className="text-center py-16">
                <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No cars found
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
                {cars?.map((car, index) => (
                  <CarCard
                    key={car?._id}
                    car={{
                      id: car?._id,
                      brand: car?.brand,
                      model: car?.model,
                      title: car?.title,
                      year: car?.year,
                      category: car?.category,
                      image: car?.images?.[0] || "/placeholder-car.jpg",
                      location: car?.location,
                      rating: 4.5,
                      reviews: 0,
                      passengers: car?.seatingCapacity,
                      fuelType: car?.fuelType,
                      transmission: car?.transmission,
                      features: car?.amenities,
                      price: car?.dailyRate,
                      isElectric: car?.fuelType === "electric",
                    }}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {cars?.length < totalCars && (
              <div className="text-center mt-16">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl"
                >
                  {isLoading ? "Loading..." : "Load More Vehicles"}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          background: linear-gradient(45deg, #f59e0b, #ea580c);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: linear-gradient(45deg, #f59e0b, #ea580c);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};
export default CarsPage;
