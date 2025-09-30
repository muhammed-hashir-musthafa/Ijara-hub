"use client";

import React from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
  Star,
  MapPin,
  Users,
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Shield,
  Clock,
  ChevronRight,
  Play,
  Sparkles,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { Amenity, FeaturedListing } from "@/types/features";
import { ListingCardProps } from "@/types/card";
import Link from "next/link";

const featuredRooms: FeaturedListing[] = [
  {
    id: 174395,
    title: "Luxury Suite - Burj Khalifa View",
    location: "Downtown Dubai",
    price: 850,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    amenities: ["Wifi", "Coffee", "TV", "AC"],
    guests: 2,
    type: "room",
  },
  {
    id: 2321485,
    title: "Premium Penthouse",
    location: "Dubai Marina",
    price: 1200,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    amenities: ["Wifi", "Coffee", "TV", "AC"],
    guests: 4,
    type: "room",
  },
  {
    id: 36987135,
    title: "Lamborghini Huracán",
    location: "Dubai",
    price: 2500,
    rating: 4.9,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    amenities: ["GPS", "Insurance", "24/7 Support"],
    passengers: 2,
    type: "car",
  },
  {
    id: 4521794,
    title: "Mercedes S-Class",
    location: "Abu Dhabi",
    price: 800,
    rating: 4.7,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop",
    amenities: ["GPS", "Insurance", "Chauffeur"],
    passengers: 4,
    type: "car",
  },
];

const FeaturedListings = () => {
  //   const [hoveredCard, setHoveredCard] = useState(null);
  const rooms: FeaturedListing[] = featuredRooms.filter(
    (item) => item.type === "room"
  );
  const cars: FeaturedListing[] = featuredRooms.filter(
    (item) => item.type === "car"
  );

  const getAmenityIcon = (amenity: Amenity) => {
    const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
      wifi: Wifi,
      coffee: Coffee,
      tv: Tv,
      ac: AirVent,
      gps: Globe,
      insurance: Shield,
      "24/7 support": Clock,
      chauffeur: Users,
    };
    const IconComponent = iconMap[amenity.toLowerCase()] || Globe;
    return <IconComponent className="h-4 w-4" />;
  };

  const ListingCard: React.FC<ListingCardProps> = ({ listing, index }) => (
    <Link
      href={`/${listing.type === "room" ? "rooms" : "cars"}/${listing.id}`}
      className="group block"
      passHref
    >
      <Card
        className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
        //   onMouseEnter={() => setHoveredCard(listing.id)}
        //   onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="relative overflow-hidden">
          <Image
            width={400}
            height={300}
            src={listing.image}
            alt={listing.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg animate-pulse">
            <Sparkles className="h-3 w-3 mr-1" />
            Featured
          </Badge>

          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Play className="h-4 w-4 text-white" />
          </div>
        </div>

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center space-x-1 text-sm bg-amber-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-700">{listing.rating}</span>
              <span className="text-amber-600">({listing.reviews})</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-2 text-amber-500" />
            <span className="font-medium">{listing.location}</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              <Users className="h-4 w-4 text-gray-500" />
              <span>
                {listing.type === "room"
                  ? `${listing.guests} guests`
                  : `${listing.passengers} passengers`}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                AED {listing.price}
              </div>
              <div className="text-xs text-gray-500 font-medium">per night</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {listing.amenities
                .slice(0, 3)
                .map((amenity: Amenity, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1 font-medium">{amenity}</span>
                  </div>
                ))}
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/btn"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Rooms Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  Premium Selection
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Rooms
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover our most popular luxury accommodations with
                breathtaking views and world-class amenities
              </p>
            </div>
            <Link href="/rooms" passHref>
              <Button
                variant="outline"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 group px-6 py-3 rounded-xl"
              >
                View All Rooms
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, index) => (
              <ListingCard key={room.id} listing={room} index={index} />
            ))}
          </div>
        </div>

        {/* Cars Section */}
        <div>
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  Luxury Fleet
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Cars
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Experience luxury with our premium vehicle collection featuring
                the world&apos;s most prestigious brands
              </p>
            </div>
            <Link href="/cars" passHref>
              <Button
                variant="outline"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 group px-6 py-3 rounded-xl"
              >
                View All Cars
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cars.map((car, index) => (
              <ListingCard key={car.id} listing={car} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
