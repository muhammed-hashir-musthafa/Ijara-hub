"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/base/ui/button";
// import { Input } from "@/components/base/ui/input";
import {
  //   MapPin,
  //   Users,
  //   Calendar,
  Car,
  Home as Homes,
  Search,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const [searchType, setSearchType] = useState("rooms");
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroTexts = [
    "Discover Luxury Rentals in the UAE",
    "Experience Premium Comfort & Style",
    "Your Gateway to Exclusive Living",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            width={1920}
            height={1080}
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop"
            alt="Dubai luxury skyline"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-float-slow"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Animated Hero Title */}
          <div className="mb-6 mt-12 h-20 flex items-center justify-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white text-balance leading-tight">
              <span className="inline-block animate-fade-in-up">
                {heroTexts[currentText].split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-4"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {word === "UAE" ? (
                      <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center mb-8 mt-14">
            <Sparkles className="h-6 w-6 text-amber-400 mr-2 animate-pulse" />
            <p className="text-xl md:text-2xl text-white/90 font-light ">
              Premium rooms and cars for the discerning traveler
            </p>
            <Sparkles className="h-6 w-6 text-amber-400 ml-2 animate-pulse" />
          </div>

          {/* Enhanced Search Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto border border-white/20 hover:bg-white/15 transition-all duration-500 animate-slide-up">
            {/* Search Type Toggle with Glassmorphism */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex border border-white/20 shadow-lg">
                <button
                  onClick={() => setSearchType("rooms")}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    searchType === "rooms"
                      ? "bg-white text-gray-900 shadow-lg transform scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Homes className="h-5 w-5" />
                  <span>Luxury Rooms</span>
                </button>
                <button
                  onClick={() => setSearchType("cars")}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    searchType === "cars"
                      ? "bg-white text-gray-900 shadow-lg transform scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Car className="h-5 w-5" />
                  <span>Premium Cars</span>
                </button>
              </div>
            </div>

            {/* Search Fields */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: MapPin, label: "Location", placeholder: "Select city" },
                {
                  icon: Calendar,
                  label: "Check-in",
                  placeholder: "",
                  type: "date",
                },
                {
                  icon: Calendar,
                  label: "Check-out",
                  placeholder: "",
                  type: "date",
                },
                {
                  icon: Users,
                  label: searchType === "rooms" ? "Guests" : "Passengers",
                  placeholder: "Select",
                },
              ].map((field, index) => (
                <div key={index} className="space-y-3 group">
                  <label className="text-sm font-medium text-white/90 flex items-center group-hover:text-white transition-colors">
                    <field.icon className="h-4 w-4 mr-2" />
                    {field.label}
                  </label>
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 rounded-xl backdrop-blur-sm"
                  />
                </div>
              ))}
            </div> */}

            <Link href={searchType === "rooms" ? "/rooms" : "/cars"} passHref>
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <Search className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Discover{" "}
                {searchType === "rooms" ? "Luxury Rooms" : "Premium Cars"}
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
