import mongoose, { Model } from "mongoose";

export interface IRoom {
  roomNumber: string;
  title: string;
  type: "single" | "double" | "suite" | "deluxe" | "presidential";
  rooms: {
    bedroom: number;
    bathroom: number;
  };
  areaSqft?: number;
  pricePerNight: number;
  amenities: string[];
  address: {
    place?: string;
    pincode?: number;
  };
  capacity: number;
  floor: number;
  images: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomMethods {}

export type RoomModel = Model<IRoom, {}, IRoomMethods>;