import { Request, Response } from "express";
import Car from "../models/car";
import { successResponse, errorResponse } from "../utils/responseHandler";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string; };
}

export const getCars = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, minRate, maxRate, transmission } = req.query;
    
    const filter: any = {};
    if (category) filter.category = category;
    if (transmission) filter.transmission = transmission;
    if (minRate || maxRate) {
      filter.dailyRate = {};
      if (minRate) filter.dailyRate.$gte = Number(minRate);
      if (maxRate) filter.dailyRate.$lte = Number(maxRate);
    }
    
    const totalItems = await Car.countDocuments(filter);
    const cars = await Car.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });
    
    const pagination = {
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / Number(limit)),
      totalItems
    };
    
    return successResponse(res, "Cars fetched successfully", { cars }, pagination);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch cars", error);
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return errorResponse(res, 404, "Car not found");
    return successResponse(res, "Car fetched successfully", { car });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch car", error);
  }
};

export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = new Car(req.body);
    await car.save();
    return successResponse(res, "Car created successfully", { car });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create car", error);
  }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return errorResponse(res, 404, "Car not found");
    return successResponse(res, "Car updated successfully", { car });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update car", error);
  }
};

export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return errorResponse(res, 404, "Car not found");
    return successResponse(res, "Car deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete car", error);
  }
};