"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import {
  Home,
  MessageSquare,
  BarChart3,
  Clock,
  CheckCircle2,
  Sparkles,
  Calendar,
} from "lucide-react";
import Header from "../../ui/header";
import { getUserById } from "@/services/userService";
import { getOwnerDashboardStats, DashboardStats } from "@/services/dashboardService";
import { User } from "@/types/auth";
import { getCookie } from "@/lib/cookies";



export default function OwnerDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardStats>({
    totalProperties: 0,
    totalReviews: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = getCookie('userId');
        if (!userId) return;

        // Fetch user data and dashboard stats
        const [userResponse, dashboardStats] = await Promise.all([
          getUserById(userId),
          getOwnerDashboardStats(userId)
        ]);
        
        setUser(userResponse?.data?.user);
        setDashboardData(dashboardStats);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    setIsVisible(true);
  }, []);

  const stats = [
    {
      title: "Total Properties",
      value: loading ? 0 : dashboardData.totalProperties,
      icon: Home,
      color: "from-amber-500 to-orange-600",
      bgGlow: "bg-amber-500/20",
    },
    {
      title: "Total Reviews",
      value: loading ? 0 : dashboardData.totalReviews,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-600",
      bgGlow: "bg-blue-500/20",
    },
    {
      title: "Overall Rating",
      value: loading ? 0 : dashboardData.averageRating,
      suffix: " / 5",
      icon: BarChart3,
      color: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/20",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      title: "New booking request",
      subtitle: "Marina View Apartment",
      time: "2 hours ago",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "review",
      title: "New 5-star review",
      subtitle: "Downtown Penthouse",
      time: "5 hours ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "update",
      title: "Calendar synced",
      subtitle: "All properties updated",
      time: "1 day ago",
      icon: Clock,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <Header />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={`relative z-10 p-6 md:p-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center mb-4">
            <Sparkles className="h-6 w-6 text-amber-500 mr-3 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Welcome back, {user?.fname || 'Owner'}
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-9">
            Here&apos;s what&apos;s happening with your properties today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up cursor-pointer ${
                activeCard === index ? "ring-2 ring-amber-400" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              ></div>

              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    Live
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2 font-medium">
                  {stat.title}
                </p>
                <div className="flex items-baseline">
                  {loading ? (
                    <div className="h-9 bg-gray-200 rounded w-16 animate-pulse"></div>
                  ) : (
                    <>
                      <p
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </p>
                      {stat.suffix && (
                        <span className="text-lg text-gray-500 ml-1">
                          {stat.suffix}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {/* Recent Activity */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300 group cursor-pointer border border-gray-100"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div
                      className={`p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.subtitle}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          {/* <Card
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-4"></div>
                <h3 className="text-xl font-bold text-gray-900">
                  Pending Tasks
                </h3>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold rounded-full">
                    {pendingTasks.filter((t) => t.urgent).length} Urgent
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group cursor-pointer border border-gray-100"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-amber-500 transition-colors duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {task.task}
                      </p>
                      {task.urgent && (
                        <div className="flex items-center mt-2">
                          <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-xs font-semibold text-red-500">
                            Urgent
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Quick Stats Bar */}
        <div
          className="mt-6 animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Reviews", value: loading ? 0 : dashboardData.totalReviews },
                  { label: "Total Properties", value: loading ? 0 : dashboardData.totalProperties },
                  { label: "Status", value: "Active" },
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
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

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
