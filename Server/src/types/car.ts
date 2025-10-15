import mongoose, { Model } from "mongoose";

export interface ICar {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  dailyRate: number;
  category: "economy" | "compact" | "midsize" | "luxury" | "suv" | "sports" | "convertible";
  transmission: "manual" | "automatic" | "cvt";
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  seatingCapacity: number;
  adress: {
    place?: string;
    pincode?: number;
  };
  features: string[];
  images: string[];
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICarMethods {
  calculateRentalCost(days: number, discountPercent?: number): number;
}

export type CarModel = Model<ICar, {}, ICarMethods>;