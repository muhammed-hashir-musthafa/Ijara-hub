import mongoose, { Model } from "mongoose";

export interface ICar {
  title: string;
  description?: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  dailyRate: number;
  category: "economy" | "compact" | "midsize" | "luxury" | "suv" | "sports" | "convertible";
  transmission: "manual" | "automatic" | "cvt";
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  seatingCapacity: number;
  color: string;

  address: {
    place?: string;
    pincode?: number;
  };
  amenities: string[];
  images: string[];
  status: "active" | "inactive" | "pending";
  owner: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICarMethods {
  calculateRentalCost(days: number, discountPercent?: number): number;
}

export type CarModel = Model<ICar, {}, ICarMethods>;