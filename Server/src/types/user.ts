import mongoose, { Model } from "mongoose";

export interface IUser {
  customId: string; // Custom unique ID field
  fname: string;
  lname: string;
  email: string;
  password?: string; // Optional for Google users
  googleId?: string; // Google OAuth ID
  gender?: "male" | "female" | "other"; // Optional for Google users initially
  age: number;
  role: "admin" | "owner" | "renter";
  phone?: string; // Optional for Google users initially
  address?: {
    street?: string;
    city?: string;
    emirate?: string;
    zipCode?: string;
  };
  companyDetails?: {
    companyName: string;
    companyAddress: {
      place: string;
      pincode: number;
    };
    companyEmail: string;
    isCompanyEmailVerified: boolean;
    isCompanyVerified: boolean;
    companyPhone: number;
    since: number;
    bio: string;
  };
  profileImage?: string | null;
  isVerified: boolean;
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
