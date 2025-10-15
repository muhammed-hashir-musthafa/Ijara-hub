import { Request, Response } from "express";
import Room from "../models/room";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string; };
}

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, type, minPrice, maxPrice } = req.query;
    
    const filter: any = {};
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    
    const rooms = await Room.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });
    
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ room });
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
};

export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: "Failed to update room" });
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room" });
  }
};