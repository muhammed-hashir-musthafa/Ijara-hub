import { Request, Response } from "express";
import Car from "../models/car";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { ImageUtils } from "../utils/imageUtils";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const getCars = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minRate,
      maxRate,
      transmission,
    } = req.query;

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
      "Cars fetched successfully",
      { cars },
      pagination
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch cars", error);
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("owner", "fname lname email phone role")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          select: "fname lname profileImage"
        }
      });

    if (!car) return errorResponse(res, 404, "Car not found");
    
    return successResponse(res, "Car fetched successfully", { car });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch car", error);
  }
};

export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }

    const { images, ...carData } = req.body;

    // Validate image URLs if provided
    if (images && images.length > 0) {
      // console.log('Validating car images:', images);
      if (!ImageUtils.validateImageUrls(images)) {
        // console.log('Image validation failed for URLs:', images);
        return errorResponse(res, 400, "Invalid image URLs. Images must be from our S3 bucket");
      }
      if (!ImageUtils.validateImageType(images, 'cars')) {
        return errorResponse(res, 400, "Invalid image type. Images must be uploaded as 'cars' type");
      }
    }

    const car = new Car({
      ...carData,
      images: images || [],
      owner: req.user.id,
    });

    await car.save();
    const populatedCar = await car.populate([
      { path: "owner", select: "fname lname email phone role" },
      {
        path: "reviews",
        populate: {
          path: "reviewer",
          select: "fname lname profileImage"
        }
      }
    ]);

    return successResponse(res, "Car created successfully", {
      car: populatedCar,
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.licensePlate) {
      return errorResponse(res, 400, "License plate already exists");
    }
    return errorResponse(res, 500, "Failed to create car", error);
  }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    const existingCar = await Car.findById(req.params.id);
    if (!existingCar) return errorResponse(res, 404, "Car not found");

    const { images, ...updateData } = req.body;

    // Validate new image URLs if provided
    if (images && images.length > 0) {
      if (!ImageUtils.validateImageUrls(images)) {
        return errorResponse(res, 400, "Invalid image URLs. Images must be from our S3 bucket");
      }
      if (!ImageUtils.validateImageType(images, 'cars')) {
        return errorResponse(res, 400, "Invalid image type. Images must be uploaded as 'cars' type");
      }
    }

    // Delete old images if new images are provided
    if (images && existingCar.images && existingCar.images.length > 0) {
      await ImageUtils.deleteImages(existingCar.images);
    }

    const car = await Car.findByIdAndUpdate(
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

    return successResponse(res, "Car updated successfully", { car });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update car", error);
  }
};

export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return errorResponse(res, 404, "Car not found");

    // Delete associated images from S3
    if (car.images && car.images.length > 0) {
      await ImageUtils.deleteImages(car.images);
    }

    await Car.findByIdAndDelete(req.params.id);
    return successResponse(res, "Car deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete car", error);
  }
};
