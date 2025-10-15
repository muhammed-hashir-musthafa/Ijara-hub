import { Request, Response } from "express";
import User from "../models/user";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string; };
}

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({ isDeleted: false }).select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};