"use client";

import React from "react";
import { Bell, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/ui/dropdown-menu";

const ownerData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
};

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-end">
      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 focus:outline-none">
              <Image
                width={36}
                height={36}
                src={ownerData.avatar}
                alt={ownerData.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-700">
                  {ownerData.name}
                </div>
                <div className="text-xs text-gray-400">{ownerData.email}</div>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-gray-700">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="hover:bg-amber-500 hover:text-white"
            >
              <Link href="/owner/profile" className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500 " />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-amber-500 hover:text-white"
            >
              <Link href="/owner/settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2 text-gray-500 " />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/login"
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
