import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, gender, dateOfBirth } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and phone are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const user = new User({ name, email, password, phone, gender, dateOfBirth });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user, token }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};