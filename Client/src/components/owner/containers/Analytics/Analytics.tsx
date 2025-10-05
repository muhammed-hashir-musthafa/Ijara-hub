"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import { Button } from "@/components/base/ui/button";
import { Badge } from "@/components/base/ui/badge";
import {
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  Users,
  Home,
  Car,
  MapPin,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Target,
  Award,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Zap,
  Crown,
  Globe,
} from "lucide-react";
import { MetricCardProps } from "@/types/owner";
import Image from "next/image";

// Mock data
const mockRevenueData = [
  { month: "Jan", revenue: 12500, bookings: 15 },
  { month: "Feb", revenue: 18200, bookings: 22 },
  { month: "Mar", revenue: 15800, bookings: 19 },
  { month: "Apr", revenue: 22100, bookings: 28 },
  { month: "May", revenue: 19500, bookings: 24 },
  { month: "Jun", revenue: 25300, bookings: 31 },
  { month: "Jul", revenue: 28900, bookings: 35 },
  { month: "Aug", revenue: 26700, bookings: 33 },
  { month: "Sep", revenue: 23400, bookings: 29 },
  { month: "Oct", revenue: 27800, bookings: 34 },
  { month: "Nov", revenue: 31200, bookings: 38 },
  { month: "Dec", revenue: 29600, bookings: 36 },
];

const mockOccupancyData = [
  { name: "Occupied", value: 22, color: "#10b981", percentage: 73 },
  { name: "Available", value: 6, color: "#6b7280", percentage: 20 },
  { name: "Maintenance", value: 2, color: "#ef4444", percentage: 7 },
];

const mockMetrics = {
  totalRevenue: { value: 285600, change: 12.5 },
  totalBookings: { value: 344, change: 8.3 },
  averageRating: { value: 4.7, change: 2.1 },
  occupancyRate: { value: 73, change: -3.2 },
};

