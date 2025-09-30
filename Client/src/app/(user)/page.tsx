import HomePage from "@/components/renter/containers/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page | Ijara Hub Premium Room & Car Rentals",
  description:
    "Discover luxury room and car rentals across the UAE. Premium service, unmatched quality.",
  keywords: [
    "Ijara Hub",
    "Rental Services",
    "UAE Rentals",
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
  ],
};

const Home = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
