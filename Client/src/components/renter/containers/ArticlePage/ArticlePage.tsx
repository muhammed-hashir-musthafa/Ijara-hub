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
import { Input } from "@/components/base/ui/input";
import {
  Search,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  Building,
  Car,
  Home,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Share2,
  Bookmark,
  Eye,
  ArrowUp,
  Bell,
  MapPin,
  DollarSign,
  Shield,
  ThumbsUp,
  User,
  Heart,
  BookOpen,
  Newspaper,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// SEO-focused categories for rental business
const contentCategories = [
  {
    id: "all",
    name: "All Content",
    count: 89,
    icon: Globe,
    gradient: "from-gray-500 to-gray-600",
    seoKeywords: [
      "dubai rentals",
      "uae rental services",
      "luxury rentals dubai",
    ],
  },
  {
    id: "luxury-cars",
    name: "Luxury Car Rentals",
    count: 24,
    icon: Car,
    gradient: "from-red-500 to-orange-500",
    seoKeywords: [
      "luxury car rental dubai",
      "supercar rental uae",
      "exotic car hire dubai",
    ],
  },
  {
    id: "properties",
    name: "Property Rentals",
    count: 18,
    icon: Home,
    gradient: "from-blue-500 to-cyan-500",
    seoKeywords: [
      "luxury apartment rental dubai",
      "villa rental uae",
      "short term rental dubai",
    ],
  },
  {
    id: "travel-guides",
    name: "Dubai Travel Guides",
    count: 15,
    icon: MapPin,
    gradient: "from-purple-500 to-pink-500",
    seoKeywords: [
      "dubai travel guide",
      "things to do dubai",
      "dubai tourist attractions",
    ],
  },
  {
    id: "rental-tips",
    name: "Rental Tips & Advice",
    count: 12,
    icon: BookOpen,
    gradient: "from-green-500 to-teal-500",
    seoKeywords: [
      "car rental tips dubai",
      "property rental guide",
      "dubai rental advice",
    ],
  },
  {
    id: "company-news",
    name: "Company Updates",
    count: 20,
    icon: Building,
    gradient: "from-indigo-500 to-purple-500",
    seoKeywords: [
      "uae rentals news",
      "dubai rental company updates",
      "rental industry news",
    ],
  },
];

// Breaking news with rental focus
const breakingNews = [
  {
    id: 1,
    title: "New Lamborghini Urus and Rolls-Royce Cullinan Added to Dubai Fleet",
    timestamp: "1 hour ago",
    urgent: true,
    category: "luxury-cars",
  },
  {
    id: 2,
    title:
      "50% Discount on Weekly Villa Rentals in Palm Jumeirah - Limited Time",
    timestamp: "3 hours ago",
    urgent: true,
    category: "properties",
  },
  {
    id: 3,
    title:
      "Dubai Summer 2025: Best Deals on Luxury Car Rentals During Off-Season",
    timestamp: "5 hours ago",
    urgent: false,
    category: "rental-tips",
  },
];

// SEO-optimized featured content
const featuredContent = {
  id: 1,
  title:
    "Complete Guide to Luxury Car Rental in Dubai 2025: Prices, Requirements & Best Deals",
  excerpt:
    "Everything you need to know about renting luxury cars in Dubai - from Lamborghini to Ferrari. Compare prices, understand requirements, and find the best deals for supercars, sports cars, and exotic vehicles in UAE.",
  image:
    "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
  category: "Luxury Car Rentals",
  categoryId: "luxury-cars",
  author: "Ahmed Al-Rashid",
  date: "2024-12-15",
  readTime: "12 min read",
  views: "15.2K",
  likes: 892,
  type: "blog",
  gradient: "from-red-500 to-orange-600",
  featured: true,
  seoScore: 98,
  keywords: [
    "luxury car rental dubai",
    "supercar rental prices",
    "dubai car hire",
    "ferrari rental dubai",
    "lamborghini rental uae",
  ],
};

// SEO-focused content with rental keywords
const allContent = [
  // Luxury Car Rental Content
  {
    id: 2,
    title:
      "Ferrari 488 GTB Rental Dubai: Experience, Price & Booking Guide 2025",
    excerpt:
      "Rent a Ferrari 488 GTB in Dubai from AED 2,500/day. Complete guide covering rental requirements, insurance, best routes to drive, and exclusive booking deals.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    category: "Luxury Car Rentals",
    categoryId: "luxury-cars",
    author: "Sarah Ahmed",
    date: "2024-12-12",
    readTime: "8 min read",
    views: "12.3K",
    likes: 567,
    type: "blog",
    gradient: "from-red-500 to-orange-500",
    priority: "high",
    seoScore: 95,
    keywords: [
      "ferrari rental dubai",
      "ferrari 488 price",
      "sports car rental uae",
    ],
  },
  {
    id: 3,
    title:
      "Lamborghini Huracan vs Aventador Rental: Which Supercar to Choose in Dubai?",
    excerpt:
      "Compare Lamborghini Huracan and Aventador rentals in Dubai. Detailed analysis of performance, comfort, rental costs, and which model suits your Dubai adventure best.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    category: "Luxury Car Rentals",
    categoryId: "luxury-cars",
    author: "Omar Khalil",
    date: "2024-12-10",
    readTime: "10 min read",
    views: "9.7K",
    likes: 423,
    type: "blog",
    gradient: "from-orange-500 to-red-500",
    priority: "high",
    seoScore: 92,
    keywords: [
      "lamborghini rental dubai",
      "huracan vs aventador",
      "supercar comparison dubai",
    ],
  },

  // Property Rental Content
  {
    id: 4,
    title:
      "Luxury Apartment Rental Dubai Marina: Best Buildings, Prices & Amenities 2025",
    excerpt:
      "Discover the top luxury apartments for rent in Dubai Marina. Compare prices, amenities, and book premium short-term rentals with stunning views and world-class facilities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    category: "Property Rentals",
    categoryId: "properties",
    author: "Fatima Al-Zahra",
    date: "2024-12-08",
    readTime: "15 min read",
    views: "18.5K",
    likes: 734,
    type: "blog",
    gradient: "from-blue-500 to-cyan-500",
    priority: "high",
    seoScore: 94,
    keywords: [
      "apartment rental dubai marina",
      "luxury apartment dubai",
      "short term rental marina",
    ],
  },
  {
    id: 5,
    title:
      "Palm Jumeirah Villa Rental: Ultimate Guide to Luxury Beachfront Properties",
    excerpt:
      "Rent exclusive villas on Palm Jumeirah with private beaches, pools, and premium amenities. Complete guide to pricing, booking process, and what to expect.",
    image:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=600&h=400&fit=crop",
    category: "Property Rentals",
    categoryId: "properties",
    author: "Layla Mohammed",
    date: "2024-12-06",
    readTime: "12 min read",
    views: "14.2K",
    likes: 612,
    type: "blog",
    gradient: "from-cyan-500 to-blue-500",
    priority: "high",
    seoScore: 96,
    keywords: [
      "palm jumeirah villa rental",
      "beachfront villa dubai",
      "luxury villa uae",
    ],
  },

  // Travel Guide Content
  {
    id: 6,
    title:
      "Best Instagram Spots in Dubai: Photography Guide with Luxury Car Rentals",
    excerpt:
      "Discover Dubai's most photogenic locations perfect for luxury car photoshoots. Complete guide with rental recommendations and tips for stunning social media content.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    category: "Dubai Travel Guides",
    categoryId: "travel-guides",
    author: "Rashid Abdullah",
    date: "2024-12-04",
    readTime: "9 min read",
    views: "8.9K",
    likes: 445,
    type: "blog",
    gradient: "from-purple-500 to-pink-500",
    priority: "medium",
    seoScore: 88,
    keywords: [
      "dubai instagram spots",
      "car photoshoot locations",
      "dubai photography guide",
    ],
  },
  {
    id: 7,
    title:
      "Dubai Desert Safari with Luxury Car Rental: Ultimate Adventure Guide 2025",
    excerpt:
      "Combine luxury car rental with desert safari experiences. Best routes, recommended vehicles, safety tips, and exclusive packages for an unforgettable Dubai adventure.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    category: "Dubai Travel Guides",
    categoryId: "travel-guides",
    author: "Khalid Hassan",
    date: "2024-12-02",
    readTime: "11 min read",
    views: "6.8K",
    likes: 298,
    type: "blog",
    gradient: "from-pink-500 to-purple-500",
    priority: "medium",
    seoScore: 85,
    keywords: [
      "dubai desert safari",
      "luxury car desert",
      "dubai adventure guide",
    ],
  },

  // Rental Tips Content
  {
    id: 8,
    title:
      "Dubai Car Rental Requirements 2025: Documents, Insurance & Age Limits",
    excerpt:
      "Complete guide to car rental requirements in Dubai and UAE. Essential documents, insurance options, age restrictions, and tips for international visitors.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    category: "Rental Tips & Advice",
    categoryId: "rental-tips",
    author: "Amina Qureshi",
    date: "2024-11-30",
    readTime: "7 min read",
    views: "22.1K",
    likes: 1023,
    type: "blog",
    gradient: "from-green-500 to-teal-500",
    priority: "high",
    seoScore: 97,
    keywords: [
      "dubai car rental requirements",
      "uae driving license",
      "car rental documents dubai",
    ],
  },
  {
    id: 9,
    title:
      "How to Get Best Car Rental Deals in Dubai: Insider Tips & Booking Strategies",
    excerpt:
      "Expert tips to save money on car rentals in Dubai. Best booking times, comparison strategies, hidden fees to avoid, and exclusive discount opportunities.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    category: "Rental Tips & Advice",
    categoryId: "rental-tips",
    author: "Youssef Mansour",
    date: "2024-11-28",
    readTime: "6 min read",
    views: "19.4K",
    likes: 876,
    type: "blog",
    gradient: "from-teal-500 to-green-500",
    priority: "high",
    seoScore: 93,
    keywords: [
      "car rental deals dubai",
      "cheap car rental uae",
      "dubai rental discounts",
    ],
  },

  // Company News Content
  {
    id: 10,
    title:
      "UAE Rentals Wins 'Best Luxury Rental Platform 2024' - Dubai Business Excellence Awards",
    excerpt:
      "UAE Rentals honored with prestigious award recognizing outstanding service in luxury car and property rentals across Dubai and UAE market.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    category: "Company Updates",
    categoryId: "company-news",
    author: "Press Team",
    date: "2024-12-14",
    readTime: "4 min read",
    views: "5.2K",
    likes: 234,
    type: "news",
    gradient: "from-amber-500 to-orange-600",
    priority: "high",
    seoScore: 82,
    keywords: [
      "uae rentals award",
      "best rental company dubai",
      "luxury rental platform",
    ],
  },
  {
    id: 11,
    title:
      "New Partnership: UAE Rentals Teams with Emaar for Exclusive Property Access",
    excerpt:
      "Strategic partnership provides UAE Rentals customers exclusive access to premium properties in Downtown Dubai, Dubai Marina, and Arabian Ranches developments.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    category: "Company Updates",
    categoryId: "company-news",
    author: "Business Development Team",
    date: "2024-12-11",
    readTime: "5 min read",
    views: "7.8K",
    likes: 345,
    type: "news",
    gradient: "from-indigo-500 to-purple-500",
    priority: "medium",
    seoScore: 79,
    keywords: [
      "emaar partnership",
      "exclusive property rental",
      "dubai real estate rental",
    ],
  },
];

// SEO-focused trending topics
const trendingTopics = [
  { name: "Luxury Car Rental Dubai", posts: 24, searches: "45K/month" },
  { name: "Ferrari Rental UAE", posts: 18, searches: "12K/month" },
  { name: "Villa Rental Dubai", posts: 15, searches: "38K/month" },
  { name: "Lamborghini Hire Dubai", posts: 12, searches: "8K/month" },
  { name: "Apartment Rental Marina", posts: 20, searches: "28K/month" },
  { name: "Supercar Rental UAE", posts: 16, searches: "15K/month" },
];

// SEO performance metrics
const seoMetrics = [
  { label: "Organic Traffic", value: "125K", change: "+34%", icon: TrendingUp },
  { label: "Keyword Rankings", value: "2,456", change: "+18%", icon: Search },
  { label: "Conversion Rate", value: "8.9%", change: "+12%", icon: DollarSign },
  { label: "Page Authority", value: "87/100", change: "+5pts", icon: Shield },
];

const BlogNewsHub = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [contentType, setContentType] = useState<"all" | "blog" | "news">(
    "all"
  );
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredContent = allContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      activeCategory === "all" || item.categoryId === activeCategory;
    const matchesType = contentType === "all" || item.type === contentType;
    const matchesPriority =
      !selectedPriority || item.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesType && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-white ">
      {/* SEO Meta Information - Hidden but important for search engines */}
      <div style={{ display: "none" }}>
        <h1>Dubai Luxury Car Rental & Property Rental Blog - UAE Rentals</h1>
        <meta
          name="description"
          content="Expert guides on luxury car rental Dubai, property rental UAE, and travel tips. Latest news, deals, and insider advice for premium rentals in Dubai and UAE."
        />
        <meta
          name="keywords"
          content="dubai car rental, luxury car rental dubai, villa rental uae, apartment rental dubai, ferrari rental, lamborghini hire dubai"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "UAE Rentals Blog & News",
            description:
              "Latest news and guides about luxury car rentals and property rentals in Dubai and UAE",
            url: "https://uaerentals.com/blog-news",
            publisher: {
              "@type": "Organization",
              name: "UAE Rentals",
            },
          })}
        </script>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 via-red-900 to-amber-900 animate-gradient-shift" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Rental-themed floating elements */}
          <div className="absolute top-20 left-10 w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center animate-float-slow">
            <Car className="h-5 w-5 text-red-400" />
          </div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-float-fast">
            <Home className="h-4 w-4 text-blue-400" />
          </div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center animate-float-slow">
            <MapPin className="h-6 w-6 text-amber-400" />
          </div>
          <div className="absolute top-60 right-40 w-6 h-6 bg-white/25 rounded-lg flex items-center justify-center animate-float-fast">
            <Star className="h-3 w-3 text-yellow-400" />
          </div>
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto py-24 sm:py-32">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-amber-400 mr-3 animate-pulse" />
              <Badge className="bg-gradient-to-r from-red-500 to-amber-600 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                Rental Insights Hub
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              Dubai Rental{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Guide
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
              Your ultimate source for luxury car rentals, premium property
              rentals, and expert travel guides in Dubai and UAE
            </p>

            {/* Breaking News Ticker */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 animate-fade-in-up animation-delay-500">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-red-400 mr-2 animate-pulse" />
                <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                  Latest Updates
                </span>
              </div>
              <div className="space-y-2">
                {breakingNews.map((news) => (
                  <div
                    key={news.id}
                    className={`flex items-center justify-between text-left p-2 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-pointer ${
                      news.urgent
                        ? "bg-red-500/10 border-l-4 border-red-400"
                        : "bg-white/5"
                    }`}
                  >
                    <span className="text-white text-sm flex-1">
                      {news.title}
                    </span>
                    <span className="text-white/60 text-xs ml-4">
                      {news.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search car rentals, properties, Dubai guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg bg-white/95 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                onClick={scrollToContent}
                className="bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <BookOpen className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Explore Rental Guides
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Metrics Dashboard */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Dubai&apos;s #1 Rental{" "}
              <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                Content Hub
              </span>
            </h2>
            <p className="text-gray-600">
              Trusted by thousands for rental decisions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seoMetrics.map((metric, index) => (
              <Card
                key={index}
                className="text-center p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {metric.label}
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500 text-xs font-semibold">
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                Rental Guide
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Most comprehensive rental guide for Dubai visitors
            </p>
          </div>

          <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <Image
                  width={800}
                  height={600}
                  src={featuredContent.image}
                  alt={featuredContent.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge
                    className={`bg-gradient-to-r ${featuredContent.gradient} text-white px-3 py-1 text-sm font-semibold`}
                  >
                    Featured Guide
                  </Badge>
                  <Badge className="bg-green-500 text-white px-3 py-1 text-sm">
                    SEO: {featuredContent.seoScore}%
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">
                      {featuredContent.views}
                    </span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">
                      {featuredContent.likes}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge
                    className={`bg-gradient-to-r ${featuredContent.gradient} text-white`}
                  >
                    {featuredContent.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(featuredContent.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredContent.readTime}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                  {featuredContent.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredContent.excerpt}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Top Keywords:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredContent.keywords
                      .slice(0, 3)
                      .map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button className="bg-gradient-to-r from-red-500 to-amber-600 text-white rounded-lg group/btn">
                    Read Complete Guide
                    <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="p-2">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories and Filters */}
      <section
        ref={contentRef}
        className="py-12 bg-gray-50 border-b border-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            {/* Content Type Toggle */}
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-2 shadow-md w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-2 sm:space-y-0 w-full">
                  {/* All Content */}
                  <Button
                    variant={contentType === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setContentType("all")}
                    className={`w-full sm:w-auto rounded-lg transition-all duration-300 ${
                      contentType === "all"
                        ? "bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    All Content
                  </Button>

                  {/* Guides & Tips */}
                  <Button
                    variant={contentType === "blog" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setContentType("blog")}
                    className={`w-full sm:w-auto rounded-lg transition-all duration-300 ${
                      contentType === "blog"
                        ? "bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Guides & Tips
                  </Button>

                  {/* News & Updates */}
                  <Button
                    variant={contentType === "news" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setContentType("news")}
                    className={`w-full sm:w-auto rounded-lg transition-all duration-300 ${
                      contentType === "news"
                        ? "bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Newspaper className="h-4 w-4 mr-2" />
                    News & Updates
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-3">
                {contentCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.gradient} text-white border-0 shadow-lg`
                        : "hover:shadow-md"
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                    <Badge
                      className="ml-2 text-xs"
                      variant={
                        activeCategory === category.id ? "secondary" : "outline"
                      }
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedPriority || ""}
                  onChange={(e) => setSelectedPriority(e.target.value || null)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Content</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredContent.map((item, index) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        width={600}
                        height={400}
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <Badge
                          className={`bg-gradient-to-r ${item.gradient} text-white text-xs`}
                        >
                          {item.category}
                        </Badge>
                        {item.type === "news" && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            NEWS
                          </Badge>
                        )}
                        {item.priority === "high" && (
                          <Badge className="bg-red-500 text-white text-xs">
                            HOT
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white rounded-lg px-2 py-1 text-xs font-semibold">
                          SEO: {item.seoScore}%
                        </div>
                      </div>
                      {/* <div className="absolute bottom-4 right-4 flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm border-0 p-2"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm border-0 p-2"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div> */}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.slice(0, 3).map((keyword, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-amber-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {item.author}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {item.likes}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredContent.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No content found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or category filter
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {/* {filteredContent.length > 0 && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Load More Content
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              )} */}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Trending Rental Topics */}
              <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
                    Trending Rental Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
                      >
                        <div>
                          <span className="font-medium text-gray-900 group-hover:text-red-600 block">
                            {topic.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {topic.searches} searches
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {topic.posts}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* SEO Newsletter */}
              <Card className="overflow-hidden bg-gradient-to-r from-red-500 to-amber-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Rental Deals Alert</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Get exclusive rental deals, new car arrivals, and property
                    discounts delivered to your inbox
                  </p>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-3 bg-white/10 border-white/20 text-white placeholder-white/70"
                  />
                  <Button className="w-full bg-white text-red-600 hover:bg-gray-100 font-semibold">
                    Get Rental Deals
                  </Button>
                  <p className="mt-3 text-white/80 text-xs">
                    Join 25,000+ rental enthusiasts
                  </p>
                </CardContent>
              </Card>

              {/* Popular Rental Keywords */}
              <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Searches</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Ferrari Rental",
                      "Lamborghini Hire",
                      "Villa Rental Dubai",
                      "Luxury Cars UAE",
                      "Apartment Marina",
                      "Supercar Dubai",
                      "Property Rental",
                      "Car Hire Dubai",
                      "Exotic Cars",
                      "Dubai Rentals",
                    ].map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Rental Links */}
              <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Rental Access</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <Link href="/cars" passHref>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start hover:bg-amber-50 hover:border-amber-200 hover:text-amber-500"
                      >
                        <span>
                          <Car className="h-4 w-4 mr-3" />
                          Browse Luxury Cars
                        </span>
                      </Button>
                    </Link>

                    <Link href="/rooms" passHref>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full mt-2 justify-start hover:bg-amber-50 hover:border-amber-200  hover:text-amber-500"
                      >
                        <span>
                          <Home className="h-4 w-4 mr-3" />
                          View Luxury Rooms
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-red-900 to-amber-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Car className="h-8 w-8 text-red-400 mr-3 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to Rent?
              </h2>
              <Home className="h-8 w-8 text-blue-400 ml-3 animate-pulse" />
            </div>

            <p className="text-xl text-white/90 mb-8">
              From luxury supercars to premium properties - find your perfect
              rental in Dubai
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/cars" passHref>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
                >
                  <span>
                    <Car className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Rent Luxury Cars
                  </span>
                </Button>
              </Link>
              <Link href="/rooms" passHref>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
                >
                  <span>
                    <Home className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Rent Luxury Rooms
                  </span>
                </Button>
              </Link>
              <Link href="tel:+97141234567" passHref>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group px-8 py-4 backdrop-blur-sm"
                >
                  <span>
                    <Phone className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Call +971 4 123 4567
                  </span>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Luxury Cars</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">1000+</div>
                <div className="text-white/80 text-sm">Premium Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

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

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogNewsHub;