const mockPropertyPerformance = [
  {
    id: "1",
    name: "Luxury Suite - Dubai Marina",
    type: "room" as const,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
    revenue: 85600,
    bookings: 98,
    rating: 4.9,
    occupancyRate: 87,
    revenueChange: 15.2,
    bookingsChange: 12.8,
  },
  {
    id: "2",
    name: "BMW X5 - Premium SUV",
    type: "car" as const,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
    revenue: 67200,
    bookings: 124,
    rating: 4.8,
    occupancyRate: 76,
    revenueChange: 8.7,
    bookingsChange: 5.3,
  },
  {
    id: "3",
    name: "Penthouse - Business Bay",
    type: "room" as const,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
    revenue: 132800,
    bookings: 67,
    rating: 5.0,
    occupancyRate: 92,
    revenueChange: 22.1,
    bookingsChange: 18.9,
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<string>("30days");

  const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    prefix = "",
    suffix = "",
  }) => {
    const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
    const isPositive = change > 0;
    const isSelected = hoveredMetric === title;

    return (
      <Card
        className={`group relative overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up ${
          isSelected ? "ring-2 ring-amber-300 shadow-amber-100" : ""
        }`}
        onMouseEnter={() => setHoveredMetric(title)}
        onMouseLeave={() => setHoveredMetric(null)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Icon className="h-16 w-16 text-gray-400" />
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${color
                .replace("to-", "from-")
                .replace("from-", "bg-gradient-to-r from-")}`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div
              className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                isPositive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}%
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            <div className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">
              {prefix}
              {value > 1000
                ? (value / 1000).toFixed(value >= 100000 ? 0 : 1) + "k"
                : value}
              {suffix}
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out group-hover:w-full`}
                style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const RevenueChart = () => {
    const maxRevenue = Math.max(...mockRevenueData.map((d) => d.revenue));

    return (
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-400">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-xl">
                <BarChart3 className="h-5 w-5 mr-2 text-amber-500" />
                Revenue Overview
              </CardTitle>
              <CardDescription className="text-gray-600">
                Monthly revenue and booking trends
              </CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 animate-pulse">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart Bars */}
            <div className="flex items-end justify-between h-48 px-2">
              {mockRevenueData.map((data, index) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center group"
                >
                  <div className="relative mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      AED {data.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className="w-8 bg-gradient-to-t from-amber-500 to-orange-600 rounded-t-lg cursor-pointer hover:from-amber-600 hover:to-orange-700 transition-all duration-500 hover:scale-110 animate-grow-up"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 160}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700">
                  AED 285k
                </div>
                <div className="text-sm text-emerald-600">Total Revenue</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">344</div>
                <div className="text-sm text-blue-600">Total Bookings</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                <div className="text-2xl font-bold text-purple-700">
                  AED 830
                </div>
                <div className="text-sm text-purple-600">Avg. Booking</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const OccupancyChart = () => {
    return (
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl">
            <PieChart className="h-5 w-5 mr-2 text-amber-500" />
            Occupancy Status
          </CardTitle>
          <CardDescription className="text-gray-600">
            Current property utilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Donut Chart Representation */}
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {mockOccupancyData.map((segment, index) => {
                    const prevPercentages = mockOccupancyData
                      .slice(0, index)
                      .reduce((sum, s) => sum + s.percentage, 0);
                    const circumference = 2 * Math.PI * 50;
                    const strokeDasharray = `${
                      (segment.percentage / 100) * circumference
                    } ${circumference}`;
                    const strokeDashoffset = -(
                      (prevPercentages / 100) *
                      circumference
                    );

                    return (
                      <circle
                        key={segment.name}
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="12"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="animate-draw-circle"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">73%</div>
                    <div className="text-xs text-gray-500">Occupied</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {mockOccupancyData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-fade-in-right"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">
                      {item.value}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PropertyPerformanceTable = () => {
    return (
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-600">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-5 w-5 mr-2 text-amber-500" />
                Property Performance
              </CardTitle>
              <CardDescription className="text-gray-600">
                Individual property metrics and trends
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPropertyPerformance.map((property, index) => (
              <div
                key={property.id}
                className="group p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  {/* Property Image */}
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={property.image}
                      alt={property.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />

                    <div className="absolute top-1 right-1">
                      {property.type === "room" ? (
                        <Home className="h-3 w-3 text-white bg-blue-500 rounded p-0.5" />
                      ) : (
                        <Car className="h-3 w-3 text-white bg-amber-500 rounded p-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                      {property.name}
                    </h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        <span className="font-medium">{property.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Activity className="h-3 w-3 mr-1" />
                        <span>{property.occupancyRate}% occupied</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        AED {(property.revenue / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-gray-500">Revenue</div>
                      <div
                        className={`flex items-center justify-center mt-1 text-xs ${
                          property.revenueChange > 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {property.revenueChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(property.revenueChange)}%
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {property.bookings}
                      </div>
                      <div className="text-xs text-gray-500">Bookings</div>
                      <div
                        className={`flex items-center justify-center mt-1 text-xs ${
                          property.bookingsChange > 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {property.bookingsChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(property.bookingsChange)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-x-hidden">
        {/* Enhanced Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  Performance Dashboard
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Analytics &{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Reports
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Track your property performance and maximize your revenue
                potential
              </p>
            </div>

            {/* Responsive Action Controls */}
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-44 border-gray-200 focus:border-amber-300 bg-white/80 backdrop-blur-sm">
                  <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-2 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group hover:text-amber-500"
              >
                <Filter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Filters
              </Button>

              <Button
                size="sm"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <Download className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={mockMetrics.totalRevenue.value}
            change={mockMetrics.totalRevenue.change}
            icon={DollarSign}
            color="from-emerald-500 to-green-600"
            prefix="AED "
          />
          <MetricCard
            title="Total Bookings"
            value={mockMetrics.totalBookings.value}
            change={mockMetrics.totalBookings.change}
            icon={Calendar}
            color="from-blue-500 to-indigo-600"
          />
          <MetricCard
            title="Average Rating"
            value={mockMetrics.averageRating.value}
            change={mockMetrics.averageRating.change}
            icon={Star}
            color="from-amber-500 to-orange-600"
            suffix="/5"
          />
          <MetricCard
            title="Occupancy Rate"
            value={mockMetrics.occupancyRate.value}
            change={mockMetrics.occupancyRate.change}
            icon={Activity}
            color="from-purple-500 to-violet-600"
            suffix="%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <OccupancyChart />
          </div>
        </div>

        {/* Property Performance */}
        <div className="mb-8">
          <PropertyPerformanceTable />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Top Performing Locations */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                Top Performing Locations
              </CardTitle>
              <CardDescription className="text-gray-600">
                Revenue by location this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Dubai Marina",
                  revenue: 125000,
                  percentage: 80,
                  color: "from-emerald-500 to-green-600",
                },
                {
                  name: "Business Bay",
                  revenue: 98000,
                  percentage: 65,
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  name: "Downtown Dubai",
                  revenue: 67000,
                  percentage: 45,
                  color: "from-amber-500 to-orange-600",
                },
                {
                  name: "Jumeirah",
                  revenue: 34000,
                  percentage: 25,
                  color: "from-purple-500 to-violet-600",
                },
              ].map((location, index) => (
                <div
                  key={location.name}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 animate-slide-in-right"
                  style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${location.color} shadow-lg group-hover:scale-125 transition-transform`}
                    />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {location.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${location.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 min-w-[60px] text-right">
                      AED {(location.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Trends */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-900">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                Booking Insights
              </CardTitle>
              <CardDescription className="text-gray-600">
                Key performance indicators and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { label: "Peak Season", value: "Dec - Feb", icon: Crown },
                  { label: "Average Stay", value: "4.2 days", icon: Clock },
                  { label: "Repeat Customers", value: "23%", icon: Users },
                  { label: "Cancellation Rate", value: "8.5%", icon: Activity },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 border border-gray-200 hover:border-amber-200 transition-all duration-300 group animate-fade-in-left"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow group-hover:bg-amber-50">
                        <item.icon className="h-4 w-4 text-gray-600 group-hover:text-amber-600 transition-colors" />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-amber-500" />
                  Weekly Performance
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, index) => (
                      <div
                        key={day}
                        className="text-center animate-fade-in-up"
                        style={{ animationDelay: `${1.4 + index * 0.05}s` }}
                      >
                        <div className="text-xs text-gray-500 mb-2 font-medium">
                          {day}
                        </div>
                        <div
                          className={`h-12 rounded-lg transition-all duration-500 hover:scale-110 cursor-pointer ${
                            index >= 5
                              ? "bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-200"
                              : index >= 3
                              ? "bg-gradient-to-t from-amber-500 to-amber-400 shadow-lg shadow-amber-200"
                              : "bg-gradient-to-t from-gray-300 to-gray-200"
                          }`}
                          style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up animation-delay-1000">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                Market Analysis
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                Compare your performance with market trends
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                View Analysis
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up animation-delay-1100">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Performance Tips
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                Get personalized recommendations to boost revenue
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                Get Tips
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up animation-delay-1200">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                Premium Insights
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                Unlock advanced analytics and forecasting
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                Upgrade
              </Button>
            </CardContent>
          </Card>
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

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes grow-up {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes draw-circle {
          from {
            stroke-dasharray: 0 314;
          }
          to {
            stroke-dasharray: var(--dash-array, 314) 314;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-grow-up {
          animation: grow-up 0.8s ease-out forwards;
        }

        .animate-draw-circle {
          animation: draw-circle 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1100 {
          animation-delay: 1.1s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
}
