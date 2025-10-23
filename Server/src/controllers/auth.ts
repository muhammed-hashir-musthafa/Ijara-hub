import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User from "../models/user";
import { successResponse, errorResponse } from "../utils/responseHandler";

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return errorResponse(res, 401, "Invalid admin credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid admin credentials");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return successResponse(res, "Admin login successful", { token, user });
  } catch (error) {
    return errorResponse(res, 500, "Admin login failed", error);
  }
};

// Owner/Renter Login with role selection
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!role || !["owner", "renter"].includes(role)) {
      return errorResponse(res, 400, "Valid role required");
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return successResponse(res, "Login successful", { token, user });
  } catch (error) {
    return errorResponse(res, 500, "Login failed", error);
  }
};

// Owner Signup
export const ownerSignup = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password, phone, gender, companyDetails } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already exists");
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

    return successResponse(res, "Owner registered successfully", { token, user });
  } catch (error) {
    return errorResponse(res, 500, "Owner registration failed", error);
  }
};

// Renter Signup
export const renterSignup = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password, phone, gender, age, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already exists");
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

    return successResponse(res, "Renter registered successfully", { token, user });
  } catch (error) {
    return errorResponse(res, 500, "Renter registration failed", error);
  }
};

export const logout = async (req: Request, res: Response) => {
  return successResponse(res, "Logout successful");
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) return errorResponse(res, 404, "User not found");
    return successResponse(res, "Profile fetched successfully", { user });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch profile", error);
  }
};

// Google OAuth
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { googleId, email, name, image } = req.body;

    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user with Google data
      const [fname, ...lnameArr] = name.split(' ');
      user = new User({
        fname,
        lname: lnameArr.join(' ') || '',
        email,
        googleId,
        profileImage: image,
        role: "renter", // Default role for Google users
        isVerified: true // Google users are pre-verified
      });
      await user.save();
    } else if (!user.googleId) {
      // Link existing account with Google
      user.googleId = googleId;
      user.profileImage = image;
      await user.save();
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return successResponse(res, "Google authentication successful", { token, user });
  } catch (error) {
    return errorResponse(res, 500, "Google authentication failed", error);
  }
};