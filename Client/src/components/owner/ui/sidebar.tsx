"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  // Calendar,
  CheckCircle,
  Compass,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Badge } from "@/components/base/ui/badge";
import Image from "next/image";
import { getUserById } from "@/services/userService";
import { getOwnerDashboardStats, DashboardStats } from "@/services/dashboardService";
import { getConversations } from "@/services/messageService";
import { User } from "@/types/auth";
import { Conversation } from "@/types/message";
import { getCookie } from "@/lib/cookies";

const getNavigationItems = (stats: DashboardStats | null, unreadCount: number) => [
  { title: "Dashboard", url: "/owner", icon: LayoutDashboard, badge: null },
  {
    title: "My Properties",
    url: "/owner/properties",
    icon: Building2,
    badge: stats?.totalProperties || 0,
  },
  // { title: "Bookings", url: "/owner/bookings", icon: Calendar, badge: null },
  { title: "Analytics", url: "/owner/analytics", icon: BarChart3, badge: null },
  { title: "Messages", url: "/owner/messages", icon: MessageSquare, badge: unreadCount > 0 ? unreadCount : null },
];

const quickActions = [
  { title: "Add Properties", url: "/owner/properties/add", icon: Plus },
];

export default function Sidebar() {
  const [isCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const currentPath = useMemo(() => pathname || "/owner", [pathname]);
  
  const navigationItems = useMemo(() => getNavigationItems(stats, unreadCount), [stats, unreadCount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getCookie('userId');
        if (userId) {
          const [userResponse, statsResponse, conversationsResponse] = await Promise.all([
            getUserById(userId),
            getOwnerDashboardStats(userId),
            getConversations()
          ]);
          
          setUser(userResponse?.data?.user);
          setStats(statsResponse);
          
          // Calculate unread conversations count
          const conversations = conversationsResponse?.data?.conversations || [];
          const unreadConversations = conversations.filter((conv: Conversation) => {
            const userUnreadCount = conv.unreadCount instanceof Map 
              ? conv.unreadCount.get(userId) || 0
              : (conv.unreadCount as Record<string, number>)?.[userId] || 0;
            return userUnreadCount > 0;
          });
          setUnreadCount(unreadConversations.length);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const SidebarContent = (
    <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50 flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">UR</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">Ijara Hub</span>
          <span className="text-sm text-amber-400">Owner Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-4 flex items-center">
            <Compass className="h-3 w-3 mr-2" />
            Navigation
          </h3>
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive =
                item.url === "/owner"
                  ? currentPath === "/owner"
                  : currentPath.startsWith(item.url + "/") ||
                    currentPath === item.url;

              return (
                <Link
                  href={item.url}
                  key={item.title}
                  onClick={() => setIsMobileOpen(false)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg text-white"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "group-hover:text-amber-400"
                    } transition-colors`}
                  />
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge className={`ml-auto text-white text-xs ${
                      item.title === 'Messages' ? 'bg-red-500' : 'bg-amber-500'
                    }`}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-4 flex items-center">
            <Zap className="h-3 w-3 mr-2" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                href={action.url}
                key={action.title}
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <action.icon className="h-5 w-5 group-hover:text-amber-400 transition-colors" />
                <>
                  <span className="font-medium">{action.title}</span>
                  <Plus className="h-4 w-4 ml-auto opacity-50 group-hover:opacity-100" />
                </>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700/50">
        {user ? (
          <Link
            href="/owner/profile"
            className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="relative">
              {user.profileImage ? (
                <Image
                  width={40}
                  height={40}
                  src={user.profileImage}
                  alt={`${user.fname} ${user.lname}`}
                  className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold text-white">
                    {user.fname?.[0]}{user.lname?.[0]}
                  </span>
                </div>
              )}
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                {user.fname} {user.lname}
              </div>
              <div className="text-sm text-gray-400">Premium Host</div>
            </div>
          </Link>
        ) : (
          <div className="w-full flex items-center space-x-3 p-4 rounded-xl">
            <div className="animate-pulse flex items-center space-x-3 w-full">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-amber-500 p-2 rounded-lg text-white shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen z-20
          bg-gradient-to-b from-gray-900 via-gray-800 to-black
          transition-all duration-500
          ${isCollapsed ? "w-20" : "w-80"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {SidebarContent}
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
