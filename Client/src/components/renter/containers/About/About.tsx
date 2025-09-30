"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import Image from "next/image";
import {
  Users,
  Car,
  Home,
  Award,
  Shield,
  Clock,
  Headphones,
  Sparkles,
  ChevronRight,
  Globe,
  Star,
  Play,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Happy Customers",
    value: "50,000+",
    icon: Users,
    color: "from-blue-500 to-purple-600",
  },
  {
    label: "Luxury Properties",
    value: "2,500+",
    icon: Home,
    color: "from-amber-500 to-orange-600",
  },
  {
    label: "Premium Vehicles",
    value: "800+",
    icon: Car,
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "Years of Excellence",
    value: "15+",
    icon: Award,
    color: "from-pink-500 to-rose-600",
  },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Every property and vehicle is thoroughly vetted and verified for your peace of mind.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We maintain the highest standards in luxury accommodations and premium vehicles.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to ensure your experience is seamless.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Headphones,
    title: "Personalized Service",
    description:
      "Dedicated concierge service tailored to your unique preferences and needs.",
    gradient: "from-purple-500 to-pink-500",
  },
];

const team = [
  {
    name: "Ahmed Al Mansouri",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description:
      "Visionary leader with 20+ years in luxury hospitality and automotive industries.",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description:
      "Operations expert ensuring seamless experiences across all our services.",
  },
  {
    name: "Omar Hassan",
    role: "Customer Experience Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description:
      "Dedicated to delivering exceptional customer satisfaction and service excellence.",
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              width={1920}
              height={1080}
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop"
              alt="Dubai luxury skyline"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-orange-900/30" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-float-slow"></div>
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-amber-400 mr-3 animate-pulse" />
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                About UAE Rentals
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in-up">
              Redefining{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Luxury Rentals
              </span>{" "}
              in the UAE
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              For over 15 years, we&apos;ve been the trusted partner for
              discerning travelers seeking premium accommodations and luxury
              vehicles across the United Arab Emirates.
            </p>

            <div className="mt-12 animate-fade-in-up animation-delay-500">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById("our-story")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <Globe className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Discover Our Story
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-gradient-shift"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Our Impact
              </span>
              <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Numbers That{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Speak
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence reflected in every milestone
              we&apos;ve achieved
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group text-center animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div
                    className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider group-hover:text-white transition-colors font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div id="our-story" className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  Our Journey
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Story
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <div className="group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 transform hover:-translate-x-2">
                  <p className="group-hover:text-gray-800 transition-colors">
                    Founded in 2009 with a vision to transform the luxury rental
                    experience in the UAE, UAE Rentals began as a boutique
                    service catering to high-end clientele seeking exceptional
                    accommodations and premium vehicles.
                  </p>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 transform hover:-translate-x-2">
                  <p className="group-hover:text-gray-800 transition-colors">
                    What started as a small operation in Dubai has grown into
                    the region&apos;s most trusted luxury rental platform,
                    serving thousands of satisfied customers from around the
                    world. Our commitment to excellence and attention to detail
                    has earned us recognition as the premier choice for luxury
                    rentals.
                  </p>
                </div>

                <div className="group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 transform hover:-translate-x-2">
                  <p className="group-hover:text-gray-800 transition-colors">
                    Today, we continue to set new standards in the industry,
                    combining traditional hospitality values with modern
                    technology to deliver unparalleled experiences across the
                    Emirates.
                  </p>
                </div>
              </div>

              <Button className="mt-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/btn px-6 py-3 rounded-xl">
                Learn More About Us
                <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative animate-fade-in-up animation-delay-300">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700 group">
                <Image
                  width={800}
                  height={600}
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop"
                  alt="Dubai luxury skyline"
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Play className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-gradient-shift"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Our Foundation
              </span>
              <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do and ensure exceptional
              experiences for our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 bg-gradient-to-r ${value.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Leadership Team
              </span>
              <div className="w-12 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Leadership
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The experienced professionals behind UAE Rentals&apos; success and
              commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    width={300}
                    height={300}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center text-white">
                        <Star className="h-4 w-4 mr-2 text-amber-400" />
                        <span className="text-sm font-medium">
                          Leadership Excellence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-orange-500/20 animate-gradient-shift"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-8 w-8 text-amber-400 mr-4 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our Mission
              </h2>
              <Sparkles className="h-8 w-8 text-amber-400 ml-4 animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl leading-relaxed text-white/90 font-light">
              To provide unparalleled luxury rental experiences that exceed
              expectations, combining world-class service with the finest
              accommodations and vehicles, making every moment in the UAE truly
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-semibold">
                {" "}
                extraordinary{" "}
              </span>
              for our valued guests.
            </p>

            <div className="mt-12">
              <Link
                href="/"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4 inline-flex items-center"
              >
                <Globe className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Start Your Journey
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
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

export default About;
