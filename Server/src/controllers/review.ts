import { Request, Response } from "express";
import Review from "../models/review";
import Room from "../models/room";
import Car from "../models/car";
import { successResponse, errorResponse } from "../utils/responseHandler";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }

    const { rating, comment, propertyType, propertyId } = req.body;

    // Verify property exists
    let property;
    if (propertyType === "room") {
      property = await Room.findById(propertyId);
    } else {
      property = await Car.findById(propertyId);
    }
    if (!property) {
      return errorResponse(res, 404, `${propertyType} not found`);
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      propertyId,
      reviewer: req.user.id,
    });
    if (existingReview) {
      return errorResponse(res, 400, "You have already reviewed this property");
    }

    const review = new Review({
      rating,
      comment,
      propertyType,
      propertyId,
      reviewer: req.user.id,
    });

    await review.save();
    
    // Add review to property's reviews array
    if (propertyType === "room") {
      await Room.findByIdAndUpdate(propertyId, {
        $push: { reviews: review._id }
      });
    } else {
      await Car.findByIdAndUpdate(propertyId, {
        $push: { reviews: review._id }
      });
    }
    
    await review.populate("reviewer", "fname lname profileImage");

    return successResponse(res, "Review created successfully", { review });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create review", error);
  }
};

export const getReviewsByProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId, propertyType } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const filter = { propertyId, propertyType };
    const totalItems = await Review.countDocuments(filter);
    
    const reviews = await Review.find(filter)
      .populate("reviewer", "fname lname profileImage")
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
      "Reviews fetched successfully",
      { reviews },
      pagination
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch reviews", error);
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }

    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({ _id: id, reviewer: req.user.id });
    if (!review) {
      return errorResponse(res, 404, "Review not found or unauthorized");
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();
    await review.populate("reviewer", "fname lname profileImage");

    return successResponse(res, "Review updated successfully", { review });
  } catch (error) {
    return errorResponse(res, 500, "Failed to update review", error);
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return errorResponse(res, 401, "Unauthorized: user not authenticated");
    }

    const { id } = req.params;

    const review = await Review.findOne({ _id: id, reviewer: req.user.id });
    if (!review) {
      return errorResponse(res, 404, "Review not found or unauthorized");
    }

    // Remove review from property's reviews array
    if (review.propertyType === "room") {
      await Room.findByIdAndUpdate(review.propertyId, {
        $pull: { reviews: review._id }
      });
    } else {
      await Car.findByIdAndUpdate(review.propertyId, {
        $pull: { reviews: review._id }
      });
    }
    
    await Review.findByIdAndDelete(id);

    return successResponse(res, "Review deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete review", error);
  }
};