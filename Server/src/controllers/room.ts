import { Request, Response } from "express";
import Room from "../models/room";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { ImageUtils } from "../utils/imageUtils";

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
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          select: "fname lname profileImage"
        }
      })
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
    const room = await Room.findById(req.params.id)
      .populate("owner", "fname lname email phone role")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          select: "fname lname profileImage"
        }
      });

    if (!room) return errorResponse(res, 404, "Room not found");
    
    return successResponse(res, "Room fetched successfully", { room });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch room", error);
  }
};

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }

    const { images, ...roomData } = req.body;

    // Validate image URLs if provided
    if (images && images.length > 0) {
      // console.log('Validating room images:', images);
      if (!ImageUtils.validateImageUrls(images)) {
        // console.log('Image validation failed for URLs:', images);
        return errorResponse(res, 400, "Invalid image URLs. Images must be from our S3 bucket");
      }
      if (!ImageUtils.validateImageType(images, 'rooms')) {
        return errorResponse(res, 400, "Invalid image type. Images must be uploaded as 'rooms' type");
      }
    }

    const room = new Room({
      ...roomData,
      images: images || [],
      owner: req.user.id,
    });

    await room.save();
    const populatedRoom = await room.populate([
      { path: "owner", select: "fname lname email phone role" },
      {
        path: "reviews",
        populate: {
          path: "reviewer",
          select: "fname lname profileImage"
        }
      }
    ]);

    return successResponse(res, "Room created successfully", {
      room: populatedRoom,
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.roomNumber) {
      return errorResponse(res, 400, "Room number already exists");
    }
    return errorResponse(res, 500, "Failed to create room", error);
  }
};

export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const existingRoom = await Room.findById(req.params.id);
    if (!existingRoom) return errorResponse(res, 404, "Room not found");

    const { images, ...updateData } = req.body;

    // Validate new image URLs if provided
    if (images && images.length > 0) {
      if (!ImageUtils.validateImageUrls(images)) {
        return errorResponse(res, 400, "Invalid image URLs. Images must be from our S3 bucket");
      }
      if (!ImageUtils.validateImageType(images, 'rooms')) {
        return errorResponse(res, 400, "Invalid image type. Images must be uploaded as 'rooms' type");
      }
    }

    // Delete old images if new images are provided
    if (images && existingRoom.images && existingRoom.images.length > 0) {
      await ImageUtils.deleteImages(existingRoom.images);
    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { ...updateData, ...(images && { images }) },
      { new: true }
    )
    .populate("owner", "fname lname email phone role")
    .populate({
      path: "reviews",
      populate: {
        path: "reviewer",
        select: "fname lname profileImage"
      }
    });

    return successResponse(res, "Room updated successfully", { room });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update room", error);
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return errorResponse(res, 404, "Room not found");

    // Delete associated images from S3
    if (room.images && room.images.length > 0) {
      await ImageUtils.deleteImages(room.images);
    }

    await Room.findByIdAndDelete(req.params.id);
    return successResponse(res, "Room deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete room", error);
  }
};
