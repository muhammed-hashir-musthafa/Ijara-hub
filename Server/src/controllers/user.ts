import { Request, Response } from "express";
import User from "../models/user";
import { successResponse, errorResponse } from "../utils/responseHandler";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string; };
}

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({ isDeleted: false }).select("-password");
    return successResponse(res, "Users fetched successfully", { users });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch users", error);
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return errorResponse(res, 404, "User not found");
    return successResponse(res, "User fetched successfully", { user });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch user", error);
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!user) return errorResponse(res, 404, "User not found");
    
    return successResponse(res, "User updated successfully", { user });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update user", error);
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!user) return errorResponse(res, 404, "User not found");
    
    return successResponse(res, "User deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete user", error);
  }
};

export const getOwnerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select("-password");
    if (!user) return errorResponse(res, 404, "Owner not found");
    
    const Room = require("../models/room").default;
    const Car = require("../models/car").default;
    const Review = require("../models/review").default;
    
    const [roomCount, carCount] = await Promise.all([
      Room.countDocuments({ owner: id }),
      Car.countDocuments({ owner: id })
    ]);
    
    const [rooms, cars] = await Promise.all([
      Room.find({ owner: id }).select("_id"),
      Car.find({ owner: id }).select("_id")
    ]);
    
    const propertyIds = [...rooms.map((r: any) => r._id), ...cars.map((c: any) => c._id)];
    const reviews = await Review.find({ propertyId: { $in: propertyIds } });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length : 0;
    
    const ownerProfile = {
      ...user.toObject(),
      stats: {
        totalProperties: roomCount + carCount,
        roomCount,
        carCount,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      }
    };
    
    return successResponse(res, "Owner profile fetched successfully", { owner: ownerProfile });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch owner profile", error);
  }
};