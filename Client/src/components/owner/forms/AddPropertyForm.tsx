"use client";

import React, { useState } from "react";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
  Card,
  CardContent,
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
import { Badge } from "@/components/base/ui/badge";
import {
  Save,
  Home,
  Car,
  Upload,
  X,
  Check,
  Wifi,
  Coffee,
  Tv,
  AirVent,
  Users,
  DollarSign,
  Sparkles,
  Camera,
  Globe,
  Shield,
  Clock,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CarForm, PropertyForm, RoomForm } from "@/types/owner";

// Type guards
function isRoomForm(form: PropertyForm): form is RoomForm {
  return "bedrooms" in form;
}

function isCarForm(form: PropertyForm): form is CarForm {
  return "brand" in form;
}

// Validation Schemas
const roomValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(1, "Price must be at least 1")
    .typeError("Must be Number"),
  category: Yup.string().required("Category is required"),
  roomNumber: Yup.string().required("Room number is required"),
  type: Yup.string().required("Room type is required"),
  bedrooms: Yup.string().required("Bedrooms is required"),
  bathrooms: Yup.string().required("Bathrooms is required"),
  area: Yup.number()
    .positive("Area must be positive")
    .optional()
    .typeError("Must be Number"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1")
    .typeError("Must be Number"),
  floor: Yup.number()
    .required("Floor is required")
    .min(1, "Floor must be at least 1")
    .typeError("Must be Number"),
  place: Yup.string().optional(),
  pincode: Yup.number().optional().typeError("Must be Number"),
  images: Yup.array().min(1, "At least one image is required"),
  amenities: Yup.array().of(Yup.string()),
});

const carValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(1, "Price must be at least 1")
    .typeError("Must be Number"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number()
    .required("Year is required")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future")
    .typeError("Must be Number"),
  licensePlate: Yup.string().required("License plate is required"),
  fuelType: Yup.string().required("Fuel type is required"),
  transmission: Yup.string().required("Transmission is required"),
  seatingCapacity: Yup.number()
    .required("Seating capacity is required")
    .min(2, "Must be at least 2")
    .max(8, "Cannot exceed 8")
    .typeError("Must be Number"),
  color: Yup.string().required("Color is required"),
  place: Yup.string().optional(),
  pincode: Yup.number().optional().typeError("Must be Number"),
  images: Yup.array().min(1, "At least one image is required"),
  amenities: Yup.array().of(Yup.string()),
});

// Initial Values
const initialRoomValues: RoomForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  roomNumber: "",
  type: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  capacity: "",
  floor: "",
  place: "",
  pincode: "",
  images: [],
  amenities: [],
};

const initialCarValues: CarForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  model: "",
  year: "",
  licensePlate: "",
  fuelType: "",
  transmission: "",
  seatingCapacity: "",
  color: "",
  place: "",
  pincode: "",
  images: [],
  amenities: [],
};

interface AddPropertyFormProps {
  propertyType: "room" | "car";
  onSubmit: (values: PropertyForm, actions: FormikHelpers<PropertyForm>) => void;
}

