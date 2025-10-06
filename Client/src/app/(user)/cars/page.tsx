import CarsPage from "@/components/renter/containers/Car/CarListing";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cars Listing | Ijara Hub Premium Rental Service",
  description:
    "Explore our premium car rentals at Ijara Hub. Choose from a wide range of vehicles to suit your style and needs. Book your perfect ride today!",
  keywords: [
    "Ijara Hub",
    "Car Listing",
    "Car Rentals",
    "Premium Cars",
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

const Cars = () => {
  return (
    <div>
      <CarsPage />
    </div>
  );
};

export default Cars;
