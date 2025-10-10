import RoomDetailPage from "@/components/base/containers/Room/RoomDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Room Details | Ijara Hub Premium Rental Service",
  description:
    "Discover detailed information about our premium room rentals at Ijara Hub. Explore amenities, pricing, and availability to find your perfect accommodation. Book your ideal room today!",
  keywords: [
    "Ijara Hub",
    "Room Details",
    "Premium Rooms",
    "Room Amenities",
    "Room Pricing",
    "Room Availability",
    "Room Features",
    "Room Specifications",
    "Room Information",
    "Room Rental Details",
    "Room Booking Details",
    "Room Rental Options",
    "Room Rental Services",
    "Room Rental Agency",
    "Room Rental Company",
    "Room Rental Platform",
    "Room Rental Website",
    "Room Rental App",
    "Room Rental Experience",
    "Room Rental Choices",
  ],
};

const Room = () => {
  return (
    <div>
      <RoomDetailPage />
    </div>
  );
};

export default Room;
