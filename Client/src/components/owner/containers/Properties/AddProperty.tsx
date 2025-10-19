"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "@/components/base/ui/button";
import { Card, CardContent } from "@/components/base/ui/card";
import {
  ArrowLeft,
  Home,
  Car,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Shield,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { FormikHelpers } from "formik";
import { PropertyForm, RoomForm, CarForm } from "@/types/owner";
import { useRouter } from "next/navigation";
import AddPropertyForm from "@/components/owner/forms/AddPropertyForm";
import { createRoom } from "@/services/roomService";
import { createCar } from "@/services/carService";

export default function AddPropertyPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<"room" | "car">("room");
  const router = useRouter();
  const handleTypeSelect = (type: "room" | "car") => {
    setPropertyType(type);
    setStep(2);
  };

  const handleSubmit = async (
    values: PropertyForm,
    { setSubmitting, resetForm }: FormikHelpers<PropertyForm>
  ) => {
    try {
      setSubmitting(true);
      
      if (propertyType === 'room') {
        const roomValues = values as RoomForm;
        const roomData = {
          roomNumber: roomValues.roomNumber || `R${Date.now()}`,
          title: roomValues.title,
          description: roomValues.description,
          category: roomValues.category as 'hotel' | 'apartment' | 'villa' | 'studio' | 'penthouse',
          type: roomValues.type as 'single' | 'double' | 'suite' | 'deluxe' | 'presidential',
          rooms: {
            bedroom: parseInt(roomValues.bedrooms) || 1,
            bathroom: parseInt(roomValues.bathrooms) || 1
          },
          areaSqft: parseInt(roomValues.area) || undefined,
          pricePerNight: parseFloat(roomValues.price),
          capacity: parseInt(roomValues.capacity) || 1,
          floor: parseInt(roomValues.floor) || 1,
          location: roomValues.category as 'dubai-marina' | 'downtown-dubai' | 'business-bay' | 'jumeirah' | 'deira' | 'abu-dhabi' | 'sharjah',
          address: {
            place: roomValues.place,
            pincode: parseInt(roomValues.pincode) || undefined
          },
          amenities: roomValues.amenities || [],
          images: roomValues.images || []
        };
        await createRoom(roomData);
      } else {
        const carValues = values as CarForm;
        const carData = {
          title: carValues.title,
          description: carValues.description,
          brand: carValues.brand,
          model: carValues.model,
          year: parseInt(carValues.year) || new Date().getFullYear(),
          licensePlate: carValues.licensePlate,
          dailyRate: parseFloat(carValues.price),
          category: carValues.category as 'economy' | 'compact' | 'midsize' | 'luxury' | 'suv' | 'sports' | 'convertible',
          transmission: carValues.transmission as 'manual' | 'automatic' | 'cvt',
          fuelType: carValues.fuelType as 'petrol' | 'diesel' | 'hybrid' | 'electric',
          seatingCapacity: parseInt(carValues.seatingCapacity) || 4,
          color: carValues.color,
          location: carValues.category as 'dubai-marina' | 'downtown-dubai' | 'business-bay' | 'jumeirah' | 'deira' | 'abu-dhabi' | 'sharjah',
          address: {
            place: carValues.place,
            pincode: parseInt(carValues.pincode) || undefined
          },
          amenities: carValues.amenities || [],
          images: carValues.images || []
        };
        await createCar(carData);
      }
      
      toast.success(`${propertyType === 'room' ? 'Room' : 'Car'} property added successfully!`);
      resetForm();
      router.push('/owner/properties');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Failed to add property. Please try again.');
      } else {
        toast.error('Failed to add property. Please try again.');
      }
      console.error('Error adding property:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Step 1: Property Type Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12 animate-fade-in-up">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 group mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back </span>
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                  <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                    Get Started
                  </span>
                  <div className="w-16 h-1 bg-gradient-to-l from-amber-500 to-orange-600 rounded-full ml-4"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Property Type
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Select the type of property you&apos;d like to add to your
                  luxury rental portfolio
                </p>
              </div>
            </div>

            {/* Property Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Room Card */}
              <Card
                className="group cursor-pointer border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 animate-fade-in-up animation-delay-200 overflow-hidden"
                onClick={() => handleTypeSelect("room")}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=300&fit=crop"
                    alt="Luxury Room"
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg mr-4 group-hover:scale-110 transition-transform">
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Luxury Rooms
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Hotels, apartments, villas, penthouses, and other
                    accommodation properties for short-term rentals.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      Perfect for hospitality business
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      Multiple room configurations
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      Premium amenities included
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group/btn">
                    Add Room Property
                    <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Car Card */}
              <Card
                className="group cursor-pointer border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 animate-fade-in-up animation-delay-400 overflow-hidden"
                onClick={() => handleTypeSelect("car")}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=300&fit=crop"
                    alt="Luxury Car"
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg mr-4 group-hover:scale-110 transition-transform">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                      Premium Cars
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Luxury vehicles, sports cars, SUVs, and premium automobiles
                    for short-term rentals.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      High-end vehicle fleet
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      Full insurance coverage
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" />
                      24/7 support included
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group/btn">
                    Add Car Property
                    <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="mt-16 text-center animate-fade-in-up animation-delay-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Why Choose Our Platform?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Premium Listings",
                    desc: "Showcase your properties with stunning visuals",
                  },
                  {
                    icon: Shield,
                    title: "Secure Platform",
                    desc: "Advanced security and verified bookings",
                  },
                  {
                    icon: TrendingUp,
                    title: "Maximize Revenue",
                    desc: "Intelligent pricing and booking optimization",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300"
                  >
                    <div className="inline-flex p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
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

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
        `}</style>
      </div>
    );
  }

  // Step 2: Property Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300 group w-full sm:w-auto justify-center sm:justify-start"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back </span>
              </button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-600 w-full sm:w-auto"
              >
                Change Type
              </Button>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  {propertyType === "room" ? "Room Details" : "Vehicle Details"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Add New{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {propertyType === "room" ? "Room" : "Car"}
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Fill in the details to list your{" "}
                {propertyType === "room"
                  ? "luxury accommodation"
                  : "premium vehicle"}
              </p>
            </div>
          </div>

          {propertyType && (
            <AddPropertyForm
              propertyType={propertyType}
              onSubmit={handleSubmit}
            />
          )}

          {/* Progress Indicator */}
          <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 animate-fade-in-up animation-delay-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  {propertyType === "room" ? (
                    <Home className="h-4 w-4 text-white" />
                  ) : (
                    <Car className="h-4 w-4 text-white" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {propertyType === "room" ? "Room Property" : "Car Property"}
                  </div>
                  <div className="text-xs text-gray-500">Step 2 of 2</div>
                </div>
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

          @keyframes slide-in-from-right-1 {
            from {
              opacity: 0;
              transform: translateX(4px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-in {
            animation-duration: 0.2s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }

          .slide-in-from-right-1 {
            animation-name: slide-in-from-right-1;
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
        `}</style>
      </div>
    </div>
  );
}
