"use client";

import React, { useState } from "react";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import { Badge } from "@/components/base/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import { 
  Edit, 
  Save, 
  X, 
   Check,
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Car,
  Star,
  Globe,
  Shield,
  Clock,
  Users,
  Camera,
  ImageIcon
} from "lucide-react";
import Image from "next/image";
import { Property, PropertyCategory } from "@/types/owner";

interface EditPropertyModalProps {
  property: Property;
  onSave: (updatedProperty: Property) => void;
}

export default function EditPropertyModal({ property, onSave }: EditPropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    location: property.location,
    category: property.category,
    status: property.status,
    description: property.description || "",
    guests: property.guests || 0,
    passengers: property.passengers || 0,
    images: property.images || [],
    amenities: property.amenities || [],
    bedrooms: property.type === "room" ? "2" : "",
    bathrooms: property.type === "room" ? "2" : "",
    area: property.type === "room" ? "1200" : "",
    brand: property.type === "car" ? "BMW" : "",
    model: property.type === "car" ? "X5" : "",
    year: property.type === "car" ? "2023" : "",
    fuelType: property.type === "car" ? "petrol" : "",
    transmission: property.type === "car" ? "automatic" : "",
  });

  const roomAmenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "coffee", label: "Coffee Machine", icon: Coffee },
    { id: "tv", label: "Smart TV", icon: Tv },
    { id: "ac", label: "Air Conditioning", icon: AirVent },
    { id: "parking", label: "Parking", icon: Car },
    { id: "kitchen", label: "Kitchen", icon: Star },
  ];

  const carAmenities = [
    { id: "gps", label: "GPS Navigation", icon: Globe },
    { id: "insurance", label: "Full Insurance", icon: Shield },
    { id: "support", label: "24/7 Support", icon: Clock },
    { id: "chauffeur", label: "Chauffeur Available", icon: Users },
    { id: "bluetooth", label: "Bluetooth", icon: Wifi },
    { id: "ac", label: "Air Conditioning", icon: AirVent },
  ];

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    const updatedImages = [...formData.images, ...newImages].slice(0, 8);
    setFormData({ ...formData, images: updatedImages });
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const toggleAmenity = (amenityId: string) => {
    const updatedAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter((a) => a !== amenityId)
      : [...formData.amenities, amenityId];
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleSave = () => {
    const updatedProperty: Property = {
      ...property,
      ...formData,
    };
    onSave(updatedProperty);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
        >
          <Edit className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
          Edit Property
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Edit Property
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter property title"
                />
              </div>

              <div>
                <Label htmlFor="price">Price (AED)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                    <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="Business Bay">Business Bay</SelectItem>
                    <SelectItem value="Jumeirah">Jumeirah</SelectItem>
                    <SelectItem value="Deira">Deira</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as PropertyCategory })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Property["status"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter property description"
                rows={4}
              />
            </div>
          </div>

          {/* Property-specific fields */}
          {property.type === "room" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Room Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4+">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4+">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="1200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="guests">Max Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  placeholder="Enter max guests"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          )}

          {property.type === "car" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="BMW"
                  />
                </div>

                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="X5"
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2023"
                  />
                </div>

                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="passengers">Max Passengers</Label>
                <Input
                  id="passengers"
                  type="number"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                  placeholder="Enter max passengers"
                  min="2"
                  max="8"
                />
              </div>
            </div>
          )}

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Property Images</h3>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {formData.images.length}/8 photos
              </Badge>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-300 transition-colors">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload property images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose Images
              </Button>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={100}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <Badge className="absolute bottom-1 left-1 bg-amber-500 text-white text-xs">
                        Cover
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Amenities & Features</h3>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {formData.amenities.length} selected
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(property.type === "room" ? roomAmenities : carAmenities).map((amenity) => (
                <div
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.amenities.includes(amenity.id)
                      ? "border-amber-300 bg-amber-50"
                      : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    formData.amenities.includes(amenity.id)
                      ? "bg-amber-500"
                      : "bg-gray-100"
                  }`}>
                    <amenity.icon className={`h-4 w-4 ${
                      formData.amenities.includes(amenity.id)
                        ? "text-white"
                        : "text-gray-600"
                    }`} />
                  </div>
                  <span className={`text-sm font-medium flex-1 ${
                    formData.amenities.includes(amenity.id)
                      ? "text-amber-700"
                      : "text-gray-700"
                  }`}>
                    {amenity.label}
                  </span>
                  {formData.amenities.includes(amenity.id) && (
                    <Check className="h-4 w-4 text-amber-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}