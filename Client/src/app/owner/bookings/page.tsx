import BookingPage from "@/components/owner/containers/Bookings/Bookings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Booking Owner | Ijara Hub Premium Rental Service",
  description: "Manage your bookings and rental requests on Ijara Hub.",
  keywords: [
    "Ijara Hub",
    "Bookings",
    "Rental Services",
    "Ijara Hub",
    "Car Rentals",
    "Property Rentals",
    "Luxury Rentals",
    "Room Rentals",
    "Premium Service",
    "Vehicle Hire",
    "Apartment Rentals",
    "Vacation Rentals",
    "Short-term Rentals",
    "Long-term Rentals",
    "Rental Deals",
    "Customer Satisfaction",
    "Rental Requests",
    "Rental Management",
    "Booking Management",
    "Booking Owner",
    "Rental Owner",
    "Ijara Hub Bookings",
    "Ijara Hub Rentals",
    "Ijara Hub Booking Management",
    "Ijara Hub Rental Management",
    "Ijara Hub Owner Bookings",
    "Ijara Hub Owner Rentals",
  ],
};

const Booking = () => {
  return (
    <div>
      <BookingPage />
    </div>
  );
};

export default Booking;
