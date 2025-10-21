"use client";

import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import { Badge } from "@/components/base/ui/badge";
import { updateRoom } from "@/services/roomService";
import { updateCar } from "@/services/carService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import {
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
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Property, PropertyCategory } from "@/types/owner";

interface EditPropertyFormProps {
  property: Property;
  onSave: (updatedProperty: Property) => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  amenities: string[];
  place: string;
  pincode: string;
  // Room specific
  roomNumber: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  capacity: number;
  floor: string;
  // Car specific
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
}

const baseValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  category: Yup.string().required("Category is required"),
  place: Yup.string().required("Address is required"),
  pincode: Yup.string().matches(/^\d{5}$/, "Pincode must be 5 digits"),
});

const roomValidationSchema = baseValidationSchema.shape({
  roomNumber: Yup.string().required("Room number is required"),
  type: Yup.string().required("Room type is required"),
  bedrooms: Yup.string().required("Bedrooms is required"),
  bathrooms: Yup.string().required("Bathrooms is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1"),
  floor: Yup.string().required("Floor is required"),
});

const carValidationSchema = baseValidationSchema.shape({
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.string()
    .required("Year is required")
    .matches(/^\d{4}$/, "Year must be 4 digits"),
  licensePlate: Yup.string().required("License plate is required"),
  fuelType: Yup.string().required("Fuel type is required"),
  transmission: Yup.string().required("Transmission is required"),
  seatingCapacity: Yup.number()
    .required("Seating capacity is required")
    .min(2, "Must seat at least 2"),
  color: Yup.string().required("Color is required"),
});

