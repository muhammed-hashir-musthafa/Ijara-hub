"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  MapPin,
  Calendar,
  Star,
  Trophy,
  Edit,
  CheckCircle,
  Crown,
  Building,
  Activity,
  MessageSquare,
  Briefcase,
} from "lucide-react";

const OwnerProfilePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const ownerData = {
    name: "Alexander Hamilton",
    email: "alex.hamilton@luxuryestate.com",
    phone: "+971 50 555 0123",
    location: "Dubai, UAE",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    coverPhoto:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=400&fit=crop",
    joinedDate: "January 2019",
    company: "Hamilton Luxe Estates",
    companyType: "Luxury Property Management",
    license: "DRE #LUX98432",
    founded: "2015",
    employees: 38,
    website: "https://hamiltonluxe.com",
    properties: 24,
    totalEarnings: "AED 2,850,000",
    occupancyRate: 87,
    rating: 4.95,
    reviews: 1247,
    responseRate: 99,
    responseTime: "Within 15 minutes",
    superhost: true,
    yearsHosting: 5,
    languages: ["English", "Arabic", "French", "Spanish"],
    specialties: [
      "Luxury Villas",
      "Beachfront Properties",
      "City Penthouses",
      "Desert Resorts",
    ],
    bio: "Luxury hospitality expert with over 15 years of experience in premium accommodations. I specialize in creating unforgettable experiences for discerning guests.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div
        className={`container mx-auto px-6 py-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="relative mb-10">
          <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative group">
            <Image
              src={ownerData.coverPhoto}
              alt="Cover"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 "
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                {/* Avatar and Name */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                  <div className="relative self-center sm:self-auto mb-4 sm:mb-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      <Image
                        src={ownerData.avatar}
                        alt={ownerData.name}
                        width={144}
                        height={144}
                        className="w-full h-full object-cover "
                      />
                    </div>

                    {/* Status Badges */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full shadow-lg">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-full shadow-lg">
                      <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>

                  <div className="text-white mb-2 sm:mb-4 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center sm:justify-start animate-slide-up">
                      {ownerData.name}
                      {ownerData.superhost && (
                        <Trophy className="h-6 w-6 sm:h-8 sm:w-8 ml-2 text-yellow-400" />
                      )}
                    </h1>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xs sm:text-sm">
                        <Trophy className="h-3 w-3 mr-1" /> Superhost
                      </Badge>
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 text-xs sm:text-sm">
                        <Building className="h-3 w-3 mr-1" />{" "}
                        {ownerData.properties} Properties
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm">
                        <Star className="h-4 w-4 fill-white" />
                        <span className="font-semibold">
                          {ownerData.rating}
                        </span>
                        <span className="opacity-80">
                          ({ownerData.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Location & Hosting */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm opacity-90">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{ownerData.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{ownerData.yearsHosting} years hosting</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-center md:justify-end">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-lg hover:scale-105 transition-all text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Properties",
              value: ownerData.properties,
              icon: Building,
              color: "from-emerald-500 to-teal-500",
            },
            // {
            //   label: "Earnings",
            //   value: ownerData.totalEarnings,
            //   icon: DollarSign,
            //   color: "from-green-500 to-emerald-500",
            // },
            {
              label: "Occupancy",
              value: `${ownerData.occupancyRate}%`,
              icon: Activity,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Response Rate",
              value: `${ownerData.responseRate}%`,
              icon: MessageSquare,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Avg Rating",
              value: ownerData.rating,
              icon: Star,
              color: "from-amber-500 to-orange-500",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${stat.color} w-fit mx-auto mb-4 shadow-lg`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content: Business & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Business Details */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-emerald-600" />
                Business & Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Company Name</p>
                  <p>{ownerData.company}</p>
                </div>
                <div>
                  <p className="font-semibold">Business Type</p>
                  <p>{ownerData.companyType}</p>
                </div>
                <div>
                  <p className="font-semibold">License</p>
                  <p>{ownerData.license}</p>
                </div>
                <div>
                  <p className="font-semibold">Founded</p>
                  <p>{ownerData.founded}</p>
                </div>
                <div>
                  <p className="font-semibold">Employees</p>
                  <p>{ownerData.employees}</p>
                </div>
                <div>
                  <p className="font-semibold">Website</p>
                  <a
                    href={ownerData.website}
                    target="_blank"
                    className="text-emerald-600 hover:underline"
                  >
                    {ownerData.website}
                  </a>
                </div>
              </div>

              <div>
                <p className="font-semibold mt-4 mb-2">About</p>
                <p className="leading-relaxed">{ownerData.bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Activity Feed */}
          {/* <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>2 days ago:</strong> Added new beachfront property
                  “Palm Serenity”.
                </li>
                <li>
                  <strong>1 week ago:</strong> Earned “Top Rated Host” badge for
                  2025 Q3.
                </li>
                <li>
                  <strong>2 weeks ago:</strong> Updated amenities for “Skyline
                  Penthouse”.
                </li>
                <li>
                  <strong>1 month ago:</strong> Achieved 95% occupancy rate for
                  August.
                </li>
              </ul>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Animations */}
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 40px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }

        .animate-float {
          animation: float 8s infinite;
        }

        .animate-float-delay {
          animation: float-delay 10s infinite;
        }
      `}</style>
    </div>
  );
};

export default OwnerProfilePage;
