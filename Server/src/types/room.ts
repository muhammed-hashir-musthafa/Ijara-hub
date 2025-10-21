import mongoose, { Model } from "mongoose";

export interface IRoom {
  roomNumber: string;
  title: string;
  description?: string;
  category: "hotel" | "apartment" | "villa" | "studio" | "penthouse";
  type: "single" | "double" | "suite" | "deluxe" | "presidential";
  rooms: {
    bedroom: number;
    bathroom: number;
  };
  areaSqft?: number;
  pricePerNight: number;
  capacity: number;
  floor: number;

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

export interface IRoomMethods {}

export type RoomModel = Model<IRoom, {}, IRoomMethods>;