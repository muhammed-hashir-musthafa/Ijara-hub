import { Request, Response } from "express";
import Car from "../models/car";

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
    
    const cars = await Car.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });
    
    res.json({ cars });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ car });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ car });
  } catch (error) {
    res.status(500).json({ error: "Failed to create car" });
  }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ car });
  } catch (error) {
    res.status(500).json({ error: "Failed to update car" });
  }
};

export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete car" });
  }
};