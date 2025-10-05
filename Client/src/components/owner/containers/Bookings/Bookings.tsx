"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Filter,
  Search,
  MoreVertical,
  Check,
  X,
  MessageSquare,
  Phone,
  TrendingUp,
  Home,
  Car,
  Crown,
  Shield,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  ChevronRight,
  Download,
  RefreshCw,
  Plus,
  User,
  Mail,
  CreditCard,
} from "lucide-react";

const bookingStatuses = {
  pending: { color: "bg-amber-100 text-amber-800", icon: AlertCircle },
  confirmed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
  completed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  processing: { color: "bg-purple-100 text-purple-800", icon: Loader },
};

const mockBookings = [
  {
    id: "BK001",
    property: {
      name: "Luxury Suite - Dubai Marina",
      type: "room",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      location: "Dubai Marina",
    },
    guest: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      phone: "+1 234 567 8900",
      rating: 4.8,
      verified: true,
      vip: false,
    },
    dates: {
      checkIn: "2024-12-20",
      checkOut: "2024-12-25",
      nights: 5,
    },
    amount: 3500,
    currency: "AED",
    status: "confirmed",
    bookedDate: "2024-12-10",
    guests: 2,
    specialRequests: "Late check-in requested, prefer high floor room",
    paymentStatus: "paid",
    rating: 5,
    lastActivity: "2 hours ago",
  },
  {
    id: "BK002",
    property: {
      name: "BMW X5 - Premium SUV",
      type: "car",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
      location: "Dubai International Airport",
    },
    guest: {
      name: "Ahmed Al-Rashid",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      email: "ahmed.rashid@email.com",
      phone: "+971 50 123 4567",
      rating: 4.9,
      verified: true,
      vip: true,
    },
    dates: {
      checkIn: "2024-12-18",
      checkOut: "2024-12-22",
      nights: 4,
    },
    amount: 2800,
    currency: "AED",
    status: "pending",
    bookedDate: "2024-12-15",
    guests: 4,
    specialRequests: "Airport pickup required",
    paymentStatus: "pending",
    lastActivity: "30 minutes ago",
  },
  {
    id: "BK003",
    property: {
      name: "Penthouse - Business Bay",
      type: "room",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
      location: "Business Bay",
    },
    guest: {
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      email: "maria.garcia@email.com",
      phone: "+34 612 345 678",
      rating: 4.6,
      verified: true,
      vip: false,
    },
    dates: {
      checkIn: "2024-12-22",
      checkOut: "2024-12-28",
      nights: 6,
    },
    amount: 5200,
    currency: "AED",
    status: "confirmed",
    bookedDate: "2024-12-08",
    guests: 3,
    specialRequests: "Baby crib needed, dietary restrictions",
    paymentStatus: "paid",
    lastActivity: "1 day ago",
  },
  {
    id: "BK004",
    property: {
      name: "Mercedes S-Class",
      type: "car",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop",
      location: "Downtown Dubai",
    },
    guest: {
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      email: "james.wilson@email.com",
      phone: "+44 207 123 4567",
      rating: 4.7,
      verified: true,
      vip: true,
    },
    dates: {
      checkIn: "2024-12-16",
      checkOut: "2024-12-19",
      nights: 3,
    },
    amount: 1800,
    currency: "AED",
    status: "completed",
    bookedDate: "2024-12-01",
    guests: 2,
    specialRequests: "Chauffeur service required",
    paymentStatus: "paid",
    rating: 4,
    lastActivity: "3 days ago",
  },
  {
    id: "BK005",
    property: {
      name: "Executive Suite - DIFC",
      type: "room",
      image:
        "https://images.unsplash.com/photo-1578774204375-2ddb88db46e0?w=400&h=300&fit=crop",
      location: "DIFC",
    },
    guest: {
      name: "Lisa Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=100&h=100&fit=crop&crop=face",
      email: "lisa.chen@email.com",
      phone: "+65 9123 4567",
      rating: 4.9,
      verified: true,
      vip: false,
    },
    dates: {
      checkIn: "2024-12-25",
      checkOut: "2024-12-30",
      nights: 5,
    },
    amount: 4200,
    currency: "AED",
    status: "cancelled",
    bookedDate: "2024-12-12",
    guests: 1,
    specialRequests: "Business center access needed",
    paymentStatus: "refunded",
    lastActivity: "2 days ago",
  },
];

