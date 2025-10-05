// File: components/owner/ui/Sidebar.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  Calendar,
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

const ownerData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  verified: true,
};

const navigationItems = [
  { title: "Dashboard", url: "/owner", icon: LayoutDashboard, badge: null },
  {
    title: "My Properties",
    url: "/owner/properties",
    icon: Building2,
    badge: "12",
  },
  { title: "Bookings", url: "/owner/bookings", icon: Calendar, badge: "3" },
  { title: "Analytics", url: "/owner/analytics", icon: BarChart3, badge: null },
  { title: "Messages", url: "/messages", icon: MessageSquare, badge: "5" },
];

const quickActions = [
  { title: "Add Properties", url: "/owner/properties/add", icon: Plus },
];

export default function Sidebar() {
  const [isCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = useMemo(() => pathname || "/owner", [pathname]);

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
                    <Badge className="ml-auto bg-amber-500 text-white text-xs">
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
        <Link
          href="/owner/profile"
          className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="relative">
            <Image
              width={40}
              height={40}
              src={ownerData.avatar}
              alt={ownerData.name}
              className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform"
            />
            {ownerData.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
              {ownerData.name}
            </div>
            <div className="text-sm text-gray-400">Premium Host</div>
          </div>
        </Link>
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
