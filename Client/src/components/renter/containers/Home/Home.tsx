"use client";

import React from "react";
import FeaturedListings from "@/components/renter/containers/Home/FeaturedListings";
import FeaturesSection from "@/components/renter/containers/Home/FeaturesSection";
import HeroSection from "@/components/renter/containers/Home/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedListings />
      <FeaturesSection />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slow-zoom {
          0%,
          100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
        }

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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
