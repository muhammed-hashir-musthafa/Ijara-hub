import CarDetailPage from "@/components/base/containers/Car/CarDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Car Detail | Ijara Hub Premium Rental Service",
  description:
    "Discover detailed information about our premium car rentals at Ijara Hub. View specifications, features, and book your ideal vehicle today!",
  keywords: [
    "Ijara Hub",
    "Car Rentals",
    "Premium Cars",
    "Car Specifications",
    "Car Features",
    "Car Details",
    "Luxury Car Hire",
    "Affordable Car Rentals",
    "Car Rental Services",
    "Rent a Car",
    "Vehicle Rentals",
    "Car Hire",
    "Online Car Booking",
    "Car Rental Deals",
    "Car Rental Offers",
    "Car Rental Agency",
    "Car Rental Company",
    "Car Rental Platform",
    "Car Rental Website",
    "Car Rental App",
    "Car Rental Experience",
    "Car Rental Options",
    "Car Rental Selection",
    "Car Rental Fleet",
    "Car Rental Choices",
  ],
};

const CarDetail = () => {
  return (
    <div>
      <CarDetailPage />
    </div>
  );
};

export default CarDetail;