const statsData = [
  {
    title: "Total Bookings",
    value: "47",
    change: "+12%",
    icon: Calendar,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Requests",
    value: "8",
    change: "+3",
    icon: AlertCircle,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Monthly Revenue",
    value: "AED 28,500",
    change: "+18%",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
];

const BookingPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    filterBookings();
  }, [selectedFilter, searchTerm]);

  const filterBookings = () => {
    let filtered = mockBookings;

    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (booking) => booking.status === selectedFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.property.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleBookingAction = (bookingId, action) => {
    console.log(`Action ${action} for booking ${bookingId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = bookingStatuses[status];
    const IconComponent = statusConfig.icon;

    return (
      <Badge
        className={`${statusConfig.color} border-0 font-medium capitalize`}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const StatCard = ({ stat, index }) => (
    <Card
      className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-xl shadow-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <stat.icon
              className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stat.change}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 relative">
        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
          {stat.title}
        </h3>
      </CardContent>
    </Card>
  );

  const BookingCard = ({ booking, index }) => {
    const StatusIcon = bookingStatuses[booking.status].icon;
    const isRoom = booking.property.type === "room";

    return (
      <Card
        className="group bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-amber-300 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer animate-slide-in-up overflow-hidden"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => setSelectedBooking(booking)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500" />

        <CardContent className="p-6 relative">
          <div className="flex items-start space-x-4">
            {/* Property Image */}
            <div className="relative overflow-hidden rounded-xl flex-shrink-0">
              <img
                src={booking.property.image}
                alt={booking.property.name}
                className="w-20 h-16 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-1 right-1">
                {isRoom ? (
                  <Home className="h-3 w-3 text-white bg-blue-500 rounded p-0.5" />
                ) : (
                  <Car className="h-3 w-3 text-white bg-amber-500 rounded p-0.5" />
                )}
              </div>
              {booking.guest.vip && (
                <div className="absolute -top-1 -left-1">
                  <Crown className="h-4 w-4 text-amber-500 bg-white rounded-full p-0.5 shadow-sm" />
                </div>
              )}
            </div>

            {/* Booking Info */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {booking.property.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {booking.property.location}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(booking.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-amber-50"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Guest Info */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={booking.guest.avatar}
                    alt={booking.guest.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {booking.guest.verified && (
                    <div className="absolute -bottom-1 -right-1">
                      <Shield className="h-3 w-3 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 truncate">
                      {booking.guest.name}
                    </span>
                    {booking.guest.vip && (
                      <Badge className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5">
                        <Crown className="h-2 w-2 mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{booking.guest.rating}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1 text-amber-500" />
                    <span className="font-medium">
                      {new Date(booking.dates.checkIn).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                    <span className="mx-1">-</span>
                    <span className="font-medium">
                      {new Date(booking.dates.checkOut).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-3 w-3 mr-1 text-amber-500" />
                    <span>
                      {booking.guests} {isRoom ? "guests" : "passengers"}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-bold text-gray-900">
                    {booking.currency} {booking.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {booking.dates.nights} nights
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Last activity: {booking.lastActivity}</span>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 hover:bg-green-50 hover:text-green-600"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BookingDetailModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          <CardHeader className="relative pb-0">
            <Button
              onClick={onClose}
              className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 h-10 w-10"
              size="sm"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-start space-x-4 pt-6">
              <img
                src={booking.property.image}
                alt={booking.property.name}
                className="w-24 h-20 rounded-xl object-cover shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {booking.property.name}
                  </h2>
                  {getStatusBadge(booking.status)}
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.property.location}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {booking.currency} {booking.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Guest Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-amber-500" />
                    Guest Information
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={booking.guest.avatar}
                        alt={booking.guest.name}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">
                            {booking.guest.name}
                          </span>
                          {booking.guest.vip && (
                            <Crown className="h-4 w-4 text-amber-500" />
                          )}
                          {booking.guest.verified && (
                            <Shield className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{booking.guest.rating} rating</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{booking.guest.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{booking.guest.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Special Requests
                  </h3>
                  <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400">
                    <p className="text-gray-700">{booking.specialRequests}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                    Booking Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-sm text-blue-600 mb-1">
                          Check-in
                        </div>
                        <div className="font-bold text-gray-900">
                          {new Date(booking.dates.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4">
                        <div className="text-sm text-orange-600 mb-1">
                          Check-out
                        </div>
                        <div className="font-bold text-gray-900">
                          {new Date(booking.dates.checkOut).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {booking.dates.nights} nights
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{booking.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booked:</span>
                        <span className="font-medium">
                          {new Date(booking.bookedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <Badge
                          className={`${
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          } text-xs`}
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-amber-500" />
                    Payment Breakdown
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({booking.dates.nights} nights)</span>
                      <span>
                        {booking.currency}{" "}
                        {(booking.amount * 0.85).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>
                        {booking.currency}{" "}
                        {(booking.amount * 0.1).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>
                        {booking.currency}{" "}
                        {(booking.amount * 0.05).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        {booking.currency} {booking.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Guest
                </Button>
              </div>

              {booking.status === "pending" && (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleBookingAction(booking.id, "decline")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    onClick={() => handleBookingAction(booking.id, "approve")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } animate-fade-in-up`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  Booking Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Your{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Bookings
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Manage reservations and guest communications efficiently
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-gray-300 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group"
              >
                <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-gray-300 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group"
              >
                <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                Manual Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8 animate-fade-in-up animation-delay-400">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search bookings, guests, properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-2 border-gray-200 focus:border-amber-500 transition-all duration-300 rounded-xl"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-gray-300 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group"
                >
                  <Filter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Filter
                </Button>
              </div>

              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
                {["all", "pending", "confirmed", "completed", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                        selectedFilter === status
                          ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md transform scale-105"
                          : "text-gray-600 hover:text-amber-600 hover:bg-white"
                      }`}
                    >
                      {status === "all" ? "All Bookings" : status}
                      {status !== "all" && (
                        <Badge className="ml-2 bg-white/20 text-current text-xs">
                          {
                            mockBookings.filter((b) => b.status === status)
                              .length
                          }
                        </Badge>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedFilter !== "all"
                    ? "Try adjusting your filters or search terms."
                    : "Your bookings will appear here once guests make reservations."}
                </p>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Manual Booking
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking, index) => (
              <BookingCard key={booking.id} booking={booking} index={index} />
            ))
          )}
        </div>

        {/* Load More */}
        {filteredBookings.length > 0 && (
          <div className="flex justify-center mt-12 animate-fade-in-up animation-delay-800">
            <Button
              variant="outline"
              className="border-2 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 group px-8 py-3"
            >
              Load More Bookings
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Quick Stats Bar */}
        <Card className="mt-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border-0 shadow-2xl animate-fade-in-up animation-delay-1000">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  89%
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Occupancy Rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  4.8
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Average Rating
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  2.5h
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Response Time
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  97%
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Guest Satisfaction
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

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

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
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

export default BookingPage;