export default function AddPropertyForm({ propertyType, onSubmit }: AddPropertyFormProps) {
  const [draggedOver, setDraggedOver] = useState(false);

  const removeImage = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void,
    values: PropertyForm
  ) => {
    const updatedImages = values.images.filter((_, i: number) => i !== index);
    setFieldValue("images", updatedImages);
  };

  const toggleAmenity = (
    amenity: string,
    setFieldValue: (field: string, value: unknown) => void,
    values: PropertyForm
  ) => {
    const updatedAmenities = values.amenities.includes(amenity)
      ? values.amenities.filter((a: string) => a !== amenity)
      : [...values.amenities, amenity];
    setFieldValue("amenities", updatedAmenities);
  };

  const handleImageUpload = (
    files: FileList,
    setFieldValue: (field: string, value: unknown) => void,
    values: PropertyForm
  ) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedImages = [...values.images, ...newImages].slice(0, 8);
    setFieldValue("images", updatedImages);
  };

  const roomCategories = [
    { value: "hotel", label: "Hotel Room", icon: "🏨" },
    { value: "apartment", label: "Apartment", icon: "🏠" },
    { value: "villa", label: "Villa", icon: "🏡" },
    { value: "studio", label: "Studio", icon: "🏢" },
    { value: "penthouse", label: "Penthouse", icon: "🏙️" },
  ];

  const carCategories = [
    { value: "economy", label: "Economy", icon: "🚗" },
    { value: "compact", label: "Compact", icon: "🚙" },
    { value: "midsize", label: "Midsize", icon: "🚘" },
    { value: "luxury", label: "Luxury", icon: "🚔" },
    { value: "suv", label: "SUV", icon: "🚐" },
    { value: "sports", label: "Sports Car", icon: "🏎️" },
  ];

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

  const getFieldError = (
    fieldName: string,
    errors: Record<string, unknown>,
    touched: Record<string, unknown>
  ) => {
    return errors[fieldName] && touched[fieldName] ? "border-red-500" : "";
  };

  return (
    <Formik<PropertyForm>
      initialValues={
        propertyType === "room" ? initialRoomValues : initialCarValues
      }
      validationSchema={
        propertyType === "room"
          ? roomValidationSchema
          : carValidationSchema
      }
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Property Title *
                  </Label>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    placeholder={
                      propertyType === "room"
                        ? "Luxury Suite in Dubai Marina"
                        : "BMW X5 - Premium SUV"
                    }
                    className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                      "title",
                      errors,
                      touched
                    )}`}
                  />
                  <ErrorMessage name="title">
                    {(msg: string) => (
                      <div className="text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category *
                  </Label>
                  <Select
                    value={values.category}
                    onValueChange={(value: string) =>
                      setFieldValue("category", value)
                    }
                  >
                    <SelectTrigger
                      className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                        "category",
                        errors,
                        touched
                      )}`}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(propertyType === "room"
                        ? roomCategories
                        : carCategories
                      ).map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="category">
                    {(msg: string) => (
                      <div className="text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder={
                    propertyType === "room"
                      ? "Describe your property, its features, and what makes it special..."
                      : "Describe your vehicle, its condition, and special features..."
                  }
                  className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 min-h-[120px] transition-all duration-300 ${getFieldError(
                    "description",
                    errors,
                    touched
                  )}`}
                />
                <ErrorMessage name="description">
                  {(msg: string) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700"
                  >
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-amber-500" />
                      Price (AED per{" "}
                      {propertyType === "room" ? "night" : "day"}) *
                    </div>
                  </Label>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    type="text"
                    placeholder="500"
                    className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                      "price",
                      errors,
                      touched
                    )}`}
                  />
                  <ErrorMessage name="price">
                    {(msg: string) => (
                      <div className="text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property-specific fields */}
          {propertyType === "room" && isRoomForm(values) && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <Home className="h-5 w-5 mr-2 text-amber-500" />
                  Room Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="roomNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Room Number *
                    </Label>
                    <Field
                      as={Input}
                      id="roomNumber"
                      name="roomNumber"
                      placeholder="A101"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "roomNumber",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="roomNumber">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="type"
                      className="text-sm font-medium text-gray-700"
                    >
                      Room Type *
                    </Label>
                    <Select
                      value={values.type}
                      onValueChange={(value: string) =>
                        setFieldValue("type", value)
                      }
                    >
                      <SelectTrigger
                        className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                          "type",
                          errors,
                          touched
                        )}`}
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
                    <ErrorMessage name="type">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="bedrooms"
                      className="text-sm font-medium text-gray-700"
                    >
                      Bedrooms *
                    </Label>
                    <Select
                      value={values.bedrooms}
                      onValueChange={(value: string) =>
                        setFieldValue("bedrooms", value)
                      }
                    >
                      <SelectTrigger
                        className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                          "bedrooms",
                          errors,
                          touched
                        )}`}
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
                    <ErrorMessage name="bedrooms">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bathrooms"
                      className="text-sm font-medium text-gray-700"
                    >
                      Bathrooms *
                    </Label>
                    <Select
                      value={values.bathrooms}
                      onValueChange={(value: string) =>
                        setFieldValue("bathrooms", value)
                      }
                    >
                      <SelectTrigger
                        className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                          "bathrooms",
                          errors,
                          touched
                        )}`}
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
                    <ErrorMessage name="bathrooms">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="area"
                      className="text-sm font-medium text-gray-700"
                    >
                      Area (sq ft)
                    </Label>
                    <Field
                      as={Input}
                      id="area"
                      name="area"
                      type="text"
                      placeholder="1200"
                      className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300"
                    />
                    <ErrorMessage name="area">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="capacity"
                      className="text-sm font-medium text-gray-700"
                    >
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-amber-500" />
                        Guest Capacity *
                      </div>
                    </Label>
                    <Field
                      as={Input}
                      id="capacity"
                      name="capacity"
                      type="text"
                      placeholder="4"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "capacity",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="capacity">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="floor"
                      className="text-sm font-medium text-gray-700"
                    >
                      Floor Number *
                    </Label>
                    <Field
                      as={Input}
                      id="floor"
                      name="floor"
                      type="text"
                      placeholder="5"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "floor",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="floor">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="place"
                      className="text-sm font-medium text-gray-700"
                    >
                      Specific Address
                    </Label>
                    <Field
                      as={Input}
                      id="place"
                      name="place"
                      placeholder="Building name, street address"
                      className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="pincode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </Label>
                    <Field
                      as={Input}
                      id="pincode"
                      name="pincode"
                      type="text"
                      placeholder="12345"
                      className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {propertyType === "car" && isCarForm(values) && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <Car className="h-5 w-5 mr-2 text-amber-500" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="brand"
                      className="text-sm font-medium text-gray-700"
                    >
                      Brand *
                    </Label>
                    <Field
                      as={Input}
                      id="brand"
                      name="brand"
                      placeholder="BMW"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "brand",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="brand">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="model"
                      className="text-sm font-medium text-gray-700"
                    >
                      Model *
                    </Label>
                    <Field
                      as={Input}
                      id="model"
                      name="model"
                      placeholder="X5"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "model",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="model">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="year"
                      className="text-sm font-medium text-gray-700"
                    >
                      Year *
                    </Label>
                    <Field
                      as={Input}
                      id="year"
                      name="year"
                      type="text"
                      placeholder="2023"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "year",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="year">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="licensePlate"
                      className="text-sm font-medium text-gray-700"
                    >
                      License Plate *
                    </Label>
                    <Field
                      as={Input}
                      id="licensePlate"
                      name="licensePlate"
                      placeholder="ABC-123"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "licensePlate",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="licensePlate">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fuelType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Fuel Type *
                    </Label>
                    <Select
                      value={values.fuelType}
                      onValueChange={(value: string) =>
                        setFieldValue("fuelType", value)
                      }
                    >
                      <SelectTrigger
                        className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                          "fuelType",
                          errors,
                          touched
                        )}`}
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
                    <ErrorMessage name="fuelType">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="transmission"
                      className="text-sm font-medium text-gray-700"
                    >
                      Transmission *
                    </Label>
                    <Select
                      value={values.transmission}
                      onValueChange={(value: string) =>
                        setFieldValue("transmission", value)
                      }
                    >
                      <SelectTrigger
                        className={`border-gray-200 focus:border-amber-300 ${getFieldError(
                          "transmission",
                          errors,
                          touched
                        )}`}
                      >
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">
                          Automatic
                        </SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="cvt">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorMessage name="transmission">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="seatingCapacity"
                      className="text-sm font-medium text-gray-700"
                    >
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-amber-500" />
                        Seating Capacity *
                      </div>
                    </Label>
                    <Field
                      as={Input}
                      id="seatingCapacity"
                      name="seatingCapacity"
                      type="text"
                      placeholder="5"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "seatingCapacity",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="seatingCapacity">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="color"
                      className="text-sm font-medium text-gray-700"
                    >
                      Color *
                    </Label>
                    <Field
                      as={Input}
                      id="color"
                      name="color"
                      placeholder="Black"
                      className={`border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300 ${getFieldError(
                        "color",
                        errors,
                        touched
                      )}`}
                    />
                    <ErrorMessage name="color">
                      {(msg: string) => (
                        <div className="text-red-500 text-sm mt-1">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="place"
                      className="text-sm font-medium text-gray-700"
                    >
                      Specific Address
                    </Label>
                    <Field
                      as={Input}
                      id="place"
                      name="place"
                      placeholder="Parking location, building name"
                      className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="pincode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </Label>
                    <Field
                      as={Input}
                      id="pincode"
                      name="pincode"
                      type="text"
                      placeholder="12345"
                      className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 transition-all duration-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Upload */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-400">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Camera className="h-5 w-5 mr-2 text-amber-500" />
                Property Images
                <Badge
                  variant="outline"
                  className="ml-auto bg-amber-50 text-amber-700 border-amber-200"
                >
                  {values.images.length}/8 photos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  draggedOver
                    ? "border-amber-400 bg-amber-50"
                    : "border-gray-300 hover:border-amber-300 hover:bg-amber-50/50"
                } ${
                  errors.images && touched.images ? "border-red-500" : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggedOver(true);
                }}
                onDragLeave={() => setDraggedOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDraggedOver(false);
                  const files = e.dataTransfer.files;
                  if (files.length > 0)
                    handleImageUpload(files, setFieldValue, values);
                }}
              >
                <div className="space-y-4">
                  <div className="inline-flex p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Property Images
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop images here, or click to browse
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
                          values
                        )
                      }
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-600"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Choose Images
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload up to 8 high-quality images (PNG, JPG, WEBP)
                  </p>
                </div>
              </div>
              <ErrorMessage name="images">
                {(msg: string) => (
                  <div className="text-red-500 text-sm mt-1">{msg}</div>
                )}
              </ErrorMessage>

              {/* Image Grid */}
              {values.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {values.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`Upload ${index + 1}`}
                        width={200}
                        height={100}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:shadow-lg transition-all duration-300"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index, setFieldValue, values)
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
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
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up animation-delay-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl flex-col sm:flex-row gap-2 sm:gap-0">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-amber-500" />
                  Amenities & Features
                </div>
                <Badge
                  variant="outline"
                  className="ml-0 sm:ml-auto bg-amber-50 text-amber-700 border-amber-200 mt-2 sm:mt-0"
                >
                  {values.amenities.length} selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {(propertyType === "room"
                  ? roomAmenities
                  : carAmenities
                ).map((amenity) => (
                  <div
                    key={amenity.id}
                    onClick={() =>
                      toggleAmenity(amenity.id, setFieldValue, values)
                    }
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                      values.amenities.includes(amenity.id)
                        ? "border-amber-300 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                        values.amenities.includes(amenity.id)
                          ? "bg-amber-500 shadow-lg"
                          : "bg-gray-100 group-hover:bg-amber-100"
                      }`}
                    >
                      <amenity.icon
                        className={`h-4 w-4 transition-colors ${
                          values.amenities.includes(amenity.id)
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors flex-1 ${
                        values.amenities.includes(amenity.id)
                          ? "text-amber-700"
                          : "text-gray-700"
                      }`}
                    >
                      {amenity.label}
                    </span>
                    {values.amenities.includes(amenity.id) && (
                      <Check className="h-4 w-4 text-amber-600 ml-2 flex-shrink-0 animate-in slide-in-from-right-1" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-3 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              {isSubmitting
                ? "Publishing..."
                : "Save & Publish Property"}
              <Sparkles className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}