export default function EditPropertyForm({
  property,
  onSave,
  onCancel,
}: EditPropertyFormProps) {
  const initialValues: FormValues = {
    title: property.title,
    description: property.description || "",
    price: property.price,
    place: property.address?.place || "",
    pincode: property.address?.pincode?.toString() || "00000",
    category: property.category,
    images: property.images || [],
    amenities: property.amenities || [],
    // Room specific fields
    roomNumber: property.roomNumber || "",
    type: property.roomType || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    area: property.area || "",
    capacity: property.guests || 0,
    floor: property.floor?.toString() || "",
    // Car specific fields
    brand: property.brand || "",
    model: property.model || "",
    year: property.year?.toString() || "",
    licensePlate: property.licensePlate || "",
    fuelType: property.fuelType || "",
    transmission: property.transmission || "",
    seatingCapacity: property.passengers || 0,
    color: property.color || "",
  };

  const validationSchema =
    property.type === "room" ? roomValidationSchema : carValidationSchema;

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

  const handleImageUpload = (
    files: FileList,
    setFieldValue: (field: string, value: string[]) => void,
    currentImages: string[]
  ) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedImages = [...currentImages, ...newImages].slice(0, 8);
    setFieldValue("images", updatedImages);
  };

  const removeImage = (
    index: number,
    setFieldValue: (field: string, value: string[]) => void,
    currentImages: string[]
  ) => {
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setFieldValue("images", updatedImages);
  };

  const toggleAmenity = (
    amenityId: string,
    setFieldValue: (field: string, value: string[]) => void,
    currentAmenities: string[]
  ) => {
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((a) => a !== amenityId)
      : [...currentAmenities, amenityId];
    setFieldValue("amenities", updatedAmenities);
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (property.type === "room") {
        const roomPayload = {
          title: values.title,
          description: values.description,
          category: values.category as
            | "hotel"
            | "apartment"
            | "villa"
            | "studio"
            | "penthouse",
          type: values.type as
            | "single"
            | "double"
            | "suite"
            | "deluxe"
            | "presidential",
          rooms: {
            bedroom: parseInt(values.bedrooms) || 1,
            bathroom: parseInt(values.bathrooms) || 1,
          },
          areaSqft: parseInt(values.area) || 0,
          pricePerNight: values.price,
          capacity: values.capacity,
          floor: parseInt(values.floor) || 1,
          address: {
            place: values.place,
            pincode: parseInt(values.pincode) || undefined,
          },
          amenities: values.amenities,
          images: values.images,
          roomNumber: values.roomNumber,
        };

        const response = await updateRoom(property.id, roomPayload);
        const updatedRoom = response.data.room;

        const updatedProperty: Property = {
          ...property,
          title: updatedRoom.title,
          description: updatedRoom.description || "",
          price: updatedRoom.pricePerNight,
          address: {
            place: updatedRoom.address?.place || "",
            pincode: updatedRoom.address?.pincode,
          },
          category: updatedRoom.category as PropertyCategory,
          images: updatedRoom.images,
          amenities: updatedRoom.amenities,
          bedrooms: updatedRoom.rooms.bedroom.toString(),
          bathrooms: updatedRoom.rooms.bathroom.toString(),
          area: updatedRoom.areaSqft?.toString() || "0",
          guests: updatedRoom.capacity,
          lastUpdated: new Date().toISOString().split("T")[0],
        };

        toast.success("Room updated successfully!");
        onSave(updatedProperty);
      } else {
        const carPayload = {
          title: values.title,
          description: values.description,
          brand: values.brand,
          model: values.model,
          year: parseInt(values.year),
          licensePlate: values.licensePlate,
          dailyRate: values.price,
          category: values.category as
            | "economy"
            | "compact"
            | "midsize"
            | "luxury"
            | "suv"
            | "sports"
            | "convertible",
          transmission: values.transmission as "manual" | "automatic" | "cvt",
          fuelType: values.fuelType as
            | "petrol"
            | "diesel"
            | "hybrid"
            | "electric",
          seatingCapacity: values.seatingCapacity,
          color: values.color,
          address: {
            place: values.place,
            pincode: parseInt(values.pincode) || undefined,
          },
          amenities: values.amenities,
          images: values.images,
        };

        const response = await updateCar(property.id, carPayload);
        const updatedCar = response.data.car;

        const updatedProperty: Property = {
          ...property,
          title: updatedCar.title,
          description: updatedCar.description || "",
          price: updatedCar.dailyRate,
          address: {
            place: updatedCar.address?.place || "",
            pincode: updatedCar.address?.pincode,
          },
          category: updatedCar.category as PropertyCategory,
          images: updatedCar.images,
          amenities: updatedCar.amenities,
          passengers: updatedCar.seatingCapacity,
          lastUpdated: new Date().toISOString().split("T")[0],
        };

        toast.success("Car updated successfully!");
        onSave(updatedProperty);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to update property"
        );
      } else {
        toast.error("Failed to update property");
      }
      console.error("Update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Field name="title">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter property title"
                      className={
                        errors.title && touched.title ? "border-red-500" : ""
                      }
                    />
                  )}
                </Field>
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price (AED) *</Label>
                <Field name="price">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="price"
                      type="text"
                      placeholder="Enter price"
                      className={
                        errors.price && touched.price ? "border-red-500" : ""
                      }
                    />
                  )}
                </Field>
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Field name="category">
                  {({ field }: FieldProps) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        setFieldValue("category", value)
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.category && touched.category
                            ? "border-red-500"
                            : ""
                        }
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {property.type === "room" ? (
                          <>
                            <SelectItem value="hotel">Hotel Room</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="midsize">Midsize</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="sports">Sports Car</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="place">Specific Address *</Label>
                <Field name="place">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="place"
                      placeholder={
                        property.type === "room"
                          ? "Building name, street address"
                          : "Parking location, building name"
                      }
                      className={
                        errors.place && touched.place ? "border-red-500" : ""
                      }
                    />
                  )}
                </Field>
                {errors.place && touched.place && (
                  <p className="text-red-500 text-sm mt-1">{errors.place}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Field name="pincode">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="pincode"
                      placeholder="12345"
                      className={
                        errors.pincode && touched.pincode
                          ? "border-red-500"
                          : ""
                      }
                    />
                  )}
                </Field>
                {errors.pincode && touched.pincode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Field name="description">
                {({ field }: FieldProps) => (
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Enter property description"
                    rows={4}
                    className={
                      errors.description && touched.description
                        ? "border-red-500"
                        : ""
                    }
                  />
                )}
              </Field>
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Property-specific fields */}
          {property.type === "room" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Room Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomNumber">Room Number *</Label>
                  <Field name="roomNumber">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="roomNumber"
                        placeholder="A101"
                        disabled
                        className={
                          `bg-gray-100 cursor-not-allowed ${
                            errors.roomNumber && touched.roomNumber
                              ? "border-red-500"
                              : ""
                          }`
                        }
                      />
                    )}
                  </Field>
                  <p className="text-xs text-gray-500 mt-1">
                    Room number cannot be changed after creation
                  </p>
                </div>

                <div>
                  <Label htmlFor="type">Room Type *</Label>
                  <Field name="type">
                    {({ field }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => setFieldValue("type", value)}
                      >
                        <SelectTrigger
                          className={
                            errors.type && touched.type ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="double">Double</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                          <SelectItem value="deluxe">Deluxe</SelectItem>
                          <SelectItem value="presidential">
                            Presidential
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.type && touched.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Field name="bedrooms">
                    {({ field }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          setFieldValue("bedrooms", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.bedrooms && touched.bedrooms
                              ? "border-red-500"
                              : ""
                          }
                        >
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
                    )}
                  </Field>
                  {errors.bedrooms && touched.bedrooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bedrooms}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Field name="bathrooms">
                    {({ field }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          setFieldValue("bathrooms", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.bathrooms && touched.bathrooms
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="4+">4+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.bathrooms && touched.bathrooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bathrooms}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Field name="area">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="area"
                        type="text"
                        placeholder="1200"
                      />
                    )}
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Guest Capacity *</Label>
                  <Field name="capacity">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="capacity"
                        type="text"
                        placeholder="4"
                        min="1"
                        max="10"
                        className={
                          errors.capacity && touched.capacity
                            ? "border-red-500"
                            : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.capacity && touched.capacity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="floor">Floor Number *</Label>
                  <Field name="floor">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="floor"
                        type="text"
                        placeholder="5"
                        min="1"
                        max="100"
                        className={
                          errors.floor && touched.floor ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.floor && touched.floor && (
                    <p className="text-red-500 text-sm mt-1">{errors.floor}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {property.type === "car" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Vehicle Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Field name="brand">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="brand"
                        placeholder="BMW"
                        className={
                          errors.brand && touched.brand ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.brand && touched.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="model">Model *</Label>
                  <Field name="model">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="model"
                        placeholder="X5"
                        className={
                          errors.model && touched.model ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.model && touched.model && (
                    <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Field name="year">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="year"
                        type="text"
                        placeholder="2023"
                        min="1990"
                        max={new Date().getFullYear() + 1}
                        className={
                          errors.year && touched.year ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.year && touched.year && (
                    <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="licensePlate">License Plate *</Label>
                  <Field name="licensePlate">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="licensePlate"
                        placeholder="ABC-123"
                        disabled
                        className={
                          `bg-gray-100 cursor-not-allowed ${
                            errors.licensePlate && touched.licensePlate
                              ? "border-red-500"
                              : ""
                          }`
                        }
                      />
                    )}
                  </Field>
                  <p className="text-xs text-gray-500 mt-1">
                    License plate cannot be changed after creation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fuelType">Fuel Type *</Label>
                  <Field name="fuelType">
                    {({ field }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          setFieldValue("fuelType", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.fuelType && touched.fuelType
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.fuelType && touched.fuelType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fuelType}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="transmission">Transmission *</Label>
                  <Field name="transmission">
                    {({ field }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          setFieldValue("transmission", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.transmission && touched.transmission
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.transmission && touched.transmission && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.transmission}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seatingCapacity">Seating Capacity *</Label>
                  <Field name="seatingCapacity">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="seatingCapacity"
                        type="text"
                        placeholder="5"
                        min="2"
                        max="8"
                        className={
                          errors.seatingCapacity && touched.seatingCapacity
                            ? "border-red-500"
                            : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.seatingCapacity && touched.seatingCapacity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.seatingCapacity}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="color">Color *</Label>
                  <Field name="color">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        id="color"
                        placeholder="Black"
                        className={
                          errors.color && touched.color ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  {errors.color && touched.color && (
                    <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Property Images
              </h3>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                {values.images.length}/8 photos
              </Badge>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-300 transition-colors">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload property images
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  e.target.files &&
                  handleImageUpload(
                    e.target.files,
                    setFieldValue,
                    values.images
                  )
                }
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

            {values.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {values.images.map((image, index) => (
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
                      onClick={() =>
                        removeImage(index, setFieldValue, values.images)
                      }
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
              <h3 className="text-lg font-semibold text-gray-900">
                Amenities & Features
              </h3>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                {values.amenities.length} selected
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(property.type === "room" ? roomAmenities : carAmenities).map(
                (amenity) => (
                  <div
                    key={amenity.id}
                    onClick={() =>
                      toggleAmenity(amenity.id, setFieldValue, values.amenities)
                    }
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      values.amenities.includes(amenity.id)
                        ? "border-amber-300 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        values.amenities.includes(amenity.id)
                          ? "bg-amber-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <amenity.icon
                        className={`h-4 w-4 ${
                          values.amenities.includes(amenity.id)
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium flex-1 ${
                        values.amenities.includes(amenity.id)
                          ? "text-amber-700"
                          : "text-gray-700"
                      }`}
                    >
                      {amenity.label}
                    </span>
                    {values.amenities.includes(amenity.id) && (
                      <Check className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
