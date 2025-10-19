import { Request, Response } from "express";
import Room from "../models/room";
import Review from "../models/review";
import { successResponse, errorResponse } from "../utils/responseHandler";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
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

    const totalItems = await Room.countDocuments(filter);
    const rooms = await Room.find(filter)
      .populate("owner", "fname lname email phone role")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const pagination = {
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / Number(limit)),
      totalItems,
    };

    return successResponse(
      res,
      "Rooms fetched successfully",
      { rooms },
      pagination
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch rooms", error);
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "owner",
      "fname lname email phone role"
    );

    if (!room) return errorResponse(res, 404, "Room not found");
    
    // Calculate average rating
    const reviews = await Review.find({ propertyId: req.params.id, propertyType: 'room' });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    const reviewCount = reviews.length;
    
    const roomWithStats = {
      ...room.toObject(),
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount
    };
    
    return successResponse(res, "Room fetched successfully", { room: roomWithStats });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch room", error);
  }
};

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }
    // console.log(req.user.id, "oiud", req.user)
    // Attach the owner automatically
    const roomData = {
      ...req.body,
      owner: req.user.id,
    };

    const room = new Room(roomData);

    await room.save();
    const populatedRoom = await room.populate(
      "owner",
      "fname lname email phone role"
    );

    return successResponse(res, "Room created successfully", {
      room: populatedRoom,
    });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create room", error);
  }
};

export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("owner", "fname lname email phone role");
    if (!room) return errorResponse(res, 404, "Room not found");
    return successResponse(res, "Room updated successfully", { room });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update room", error);
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return errorResponse(res, 404, "Room not found");
    return successResponse(res, "Room deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete room", error);
  }
};
