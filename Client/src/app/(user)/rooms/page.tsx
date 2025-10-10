import RoomsPage from "@/components/renter/containers/Room/RoomListing";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rooms Listing | Ijara Hub Premium Rental Service",
  description:
    "Explore our premium room rentals at Ijara Hub. Find comfortable and affordable accommodations for your stay. Book your ideal room today!",
  keywords: [
    "Ijara Hub",
    "Room Rentals",
    "Room Listings",
    "Premium Rooms",
    "Comfortable Accommodations",
    "Affordable Room Rentals",
    "Room Rental Services",
    "Rent a Room",
    "Accommodation Rentals",
    "Room Hire",
    "Online Room Booking",
    "Room Rental Deals",
    "Room Rental Offers",
    "Room Rental Agency",
    "Room Rental Company",
    "Room Rental Platform",
    "Room Rental Website",
    "Room Rental App",
    "Room Rental Experience",
    "Room Rental Options",
    "Room Rental Selection",
    "Room Rental Choices",
  ],
};

const Rooms = () => {
  return (
    <div>
      <RoomsPage />
    </div>
  );
};

export default Rooms;
