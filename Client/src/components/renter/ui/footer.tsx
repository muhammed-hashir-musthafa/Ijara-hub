"use client";

import React from "react";
import { Button } from "@/components/base/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    rentals: [
      { name: "Luxury Rooms", href: "/rooms?category=luxury" },
      { name: "Budget Rooms", href: "/rooms?category=budget" },
      { name: "Premium Cars", href: "/cars?category=premium" },
      { name: "Economy Cars", href: "/cars?category=economy" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/articles" },
      { name: "News", href: "/articles" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-700",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "Dubai, United Arab Emirates",
      color: "text-red-500",
    },
    { icon: Phone, text: "+971 4 123 4567", color: "text-green-500" },
    { icon: Mail, text: "info@uaerentals.com", color: "text-blue-500" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5 animate-gradient-shift"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <span className="relative text-lg font-bold">UR</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  UAE Rentals
                </span>
                <span className="text-xs text-amber-400 font-medium -mt-1">
                  Premium Luxury
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for luxury room and car rentals across the
              UAE. Experience premium service and unmatched quality with our
              curated collection.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`p-2 rounded-lg bg-white/10 ${info.color} group-hover:scale-110 transition-transform`}
                  >
                    <info.icon className="h-4 w-4" />
                  </div>
                  <span className="group-hover:text-amber-400 transition-colors">
                    {info.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-300">Verified</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Award className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-gray-300">Premium</span>
              </div>
            </div>
          </div>

          {/* Enhanced Link Sections */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <div
                key={category}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(categoryIndex + 1) * 0.2}s` }}
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3"></div>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-amber-400 transition-all duration-300 flex items-center group text-sm"
                      >
                        <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 UAE Rentals. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">♥</span>
                <span>in Dubai</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20 group animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl border border-white/20 backdrop-blur-sm text-center animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest deals and exclusive offers directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 group whitespace-nowrap">
                Subscribe
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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

        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
}
