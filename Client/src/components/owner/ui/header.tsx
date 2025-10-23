"use client";

import React, { useState, useEffect } from "react";
import { Bell, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/ui/dropdown-menu";
import { getUserById } from "@/services/userService";
import { logout } from "@/services/authService";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "@/lib/cookies";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = getCookie('userId');
        if (userId) {
          const response = await getUserById(userId);
          // console.log(response)
          setUser(response?.data?.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-end">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          <div className="hidden md:block">
            <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </header>
    );
  }
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user.fname?.[0]}{user.lname?.[0]}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-700">
                  {user.fname} {user.lname}
                </div>
                <div className="text-xs text-gray-400">{user.email}</div>
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
                <UserIcon className="h-4 w-4 mr-2 text-gray-500 " />
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
            <DropdownMenuItem 
              onClick={async () => {
                try {
                  await logout();
                  deleteCookie('token');
                  deleteCookie('userId');
                  deleteCookie('userRole');
                  toast.success('Logged out successfully');
                  router.push('/login');
                } catch (error) {
                  console.error('Logout failed:', error);
                  toast.error('Logout failed');
                }
              }}
              className="flex items-center text-red-600 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
