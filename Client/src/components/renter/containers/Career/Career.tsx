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
  MapPin,
  Briefcase,
  Heart,
  TrendingUp,
  Award,
  Coffee,
  Sparkles,
  ChevronRight,
  Globe,
  Users,
  Star,
  Search,
  Bell,
  ArrowUpRight,
  Compass,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { JobPosition } from "@/types/job";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance and wellness programs for you and your family.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Clear career progression paths with mentorship and professional development opportunities.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Award,
    title: "Performance Rewards",
    description:
      "Competitive salary packages with performance bonuses and recognition programs.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description:
      "Flexible working arrangements and generous vacation policies to maintain balance.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const openPositions: JobPosition[] = [
  {
    id: 1,
    title: "Senior Customer Experience Manager",
    department: "Customer Service",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead our customer experience initiatives and ensure exceptional service delivery across all touchpoints. Drive customer satisfaction and loyalty through innovative service strategies.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "5+ years in customer service management",
      "Experience in luxury hospitality or automotive industry",
      "Excellent communication skills in English and Arabic",
      "Strong leadership and team management skills",
    ],
    urgent: true,
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Drive our digital marketing efforts across multiple channels. Develop and execute campaigns that enhance brand visibility and drive customer acquisition in the luxury rental market.",
    requirements: [
      "Bachelor's degree in Marketing or Digital Media",
      "3+ years in digital marketing",
      "Experience with Google Ads, Facebook Ads, and SEO",
      "Knowledge of luxury market dynamics",
      "Creative thinking and analytical skills",
    ],
    urgent: false,
  },
  {
    id: 3,
    title: "Fleet Operations Coordinator",
    department: "Operations",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Manage our premium vehicle fleet operations, ensuring optimal availability and maintenance standards. Coordinate with vendors and maintain the highest quality standards.",
    requirements: [
      "Bachelor's degree in Operations or Business",
      "2+ years in fleet or operations management",
      "Knowledge of automotive industry",
      "Strong organizational and problem-solving skills",
      "Valid UAE driving license",
    ],
    urgent: false,
  },
  {
    id: 4,
    title: "Luxury Property Specialist",
    department: "Property Management",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Source, evaluate, and onboard luxury properties to our platform. Build relationships with property owners and ensure our accommodation standards are maintained.",
    requirements: [
      "Bachelor's degree in Real Estate or Hospitality",
      "4+ years in luxury property management",
      "Strong network in Dubai real estate market",
      "Excellent negotiation and relationship building skills",
      "Fluency in English and Arabic preferred",
    ],
    urgent: true,
  },
];

const companyValues = [
  "Excellence in everything we do",
  "Customer-first mindset",
  "Innovation and continuous improvement",
  "Integrity and transparency",
  "Teamwork and collaboration",
  "Respect for diversity and inclusion",
];

const hiringProcess = [
  {
    step: "01",
    title: "Application",
    description: "Submit your application and resume online",
  },
  {
    step: "02",
    title: "Review",
    description: "Our team reviews your qualifications and experience",
  },
  {
    step: "03",
    title: "Interview",
    description: "Meet with our hiring team to discuss the role",
  },
  {
    step: "04",
    title: "Decision",
    description: "We'll make a decision and get back to you promptly",
  },
];

const CareersPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openPositionsRef = useRef<HTMLDivElement | null>(null);
  const cultureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToCulture = () => {
    cultureRef.current?.scrollIntoView({ behavior: "smooth" });
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
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&h=1080&fit=crop"
              alt="Modern office space"
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
                Join Our Team
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in-up">
              Build Your{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Career
              </span>{" "}
              with Ijara Hub
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Join a dynamic team that&apos;s redefining luxury rentals in the
              UAE. Grow your career while delivering exceptional experiences to
              our valued customers.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
              <Button
                size="lg"
                onClick={scrollToOpenPositions}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <Search className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                View Open Positions
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                onClick={scrollToCulture}
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl backdrop-blur-sm"
              >
                <Globe className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Learn About Culture
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-gradient-shift"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Why Join Us
              </span>
              <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Ijara Hub?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe in investing in our people and creating an environment
              where everyone can thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 bg-gradient-to-r ${benefit.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Values */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 animate-fade-in-up">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Our Values
              </CardTitle>
              <p className="text-gray-300">
                The principles that guide our work and shape our culture
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companyValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Enhanced Open Positions Section */}
      <section
        ref={openPositionsRef}
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Current Openings
              </span>
              <div className="w-12 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Open{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exciting opportunities to grow your career with us
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.length > 0 ? (
              openPositions?.map((position, index) => (
                <Card
                  key={position.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  // onMouseEnter={() => setHoveredPosition(position.id)}
                  // onMouseLeave={() => setHoveredPosition(null)}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {position.title}
                          </h3>
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                            {position.department}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-amber-500 text-amber-600 hover:bg-amber-50"
                          >
                            {position.type}
                          </Badge>
                          {position.urgent && (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 animate-pulse">
                              <Star className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
                            <MapPin className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">
                              {position.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
                            <Briefcase className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">
                              {position.experience}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                          {position.description}
                        </p>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Key Requirements:
                          </h4>
                          <ul className="space-y-1">
                            {position?.requirements
                              .slice(0, 3)
                              .map((req: string, reqIndex: number) => (
                                <li
                                  key={reqIndex}
                                  className="text-sm text-gray-600 flex items-start group-hover:text-gray-700 transition-colors"
                                >
                                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                          </ul>
                          {position.requirements.length > 3 && (
                            <p className="text-sm text-gray-500 mt-2 font-medium">
                              +{position.requirements.length - 3} more
                              requirements
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 lg:w-48">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/btn"
                        >
                          Apply Now
                          <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white border-0 shadow-2xl overflow-hidden relative animate-fade-in-up">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <CardContent className="p-12 text-center relative z-10">
                  <div className="flex items-center justify-center mb-6 animate-bounce">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Compass className="h-10 w-10 text-white animate-spin-slow" />
                      </div>
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-lg animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 mr-3 animate-pulse" />
                    <h3 className="text-3xl font-bold">
                      Currently No Openings Available
                    </h3>
                    <Sparkles className="h-6 w-6 ml-3 animate-pulse" />
                  </div>

                  <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                    We don&apos;t have any open positions right now, but
                    we&apos;re always excited to meet talented individuals. Our
                    team is growing rapidly, and new opportunities arise
                    frequently.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      size="lg"
                      className="bg-white text-amber-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group font-semibold px-8 py-4"
                    >
                      <Mail className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                      Send Your Resume
                      <ArrowUpRight className="h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-orange-600 hover:bg-white hover:text-amber-600 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
                    >
                      <Bell className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Get Job Alerts
                      <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* No Perfect Match Section */}
          {openPositions.length > 0 && (
            <Card className="mt-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-2xl animate-fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 mr-2 animate-pulse" />
                  <h3 className="text-xl font-semibold">
                    Don&apos;t see the perfect role?
                  </h3>
                  <Sparkles className="h-6 w-6 ml-2 animate-pulse" />
                </div>
                <p className="mb-6 text-white/90 leading-relaxed">
                  We&apos;re always looking for talented individuals to join our
                  team. Send us your resume and we&apos;ll keep you in mind for
                  future opportunities.
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    window.location.href =
                      "mailto:abc@gmail.com?subject=Resume%20Submission&body=Hi%20Team,%0D%0A%0D%0APlease%20find%20my%20resume%20attached.";
                  }}
                  className="bg-white text-amber-600 hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group font-semibold"
                >
                  <Users className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Send Your Resume
                  <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      {/* Enhanced Hiring Process Section */}
      <section
        ref={cultureRef}
        className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 animate-gradient-shift"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                How It Works
              </span>
              <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Hiring{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We&apos;ve designed a straightforward process to help us get to
              know you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {hiringProcess.map((process, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {process.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {process.description}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12 animate-fade-in-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
            >
              <Search className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
              Start Your Application
              <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div> */}
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

        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
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

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
