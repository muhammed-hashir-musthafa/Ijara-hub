"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import {
  Plus,
  Grid3X3,
  List,
  Search,
  MapPin,
  Star,
  Users,
  Car,
  Home,
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Filter,
  Sparkles,
  ChevronRight,
  Clock,
  Globe,
  Trash2,
} from "lucide-react";
import { Filters, Property, PropertyStatus } from "@/types/owner";
import { getRooms, deleteRoom } from "@/services/roomService";
import { getCars, deleteCar } from "@/services/carService";

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "",
    status: "",
    location: "",
    category: "",
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const [roomsResponse, carsResponse] = await Promise.all([
        getRooms({ status: 'active' }),
        getCars({ status: 'active' })
      ]);

      const mapRoomCategory = (category: string): 'luxury' | 'premium' | 'standard' | 'economy' => {
        const categoryMap: Record<string, 'luxury' | 'premium' | 'standard' | 'economy'> = {
          'hotel': 'luxury',
          'apartment': 'premium', 
          'villa': 'luxury',
          'studio': 'standard',
          'penthouse': 'luxury'
        };
        return categoryMap[category] || 'standard';
      };

      const mapCarCategory = (category: string): 'luxury' | 'premium' | 'standard' | 'economy' => {
        const categoryMap: Record<string, 'luxury' | 'premium' | 'standard' | 'economy'> = {
          'economy': 'economy',
          'compact': 'standard',
          'midsize': 'standard', 
          'luxury': 'luxury',
          'suv': 'premium',
          'sports': 'luxury',
          'convertible': 'luxury'
        };
        return categoryMap[category] || 'standard';
      };

      const roomProperties: Property[] = roomsResponse?.data?.rooms?.map(room => ({
        id: room._id,
        title: room.title,
        type: 'room',
        category: mapRoomCategory(room.category),
        location: room.location,
        price: room.pricePerNight,
        currency: 'AED',
        status: room.status as PropertyStatus,
        images: room.images.length > 0 ? room.images : ['/placeholder-room.jpg'],
        rating: 4.5,
        reviewCount: 0,
        bookings: 0,
        revenue: 0,
        createdAt: new Date(room.createdAt).toISOString().split('T')[0],
        amenities: room.amenities,
        guests: room.capacity
      }));

      const carProperties: Property[] = carsResponse?.data?.cars?.map(car => ({
        id: car._id,
        title: car.title,
        type: 'car',
        category: mapCarCategory(car.category),
        location: car.location,
        price: car.dailyRate,
        currency: 'AED',
        status: car.status as PropertyStatus,
        images: car.images.length > 0 ? car.images : ['/placeholder-car.jpg'],
        rating: 4.5,
        reviewCount: 0,
        bookings: 0,
        revenue: 0,
        createdAt: new Date(car.createdAt).toISOString().split('T')[0],
        amenities: car.amenities,
        passengers: car.seatingCapacity
      }));

      setProperties([...roomProperties, ...carProperties]);
    } catch (error: unknown) {
      toast.error('Failed to load properties. Please try again.');
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProperty = async (property: Property) => {
    try {
      if (property.type === 'room') {
        await deleteRoom(property.id);
      } else {
        await deleteCar(property.id);
      }
      toast.success('Property deleted successfully');
      fetchProperties();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Failed to delete property');
      } else {
        toast.error('Failed to delete property');
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = !filters.type || p.type === filters.type;
      const matchesStatus = !filters.status || p.status === filters.status;
      const matchesLocation =
        !filters.location ||
        p.location.toLowerCase().replace(/\s+/g, "-") === filters.location;
      const matchesCategory =
        !filters.category || p.category === filters.category;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesLocation &&
        matchesCategory
      );
    });
  }, [filters, properties]);

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ElementType> = {
      wifi: Wifi,
      coffee: Coffee,
      tv: Tv,
      ac: AirVent,
      gps: Globe,
      insurance: Clock,
      "24/7 support": Clock,
      chauffeur: Users,
    };
    const Icon = icons[amenity.toLowerCase()] || Globe;
    return <Icon className="h-3 w-3" />;
  };

  const PropertyCard = ({
    property,
    index,
  }: {
    property: Property;
    index: number;
  }) => (
    <div
      className="group overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg animate-fade-in-up backdrop-blur-sm rounded-2xl"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={property.images[0]}
          alt={property.title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-56 object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Badge
          className={`absolute top-4 left-4 ${getStatusColor(
            property.status
          )} shadow-lg`}
        >
          {property.status}
        </Badge>

        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
          {property.type === "room" ? (
            <Home className="h-3 w-3 mr-1" />
          ) : (
            <Car className="h-3 w-3 mr-1" />
          )}
          {property.type}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-700">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 text-amber-500" />
          <span className="font-medium">{property.location}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="capitalize text-gray-500">{property.category}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {property.bookings}
            </div>
            <div className="text-xs text-gray-500 font-medium">Bookings</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-lg font-bold text-gray-900">
              {property.reviewCount}
            </div>
            <div className="text-xs text-gray-500 font-medium">Reviews</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Users className="h-3 w-3 mr-1" />
              {property.type === "room" ? property.guests : property.passengers}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {property.type === "room" ? "Guests" : "Passengers"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {property.amenities.slice(0, 4).map((a, i) => (
            <div
              key={i}
              className="flex items-center text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded-lg hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-300"
            >
              {getAmenityIcon(a)}
              <span className="ml-1 font-medium">{a}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              AED {property.price}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              per {property.type === "room" ? "night" : "day"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteProperty(property)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Link
              href={`/owner/properties/${property.id}`}
              className="text-amber-600 flex items-center text-sm font-semibold hover:text-amber-700"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center mb-3">
              <div className="w-10 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-3"></div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Property Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Your{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Manage and monitor your luxury rental portfolio with ease
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="md:flex hidden items-center border-2 border-gray-200 rounded-xl p-1 bg-white/80 backdrop-blur-sm shadow-sm">
              <Button
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-10 w-10 p-0 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-10 w-10 p-0 rounded-lg ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button
              asChild
              className="flex-1 md:flex-none bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl px-6"
            >
              <Link
                href="/owner/properties/add"
                className="flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-amber-500" />
                Filters
              </h3>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                {filteredProperties.length} Properties Found
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="pl-10 border-gray-200 focus:border-amber-300 focus:ring-amber-200"
                />
              </div>

              <Select
                value={filters.type}
                onValueChange={(v) => setFilters({ ...filters, type: v })}
              >
                <SelectTrigger className="border-gray-200 focus:border-amber-300">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">Rooms</SelectItem>
                  <SelectItem value="car">Cars</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={(v) => setFilters({ ...filters, status: v })}
              >
                <SelectTrigger className="border-gray-200 focus:border-amber-300">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.location}
                onValueChange={(v) => setFilters({ ...filters, location: v })}
              >
                <SelectTrigger className="border-gray-200 focus:border-amber-300">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                  <SelectItem value="business-bay">Business Bay</SelectItem>
                  <SelectItem value="jumeirah">Jumeirah</SelectItem>
                  <SelectItem value="deira">Deira</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.category}
                onValueChange={(v) => setFilters({ ...filters, category: v })}
              >
                <SelectTrigger className="border-gray-200 focus:border-amber-300">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-56 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="h-10 w-10 text-amber-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Properties Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {Object.values(filters).some((f) => f)
                ? "Try adjusting your filters to discover more properties."
                : "Begin your journey by adding your first luxury property."}
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-3"
            >
              <Link
                href="/owner/properties/add"
                className="flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Property
              </Link>
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        )}
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}