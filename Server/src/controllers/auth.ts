import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User from "../models/user";

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    res.json({ message: "Admin login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Admin login failed" });
  }
};

// Owner/Renter Login with role selection
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!role || !["owner", "renter"].includes(role)) {
      return res.status(400).json({ error: "Valid role required" });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Owner Signup
export const ownerSignup = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password, phone, gender, companyDetails } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User({
      fname,
      lname,
      email,
      password,
      phone,
      gender,
      role: "owner",
      companyDetails
    });

    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    res.status(201).json({ message: "Owner registered successfully", token, user });
  } catch (error) {
    res.status(500).json({ error: "Owner registration failed" });
  }
};

// Renter Signup
export const renterSignup = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password, phone, gender, age, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User({
      fname,
      lname,
      email,
      password,
      phone,
      gender,
      age,
      address,
      role: "renter"
    });

    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    res.status(201).json({ message: "Renter registered successfully", token, user });
  } catch (error) {
    res.status(500).json({ error: "Renter registration failed" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};