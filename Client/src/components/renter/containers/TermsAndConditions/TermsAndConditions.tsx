"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Badge } from "@/components/base/ui/badge";
import {
  ArrowLeft,
  FileText,
  Scale,
  Shield,
  CreditCard,
  Users,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Globe,
  CheckCircle,
  Info,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const termsSections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
    content:
      "By accessing and using UAE Rentals platform, you accept and agree to be bound by the terms and provision of this agreement. These terms constitute a legally binding agreement between you and UAE Rentals.",
    important: true,
  },
  {
    id: "license",
    title: "Use License",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    content:
      "Permission is granted to temporarily use UAE Rentals for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    details: [
      "Personal and non-commercial use only",
      "Temporary access to platform services",
      "No transfer of ownership or rights",
      "Subject to compliance with these terms",
    ],
  },
  {
    id: "rental-services",
    title: "Rental Services",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    content:
      "UAE Rentals provides a platform for connecting property owners and vehicle owners with potential renters. We facilitate bookings but are not responsible for the actual rental agreements between parties.",
    details: [
      "Platform facilitation service only",
      "Connection between owners and renters",
      "Booking and payment processing",
      "Quality assurance and verification",
    ],
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    icon: AlertTriangle,
    gradient: "from-orange-500 to-red-500",
    content:
      "As a user of our platform, you agree to certain responsibilities and commitments to ensure a safe and positive experience for all users.",
    details: [
      "Provide accurate and truthful information",
      "Comply with all applicable laws and regulations",
      "Respect the rights of other users and property owners",
      "Use the platform only for legitimate rental purposes",
      "Maintain confidentiality of account credentials",
      "Report any suspicious or inappropriate activity",
    ],
    important: true,
  },
  {
    id: "payment-terms",
    title: "Payment Terms",
    icon: CreditCard,
    gradient: "from-amber-500 to-orange-500",
    content:
      "All payments are processed securely through our platform. Service fees and cancellation policies vary by listing and will be clearly displayed before booking confirmation.",
    details: [
      "Secure payment processing",
      "Clear fee structure and pricing",
      "Transparent cancellation policies",
      "Refund terms and conditions",
    ],
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: Info,
    gradient: "from-indigo-500 to-purple-500",
    content:
      "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices regarding data collection and usage.",
  },
];

export const TermsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const termsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTerms = () => {
    termsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              width={1920}
              height={1080}
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop"
              alt="Legal documents and scales"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-float-slow"></div>
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-amber-400 mr-3 animate-pulse" />
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                Terms & Conditions
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in-up">
              Terms and{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Please read these terms carefully before using our services. These
              terms govern your use of UAE Rentals platform and services.
            </p>

            <div className="mt-8 flex items-center justify-center animate-fade-in-up animation-delay-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <p className="text-white/80 text-sm flex items-center">
                  <Scale className="h-4 w-4 mr-2" />
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                onClick={scrollToTerms}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <FileText className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Read Terms
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl backdrop-blur-sm"
                >
                  <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <section
        ref={termsRef}
        className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Legal Agreement
              </span>
              <div className="w-12 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms and{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Conditions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding your rights and responsibilities when using UAE
              Rentals
            </p>
          </div>

          <div className="space-y-6">
            {termsSections.map((section, index) => (
              <Card
                key={section.id}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up cursor-pointer ${
                  section.important ? "ring-2 ring-amber-200" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
              >
                <CardHeader className="relative">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      section.important
                        ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10"
                        : "bg-gradient-to-r from-gray-500/5 to-gray-500/5 group-hover:from-amber-500/5 group-hover:to-orange-500/5"
                    }`}
                  ></div>
                  <div className="relative flex items-start space-x-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${section.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors flex items-center">
                          {index + 1}. {section.title}
                          {section.important && (
                            <Badge className="ml-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs animate-pulse">
                              Important
                            </Badge>
                          )}
                        </CardTitle>
                        <ChevronRight
                          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                            activeSection === section.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <span>Click to expand details</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className={`px-6 transition-all duration-500 overflow-hidden ${
                    activeSection === section.id
                      ? "pb-8 opacity-100"
                      : "pb-0 h-0 opacity-0"
                  }`}
                >
                  <div className="prose prose-gray max-w-none pl-14">
                    <p className="text-gray-600 leading-relaxed mb-4 text-base">
                      {section.content}
                    </p>
                    {section.details && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Key Points:
                        </h4>
                        <ul className="space-y-2">
                          {section.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="text-gray-600 flex items-start text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold">
                  Need Legal Clarification?
                </h3>
                <Phone className="h-8 w-8 ml-3 animate-pulse" />
              </div>
              <p className="mb-6 text-white/90 leading-relaxed text-lg">
                If you have any questions about these Terms and Conditions,
                please contact our legal team. We&apos;re committed to
                transparency and clarity in all our agreements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    (window.location.href = "mailto:contact@ijarahub.com")
                  }
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group font-semibold px-6 py-3"
                >
                  <Globe className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Contact Legal Team
                  <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-amber-500 hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105 group px-6 py-3 backdrop-blur-sm"
                >
                  <FileText className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Download Terms
                </Button>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                Email us at: legal@uaerentals.com
              </p>
            </CardContent>
          </Card>

          {/* Agreement Notice */}
          <Card className="mt-8 border-2 border-amber-200 bg-amber-50 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">
                    Important Notice
                  </h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    By using UAE Rentals services, you acknowledge that you have
                    read, understood, and agree to be bound by these Terms and
                    Conditions. These terms may be updated periodically, and
                    continued use constitutes acceptance of any changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slow-zoom {
          0%,
          100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
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

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default TermsPage;
