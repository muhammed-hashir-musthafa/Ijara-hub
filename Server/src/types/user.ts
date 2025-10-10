import mongoose, { Model } from "mongoose";

 export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date;
  role: "admin" | "customer" | "staff";
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  profileImage?: string | null;
  isVerified: boolean;
  roomBookings?: mongoose.Types.ObjectId[];
  carRentals?: mongoose.Types.ObjectId[];
  isActive: boolean;
  isDeleted: boolean;
  lastLogin?: Date | null;
}

// 2. Define methods interface
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): Record<string, unknown>;
}

// 3. Combine into a Mongoose Model type
export type UserModel = Model<IUser, {}, IUserMethods>;
