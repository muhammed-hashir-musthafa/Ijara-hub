"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/base/ui/button";
import {
  Navigation,
  Bluetooth,
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
import { CarFilters } from "@/types/car";

// Mock data
const mockCars = [
  {
    id: 1,
    title: "Luxury Sports Car",
    brand: "Lamborghini",
    model: "Huracán",
    year: 2023,
    location: "Dubai",
    price: 2500,
    originalPrice: 3000,
    rating: 4.9,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    ],
    features: ["GPS Navigation", "Premium Sound", "Leather Seats"],
    passengers: 2,
    category: "Sports",
    fuelType: "Petrol",
    transmission: "Automatic",
    isNew: true,
    discount: 17,
    acceleration: "3.2s",
    power: "630 HP",
  },
  {
    id: 2,
    title: "Executive Sedan",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    location: "Abu Dhabi",
    price: 800,
    rating: 4.7,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop",
    ],
    features: ["Chauffeur Available", "WiFi Hotspot", "Massage Seats"],
    passengers: 4,
    category: "Luxury",
    fuelType: "Petrol",
    transmission: "Automatic",
    power: "450 HP",
  },
  {
    id: 3,
    title: "Premium SUV",
    brand: "BMW",
    model: "X7",
    year: 2022,
    location: "Dubai",
    price: 650,
    rating: 4.6,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    ],
    features: ["7 Seats", "Panoramic Sunroof", "Apple CarPlay"],
    passengers: 7,
    category: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    power: "400 HP",
  },
  {
    id: 4,
    title: "Electric Luxury",
    brand: "Tesla",
    model: "Model S",
    year: 2023,
    location: "Dubai",
    price: 900,
    rating: 4.8,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    ],
    features: ["Autopilot", "Supercharging", "Premium Interior"],
    passengers: 5,
    category: "Luxury",
    fuelType: "Electric",
    transmission: "Automatic",
    isElectric: true,
    isNew: true,
    power: "1020 HP",
  },
];

// Car Detail Data
export const carDetailData = {
  id: 1,
  title: "Luxury Sports Car",
  brand: "Lamborghini",
  model: "Huracán",
  year: 2023,
  location: "Dubai",
  price: 2500,
  originalPrice: 3000,
  rating: 4.9,
  reviews: 45,
  images: [
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
  ],
  category: "Sports",
  passengers: 2,
  fuelType: "Petrol",
  transmission: "Automatic",
  engine: "5.2L V10",
  power: "630 HP",
  acceleration: "3.2s (0-100 km/h)",
  topSpeed: "325 km/h",
  description:
    "Experience the thrill of driving one of the world's most iconic supercars. This Lamborghini Huracán delivers breathtaking performance with its naturally aspirated V10 engine, offering an unforgettable driving experience through Dubai's stunning landscapes.",
  features: [
    { name: "GPS Navigation", icon: Navigation },
    { name: "Bluetooth", icon: Bluetooth },
    { name: "Premium Sound", icon: null },
    { name: "Leather Seats", icon: null },
    { name: "Climate Control", icon: null },
    { name: "Keyless Entry", icon: null },
  ],
  highlights: [
    "Iconic Lamborghini design",
    "Naturally aspirated V10 engine",
    "Advanced all-wheel drive system",
    "Premium interior with Alcantara",
    "Professional delivery service",
  ],
  specifications: {
    Engine: "5.2L V10",
    Power: "630 HP",
    Torque: "600 Nm",
    Transmission: "7-speed dual-clutch",
    Drive: "All-wheel drive",
    "Fuel Tank": "83L",
    Weight: "1,422 kg",
    Length: "4,520 mm",
  },
  rental: {
    company: "Dubai Luxury Rentals",
    rating: 4.8,
    reviews: 892,
    verified: true,
  },
  userReviews: [
    {
      id: 1,
      user: "Michael R.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Absolutely incredible experience! The car was in perfect condition and the service was exceptional. Driving through Dubai in this beast was unforgettable.",
    },
    {
      id: 2,
      user: "James L.",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Professional service from start to finish. The Huracán exceeded all expectations. Will definitely rent again!",
    },
  ],
};

export const CarsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [cars] = useState(mockCars);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFiltersChange = (filters: CarFilters) => {
    console.log("Filters changed:", filters);
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
                    {cars.length} Vehicles Available
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
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {cars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
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
                Load More Vehicles
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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
