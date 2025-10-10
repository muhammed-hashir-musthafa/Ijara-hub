"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Award,
  Settings,
  ChevronRight,
  Building,
  Users,
  DollarSign,
  Activity,
  HelpCircle,
  CheckCircle,
  BarChart3,
  Zap,
  Crown,
  TrendingUp,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Image from "next/image";

const AdminProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const adminData = {
    name: "Sarah Chen",
    email: "sarah.chen@luxplatform.com",
    phone: "+971 50 888 0123",
    location: "Dubai, UAE",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    coverPhoto:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
    joinedDate: "March 2018",
    role: "Platform Administrator",
    totalUsers: "52,847",
    totalProperties: "12,456",
    monthlyRevenue: "AED 8.2M",
    systemUptime: "99.98%",
    supportTickets: 89,
    resolvedTickets: 1247,
    platformRating: 4.9,
    yearsWithCompany: 6,
    accessLevel: "Super Admin",
    departments: ["Operations", "Security", "Analytics", "Support"],
    certifications: [
      "AWS Certified",
      "Security+",
      "ITIL Foundation",
      "PMP Certified",
    ],
    bio: "Senior platform administrator with expertise in system architecture, security, and operations. Leading digital transformation initiatives and ensuring platform excellence.",
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "system", label: "System Health", icon: Cpu },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div
        className={`container mx-auto px-6 py-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Premium Admin Header */}
        <div className="relative mb-8">
          <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative group">
            <Image
              width={80}
              height={80}
              src={adminData.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Floating System Status Indicators */}
            <div className="absolute top-6 right-6 flex space-x-3">
              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium flex items-center animate-pulse">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                System Online
              </div>
              <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium flex items-center">
                <Cpu className="w-3 h-3 mr-2" />
                99.98% Uptime
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div className="flex items-end space-x-6">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      <Image
                        width={36}
                        height={36}
                        src={adminData.avatar}
                        alt={adminData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Multiple Status Badges */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full shadow-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full shadow-lg animate-pulse">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute top-2 -right-2 bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-full shadow-lg">
                      <ShieldCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="text-white mb-4">
                    <h1 className="text-4xl font-bold mb-2 flex items-center animate-slide-up">
                      {adminData.name}
                      <Crown className="h-8 w-8 ml-3 text-purple-400" />
                    </h1>
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 animate-bounce-gentle">
                        <Crown className="h-3 w-3 mr-1" />
                        {adminData.accessLevel}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Security Verified
                      </Badge>
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                        <Users className="h-3 w-3 mr-1" />
                        {adminData.totalUsers} Users
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm opacity-90">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{adminData.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {adminData.yearsWithCompany} years with platform
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>{adminData.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Admin Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          {[
            {
              label: "Total Users",
              value: adminData.totalUsers,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
              trend: "+12.5%",
              trendUp: true,
            },
            {
              label: "Properties",
              value: adminData.totalProperties,
              icon: Building,
              color: "from-emerald-500 to-teal-500",
              trend: "+8.3%",
              trendUp: true,
            },
            {
              label: "Monthly Revenue",
              value: adminData.monthlyRevenue,
              icon: DollarSign,
              color: "from-green-500 to-emerald-500",
              trend: "+18.7%",
              trendUp: true,
            },
            {
              label: "System Uptime",
              value: adminData.systemUptime,
              icon: Activity,
              color: "from-purple-500 to-pink-500",
              trend: "Excellent",
              trendUp: true,
            },
            {
              label: "Support Tickets",
              value: adminData.supportTickets,
              icon: HelpCircle,
              color: "from-orange-500 to-red-500",
              trend: "-23%",
              trendUp: false,
            },
            {
              label: "Platform Rating",
              value: adminData.platformRating,
              icon: Star,
              color: "from-amber-500 to-orange-500",
              trend: "+0.2",
              trendUp: true,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${stat.color} w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div
                  className={`text-xs font-medium flex items-center justify-center ${
                    stat.trendUp ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-3 h-3 mr-1 ${
                      stat.trendUp ? "" : "transform rotate-180"
                    }`}
                  />
                  {stat.trend}
                </div>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex space-x-2 mb-8 bg-white/50 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-white/50 hover:text-purple-600"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {activeTab === "dashboard" && (
              <>
                <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-xl animate-slide-up">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <BarChart3 className="h-6 w-6 mr-3 text-purple-600" />
                      Platform Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Active Users Today",
                          value: "8,247",
                          change: "+5.2%",
                          color: "blue",
                        },
                        {
                          title: "Revenue Today",
                          value: "AED 127K",
                          change: "+12.8%",
                          color: "green",
                        },
                        {
                          title: "New Bookings",
                          value: "342",
                          change: "+8.1%",
                          color: "purple",
                        },
                      ].map((metric, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <h4 className="text-gray-600 text-sm font-medium mb-2">
                            {metric.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-800">
                              {metric.value}
                            </span>
                            <Badge
                              className={`bg-${metric.color}-100 text-${metric.color}-700`}
                            >
                              {metric.change}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-white/70 backdrop-blur-xl border-0 shadow-xl animate-slide-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Activity className="h-6 w-6 mr-3 text-emerald-600" />
                      Recent System Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "System backup completed",
                          time: "2 minutes ago",
                          status: "success",
                        },
                        {
                          action: "New user registration spike detected",
                          time: "15 minutes ago",
                          status: "info",
                        },
                        {
                          action: "Security scan completed",
                          time: "1 hour ago",
                          status: "success",
                        },
                        {
                          action: "Database optimization finished",
                          time: "2 hours ago",
                          status: "success",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/80 to-gray-50/80 rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              activity.status === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                            } animate-pulse`}
                          ></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-600">
                              {activity.time}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Other tab content would follow similar patterns */}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-xl animate-fade-in-right">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 mr-3 text-purple-600" />
                  Admin Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {adminData.bio}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{adminData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{adminData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{adminData.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-white/70 backdrop-blur-xl border-0 shadow-xl animate-fade-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="h-5 w-5 mr-3 text-amber-600" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {adminData.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full justify-center py-2"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-white/70 backdrop-blur-xl border-0 shadow-xl animate-fade-in-right"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-3 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Users, label: "Manage Users", color: "blue" },
                  {
                    icon: ShieldCheck,
                    label: "Security Center",
                    color: "purple",
                  },
                  { icon: BarChart3, label: "Analytics", color: "green" },
                  { icon: Settings, label: "System Settings", color: "orange" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 transition-all duration-300 group"
                  >
                    <action.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                    {action.label}
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminProfile;
