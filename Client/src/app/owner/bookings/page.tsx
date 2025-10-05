import BookingPage from "@/components/owner/containers/Bookings/Bookings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Booking Owner | Ijara Hub Premium Room & Car Rentals",
  description: "",
  keywords: [""],
};


const Booking = () => {
  return (
    <div>
      <BookingPage />
    </div>
  );
};

export default Booking;
