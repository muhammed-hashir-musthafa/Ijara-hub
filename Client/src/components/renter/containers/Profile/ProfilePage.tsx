"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { getProfile } from "@/services/authService";
import { User as UserType } from "@/types/auth";

const UserProfilePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      setUser(response?.data?.user);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        toast.error(error?.response?.data?.message || "Failed to load profile");
        console.error(
          "Profile fetch failed:",
          error.response?.data?.message || error.message
        );
      } else if (error instanceof Error) {
        console.error("Profile fetch failed:", error.message);
        toast.error(`${error?.message}`);
      } else {
        console.error("Profile fetch failed:", error);
        toast.error(`Something went wrong! Please try again later`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-100 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  const userData = {
    name: `${user.fname} ${user.lname}`,
    isVerified: user.isVerified,
    email: user.email,
    phone: user.phone,
    location: user.address
      ? `${user.address.city || ""}, ${user.address.emirate || "UAE"}`.trim()
      : "UAE",
    joinedDate: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "Unknown",
    membershipLevel:
      user.role === "owner"
        ? "Premium"
        : user.role === "admin"
        ? "Admin"
        : "Standard",
    bio: user.companyDetails?.bio || "No bio available",
  };

  // Generate initials for avatar
  const getInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  };
  
  const initials = getInitials(user.fname, user.lname);
  
  // Generate color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-orange-500 to-red-500',
      'from-blue-500 to-cyan-500', 
      'from-purple-500 to-pink-500',
      'from-emerald-500 to-teal-500',
      'from-indigo-500 to-purple-500',
      'from-amber-500 to-orange-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  const avatarGradient = getAvatarColor(userData.name);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-100 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-100 relative overflow-hidden pt-16">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-52 sm:w-72 h-52 sm:h-72 bg-gradient-to-r from-orange-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-pink-400/15 to-orange-400/15 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Container */}
      <div
        className={`container mx-auto px-4 sm:px-6 py-6 sm:py-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header Section */}
        <div className="relative mb-8 animate-slide-up">
          <div className="h-56 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="w-full h-full bg-gradient-to-r from-orange-700 via-amber-500 to-rose-400 animate-gradient-x" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Profile Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6 space-y-4 md:space-y-0">
                {/* Avatar */}
                <div className="relative self-center md:self-auto">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {user.profileImage ? (
                      <Image
                        width={144}
                        height={144}
                        src={user.profileImage}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-xl sm:text-2xl lg:text-3xl`}>
                        {initials}
                      </div>
                    )}
                  </div>
                  {userData.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 sm:p-2 rounded-full shadow-lg animate-fade-in-right">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-white text-center md:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 animate-slide-up">
                    {userData.name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-3">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 animate-bounce-gentle">
                      <Trophy className="h-3 w-3 mr-1" />
                      {userData.membershipLevel} Member
                    </Badge>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs sm:text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {userData.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* About & Preferences */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-xl">
                  <User className="h-5 w-5 mr-2 text-orange-600" /> About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  {userData.bio}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in-right">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Phone className="h-5 w-5 mr-2 text-orange-600" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700 text-sm sm:text-base">
                <div className="flex items-center space-x-2 break-all">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{userData.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
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
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(-30px, 40px) scale(1.05);
          }
          66% {
            transform: translate(20px, -30px) scale(0.95);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }
        .animate-float {
          animation: float 8s infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;
