"use client";

import React from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Shield, Clock, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description:
      "All our properties are thoroughly vetted and verified for your safety and comfort.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to assist you whenever you need help.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Handpicked luxury accommodations and vehicles that meet our high standards.",
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    description:
      "Personal concierge service to make your stay in the UAE truly memorable.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-gradient-shift"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Why Choose Us
            </span>
            <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We provide unmatched service and quality to ensure your experience
            in the UAE is nothing short of extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up">
          {[
            { number: "500+", label: "Luxury Properties" },
            { number: "50+", label: "Premium Vehicles" },
            { number: "10K+", label: "Happy Customers" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
