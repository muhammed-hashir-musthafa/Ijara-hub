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
  Shield,
  Eye,
  Database,
  Users,
  Cookie,
  Sparkles,
  ChevronRight,
  Globe,
  FileText,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const privacySections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    content:
      "We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes personal details, contact information, and preferences to enhance your experience.",
  },
  {
    id: "information-usage",
    title: "How We Use Your Information",
    icon: Eye,
    gradient: "from-green-500 to-emerald-500",
    content:
      "Your information helps us provide and maintain our rental platform services, process transactions, send related communications, provide technical support, and communicate about our products and services.",
    list: [
      "To provide and maintain our rental platform services",
      "To process transactions and send related information",
      "To send you technical notices and support messages",
      "To communicate with you about products, services, and events",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    content:
      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. Your privacy is our priority and we maintain strict confidentiality standards.",
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
    content:
      "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our systems use industry-standard encryption and security protocols.",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: CheckCircle,
    gradient: "from-indigo-500 to-purple-500",
    content:
      "You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us and control how your data is processed.",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Cookie,
    gradient: "from-amber-500 to-orange-500",
    content:
      "We use cookies and similar technologies to enhance your experience on our platform, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings.",
  },
];

const PrivacyPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const privacyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPrivacy = () => {
    privacyRef.current?.scrollIntoView({ behavior: "smooth" });
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
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1920&h=1080&fit=crop"
              alt="Privacy and security"
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
                Privacy Policy
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in-up">
              Your{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Privacy
              </span>{" "}
              Matters
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              We are committed to protecting your personal information and being
              transparent about how we collect, use, and safeguard your data.
            </p>

            <div className="mt-8 flex items-center justify-center animate-fade-in-up animation-delay-500">
              <p className="text-white/80 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                onClick={scrollToPrivacy}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <FileText className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Read Policy
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
        ref={privacyRef}
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
                Privacy Details
              </span>
              <div className="w-12 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding how we protect and handle your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {privacySections.map((section, index) => (
              <Card
                key={section.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
              >
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-500/5 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500"></div>
                  <div className="relative flex items-start space-x-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${section.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                        {section.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Click to expand</span>
                        <ChevronRight
                          className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                            activeSection === section.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className={`px-6 transition-all duration-500 overflow-hidden ${
                    activeSection === section.id
                      ? "pb-6 opacity-100"
                      : "pb-0 h-0 opacity-0"
                  }`}
                >
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600 flex items-start"
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold">Questions About Privacy?</h3>
                <Shield className="h-8 w-8 ml-3 animate-pulse" />
              </div>
              <p className="mb-6 text-white/90 leading-relaxed text-lg">
                If you have any questions about this Privacy Policy, please
                don&apos;t hesitate to contact us. We&apos;re here to help and
                ensure your privacy concerns are addressed.
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
                  Contact Privacy Team
                  <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-amber-500 hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105 group px-6 py-3 backdrop-blur-sm"
                >
                  <FileText className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Download PDF
                </Button>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                Email us at: privacy@uaerentals.com
              </p>
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

export default PrivacyPage;
