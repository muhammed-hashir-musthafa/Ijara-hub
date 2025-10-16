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