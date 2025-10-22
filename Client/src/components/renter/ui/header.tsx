"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/base/ui/button";
import {
  Car,
  Home,
  Phone,
  Briefcase,
  Info,
  ChevronRight,
  Sparkles,
  LogOut,
  MessageSquare,
  User,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/services/authService";
import { getConversations } from "@/services/messageService";
import { User as UserType } from "@/types/auth";
import { Conversation } from "@/types/message";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    toast.success('Logged out successfully');
  };

  const fetchUser = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const [userResponse, conversationsResponse] = await Promise.all([
          getProfile(),
          getConversations()
        ]);
        
        setUser(userResponse.data.user);
        
        // Calculate unread conversations count
        const conversations = conversationsResponse?.data?.conversations || [];
        const userId = userResponse.data.user._id;
        
        if (userId) {
          const unreadConversations = conversations.filter((conv: Conversation) => {
            const userUnreadCount = conv.unreadCount instanceof Map 
              ? conv.unreadCount.get(userId) || 0
              : (conv.unreadCount as Record<string, number>)?.[userId] || 0;
            return userUnreadCount > 0;
          });
          setUnreadCount(unreadConversations.length);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
  }, [isAuthenticated]);

  const getInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Rooms", href: "/rooms", icon: Home },
    { name: "Cars", href: "/cars", icon: Car },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Careers", href: "/careers", icon: Briefcase },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.avatar-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative text-lg font-bold">UR</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300">
                Ijara Hub
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                Drive it. Live it. Love it.{" "}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon
                    className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-amber-600" : "text-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>

                  {/* underline animation */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative avatar-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-amber-50 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={`${user.fname} ${user.lname}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {user ? getInitials(user.fname, user.lname) : 'U'}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Messages</span>
                      {unreadCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl px-6 group"
                  >
                    <span>Login</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/renter/signup" passHref>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl px-6"
                  >
                    Sign Up
                  </Button>
                </Link>

                <Link href="/owner/signup" passHref>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6 group">
                    <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    List Property
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden relative p-3 rounded-xl hover:bg-amber-50 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 top-3" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "top-3"
                }`}
              ></span>
              <span
                className={`absolute block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 top-3" : "top-5"
                }`}
              ></span>
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-6 space-y-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 mt-4">
            {navigation.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon
                    className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                      isActive ? "text-amber-600" : "text-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>
                  <ChevronRight
                    className={`h-4 w-4 ml-auto transition-transform ${
                      isActive ? "text-amber-600" : "text-gray-400"
                    } group-hover:translate-x-1`}
                  />
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl justify-center group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/messages">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl justify-center group relative"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-2 border-red-300 text-red-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 rounded-xl justify-center group"
                  >
                    <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl justify-center group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Link href="/renter/signup">
                    <Button
                      variant="ghost"
                      className="w-full text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 rounded-xl justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  
                  <Link href="/owner/signup">
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl justify-center group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      List Property
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
