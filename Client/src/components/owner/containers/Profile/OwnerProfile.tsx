"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Textarea } from "@/components/base/ui/textarea";
import {
  MapPin,
  Calendar,
  Star,
  Edit,
  CheckCircle,
  Building,
  MessageSquare,
  Briefcase,
  Save,
  X,
} from "lucide-react";
import { getProfile } from "@/services/authService";
import { updateUser } from "@/services/userService";
import { getOwnerDashboardStats } from "@/services/dashboardService";
import { User, UpdateUserPayload } from "@/types/auth";
import { DashboardStats } from "@/services/dashboardService";

const OwnerProfilePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateUserPayload>({});

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const profileResponse = await getProfile();
      const userData = profileResponse.data.user;
      setUser(userData);
      setFormData({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        age: userData.age,
        address: userData.address,
        companyDetails: userData.companyDetails,
      });

      if (userData._id) {
        const statsResponse = await getOwnerDashboardStats(userData._id);
        setStats(statsResponse);
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?._id) return;

    try {
      setIsSaving(true);
      const response = await updateUser(user._id, formData);
      setUser(response.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      // Refresh profile data to ensure consistency
      await fetchProfileData();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        address: user.address,
        companyDetails: user.companyDetails,
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    fetchProfileData();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile data</p>
        </div>
      </div>
    );
  }

  const fullName = isEditing
    ? `${formData.fname || ""} ${formData.lname || ""}`.trim() || "User"
    : `${user.fname} ${user.lname}`;
  const location = user.address
    ? `${user.address.city || ""}, ${user.address.emirate || ""}`
        .trim()
        .replace(/^,\s*|,\s*$/g, "")
    : "Location not specified";
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  // Generate initials for avatar
  const getInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  };

  const initials = isEditing
    ? getInitials(formData.fname || "U", formData.lname || "U")
    : getInitials(user.fname, user.lname);

  // Generate color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-green-500 to-emerald-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const avatarGradient = getAvatarColor(fullName);

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
          <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative group bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                {/* Avatar and Name */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                  <div className="relative self-center sm:self-auto mb-4 sm:mb-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt={fullName}
                          width={144}
                          height={144}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-2xl sm:text-3xl`}
                        >
                          {initials}
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    {user.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full shadow-lg">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="text-white mb-2 sm:mb-4 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center sm:justify-start animate-slide-up">
                      {fullName}
                    </h1>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 text-xs sm:text-sm">
                        <Building className="h-3 w-3 mr-1" />{" "}
                        {stats?.totalProperties || 0} Properties
                      </Badge>
                      {stats && stats.averageRating > 0 && (
                        <div className="flex items-center space-x-1 text-xs sm:text-sm">
                          <Star className="h-4 w-4 fill-white" />
                          <span className="font-semibold">
                            {stats.averageRating}
                          </span>
                          <span className="opacity-80">
                            ({stats.totalReviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Location, ID & Joined */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm opacity-90">
                      <div className="flex items-center space-x-2 bg-white/20 px-2 py-1 rounded-full">
                        <span className="font-mono font-semibold">
                          ID:{user.customId}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit/Save/Cancel Buttons */}
                <div className="flex justify-center md:justify-end gap-2">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white border-0 shadow-lg hover:scale-105 transition-all text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-orange-600 to-amber-600 text-white border-0 shadow-lg hover:scale-105 transition-all text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                      >
                        <Save className="h-4 w-4 mr-2" />{" "}
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Properties",
              value: stats?.totalProperties || 0,
              icon: Building,
              color: "from-emerald-500 to-teal-500",
            },
            {
              label: "Total Reviews",
              value: stats?.totalReviews || 0,
              icon: MessageSquare,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Avg Rating",
              value: stats?.averageRating || 0,
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
                  <p className="font-semibold mb-2">First Name</p>
                  {isEditing ? (
                    <Input
                      value={formData.fname || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, fname: e.target.value })
                      }
                      placeholder="First Name"
                    />
                  ) : (
                    <p>{user.fname}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Last Name</p>
                  {isEditing ? (
                    <Input
                      value={formData.lname || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, lname: e.target.value })
                      }
                      placeholder="Last Name"
                    />
                  ) : (
                    <p>{user.lname}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Email</p>
                  {isEditing ? (
                    <Input
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Email"
                      type="email"
                    />
                  ) : (
                    <p>{user.email}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Phone</p>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Phone"
                    />
                  ) : (
                    <p>{user.phone}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Gender</p>
                  {isEditing ? (
                    <select
                      value={formData.gender || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value as "male" | "female" | "other",
                        })
                      }
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="capitalize">{user.gender}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Age</p>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={formData.age?.toString() || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                          ...formData,
                          age: value ? parseInt(value) : 18,
                        });
                      }}
                      placeholder="Age"
                    />
                  ) : (
                    <p>{user.age}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">City</p>
                  {isEditing ? (
                    <Input
                      value={formData.address?.city || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            city: e.target.value,
                          },
                        })
                      }
                      placeholder="City"
                    />
                  ) : (
                    <p>{user.address?.city || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-2">Emirate</p>
                  {isEditing ? (
                    <Input
                      value={formData.address?.emirate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            emirate: e.target.value,
                          },
                        })
                      }
                      placeholder="Emirate"
                    />
                  ) : (
                    <p>{user.address?.emirate || "Not specified"}</p>
                  )}
                </div>
                {user.companyDetails && (
                  <>
                    <div>
                      <p className="font-semibold mb-2">Company Name</p>
                      {isEditing ? (
                        <Input
                          value={formData.companyDetails?.companyName || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyDetails: {
                                ...formData.companyDetails!,
                                companyName: e.target.value,
                              },
                            })
                          }
                          placeholder="Company Name"
                        />
                      ) : (
                        <p>{user.companyDetails.companyName}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Company Email</p>
                      {isEditing ? (
                        <Input
                          value={formData.companyDetails?.companyEmail || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyDetails: {
                                ...formData.companyDetails!,
                                companyEmail: e.target.value,
                              },
                            })
                          }
                          placeholder="Company Email"
                          type="email"
                        />
                      ) : (
                        <p>{user.companyDetails.companyEmail}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Company Phone</p>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={
                            formData.companyDetails?.companyPhone?.toString() ||
                            ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              companyDetails: {
                                ...formData.companyDetails!,
                                companyPhone: value ? parseInt(value) : 0,
                              },
                            });
                          }}
                          placeholder="Company Phone"
                        />
                      ) : (
                        <p>{user.companyDetails.companyPhone}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Since</p>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={
                            formData.companyDetails?.since?.toString() || ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              companyDetails: {
                                ...formData.companyDetails!,
                                since: value
                                  ? parseInt(value)
                                  : new Date().getFullYear(),
                              },
                            });
                          }}
                          placeholder="Since Year"
                        />
                      ) : (
                        <p>{user.companyDetails.since}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {user.companyDetails && (
                <div>
                  <p className="font-semibold mt-4 mb-2">About</p>
                  {isEditing ? (
                    <Textarea
                      value={formData.companyDetails?.bio || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyDetails: {
                            ...formData.companyDetails!,
                            bio: e.target.value,
                          },
                        })
                      }
                      placeholder="Tell us about your company..."
                      rows={4}
                    />
                  ) : (
                    <p className="leading-relaxed">{user.companyDetails.bio}</p>
                  )}
                </div>
              )}
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
